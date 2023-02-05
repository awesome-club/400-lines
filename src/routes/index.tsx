import { Task } from "@prisma/client";
import { createEffect, createSignal, For } from "solid-js";
import DayCard from "~/components/DayCard";
import Header from "~/components/Header";
import TaskEntry from "~/components/TaskEntry";
import { fmt, getCalendarView, getWeekDates, isSameDate } from "~/service/DateService";
import { EmptyTask } from "~/service/Domain";
import { trpc } from "~/service/TrpcService";
import appStore from "../store";

export default function Home() {
  const [store, setStore] = appStore;
  const [days, setDays] = createSignal<Date[]>([]);
  const [tasks, setTasks] = createSignal<Task[]>([]);

  createEffect(async () => {
    setDays(getWeekDates(store.view.startOfWeek));
    fetchTasks();
  });

  async function fetchTasks() {
    setTasks(await trpc.getTasks.query(fmt(store.view.active)));
  }

  function changeDay(date: Date) {
    setStore({view: getCalendarView(date)});
  }

  function add() {
    setTasks([EmptyTask, ...tasks()]);
  }

  return (
    <main class="w-80% ma">
      <Header />

      <section class="flex gap-5px">
        <For each={days()}>{day => <DayCard
            current={isSameDate(day, store.view.current)}
            active={isSameDate(day, store.view.active)}
            date={day}
            onClick={changeDay}
          />
        }</For>
      </section>

      <section class="tasks">
        <header class="mt-2em bg-white rd-.25em p-1.5em flex items-center">
          <h3 class="m0">Tasks</h3>
          <button class="ml-auto bg-#492e64 border-0 text-white text-1em fw-900 rd-.25em py-10px px-20px cursor-pointer" onClick={add}>Add</button>
        </header>

        <For each={tasks()}>{task => 
          <TaskEntry 
            task={task} 
            onSaved={fetchTasks}
          />
        }</For>
      </section>
    </main>
  );
}

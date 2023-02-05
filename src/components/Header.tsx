import { addDays, getCalendarView, pretty, weekday } from "~/service/DateService";
import appStore from "../store";

export default function Header() {
  const [store, setStore] = appStore;

  function changeWeek(dir: "prev" | "next") {
    const startOfWeek = addDays(store.view.startOfWeek, dir === "prev" ? -7 : 7);
    setStore({view: getCalendarView(store.view.active, startOfWeek)});
  }

  function viewToday() {
    setStore({view: getCalendarView(new Date())});
  }

  return <header class="flex py-2em items-center">
    <label class="text-28px cursor-pointer fw-300" onClick={viewToday}>
      <strong class="fw-500">{weekday(store.view.current)}</strong>, {pretty(store.view.current)}
    </label>

    <nav class="ml-a flex items-center">
      <button class="border-0 bg-none h-42px text-28px transition-all cursor-pointer hover:translate-x--2px" onClick={() => changeWeek("prev")}>←</button>
      <label class="text-24px px-1em fw-300">
        <strong class="fw-500">Week {store.view.weekIndex}</strong> 
        &nbsp;- {pretty(store.view.startOfWeek)} 
        &nbsp;- {pretty(store.view.endOfWeek)}
      </label>
      <button class="border-0 bg-none h-42px text-28px transition-all cursor-pointer hover:translate-x-2px" onClick={() => changeWeek("next")}>→</button>
    </nav>
  </header>
}
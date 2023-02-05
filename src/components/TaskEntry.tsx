import { Task } from "@prisma/client";
import { createSignal, Show } from "solid-js";
import { fmt } from "~/service/DateService";
import { trpc } from "~/service/TrpcService";

interface TaskEntryProps {
  task: Task;
  onSaved: (task: Task) => void;
}

export default function TaskEntry(props: TaskEntryProps) {
  const [title, setTitle] = createSignal(props.task.title);
  const [details, setDetails] = createSignal(props.task.details);

  async function onChange() {
    await trpc.updateTask.mutate({
      id: props.task.id,
      title: title(),
      details: details()
    })
  }

  async function save() {
    const result = await trpc.createTask.mutate({
      title: title(), 
      details: details(),
      date: fmt()
    });
    props.onSaved(result);
  }

  return <article class="bg-white mt-5px rd-.25em p-1em flex items-center">
    <span class="rd-2em bg-#4fc3f7 text-white py-2px px-5px mr">{props.task.status}</span>

    <input type="text" placeholder="Title" class="border-0 text-18px outline-0 fw500 p-.5em" value={title()} 
      onChange={ev => {
        setTitle((ev.target as HTMLInputElement).value);
        onChange();
      }} />
    
    <input type="text" placeholder="Details" class="border-0 text-18px flex-1 fw-300 p-.5em outline-0" value={details()} 
      onChange={ev => {
        setDetails((ev.target as HTMLInputElement).value);
        onChange();
      }}/>

    <Show when={!props.task.id}>
      <button class="bg-none text-#492e64 border-0 text-.95em fw-900 rd-.2em px-10px cursor-pointer" onClick={save}>Save</button>
    </Show>
  </article>
}
import { createStore } from "solid-js/store";
import { CalendarView, getCalendarView } from "./service/DateService";

export default createStore<{
  view: CalendarView;
}>({
  view: getCalendarView(new Date()),
});

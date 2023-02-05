import {pretty, weekday } from "~/service/DateService";

interface DayCardProps {
  current: boolean;
  active: boolean;
  date: Date;
  onClick: (date: Date) => void;
}

export default function DayCard(props: DayCardProps) {
  return <article 
    class="select-none bg-white flex-1 rd-.5em h-350px flex flex-col p-1.5em transition-all cursor-pointer hover:scale-101"
    classList={{active: props.active, current: props.current }} 
    onClick={() => props.onClick(props.date)}>
    <footer class="mt-a">
      <h5 class="text-64px m0 fw300">{weekday(props.date).substring(0, 1)}</h5>
      <h6 class="text-16px fw700 uppercase m0 opacity60">{pretty(props.date, "short") }</h6>
    </footer>
  </article>
}
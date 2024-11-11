import formatDateString from "@/lib/utils.ts";

function Time() {

    const {day, time, dayOfTheWeek, month} = formatDateString(new Date(new Date().getTime()).toString())

    return (
        <div className="text-xs text-zinc-500">
            {`${dayOfTheWeek}, ${day} de ${month} | ${time}`}
        </div>
    );
}

export default Time;
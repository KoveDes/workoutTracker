import React, {useState} from 'react';
import {DateCalendar, LocalizationProvider, PickersDay} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch.js";

function HistoryCalendar() {
    const {response} = useFetch(({
        method: 'get',
        path: `workouts/all`,
        deps: [],
    }))
    const workouts = response?.data?.reverse();
    const [month, setMonth] = useState(dayjs(new Date()).month() + 1);
    const workoutDays = workouts?.reduce((acc, {finishedAt}) => {
        const workoutMonth = dayjs(finishedAt).month() + 1;
        if (workoutMonth === month) {
            return [...acc, dayjs(finishedAt).date()]
        }
        return acc;

    }, []);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                readOnly
                views={['day']}
                slots={{
                    day: WorkoutDay,
                }}
                slotProps={{
                    day: {
                        workoutDays
                    },
                }}
                onMonthChange={(date) => setMonth(dayjs(date).month() + 1)}
            />
        </LocalizationProvider>
    );
}

function WorkoutDay(props) {
    const {workoutDays = [], day, outsideCurrentMonth, ...other} = props;

    const isSelected =
        !props.outsideCurrentMonth && workoutDays.indexOf(props.day.date()) >= 0;
    return (
        <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            sx={{
                backgroundColor: isSelected ? '#3b3b3f' : 'initial',
                color: isSelected ? 'white' : 'initial',
            }}/>
    );
}

export default HistoryCalendar;
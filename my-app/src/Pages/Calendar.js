import React, {Fragment, useState, useEffect} from 'react';
import CalendarFormat from './CalendarFormat';
import axios from 'axios';
import { dateFnsLocalizer } from 'react-big-calendar';



const Calendar = () => {
  const [scheduleTitle, setScheduleTitle] = useState('');

  

  useEffect(() => {
    axios.get(`http://localhost:8080/currentSchedule`)
    .then((response) => {
      const data = response.data;
      setScheduleTitle(data.title)
    });
  }, [])

  // setScheduleTitle(newSchedule.title);

  return (
    <Fragment>
       <h1>{scheduleTitle}</h1>
       <CalendarFormat />
    </Fragment>
  
  )

  }

export default Calendar;
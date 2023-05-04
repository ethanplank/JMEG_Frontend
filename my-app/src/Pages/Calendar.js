import React, {Fragment, useState, useEffect} from 'react';
import CalendarFormat from './CalendarFormat';
import axios from 'axios';
import { dateFnsLocalizer } from 'react-big-calendar';



const Calendar = () => {
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [credits, setCredits] = useState('');

  

  useEffect(() => {
    axios.get(`http://localhost:8080/currentSchedule`)
    .then((response) => {
      const data = response.data;
      setScheduleTitle(data.title)
      setCredits(data.credits)
      var el = document.getElementsByClassName("rbc-btn-group")[0];
      el.style.display = "none";
    });
  }, [])

  // setScheduleTitle(newSchedule.title);

  return (
    <Fragment>
      <div>
        <h1 className='header'>{scheduleTitle}</h1>
        <h4 className='header'>{credits}</h4>
      </div>
       
       <CalendarFormat id="fragment" />
    </Fragment>
  
  )

  }


export default Calendar;
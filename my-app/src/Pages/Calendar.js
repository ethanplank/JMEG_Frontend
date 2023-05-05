import React, {Fragment, useState, useEffect} from 'react';
import CalendarFormat from './CalendarFormat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { dateFnsLocalizer } from 'react-big-calendar';



const Calendar = () => {
  const [scheduleTitle, setScheduleTitle] = useState('');

  let navigate = useNavigate()
  

  useEffect(() => {
    axios.get(`http://localhost:8080/currentSchedule`)
    .then((response) => {
      const data = response.data;
      setScheduleTitle(data.title)
    });
  }, [])

  const deleteClick = () => {
    const confirm = window.confirm("Are you sure you want to delete this Schedule?\nThis action is permenant.")
    if (confirm === true) {
      axios.get(`http://localhost:8080/deleteSchedule?title=${scheduleTitle}`)
      .then((response) => {
        const data = response.data

        if (data === 0) {
          console.log("Deletion succesful")
          const path = "/"
          navigate(path)
        } else if (data === 1) {
          console.log("Couldnt find schedule")
        }
      })
    }
  }

  // setScheduleTitle(newSchedule.title);

  return (
    <Fragment>
       <h1>{scheduleTitle}</h1>
       <CalendarFormat />
       <button onClick={deleteClick}>Delete Schedule</button>
    </Fragment>
  
  )

  }

export default Calendar;
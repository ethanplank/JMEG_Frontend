import React, {Fragment, useState, useEffect} from 'react';
import CalendarFormat from './CalendarFormat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { dateFnsLocalizer } from 'react-big-calendar';



const Calendar = () => {
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDetails, setCourseDetails] = useState('');

  let navigate = useNavigate()
  

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
  const handleRemove = () => {
    //DO stuff
    const r = window.confirm("Would you like to remove "+courseName+"?")
    if(r === true){
      
      axios.get(`http://localhost:8080/removeByTitle?title=${courseName}`)
      .then((response)=>{
        const data = response.data 
        if (data === true){
          console.log("it worked")
        }else{
          console.log("it didnt")
        }
      })
      .catch((error)=>{
        console.log("it failed")
      })

      window.location.reload()
    }
  }

  // setScheduleTitle(newSchedule.title);

  return (
    <Fragment>
      <div>
        <h1 className='header'>{scheduleTitle}</h1>
        <h4 className='header'>Total credits: {credits}</h4>
        <container id= "EventPopup" style={{display:"none"}}>
        <div class="card w-75 border-primary mb-3" id="card">
  <div class="card-body text-primary">
    <h5 class="card-title">{courseName}</h5>
    <p class="card-text">{courseDetails}</p>
    <a href="#" class="btn btn-secondary" onClick={handleRemove}>Remove Course</a>
  </div>
</div>
</container></div>
       
       <CalendarFormat id="fragment" setName={setCourseName} setDetails={setCourseDetails}/>
       <button type="button" onClick={deleteClick} class="btn btn-danger">Delete Schedule</button>
    </Fragment>
  
  )
}

export default Calendar;
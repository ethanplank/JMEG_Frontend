import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventPopup from "./EventPopup";

const localizer = momentLocalizer(moment);


const CalendarFormat = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:8080/currentSchedule`)
        .then((response) => {
        const data = response.data;
        console.log(data)
        const classes = data.courses
        let eventList = []
        for (const course of classes) {
          const startT = course.timeSlot.beginTimeCode
          const startH = Math.floor(startT / 60);
          const startM = startT % 60;
          const endT = course.timeSlot.endTimeCode;
          const endH = Math.floor(endT / 60);
          const endM = endT % 60;
          const name = course.crs_title;
          const timeSlot = course.timeSlot;
          let days = []
          if (timeSlot.onMonday) {
            days.push(1)
          }
          if (timeSlot.onTuesday) {
            days.push(2)
          }
          if (timeSlot.onWednesday) {
            days.push(3)
          }
          if (timeSlot.onThursday) {
            days.push(4)
          }
          if (timeSlot.onFriday) {
            days.push(5)
          }
          for (const day of days) {
            let newEvent = {
              title: name,
              start: moment().day(day).hour(startH).minute(startM).toDate(),
              end: moment().day(day).hour(endH).minute(endM).toDate()
            };
            eventList.push(newEvent)
          }
        }
        
        setEvents([
          ...events,
          ...eventList
        ]);
      });
      console.log(events)
    }, [])

  
    const handleSelect = ({ start, end }) => {
      const title = window.prompt("New Event name");
      console.log(start);
      console.log(end);
      if (title) {
        setEvents([
          ...events,
          {
            start,
            end,
            title,
          },
        ]);
      }
    };

    const handleAdd = ({start, end, title}) => {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
         
        },
      ]);
    };

    const onSelectEvent = (event) => {
      console.log(event, "Event data");
      const r = window.confirm("Would you like to remove "+event.title+"?")
      if(r === true){
        
        axios.get(`http://localhost:8080/removeByTitle?title=${event.title}`)
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

    
  
    return (
      <div>
        <Calendar
          dayLayoutAlgorithm={'no-overlap'}
          min={new Date(0,0,0,8,0,0)}
          max={new Date(0,0,0,21,0,0)}
          onSelectEvent={onSelectEvent}
          step={15}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelect}
          views={['work_week', 'agenda']}
          defaultView="work_week"
          eventComponent={EventPopup}
        />
      </div>
    );
  };

  export default CalendarFormat;
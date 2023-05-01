import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, views } from "react-big-calendar";
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarFormat = () => {
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //   axios.get(`http://localhost:8080/currentSchedule`)
    //     .then((response) => {
    //     const data = response.data;
    //     console.log(data)
    //     const classes = data.courses
    //     for (const course of classes) {
    //       const startT = course.timeSlot.beginTimeCode
    //       const startH = Math.floor(startT / 60);
    //       const endT = course.timeSlot.endTimeCode;
    //       const endH = Math.floor(endT / 60);
    //       const name = course.crs_title;
    //       console.log(startH)
    //       console.log(startT)
    //       console.log(endH)
    //       const start = new Date().toString();
    //       const end = new Date().setHours(new Date().getHours() + 1).toString();
    //       handleAdd(start, end, name);
    //     };
    //   });
    //   console.log(events)
    // }, [])

  
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
      // const r = window.confirm("Would you like to remove this event?")
      // if(r === true){
        
      //   this.setState((prevState, props) => {
      //     const events = [...prevState.events]
      //     const idx = events.indexOf(event)
      //     events.splice(idx, 1);
      //     return { events };
      //   });
      // }
    }
  
    return (
      <div>
        <Calendar
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
        />
      </div>
    );
  };

  export default CalendarFormat;
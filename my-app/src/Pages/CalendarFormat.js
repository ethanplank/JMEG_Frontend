import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarFormat = () => {
    const [events, setEvents] = useState([]);
    const views = {week: true, agenda: true}

    useEffect(() => {
      axios.get(`http://localhost:8080/currentSchedule`)
        .then((response) => {
        const data = response.data;
        console.log(data)
        const classes = data.courses
        for (const course of classes) {
          const startT = course.timeSlot.beginTimeCode
          const startH = startT / 60
          const startM = startT % 60
          const endT = course.timeSlot.endTimeCode
          const endH = endT / 60
          const endM = endT % 60
          const name = course.crs_title
          setEvents([
            ...events,
            {
              startT,
              endT,
              name,
            },
          ]);
        };
      });
      console.log(events)
    }, [])

  
    const handleSelect = ({ start, end }) => {
      const title = window.prompt("New Event name");
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
          views = {views}
          step={15}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelect}
        />
      </div>
    );
  };

  export default CalendarFormat;
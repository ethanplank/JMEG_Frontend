import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarFormat = () => {
    const [events, setEvents] = useState([]);
  
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
  
    return (
      <div>
        <Calendar
          min={new Date(0,0,0,8,0,0)}
          max={new Date(0,0,0,21,0,0)}
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
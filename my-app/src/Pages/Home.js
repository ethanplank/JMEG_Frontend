import React, {Fragment} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ScheduleCard from '../Components/ScheduleCard'
import AddScheduleCard from '../Components/AddScheduleCard'
import axios from 'axios';


export default function Home(){
    const [scheduleCards, setScheduleCards] = useState(
      [
        {title: "ScheduleHi"},
        {title: "second Schedule"}
      ]
    );

    useEffect(() => {
      axios.get(`http://localhost:8080/scheduleList/`)
      .then((response) => response.stringify())
      .then((data) => {
        setScheduleCards(data)
        console.log(data);
      });
    },[]) 
    // const getSchedules = (event) => {
    //   event.preventDefault();
    //   axios.get(`http://localhost:8080/scheduleList`)
    //     .then((response) => {
    //       console.log(response.data);
    //       setSchduleCard = response.data;
    //       // console.log(response.data[0].title);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       console.log("There's and error");
    //     });
    // };
    const showScheduleCards = true;
    return (
      <div>
      {showScheduleCards ? (
        <>
          <div>
            {scheduleCards.map((scheduleCard) => {
              console.log(scheduleCard);
              return (
                <ScheduleCard title={scheduleCard.title}/>
              );
            })}
          </div>
        </>
      ) : (
        <p>You can't see the schedules</p>
      )}
        <>
          <AddScheduleCard />
        </>
      </div>
    )
}
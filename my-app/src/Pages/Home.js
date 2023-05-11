import React, {Fragment} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ScheduleCard from '../Components/ScheduleCard'
import AddScheduleCard from '../Components/AddScheduleCard'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Home(){
    const [scheduleCards, setScheduleCards] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:8080/scheduleList/`)
      .then((response) => {
        console.log(response)
        const data = response.data
        let dataVals = []
        for (const val of data) {
          const newSchedule = {
            title: val.title
          }
          dataVals.push(newSchedule)
        }

        setScheduleCards([
          ...scheduleCards,
          ...dataVals,
        ]);
      })
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
      <Container>
        <Row>
            <AddScheduleCard />
            {scheduleCards.map((scheduleCard) => {
              console.log(scheduleCard);
              return (
                <ScheduleCard title={scheduleCard.title}/>
              );
            })}
        </Row>
      {/* {showScheduleCards ? (
        <>
          <div id="loadedCards">
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
        <div id="addCard">
          <AddScheduleCard />
        </div> */}
      </Container>
    )
}
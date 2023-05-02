import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ScheduleCard(schedule) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/calendar';
        navigate(path);
    }

    const scheduleClicked = (event) => {
        console.log(schedule)
        axios.get(`http://localhost:8080/schedulePick?title=${schedule.title}`)
        .then((response) => {
            if (response.data) {
                routeChange();
            }
        });   
    }


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Img src="./logo192.png"></Card.Img>
                <Card.Title>{schedule.title}</Card.Title>
                <Button onClick={scheduleClicked}>Go to Schedule</Button>
            </Card.Body>
        </Card>
    )


}

export default ScheduleCard;
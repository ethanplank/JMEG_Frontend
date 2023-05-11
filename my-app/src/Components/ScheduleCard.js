import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ScheduleCard.css"


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
        <Card className="schedule-card" border="primary" style={{ width: '15rem' }}>
            <Card.Body>
                <Card.Img src="https://s3.amazonaws.com/file.imleagues/Images/Schools/Uploaded/201809/201896104357586f1f749d9908dfbd634e1f4c9fd1376c5.jpg"></Card.Img>
                <Card.Title>{schedule.title}</Card.Title>
                <Button onClick={scheduleClicked}>Go to Schedule</Button>
            </Card.Body>
        </Card>
    )


}

export default ScheduleCard;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./ScheduleCard.css"
import Image from 'react-bootstrap/Image';
import "./ScheduleCard.css"


function ScheduleCard(schedule) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = './CreateScheduleForm';
        navigate(path);
    }

    return (
        <Card className="schedule-card" border= 'primary' style={{ width: '15rem' }}>
            <Card.Body>
                {/* <Card.Img src="./plus.png"></Card.Img> */}
                <Button className="add_button" size="lg" onClick={() => routeChange()}>
                    <p id="plus">+</p>
                    {/* <Image color="white" src="plus.png" fluid={true} ></Image> */}
                </Button>
                {/* <Card.Title>New Schedule</Card.Title> */}
                
            </Card.Body>
        </Card>
    )
}

export default ScheduleCard;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';

function ScheduleCard(schedule) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = './CreateScheduleForm';
        navigate(path);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Img src="./plus.png"></Card.Img>
                <Card.Title>New Schedule</Card.Title>
                <Button onClick={() => routeChange()}>
                    Create new schedule
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ScheduleCard;
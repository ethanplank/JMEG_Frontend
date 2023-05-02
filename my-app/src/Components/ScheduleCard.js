import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import axios from 'axios';


function ScheduleCard(schedule) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Img src="./logo192.png"></Card.Img>
                <Card.Title>{schedule.title}</Card.Title>
                <Button>Go to Schedule</Button>
            </Card.Body>
        </Card>
    )
}

export default ScheduleCard;
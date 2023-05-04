import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function CreateScheduleForm() {
    const [semester, setSemester] = useState('');
    const [radioValue, setRadioValue] = useState('1');
    const [year, setYear] = useState('');
    const [title, setTitle] = useState('');

    const radios = [
        {name: 'Fall', value: '1'},
        {name: 'Spring', value: '2'},
    ]

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
    };

    const createSchedule = () => {
        axios.get(`http://localhost:8080/scheduleCreate?title=${title}?semester=${semester}?year=${year}`)
            .then((response) => {
                console.log(response);
                const data = response.data;
                if(data === true) {
                    console.log("Schedule succesfully added");
                } else {
                    console.log("Reached backend, but failed to add");
                }
            })
            .catch((error) => {
                console.log("Error adding Schedule")
            });
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter a schedule name"
                    required
                    />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
            </Form.Group>

            <ButtonGroup>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-warning'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                        setRadioValue(e.currentTarget.value)
                        setSemester(e.currentTarget.name)
                    }}>
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter a year"
                required
                />
            </Form.Group>

            <Form.Group  className="mb-3">
                <Form.Label>Schedule Description</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter a description"
                required={false}
                />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control 
                type="file" 
                required={false}
                />
            </Form.Group>

            <Button 
                type="submit"
                onClick={() => createSchedule()}
                >
                Create Schedule!
            </Button>
        </Form>
        </>
      );
}
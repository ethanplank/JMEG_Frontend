import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function CreateScheduleForm() {

    const navigate = useNavigate();
    const routeChange = () => {
        let path = '../calendar';
        navigate(path);
    }

    const [semester, setSemester] = useState('Fall'),
        onSemesterToggle = e => ({target:{}}) => setSemester(semester);
        console.log(semester)

    const [year, setYear] = useState(''),
        onYearInput =  e => ({target:{}}) => setYear(year);
        console.log(year)

    const [title, setTitle] = useState(''),
        onTitleInput = ({target:{value}}) => setTitle(value);
        console.log(title)
        
    const onFormSubmit = event => {
        event.preventDefault()
            setYear(year)
            setTitle(title)
            setSemester(semester)
            createSchedule()
        };

    const [radioValue, setRadioValue] = useState('1')
    

    const radios = [
        {name: 'Fall', value: '1'},
        {name: 'Spring', value: '2'},
    ]

    const [yearValue, setYearValue] = useState('1')

    const years = [
        {name: '2018', value: '1'},
        {name: '2019', value: '2'},
        {name: '2020', value: '3'}
    ]

    const [validated, setValidated] = useState(false);

    // const [value, setValue] = useState(),
    //     onInput = ({target:{value}}) => setValue(value),
    //     onFormSubmit = e => {
    //       e.preventDefault()
    //       console.log(value)
    //       setValue()
    //     }

    const createSchedule = () => {
        axios.get(`http://localhost:8080/scheduleCreate?title=${title}&semester=${semester}&year=${year}`)
            .then((response) => {
                console.log(response);
                const data = response.data;
                if(data === true) {
                    console.log("Schedule succesfully added");
                    routeChange();
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
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter a schedule name"
                    required
                    value={title}
                    onChange={onTitleInput}
                    />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
            </Form.Group>

            <ButtonGroup>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    semester={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                        setRadioValue(e.currentTarget.value)
                        onSemesterToggle(e.currentTarget.name)
                        setSemester(radio.name)
                    }}>
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
            </Form.Group>

            <ButtonGroup>
                {years.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    year={radio.value}
                    checked={yearValue === radio.value}
                    onChange={(e) => {
                        setYearValue(e.currentTarget.value)
                        onYearInput(e.currentTarget.name)
                        setYear(radio.name)
                    }}>
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <Form.Group  className="mb-3">
                <Form.Label>Schedule Description</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter a description"
                required={false}
                // value={value}
                />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control 
                type="file" 
                required={false}
                // value={value}
                />
            </Form.Group>

            <Button 
                type="submit"
                // onClick={() => {
        
                //     }}
                >
                Create Schedule!
            </Button>
        </Form>
        </>
      );
}
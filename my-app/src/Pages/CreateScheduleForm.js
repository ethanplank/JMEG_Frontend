import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./Searchbar.css";


const CreateScheduleForm = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        let path = '../calendar';
        navigate(path);
    }

    const [semester, setSemester] = useState('Fall'),
        onSemesterToggle = e => ({target:{}}) => setSemester(semester);
        console.log(semester)

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
    

    const semesters = [
        {name: 'Fall', value: '1'},
        {name: 'Spring', value: '2'},
    ]

    const [year, setYear] = useState('2018')


    const handleYear = (val) => {
        setYear(val);
        console.log(val)
    }

    const createSchedule = () => {
        axios.get(`http://localhost:8080/scheduleCreate?title=${title}&semester=${semester}&year=${year}`)
            .then((response) => {
                console.log(response);
                const data = response.data;
                if(data === 0) {
                    console.log("Schedule succesfully added");
                    routeChange();
                } else if (data === 1) {
                    document.getElementById("addScheduleFailExist").style.display="inline";
                } else if (data === 2) {
                    document.getElementById("addScheduleFailEmpty").style.display="inline";
                } else {
                    console.log("Unkown Failure")
                }
            })
            .catch((error) => {
                console.log("Error adding Schedule")
            });
    }

    return (
        <>
        <Form onSubmit={onFormSubmit}>
            <div class="alert alert-danger" id="addScheduleFailExist" role="alert">
                Failed to create schedule due to same name as another schedule.
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="alert alert-danger" id="addScheduleFailEmpty" role="alert">
                Failed to create schedule due to unfilled boxes.
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Form.Group className="mb-3">
                <Form.Label>Schedule Name (Required)</Form.Label>
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
                {semesters.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    semester={radio.value}
                    value={radio.value}
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

            <ToggleButtonGroup type="radio" name="years" onChange={handleYear}>
                <ToggleButton id="tbg-radio-1" value={'2018'}>
                    2018
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={'2019'}>
                    2019
                </ToggleButton>
                <ToggleButton id="tbg-radio-3" value={'2020'}>
                    2020
                </ToggleButton>
            </ToggleButtonGroup>

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

const closePopup = ()=>{
    document.getElementById("addScheduleFailExist").style.display="none";
    document.getElementById("addScheduleFailEmpty").style.display="none";
}

export default CreateScheduleForm;
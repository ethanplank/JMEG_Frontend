import React from 'react';
import Form from 'react-bootstrap/Form';
import Popup from 'reactjs-popup';

function scheduleForm() {
    
    return (
        <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Schedule Name</Form.Label>
                <Form.Control type="text" placeholder="Enter a schedule name"/>
            </Form.Group>

            <Form.Group  className="mb-3">
                <Form.Label>Schedule Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter a description"/>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Form>
        </>
      );
}

export default scheduleForm;
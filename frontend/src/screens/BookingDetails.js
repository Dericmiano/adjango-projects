import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from "../actions/bookActions";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function BookingDetails() {

    const book = useSelector(state => state.book)
    const { bookingDetails } = book

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [contact, setContact] = useState(bookingDetails.contact)
    const [city, setCity] = useState(bookingDetails.city)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ contact, city }))
        navigate('/placeBooking')

        // history.push('/payment')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='contact'>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter contact'
                        value={contact ? contact : ''}
                        onChange={(e) => setContact(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default BookingDetails
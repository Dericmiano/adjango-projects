import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from "../components/Message";
import {createOrder} from "../actions/orderActions";
import {useNavigate} from "react-router-dom";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
// import { createOrder } from '../actions/orderActions'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { booking, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const book = useSelector(state => state.book)

    book.itemsPrice = book.bookingItems.reduce((acc, item) => acc + item.price * 1, 0).toFixed(2)

    book.totalPrice = (Number(book.itemsPrice)).toFixed(2)


    // if (!cart.paymentMethod) {
    //     history.push('/payment')
    // }

    useEffect(() => {
        if (success) {
           navigate(`/booking/${booking._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [ dispatch, navigate, success])

    const placeOrder = () => {
        dispatch(createOrder({
            bookingItems: book.bookingItems,
            bookingDetails: book.bookingDetails,
            itemsPrice: book.itemsPrice,
            totalPrice: book.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Booking</h2>

                            <p>
                                <strong>Booking: </strong>
                                {book.bookingDetails.contact},  {book.bookingDetails.city}
                                {'  '}

                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Booked Services</h2>
                            {book.bookingItems.length === 0 ? <Message variant='info'>
                                Your booking page is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {book.bookingItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/service/${item.service}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        =  Cash {( 1 * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Booking Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>services:</Col>
                                    <Col>Cash {book.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block rounded-2'
                                    disabled={book.bookingItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Booking
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
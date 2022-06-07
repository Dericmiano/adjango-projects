import React,{useState,useEffect} from "react";
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem,} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {deliverOrder, getOrderDetails} from "../actions/orderActions";
import {ORDER_DELIVER_RESET} from "../constants/orderConstants";

function OrderScreen({ match, history }) {
    // const orderId = match.params.id
    const { bookingId } = useParams();
    const  dispatch = useDispatch()
    const navigate = useNavigate();


    const orderDetails = useSelector(state => state.orderDetails)
    const {booking,error, loading} = orderDetails



    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    if (!loading && !error){
        booking.itemsPrice = booking.bookingItems.reduce((acc, item) => acc + item.price * 1, 0)
        .toFixed(2)
    }

    useEffect(() =>{
        if (!userInfo){
            navigate('/login')
        }

        if (!booking || booking._id !== Number(bookingId) || successDeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch({type:ORDER_DELIVER_RESET})


            dispatch(getOrderDetails(bookingId))

        }

    },[userInfo, dispatch, booking, bookingId, navigate, successDeliver])
    
    

    const deliverHandler = () => {
        dispatch(deliverOrder(booking))

    }


    return loading ?
        (
        <Loader/>
        ):error ? (
            <Message variant='danger'>{error}</Message>
        ):
    (
        <div>
            <h1>Booking: {booking._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Booking</h2>
                            <p>
                                <strong>
                                    Name:
                                </strong>
                                {booking.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailed to${booking.user.email}`}>{booking.user.email}</a>
                            </p>
                            <p>
                                <strong>Contacts: </strong>
                                {booking.bookingDetails.contact},
                                {'  '}
                            </p>
                            <p>
                                 <strong>Town:  </strong> {booking.bookingDetails.city}
                                {' '}
                            </p>
                             {booking.isDelivered ? (
                                <Message variant='success'>Derivered on</Message>
                            ):(
                                <Message variant='danger'>Not Derivered</Message>

                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Booked services</h2>
                            {booking.bookingItems.length === 0 ? <Message variant='info'>
                                your order is empty

                            </Message>:(
                                <ListGroup variant='flush'>
                                    {booking.bookingItems.map((item, index) =>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/service/${item.service}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    Cash {item.price} =Cash {( 1 * item.price)
                                                    .toFixed(2)}

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
                                <h2>Booking summary</h2>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Item:
                                    </Col>
                                    <Col>ksh {booking.itemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>ksh{booking.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && !booking.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                    disabled={!userInfo.isAdmin}
                                >
                                    Mark as delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>

                </Col>
            </Row>

        </div>
    )

}
export default OrderScreen
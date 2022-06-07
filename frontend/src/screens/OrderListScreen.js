import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listOrders} from "../actions/orderActions";
import {useNavigate} from "react-router-dom";

function OrderListSCreen({history}) {
    const  dispatch = useDispatch()
    const navigate = useNavigate();

    const  orderList = useSelector(state => state.orderList)
    const {loading, bookings, error} = orderList

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listOrders())

        }else{
            navigate('/login')
        }

    },[dispatch, navigate, userInfo])
    return(
        <div>
            <h1>bookings</h1>
            {loading ? (
                <Loader/>
                )
            : error ?(
                            <Message variant='danger'>{error}</Message>
                ):
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>DELIVERED </th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td>{booking._id}</td>
                                        <td>{booking.user && booking.user.name}</td>
                                        <td>{booking.createdAt.substring(0, 10)}</td>
                                        <td>ksh {booking.totalPrice}</td>
                                        <td>{booking.isDelivered ? (
                                            booking.deliveredAt.substring(0,10)
                                        ):(
                                            <i className='fas fa-check' style={{color:'red'}}/>
                                            )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/booking/${booking._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    details
                                                </Button>

                                            </LinkContainer>

                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    )
            }

        </div>
    )

}
export default OrderListSCreen
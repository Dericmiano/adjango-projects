import React,{useState,useEffect} from "react";
import {Form, Button, Row, Col, FormGroup, Table, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import '../bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails} from "../actions/UserActions";
import {updateUserProfile,register} from "../actions/UserActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {useNavigate} from "react-router-dom";
import {listMyOrders} from "../actions/orderActions";

function ProfileScreen({history}) {
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const  [confirmPassword, setConfirmPassword] = useState('')
    const  [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    //to make sure user is loged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders,bookings} = orderListMy


    useEffect(() => {
        if (!userInfo){
            navigate('/login')

        }else{
            if (!user || !user.name || success || userInfo._id !== user._id){
                dispatch({
                    type:USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo, user, success])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage("pass words dont match")
        } else {
             dispatch(updateUserProfile({
                 'id':user._id,
                 'name':name,
                 'email':email,
                 'password':password,

             }))
             setMessage("")


                // dispatch(register(name,email,password))

        }
    }
    return(
            <Row className='mx-auto'>
            <Col md={3}>
                <h1>User profile</h1>
                {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                 <FormGroup controlId={name}>
                    <Form.Label>name</Form.Label>
                    <Form.Control
                    type='name'
                    required
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={email}>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        required
                    type='email'
                    placeholder='enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={password}>
                    <Form.Label>Pass word</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <FormGroup controlId={confirmPassword}>
                    <Form.Label> confirm Pass word</Form.Label>
                    <Form.Control
                    type='password'

                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <Button type='submit' variant='primary'>Update</Button>

            </Form>
            </Col>
            <Col md={9}>
                <h1>my bookings</h1>
                {loadingOrders ? (
                    <Loader/>
                ): errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ):(
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Delivered</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.createdAt.substring(0,10)}</td>
                                    <td>{booking.totalPrice}</td>
                                    <td>
                                        <LinkContainer to={`/booking/${booking._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                    <td></td>

                                </tr>
                            ) )}

                        </tbody>

                    </Table>
                )}
            </Col>
        </Row>
    )

}
export default ProfileScreen
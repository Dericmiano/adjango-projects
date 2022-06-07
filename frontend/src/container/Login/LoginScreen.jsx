import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import '../../bootstrap.min.css'
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Loader from "../../components/Loader";

// import Loader from "../components/Loader";
import Message from "../../components/Message";

import {login} from "../../actions/UserActions";
import FormContainer from "../../components/FormContainer";


function LoginScreen() {
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();


    const  redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo){
            navigate(redirect)

        }
    },[navigate, redirect, userInfo])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return(
         <FormContainer className='mx-auto'>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className='mx-auto'>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>

                <Button type='submit' className='rounded-2' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>

        </FormContainer>
    )

}
export default LoginScreen
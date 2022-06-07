import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import '../bootstrap.min.css'
import {TESTIMONIAL_CREATE_RESET} from "../constants/testimonialsConstants";
import {createTestimonial, deleteTestimonial, listTestimonials} from "../actions/testimonialActions";

function TestimonialListScreen({history, match }) {
    const  dispatch = useDispatch()
    const navigate = useNavigate();
     const  testimonialsList = useSelector(state => state.testimonialsList)
    const {loading, testimonials, error} = testimonialsList

    const  testimonialDelete = useSelector(state => state.testimonialDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = testimonialDelete

     const  testimonialCreate = useSelector(state => state.testimonialCreate)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, testimonial:createdTestimonial} = testimonialCreate

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    useEffect(() => {
        dispatch({type:TESTIMONIAL_CREATE_RESET})

        if (!userInfo.isAdmin){
            navigate('/login')
        }
        if (successCreate){
            navigate(`/admin/testimonial/${createdTestimonial._id}/edit`)

        }
        else{
            dispatch(listTestimonials())
        }

    },[dispatch, userInfo,navigate,successDelete,successCreate,createdTestimonial
    ])
     const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the user?")){
            dispatch(deleteTestimonial(id))
                //delete products
        }

    }
    const createTestimonialHandler = () => {
        dispatch(createTestimonial())
        //create testimonial

    }
    return(
          <div className='my-3'>
            <Row className='align-items-center m-3'>
                <Col>
                    <h1>Testimonials</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createTestimonialHandler}>
                        <i className='fas fa-plus'/> Create Testimonial</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

            {loading ? (
                <Loader/>
                )
            : error ?(
                            <Message variant='danger'>{error}</Message>
                ):
                    (
                        <div>
                        <Table striped bordered hover responsive className='table-sm my-3 py-3'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {testimonials.map(testimonial => (
                                    <tr key={testimonial._id}>
                                        <td>{testimonial._id}</td>
                                        <td>{testimonial.name}</td>
                                        <td>{testimonial.company}</td>

                                        <td>
                                            <LinkContainer to={`/admin/testimonial/${testimonial._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />

                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(testimonial._id)}
                                            >
                                                    <i className='fas fa-trash' />
                                                </Button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        </div>

                    )
            }

        </div>



    )

}
export default TestimonialListScreen
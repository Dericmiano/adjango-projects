import React, {useState,useEffect} from "react";
import {Router} from "react-router-dom";
// import '../../components/Header.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Link,useParams} from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {Row, Col, Button, Card, ListGroup, Image, ListGroupItem, Form, Container} from "react-bootstrap";
import Rating from "../../components/Rating";
// import services from "../../services";
import {listServiceDetails,createServiceReview} from "../../actions/serviceActions";
import {SERVICE_CREATE_REVIEW_RESET} from "../../constants/serviceConstants";
function ServiceScreen() {
     const [rating, setRating] = useState(0)
     const [comment, setComment] = useState('')

     const { id } = useParams();
     const dispatch = useDispatch();
    const navigate = useNavigate();
     const serviceDetails = useSelector(state => state.serviceDetails)
    const {error,loading,service} = serviceDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const serviceReviewCreate = useSelector(state => state.serviceReviewCreate)
    const {
        loading:loadingServiceReview,
        error:errorServiceReview,
        success:successServiceReview
    } = serviceReviewCreate




    // const  service = services.find((p) => p._id === id)

    useEffect(()=>{
         if (successServiceReview){
            setRating(0)
            setComment('')
            dispatch({type:SERVICE_CREATE_REVIEW_RESET})
        }
        dispatch(listServiceDetails(id))

    }, [dispatch, id, successServiceReview])


    function addToBookingHandler() {
         navigate(`/book/${id}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createServiceReview(
            id, {
                rating,
                comment//sending the data to the back end
            }
        ))
    }
    return(
        <div>
            <Container>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                {
                    loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                        (
                                        <Row>
                            <Col md={6}>
                                <Image className='rounded-2 border-5' src={service.image} alt={service.name} fluid />


                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h2>{service.name}</h2>
                                    </ListGroupItem>
                                    <ListGroup.Item>
                                    <Rating value={service.rating} text={`${service.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${service.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {service.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToBookingHandler}
                                            className='btn-block rounded-2'
                                            type='button'>
                                            Book Service
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                                <Col md={3}>
                                    <h4>Reviews</h4>
                                    {service.reviews.length === 0 && <Message variant='info'>No reviws</Message> }
                                    <ListGroup variant='flush'>
                                        {service.reviews.map((review) =>(
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color={'#f8e825'}/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>

                                            </ListGroup.Item>
                                        ))}
                                        <ListGroupItem>
                                            <h4>write a review</h4>
                                            {loadingServiceReview && <Loader/>}
                                            {successServiceReview && <Message variant='success'>Review submitted</Message> }
                                            {errorServiceReview && <Message variant='danger'>{errorServiceReview}</Message> }

                                            {userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control as='select'
                                                                      value={rating}
                                                                      onChange={(e) =>
                                                                          setRating(
                                                                          e.target.value)}
                                                        >
                                                            <option value=''>select..</option>
                                                            <option value='1'>1-poor..</option>
                                                            <option value='2'>2-fair..</option>
                                                            <option value='3'>3-good..</option>
                                                            <option value='4'>4-very good..</option>
                                                            <option value='5'>5-excellent..</option>

                                                        </Form.Control>

                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>
                                                            review
                                                        </Form.Label>
                                                        <Form.Control
                                                             as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(
                                                                e.target.value
                                                            )}
                                                        >good</Form.Control>
                                                        <Button
                                                            disabled={loadingServiceReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >Submit</Button>
                                                    </Form.Group>
                                                </form>
                                            ):(
                                                <Message variant='info'>Please <Link to='/login'>login</Link> To write a review</Message>
                                            )}
                                        </ListGroupItem>
                                    </ListGroup>


                                </Col>
            </Row>

                        )
                }
            </Container>


        </div>
    )

}
export default ServiceScreen;
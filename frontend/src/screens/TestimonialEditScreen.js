import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Form, Button,  FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams,useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {TESTIMONIAL_UPDATE_RESET} from "../constants/testimonialsConstants";
import {listTestimonialDetails, updateTestimonial} from "../actions/testimonialActions";

function TestimonialEditScreen({match, history}) {
    const { testimonialId } = useParams();
    const navigate = useNavigate();

    const  [name, setName] = useState('')
    const  [company, setCompany] = useState('')
    const  [image, setImage] = useState('')

    const  [description, setDescription] = useState('')
    const  [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()


    const testimonialDetails = useSelector(state => state.testimonialDetails)
    const {error, loading, testimonial} = testimonialDetails

    const testimonialUpdate = useSelector(state => state.testimonialUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = testimonialUpdate

    useEffect(() => {
        if (successUpdate){
            dispatch({type:TESTIMONIAL_UPDATE_RESET})
            navigate('/admin/testimonialList')
        }else{
            if (!testimonial.name || testimonial._id !== Number(testimonialId)){
                dispatch(listTestimonialDetails(testimonialId))
            }else{
                setName(testimonial.name)
                setCompany(testimonial.company)
                setImage(testimonial.image)

                setDescription(testimonial.description)
            }
         }
    },[dispatch, navigate, successUpdate, testimonial, testimonialId])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTestimonial({
            _id:testimonialId,
            name,
            company,
            image,
            description,
        }))
        // update service
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('testimonial_id', testimonialId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/testimonials/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }


    return(
        <div>
            <FormContainer>

            <Link to={`/admin/testimonialList`}>
                Go back
            </Link>
            <h1>Edit Testimonial</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                    :
                    (
                        <Form onSubmit={submitHandler}>

                         <FormGroup controlId={name}>
                            <Form.Label>name</Form.Label>
                            <Form.Control
                            type='name'
                            placeholder='enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            >

                            </Form.Control>

                        </FormGroup>
                         <FormGroup controlId={company}>
                            <Form.Label>company</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='enter company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            >

                            </Form.Control>

                        </FormGroup>
                        <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>


                        <FormGroup controlId={description}>
                            <Form.Label>description</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            >

                            </Form.Control>

                        </FormGroup>
                        <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}




        </FormContainer>

        </div>



    )

}
export default TestimonialEditScreen
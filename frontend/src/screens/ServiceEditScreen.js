import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Form, Button,  FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams,useNavigate} from "react-router-dom";
import {listServiceDetails, updateService} from "../actions/serviceActions";
import FormContainer from "../components/FormContainer";
import {SERVICE_UPDATE_RESET} from "../constants/serviceConstants";


function ServiceEditScreen({match, history}) {

    const { serviceId } = useParams();
    const navigate = useNavigate();

    const  [name, setName] = useState('')
    const  [price, setPrice] = useState('0')
    const  [image, setImage] = useState('')

    const  [description, setDescription] = useState('')
    const  [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()

    const serviceDetails = useSelector(state => state.serviceDetails)
    const {error, loading, service} = serviceDetails

    const serviceUpdate = useSelector(state => state.serviceUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = serviceUpdate


    useEffect(() => {
        if (successUpdate){
            dispatch({type:SERVICE_UPDATE_RESET})
            navigate('/admin/servicelist')
        }else{
            if (!service.name || service._id !== Number(serviceId)){
                dispatch(listServiceDetails(serviceId))
            }else{
                setName(service.name)
                setPrice(service.price)
                setImage(service.image)

                setDescription(service.description)


            }
         }
    },[dispatch, service,serviceId,
        // successUpdate
    ])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateService({
            _id:serviceId,
            name,
            price,
            image,
            description,
        }))
        // update service
    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('service_id', serviceId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/services/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
    return(
        <div>
            <FormContainer>

            <Link to={`/admin/servicelist`}>
                Go back
            </Link>
            <h1>Edit Service</h1>
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
                         <FormGroup controlId={price}>
                            <Form.Label>price</Form.Label>
                            <Form.Control
                            type='number'
                            placeholder='enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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

)}
export default ServiceEditScreen
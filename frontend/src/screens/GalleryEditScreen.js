import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Form, Button,  FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams,useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {GALLERY_UPDATE_RESET} from "../constants/galleryConstants";
import {listGalleryDetails, updateGallery} from "../actions/galleryActions";
function GalleryEditScreen() {
    const { galleryId } = useParams();
    const navigate = useNavigate();

    const  [name, setName] = useState('')
    const  [image, setImage] = useState('')

    const  [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

     const galleryDetails = useSelector(state => state.galleryDetails)
    const {error, loading, gallery} = galleryDetails

    const galleryUpdate = useSelector(state => state.galleryUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = galleryUpdate

     useEffect(() => {
        if (successUpdate){
            dispatch({type:GALLERY_UPDATE_RESET})
            navigate('/admin/galleryList')
        }else{
            if (!gallery.name || gallery._id !== Number(galleryId)){
                dispatch(listGalleryDetails(galleryId))
            }else{
                setName(gallery.name)
                setImage(gallery.image)
            }
         }
    },[dispatch, gallery,galleryId,
        // successUpdate
    ])//dependencies
     const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateGallery({
            _id:galleryId,
            name,
            image,
        }))
        // update service
    }
        const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('gallery_id', galleryId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/gallery/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
    return(
        <div>
            <FormContainer>

            <Link to={`/admin/galleryList`}>
                Go back
            </Link>
            <h1>Edit Gallery</h1>
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


                        <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}




        </FormContainer>

        </div>

    )

}
export default GalleryEditScreen
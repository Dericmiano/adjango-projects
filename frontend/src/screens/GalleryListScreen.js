import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import '../bootstrap.min.css'
import {GALLERY_CREATE_RESET} from "../constants/galleryConstants";
import {createGallery, deleteGallery, listGallery} from "../actions/galleryActions";

function GalleryListScreen() {
    const  dispatch = useDispatch()
    const navigate = useNavigate();
    const  galleryList = useSelector(state => state.galleryList)
    const {loading, gallery, error} = galleryList

    const  galleryDelete = useSelector(state => state.galleryDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = galleryDelete

    const  galleryCreate = useSelector(state => state.galleryCreate)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, gallery_c:createdGallery} = galleryCreate

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    useEffect(() => {
        dispatch({type:GALLERY_CREATE_RESET})

        if (!userInfo.isAdmin){
            navigate('/login')
        }
        if (successCreate){
            navigate(`/admin/gallery/${createdGallery._id}/edit`)

        }
        else{
            dispatch(listGallery())
        }

    },[dispatch, userInfo,navigate,successDelete,successCreate,createdGallery
    ])
    const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the image?")){
            dispatch(deleteGallery(id))
                //delete gallery
        }

    }
    const createGalleryHandler = () => {
        dispatch(createGallery())
        //create product

    }
    return(
        <div className='my-3'>
            <Row className='align-items-center m-3'>
                <Col>
                    <h1>Image Gallery</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createGalleryHandler}>
                        <i className='fas fa-plus'/> Create Image</Button>
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
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {gallery.map(gallery1 => (
                                    <tr key={gallery1._id}>
                                        <td>{gallery1._id}</td>
                                        <td>{gallery1.name}</td>


                                        <td>
                                            <LinkContainer to={`/admin/gallery/${gallery1._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />

                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(gallery1._id)}
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
export default GalleryListScreen
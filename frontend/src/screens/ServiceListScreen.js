import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import {createService, deleteService, listServices} from "../actions/serviceActions";
import '../bootstrap.min.css'
import {SERVICE_CREATE_RESET} from "../constants/serviceConstants";

function ServiceListScreen({history, match }) {
    const  dispatch = useDispatch()
    const navigate = useNavigate();
    const  serviceList = useSelector(state => state.serviceList)
    const {loading, services, error} = serviceList

    const  serviceDelete = useSelector(state => state.serviceDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = serviceDelete

    const  serviceCreate = useSelector(state => state.serviceCreate)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, service:createdService} = serviceCreate

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // let keyword = history.location.search


    useEffect(() => {
        dispatch({type:SERVICE_CREATE_RESET})

        if (!userInfo.isAdmin){
            navigate('/login')
        }
        if (successCreate){
            navigate(`/admin/service/${createdService._id}/edit`)

        }
        else{
            dispatch(listServices())
        }

    },[dispatch, userInfo,navigate,successDelete,successCreate,createdService
    ])


    const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the user?")){
            dispatch(deleteService(id))
                //delete products
        }

    }
    const createServiceHandler = () => {
        dispatch(createService())
        //create product

    }

    return(
        <div className='my-3'>
            <Row className='align-items-center m-3'>
                <Col>
                    <h1>Services</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createServiceHandler}>
                        <i className='fas fa-plus'/> Create Service</Button>
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
                                    <th>Price</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {services.map(service => (
                                    <tr key={service._id}>
                                        <td>{service._id}</td>
                                        <td>{service.name}</td>
                                        <td>{service.price}</td>


                                        <td>
                                            <LinkContainer to={`/admin/service/${service._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />

                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(service._id)}
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
export default ServiceListScreen
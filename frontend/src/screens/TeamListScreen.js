import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import '../bootstrap.min.css'
import {TEAM_CREATE_RESET} from "../constants/teamConstants";
import {deleteTeam,createTeam, listTeamMembers} from "../actions/teamActions";

function TeamListScreen() {
    const  dispatch = useDispatch()
    const navigate = useNavigate();
    const  teamList = useSelector(state => state.teamList)
    const {loading, teams, error} = teamList

    const  teamDelete = useSelector(state => state.teamDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = teamDelete

    const  teamCreate = useSelector(state => state.teamCreate)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, team:createdTeam} = teamCreate

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

     useEffect(() => {
        dispatch({type:TEAM_CREATE_RESET})

        if (!userInfo.isAdmin){
            navigate('/login')
        }
        if (successCreate){
            navigate(`/admin/team/${createdTeam._id}/edit`)

        }
        else{
            dispatch(listTeamMembers())
        }

    },[dispatch, userInfo,navigate,successDelete,successCreate,createdTeam
    ])

    const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the user?")){
            dispatch(deleteTeam(id))
                //delete team
        }

    }
    const createTeamHandler = () => {
        dispatch(createTeam())
        //create team

    }

    return(
        <div className='my-3'>
            <Row className='align-items-center m-3'>
                <Col>
                    <h1>Services</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createTeamHandler}>
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
                                    <th>Task</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {teams.map(team => (
                                    <tr key={team._id}>
                                        <td>{team._id}</td>
                                        <td>{team.name}</td>
                                        <td>{team.task}</td>


                                        <td>
                                            <LinkContainer to={`/admin/team/${team._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />
                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(team._id)}
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
export default TeamListScreen
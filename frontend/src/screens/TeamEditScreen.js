import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Form, Button,  FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams,useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {TEAM_UPDATE_RESET} from "../constants/teamConstants";
import {listTeamDetail, updateTeamMember} from "../actions/teamActions";

function TeamEditScreen() {
     const { teamId } = useParams();
    const navigate = useNavigate();

    const  [name, setName] = useState('')
    const  [task, setTask] = useState('')
    const  [image, setImage] = useState('')

    const  [uploading, setUploading] = useState(false)

     const dispatch = useDispatch()


    const teamDetails = useSelector(state => state.teamDetails)
    const {error, loading, team} = teamDetails

    const teamUpdate = useSelector(state => state.teamUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = teamUpdate

    useEffect(() => {
        if (successUpdate){
            dispatch({type:TEAM_UPDATE_RESET})
            navigate('/admin/teamList')
        }else{
            if (!team.name || team._id !== Number(teamId)){
                dispatch(listTeamDetail(teamId))
            }else{
                setName(team.name)
                setTask(team.task)
                setImage(team.image)



            }
         }
    },[dispatch, team,teamId,
        // successUpdate
    ])//dependencies

     const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTeamMember({
            _id:teamId,
            name,
            task,
            image,
        }))
        // update service
    }
     const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('team_id', teamId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/teams/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return(
          <div>
            <FormContainer>

            <Link to={`/admin/teamList`}>
                Go back
            </Link>
            <h1>Edit A team Member</h1>
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
                         <FormGroup controlId={task}>
                            <Form.Label>task</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='enter task'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
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
export default TeamEditScreen
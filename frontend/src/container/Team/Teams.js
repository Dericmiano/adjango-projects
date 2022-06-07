import React, {useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import Team from "../../components/Team";
import {useDispatch, useSelector} from "react-redux";
import {listTeamMembers} from "../../actions/teamActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
function Teams() {
    const dispatch = useDispatch();
    const teamList = useSelector(state => state.teamList)
    const {error,loading,teams} = teamList
    // const [services, setServices] = useState([]);
    useEffect(()=>{
        dispatch(listTeamMembers())


    }, [dispatch])

    return(
        <>
            <h1 className='title_team'>Meet the team</h1>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className="serve">
                            <Row>
                                {teams.map(team => (
                                    <Col key={team._id} sm={12} md={6} lg={4} xl={3}>
                                        <Team team={team}/>
                                    </Col>
                                ))}
                            </Row>

                        </div>

                    )
            }

        </>
    )

}
export default Teams;

import './Services.scss'
// import '../../bootstrap.min.css'


import React from "react";
import {useState,useEffect} from "react";
import {Row, Col, Button} from "react-bootstrap";
// import {motion} from "framer-motion";
import './bootstrap.min.css'
import {images} from "../../constants";
// import services from "../../services";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {listServices} from "../../actions/serviceActions";
import Service from "../../components/Service";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
function Services() {
    const dispatch = useDispatch();
    const serviceList = useSelector(state => state.serviceList)
    const {error,loading,services} = serviceList
    // const [services, setServices] = useState([]);
    useEffect(()=>{
        dispatch(listServices())


    }, [dispatch])


    return(
        <>
            <div className="contain">
                <h1 className='title'>Our services</h1>

                <h2 className='message'>comfort and pleasure on you car</h2>

                <h2 className="message">Paradise your car </h2>


              <h2 className='customer'>Being a first-choice employer within our sectors. Our<br/>
                process applies techniques from a variety of disciplines.</h2>
                <div className="button">
                    <Button>
                        <h4 className='tes'>see our services</h4>
                </Button>
                </div>
                <div className='extra'/>

            </div>
          {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :

                <div className="serve">
            <Row>
                {services.map(service=>(
                    <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
                        <Service service={service}/>
                    </Col>
                ))}
            </Row>
            </div>
            }
            </>
    )

}
export default Services;
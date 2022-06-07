import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Row, Col, Form, ListGroup, Card, Button, Image, Container, ListGroupItem} from "react-bootstrap";
import Message from "../components/Message";
import {addToBook} from "../actions/bookActions";
import {Link, useNavigate, useParams} from "react-router-dom";
import services from "../services";
import '../bootstrap.min.css'
import {removeFromBook} from "../actions/bookActions";


function BookingScreen() {
    const { id } = useParams();
    const serviceId = id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const book = useSelector(state => state.book)
    const { bookingItems } = book

    useEffect(()=>{
        if (serviceId){
            dispatch(addToBook(serviceId))
        }
    },[dispatch, serviceId])


   const removeFromBookHandler = (id) => {
        dispatch(removeFromBook(id))
   }

   const checkOutHandler = () => {
        // navigate('/login?redirect=shipping')
       navigate('/shipping')


   }

    return(
        <Container>
         <Row>
             <Col md={8}>
                 <h1>Booking Page</h1>
                 {bookingItems.length === 0 ? (
                     <Message variant='info'>
                         Your Bookings are empty<Link to='/'>Go Back</Link>
                     </Message>
                 ):(
                          <ListGroup variant='flush'>

                         {
                             bookingItems.map(item =>(
                                 <ListGroup.Item key={item.service}>
                                     <Row>
                                         <Col md={2}>
                                             <Image src={item.image} alt={item.name} fluid rounded/>
                                         </Col>
                                         <Col md={3}>
                                             <Link to={`/service/${item.service}`}>{item.name}</Link>

                                         </Col>
                                         <Col md={2}>
                                             Cash{item.price}
                                         </Col>
                                         <Col md={1}>
                                             <Button type='button'
                                                     variant='light'
                                                     onClick={()=> removeFromBookHandler(item.service)}
                                             >
                                                 <i className='fas fa-trash'/>

                                             </Button>

                                             </Col>

                                     </Row>
                                 </ListGroup.Item>
                             ))
                         }

                     </ListGroup>

                 )
                 }

             </Col>
             <Col>
                 <Card>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h2>SubTotal ({bookingItems.reduce((acc, item)=> acc,bookingItems.length,0)}) service(s)  </h2>
                         Total Amount {bookingItems.reduce((acc,item)=> acc + 1 * item.price,0).toFixed(2)}

                     </ListGroup.Item>
                     <ListGroupItem>
                         <Button type='button' className='btn-block' disabled={bookingItems.length === 0}
                         onClick={checkOutHandler}
                         >
                             PROCEED TO CHECKOUT

                         </Button>
                     </ListGroupItem>

                 </ListGroup>

             </Card>

             </Col>

         </Row>
        </Container>
     )
     
 }
 export default BookingScreen;
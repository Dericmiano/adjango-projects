import React from "react";
import {Card} from "react-bootstrap";
import Rating from "./Rating";
import {Link} from 'react-router-dom'
import '../container/Services/Services.scss'
function Service({ service }) {
    return(


        <Card className='images text-center my-3 p-3 rounded'>
               <div className='myImage'>


            <Link to={`/service/${service._id}`}>

                  <Card.Img className="mga" src={service.image}/>

            </Link>
               </div>
            <Card.Body>
                 <Link to={`/service/${service._id}`}>
                <Card.Title as="div">
                    <strong>{service.name}</strong>
                </Card.Title>
                 </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        {service.rating}  from {service.numReviews} reviews
                        <Rating value={service.rating} text={`${service.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>
                <Card.Text as='h3'>
                    cash {service.price}

                </Card.Text>

            </Card.Body>

        </Card>
    )

}
export default Service
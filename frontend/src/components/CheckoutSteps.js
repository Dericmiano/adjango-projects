import React from "react";
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

function CheckoutSteps({step1, step2, step3}) {
    return(
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                         <Nav.Link>Login</Nav.Link>
                    </LinkContainer>

                ):(
                    <Nav.Link disabled>Login</Nav.Link>
                )}

            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                         <Nav.Link>shipping</Nav.Link>
                    </LinkContainer>

                ):(
                    <Nav.Link disabled>shipping</Nav.Link>
                )}

            </Nav.Item>
             <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/placeBook'>
                         <Nav.Link>place Booking</Nav.Link>
                    </LinkContainer>

                ):(
                    <Nav.Link disabled>placeBook</Nav.Link>
                )}

            </Nav.Item>


        </Nav>
    )

}
export default CheckoutSteps
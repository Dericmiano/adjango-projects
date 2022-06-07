import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'

import images from "../constants/images";
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/UserActions";
import './Header.scss'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return(
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <div className='my_brand_head'>
                                 <div className="my_brand_name">
                             Stiches
                            </div>
                                <div className='my_brand_high'>
                                    High
                                </div>
                                <div className='my_brand_quality'>
                                    Quality
                                </div>
                            </div>


                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            <LinkContainer to='/book'>
                                <Nav.Link ><i className="fas fa-book"/> Booking</Nav.Link>
                            </LinkContainer>
                             {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"/>Login</Nav.Link>
                                    </LinkContainer>
                                )}
                             {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/servicelist'>
                                        <NavDropdown.Item>Services</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/testimonialList'>
                                        <NavDropdown.Item>Testimonials</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/teamList'>
                                        <NavDropdown.Item>Team</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/galleryList'>
                                        <NavDropdown.Item>Gallery</NavDropdown.Item>
                                    </LinkContainer>


                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </header>
    )

}
export default Header;
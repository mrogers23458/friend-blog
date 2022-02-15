import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Offcanvas } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import auth from '../utils/auth'
import { useState } from 'react'
export default function Topnav (){
  const navigate = useNavigate()
  const handleLogout = function () {
    auth.logout()
    navigate('/')
  }

  const [searchParams, setSearchParams] = useState({
    search: ''
  })

  const handleChange = function (e) {
    setSearchParams({...searchParams, [e.target.name]:e.target.value})
  }

  const handleSearch = function () {
    const params = searchParams.search
    navigate('/search')
  }
    return(
        <Navbar bg="dark" variant='dark' expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">Friends-Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Take me there!</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/post">Make a post</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link onClick={handleLogout} href="/">Logout</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  name="search"
                  onChange={handleChange}
                />
                <Button onClick={handleSearch} type="submit" variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
}
import React, { useState, useEffect } from "react";
import { Label, Input, Row, Col, FormGroup, Form } from 'reactstrap';
import { FaSignInAlt } from 'react-icons/fa'
import Banner from '../components/banner/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  // state for login
  const [formState, setFormState] = useState({ email: '', password: '' });

  const { email, password } = formState

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      alert(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Banner />
      <section className="hold-everything-login">
        <section className="holds-login-interaction">
          <div className="login-form">
            <h1 className="login-form-text"><FaSignInAlt /> Login:</h1>
            <div className="formBody">
              <Form className="actual-login-form" onSubmit={handleFormSubmit}>
                <Row>
                  <div className="inputRow">
                    <Col md={12}>
                      <FormGroup >
                        <Label className="labels" for="exampleEmail">
                          Email*
                        </Label>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="Email Address"
                          type="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <Label className="labels" for="examplePassword">
                          Password*
                        </Label>
                        <Input
                          id="examplePassword"
                          name="password"
                          placeholder="Password"
                          type="password"
                          autoComplete="on"
                          value={password}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </div>
                </Row>
                <button className="login-button" type="submit">Login</button>
              </Form>
            </div>
          </div>

          <div className="login-info">
            <h1 className="login-info-text " style={{textAlign: 'center'}}>Don't have an account?</h1>
            <p className="login-info-subtext">
              No worries! You can signup for free! It's quick and easy. When you do signup you'll be on the track to
              logging your climbing progress!
            </p>
            <div className="loginLink"><p className="login-info-subtext">Don't have an account?
              <a href={'signup'} className="loginButton"> Click here!</a></p>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Login;
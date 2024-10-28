import React, { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa'
import { Label, Input, Row, Col, FormGroup, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
// import { toast } from 'react-toastify'
import Banner from '../components/banner/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from '../components/Spinner'

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    maxBoulderingGrade: '',
    maxTopRopingGrade: '',
    password: '',
    password2: '',
    aboutMe: '',
    profileImg: ''
  });
  // console.log(formState)

  const { firstName, lastName, userName, email, phoneNumber, maxBoulderingGrade, maxTopRopingGrade, password, aboutMe, profileImg } = formState

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      alert(message)
      // toast.error(message)
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
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password === '') {
      return alert('Please add a password')
    }
    if (formState.email === '') {
      return alert('Please add a email')
    }
    if (formState.userName === '') {
      return alert('Please add a username')
    }
    if (formState.firstName === '') {
      return alert('Please add a first name')
    }
    if (formState.lastName === '') {
      return alert('Please add a last name')
    }
    if (formState.maxBoulderingGrade === '') {
      return alert('Please add a max bouldering grade')
    }
    if (formState.maxTopRopingGrade === '') {
      return alert('Please add a max top roping grade')
    }

    if (formState.password !== formState.password2) {
      alert('Passwords do not match')
      // console.log('Passwords do not match')
      // toast.error('Passwords do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        maxBoulderingGrade,
        maxTopRopingGrade,
        password,
        aboutMe,
        profileImg
      }
      // console.log(userData)
      dispatch(register(userData))
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Banner />
      <section className="hold-everything-Signup">
        <section className="signup-holds-form">
          <div className="holds-signup">
            <h1 className="login-form-text" style={{ textAlign: 'center' }}><FaUser />Register:</h1>
            <Form className="actual-signup-form" onSubmit={handleFormSubmit}>
              <div>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="labels" for="firstName">
                        First Name*
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        required
                        value={formState.firstName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  {/* Last Name Input */}
                  <Col md={6}>
                    <FormGroup>
                      <Label className="labels" for="lastName">
                        Last Name*
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                        required
                        value={formState.lastName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Email Input */}
                <Col md={12}>
                  <FormGroup >
                    <Label className="labels" for="exampleuserName">
                      UserName*
                    </Label>
                    <Input
                      id="exampleUserName"
                      name="userName"
                      placeholder="User123"
                      type="text"
                      required
                      value={formState.userName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
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
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                {/* Password Input */}
                <Col md={12}>
                  <FormGroup>
                    <Label className="labels" for="examplePassword">
                      Password*
                    </Label>
                    <Input
                      id="examplePassword"
                      name="password"
                      placeholder="******"
                      type="password"
                      autoComplete="on"
                      required
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="labels" for="examplePassword">
                      Confrim Password*
                    </Label>
                    <Input
                      id="examplePassword2"
                      name="password2"
                      placeholder="******"
                      type="password"
                      autoComplete="on"
                      required
                      value={formState.password2}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                {/* Phone Number Input */}
                <Col md={12}>
                  <FormGroup >
                    <Label className="labels" for="phoneNumber">
                      Phone Number*
                    </Label>
                    <Input
                      id="examplephoneNumber"
                      name="phoneNumber"
                      placeholder="123-456-7890"
                      type="tel"
                      required
                      value={formState.phoneNumber}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                {/* Max Grade Input */}
                <Row className="user-grades-inputs">
                  <Col md={5}>
                    <FormGroup>
                      <Label className="labels" for="maxBoulderingGrade">
                        Max Bouldering Grade:*
                      </Label>
                      <select className="signup-grade-option" id="examplemaxBoulderingGrade" name="maxBoulderingGrade" value={formState.maxBoulderingGrade} onChange={handleChange} required>
                        <option onChange={handleChange} value=""></option>
                        <option onChange={handleChange} value="V0">V0</option>
                        <option onChange={handleChange} value="V1">V1</option>
                        <option onChange={handleChange} value="V2">V2</option>
                        <option onChange={handleChange} value="V3">V3</option>
                        <option onChange={handleChange} value="V4">V4</option>
                        <option onChange={handleChange} value="V5">V5</option>
                        <option onChange={handleChange} value="V6">V6</option>
                        <option onChange={handleChange} value="V7">V7</option>
                        <option onChange={handleChange} value="V8">V8</option>
                        <option onChange={handleChange} value="V9">V9</option>
                        <option onChange={handleChange} value="V10">V10</option>
                        <option onChange={handleChange} value="V11">V11</option>
                        <option onChange={handleChange} value="V12">V12</option>
                        <option onChange={handleChange} value="V13">V13</option>
                        <option onChange={handleChange} value="V14">V14</option>
                        <option onChange={handleChange} value="V15">V15</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Label className="labels" for="maxTopRopingGrade">
                        Max Top Roping Grade:*
                      </Label>
                      <select className="signup-grade-option" id="examplemaxTopRopingGrade" name="maxTopRopingGrade" value={formState.maxTopRopingGrade} onChange={handleChange} required>
                        <option onChange={handleChange} value=""></option>
                        <option onChange={handleChange} value="5.6">5.6</option>
                        <option onChange={handleChange} value="5.7">5.7</option>
                        <option onChange={handleChange} value="5.8">5.8</option>
                        <option onChange={handleChange} value="5.9">5.9</option>
                        <option onChange={handleChange} value="5.10a">5.10a</option>
                        <option onChange={handleChange} value="5.10b">5.10b</option>
                        <option onChange={handleChange} value="5.10c">5.10c</option>
                        <option onChange={handleChange} value="5.10d">5.10d</option>
                        <option onChange={handleChange} value="5.11a">5.11a</option>
                        <option onChange={handleChange} value="5.11b">5.11b</option>
                        <option onChange={handleChange} value="5.11c">5.11c</option>
                        <option onChange={handleChange} value="5.11d">5.11d</option>
                        <option onChange={handleChange} value="5.12a">5.12a</option>
                        <option onChange={handleChange} value="5.12b">5.12b</option>
                        <option onChange={handleChange} value="5.12c">5.12c</option>
                        <option onChange={handleChange} value="5.12d">5.12d</option>
                        <option onChange={handleChange} value="5.13a">5.13a</option>
                        <option onChange={handleChange} value="5.13b">5.13b</option>
                        <option onChange={handleChange} value="5.13c">5.13c</option>
                        <option onChange={handleChange} value="5.13d">5.13d</option>
                        <option onChange={handleChange} value="5.14a">5.14a</option>
                        <option onChange={handleChange} value="5.14b">5.14b</option>
                        <option onChange={handleChange} value="5.14c">5.14c</option>
                        <option onChange={handleChange} value="5.14d">5.14d</option>
                        <option onChange={handleChange} value="5.15a">5.15a</option>
                        <option onChange={handleChange} value="5.15b">5.15b</option>
                        <option onChange={handleChange} value="5.15c">5.15c</option>
                        <option onChange={handleChange} value="5.15d">5.15d</option>
                        <option onChange={handleChange} value="5.16a">5.16a</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                {/* About Me Input */}
                <Col md={12}>
                  <FormGroup>
                    <Label className="labels" for="aboutMe">
                      About Me
                    </Label>
                    <Input
                      id="aboutMe"
                      name="aboutMe"
                      placeholder="Type Here..."
                      type="textarea"
                      value={formState.aboutMe}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="labels" for="profileImg">
                      Profile Image
                    </Label>
                    <Input
                      id="profileImg"
                      name="profileImg"
                      placeholder="Type Here..."
                      type="file"
                      value={formState.profileImg}
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </div>
              <button className="login-button" type="submit">Get Started</button>
            </Form>
            <div className="loginLink">
              <p>Already have an account? <a href={'login'}>Click here!</a></p>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Signup;
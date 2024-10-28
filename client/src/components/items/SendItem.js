import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactModal from 'react-modal';
import { deleteSend } from '../../features/sends/SendsSlice'
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { updateSend } from '../../features/sends/sendsSlice'
// import SendUpdatedForm from '../forms/Send'
import { updateSend } from '../../features/sends/SendsSlice'
import { Label, Input, Row, Col, FormGroup } from 'reactstrap';
import Spinner from '../Spinner'


function SendItem({ sends }) {
    const [modalIsOpen, SetModalIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { isLoading, isError, message } = useSelector(
        (state) => state.sends
    )

    const ifSent = () => {
        if (sends.sent) {
            return ('Climb sent!')
        } else {
            return ('Climb was not sent!')
        }
    }

    const [formState, setFormState] = useState({
        boulderingActualGrade: sends.boulderingActualGrade,
        boulderingOrSportClimbing: sends.boulderingOrSportClimbing,
        boulderingFeltGrade: sends.boulderingFeltGrade,
        sportClimbingActualGrade: sends.sportClimbingActualGrade,
        sportClimbingFeltGrade: sends.sportClimbingFeltGrade,
        notes: sends.notes,
        sent: sends.sent,
        createdAt: sends.createdAt,
        totalAttempts: sends.totalAttempts,
        indoorOutdoor: sends.indoorOutdoor,
        totalSessions: sends.totalSessions,
        videoOrImg: sends.videoOrImg,
        climbingSession: sends.climbingSession,
    });
    const { boulderingOrSportClimbing, boulderingActualGrade, boulderingFeltGrade, sportClimbingActualGrade, sportClimbingFeltGrade, notes, indoorOutdoor, sent, totalAttempts, totalSessions, createdAt,
        videoOrImg, climbingSession } = formState

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const ifBoulderingOrSportClimb = () => {
        if (formState.boulderingOrSportClimbing === 'Bouldering') {
            return (
                <Row className="user-grades-inputs">
                    <Col md={5} className="user-grades-inputs-col">
                        <FormGroup>
                            <Label className="labels user-grades-inputs-col" for="boulderingActualGrade">
                                What was the bouldering grade?*
                            </Label>
                            <select className="signup-grade-option" id="exampleboulderingActualGrade" name="boulderingActualGrade" value={formState.boulderingActualGrade} onChange={handleChange} required>
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
                    <Col md={5} className="user-grades-inputs-col">
                        <FormGroup>
                            <Label className="labels user-grades-inputs-col" for="boulderingFeltGrade">
                                What did the send feel like?*
                            </Label>
                            <select className="signup-grade-option" id="exampleboulderingFeltGrade" name="boulderingFeltGrade" value={formState.boulderingFeltGrade} onChange={handleChange} required>
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
                </Row>
            )
        } else if (formState.boulderingOrSportClimbing === 'Sport Climb') {
            return (
                <Row className="user-grades-inputs">
                    <Col md={5} className="user-grades-inputs-col">
                        <FormGroup>
                            <Label className="labels user-grades-inputs-col" for="sportClimbing">
                                What was the sport climbing grade?*
                            </Label>
                            <select className="signup-grade-option" id="examplesportClimbingActualGrade" name="sportClimbingActualGrade" value={formState.sportClimbingActualGrade} onChange={handleChange} required>
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
                    <Col md={5} className="user-grades-inputs-col">
                        <FormGroup>
                            <Label className="labels user-grades-inputs-col" for="feltGrade">
                                What did the send feel like?*
                            </Label>
                            <select className="signup-grade-option" id="examplesportClimbingFeltGrade" name="sportClimbingFeltGrade" value={formState.sportClimbingFeltGrade} onChange={handleChange} required>
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
            )
        }
    }
    // submit form
    const handleFormSubmit = async (event) => {
        let sendId = sends.id
        // console.log(sendId)
        event.preventDefault();

        if (formState.boulderingActualGrade === '' && formState.sportClimbingActualGrade === '') {
            return alert('Please add an actual grade')
        }
        if (formState.boulderingFeltGrade === '' && formState.sportClimbingFeltGrade === '') {
            return alert('Please add what the grade felt like')
        }
        if (formState.boulderingOrSportClimbing === '') {
            return alert('Please add if it was a bouldering or sport climb')
        }
        if (formState.sent === '') {
            return alert('Please add if it was sent')
        }
        if (formState.indoorOutdoor === '') {
            return alert('Please add if it was an indoor or outdoor climb')
        }
        if (formState.totalAttempts === '' || formState.totalSessions === '') {
            return alert('Please add the total attempts or sessions')
        }

        const userData = {
            boulderingActualGrade, boulderingFeltGrade, sportClimbingActualGrade, sportClimbingFeltGrade, boulderingOrSportClimbing,
            indoorOutdoor,
            createdAt,
            notes,
            sent,
            sendId,
            totalAttempts,
            totalSessions,
            videoOrImg,
            climbingSession
        }
        // console.log('Before dispatch', sends)
        // console.log('Before dispatch', userData)
        dispatch(updateSend(userData))
        setFormState({
            boulderingActualGrade: sends.boulderingActualGrade,
            boulderingOrSportClimbing: sends.boulderingOrSportClimbing,
            boulderingFeltGrade: sends.boulderingFeltGrade,
            sportClimbingActualGrade: sends.sportClimbingActualGrade,
            sportClimbingFeltGrade: sends.sportClimbingFeltGrade,
            notes: sends.notes,
            sent: sends.sent,
            createdAt: sends.createdAt,
            totalAttempts: sends.totalAttempts,
            indoorOutdoor: sends.indoorOutdoor,
            totalSessions: sends.totalSessions,
            videoOrImg: sends.videoOrImg,
            climbingSession: sends.climbingSession,
        })
        window.location.reload();
    };

    useEffect(() => {
        // Check if theres an error from redux
        if (isError) {
            console.log(message)
        }
    }, [isError, message])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <ReactModal
                ariaHideApp={false}
                contentLabel="Selected Option"
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => SetModalIsOpen(false)}
            >
                <section className="modal-header">
                    <div>
                        <h1 className="home-mission-statement-header">Send Update</h1>
                    </div>
                    <div>
                        <button onClick={() => SetModalIsOpen(false)} className="modal-close-button">
                            Close
                        </button>
                    </div>
                </section>
                <section className="modal-body-content">
                    <section className=''>
                        <div className=''>
                            <form onSubmit={handleFormSubmit} className='holds-log-forms'>
                                <Col md={12} className="user-grades-inputs-col">
                                    <FormGroup >
                                        <Label className="labels user-grades-inputs-col" for="examplecreatedAt">
                                            Date:
                                        </Label>
                                        <Input
                                            id="examplecreatedAt"
                                            name="createdAt"
                                            placeholder={formState.createdAt}
                                            type="date"
                                            required
                                            value={formState.createdAt}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label className="labels user-grades-inputs-col" for="indoorOutdoor">
                                                Was it an indoor or outdoor climb?*
                                            </Label>
                                            <div className='div-padding-verysmall'></div>
                                            <div className='form-inputs-center'>
                                                <p>Indoor</p>
                                                <Input
                                                    id="exampleindoorOutdoor"
                                                    name="indoorOutdoor"
                                                    placeholder={formState.indoorOutdoor}
                                                    type="radio"
                                                    onChange={handleChange}
                                                    value={'Indoor'}
                                                    checked={formState.indoorOutdoor === 'Indoor'}
                                                    required
                                                />
                                            </div>
                                            <div className='form-inputs-center'>
                                                <p>Outdoor</p>
                                                <Input
                                                    id="exampleindoorOutdoor"
                                                    name="indoorOutdoor"
                                                    placeholder={formState.indoorOutdoor}
                                                    type="radio"
                                                    onChange={handleChange}
                                                    checked={formState.indoorOutdoor === 'Outdoor'}
                                                    value={'Outdoor'}
                                                    required
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label className="labels user-grades-inputs-col" for="boulderingOrSportClimbing">
                                                Did you sport climb or boulder?*
                                            </Label>
                                            <div className='div-padding-verysmall'></div>
                                            <div className='form-inputs-center'>
                                                <p>Sport Climb</p>
                                                <Input
                                                    id="exampleboulderingOrSportClimbing"
                                                    name="boulderingOrSportClimbing"
                                                    placeholder="Indoor"
                                                    type="radio"
                                                    onChange={handleChange}
                                                    required
                                                    value={'Sport Climb'}
                                                    checked={formState.boulderingOrSportClimbing === 'Sport Climb'}
                                                />
                                            </div>
                                            <div className='form-inputs-center'>
                                                <p>Boulder</p>
                                                <Input
                                                    id="exampleboulderingOrSportClimbing"
                                                    name="boulderingOrSportClimbing"
                                                    placeholder="Indoor"
                                                    type="radio"
                                                    onChange={handleChange}
                                                    required
                                                    value={'Bouldering'}
                                                    checked={formState.boulderingOrSportClimbing === 'Bouldering'}
                                                />
                                            </div>
                                            {/* <div className='form-inputs-center'>
                                        <p>Both</p>
                                        <Input
                                            id="exampleboulderingOrSportClimbing"
                                            name="boulderingOrSportClimbing"
                                            placeholder="Indoor"
                                            type="radio"
                                            onChange={handleChange}
                                            required
                                            value={'Sport Climb and Boulder'}
                                        />
                                    </div> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {ifBoulderingOrSportClimb()}
                                <Col md={12} className="user-grades-inputs-col">
                                    <FormGroup >
                                        <Label className="labels user-grades-inputs-col" for="exampleSent">
                                            Was it sent?*
                                        </Label>
                                        <div className='div-padding-verysmall'></div>
                                        <div className='form-inputs-center'>
                                            <p>Yes</p>
                                            <Input
                                                id="examplesent"
                                                name="sent"
                                                placeholder="True"
                                                type="radio"
                                                required
                                                value={'1'}
                                                onChange={handleChange}
                                                checked={formState.sent === true}
                                            />
                                        </div>
                                        <div className='form-inputs-center'>
                                            <p>No</p>
                                            <Input
                                                id="examplesent"
                                                name="sent"
                                                placeholder="False"
                                                type="radio"
                                                required
                                                value={'0'}
                                                onChange={handleChange}
                                                checked={formState.sent === false}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Row className="user-grades-inputs">
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label className="labels" for="totalAttempts">
                                                How many attempts did it take?*
                                            </Label>
                                            <Input
                                                id="exampletotalAttempts"
                                                name="totalAttempts"
                                                placeholder={formState.totalAttempts}
                                                type="number"
                                                min='1'
                                                onChange={handleChange}
                                                required
                                                value={formState.totalAttempts}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label className="labels" for="totalSessions">
                                                How many sessions did it take?*
                                            </Label>
                                            <Input
                                                id="exampletotalSessions"
                                                name="totalSessions"
                                                placeholder="3"
                                                min='1'
                                                type="number"
                                                onChange={handleChange}
                                                required
                                                value={formState.totalSessions}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col md={12}>
                                    <FormGroup >
                                        <Label className="labels" for="notes">
                                            Notes
                                        </Label>
                                        <Input
                                            id="notes"
                                            name="notes"
                                            placeholder="Notes..."
                                            type="textarea"
                                            value={formState.notes}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label className="labels" for="videoOrImg">
                                            Video or Images
                                        </Label>
                                        <Input
                                            id="videoOrImg"
                                            name="videoOrImg"
                                            // placeholder="Type Here..."
                                            type="file"
                                            value={formState.videoOrImg}
                                            onChange={handleChange}
                                            accept="*"
                                        />
                                    </FormGroup>
                                </Col>
                                <div className='form-center-button'>
                                    <button type="submit" className="login-button" onClick={handleFormSubmit}>Log</button>
                                </div>

                            </form>
                        </div>
                    </section>
                </section>
            </ReactModal>

            <div className='send-item'>
                <div className='send-item-buttons'>
                    <div>
                        <h3>{sends.createdAt}</h3>
                        <p style={{ marginTop: '-.3rem' }}>{sends.indoorOutdoor} {sends.boulderingOrSportClimbing}</p>
                        <p style={{ marginTop: '-1.2rem' }}>{ifSent()}</p>
                    </div>
                    <div className='div-padding-1'></div>

                    <div>
                        <button onClick={() => SetModalIsOpen(true)} className='close'>
                            <GrUpdate />
                        </button>
                        <button onClick={() => dispatch(deleteSend(sends._id))} className='close margin-side'>
                            <AiFillDelete />
                        </button>
                    </div>
                </div>
                <div className='send-item-grades'>
                    <div className='send-item-grades-div'><p>
                        Grade: <b>{sends.boulderingActualGrade}{sends.sportClimbingActualGrade}</b>
                    </p>
                    </div>
                    <div className='div-padding-1'></div>
                    <div className='send-item-grades-div'>
                        <p>
                            It felt like: <b>{sends.boulderingFeltGrade}{sends.sportClimbingFeltGrade}</b>
                        </p>
                    </div>
                </div>
                <div className='send-item-grades'>
                    <div className='send-item-grades-div'><p>
                        Total Attempts: <b>{sends.totalAttempts}</b>
                    </p>
                    </div>
                    <div className='div-padding-1'></div>
                    <div className='send-item-grades-div'>
                        <p>
                            Total Sessions: <b>{sends.totalSessions}</b>
                        </p>
                    </div>
                </div>
                <div className='send-item-grades'>
                    <div className='send-item-grades-div'><p>
                        Notes: <b>{sends.notes}</b>
                    </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendItem

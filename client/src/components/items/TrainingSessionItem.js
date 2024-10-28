import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Spinner from '../Spinner'
import { deleteTrainingSession } from '../../features/trainingSessions/trainingSessionSlice'
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
import ReactModal from 'react-modal';
import { Label, Input, Row, Col, FormGroup } from 'reactstrap';
import { updateTrainingSession } from '../../features/trainingSessions/trainingSessionSlice'

function TrainingSessionItem({ trainingSessions }) {
  const [modalIsOpen, SetModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { isLoading, isError, message } = useSelector(
    (state) => state.trainingSessions
  )
  const liftWeightsFunction = () => {
    if (trainingSessions.liftWeights) {
      return ('Lifted Weights')
    } else {
      return (`Didn't Lifted Weights`)
    }
  }
  const hangBoardFunction = () => {
    if (trainingSessions.hangBoard) {
      return ('HangBoard session')
    } else {
      return (`Didn't hangboard`)
    }
  }
  const kelterBoardFunction = () => {
    if (trainingSessions.kelterBoard) {
      return ('KelterBoard session')
    } else {
      return (`Didn't kelterboard`)
    }
  }
  const moonBoardFunction = () => {
    if (trainingSessions.moonBoard) {
      return ('Moonboard session')
    } else {
      return (`Didn't moonboard`)
    }
  }
  const sprayBoardFunction = () => {
    if (trainingSessions.sprayBoard) {
      return ('Sprayboard session')
    } else {
      return (`Didn't sprayboard`)
    }
  }

  const [formState, setFormState] = useState({
    durationMinutes: trainingSessions.durationMinutes,
    hangBoard: trainingSessions.hangBoard,
    hangBoardNotes: trainingSessions.hangBoardNotes,
    sprayBoard: trainingSessions.sprayBoard,
    moonBoard: trainingSessions.moonBoard,
    kelterBoard: trainingSessions.kelterBoard,
    createdAt: trainingSessions.createdAt,
    trainingBoardNotes: trainingSessions.trainingBoardNotes,
    liftWeights: trainingSessions.liftWeights,
    // weightSets: trainingSessions,
    // weightReps: trainingSessions,
    // weightLBS: trainingSessions,
    rating: trainingSessions.rating,
    trainingNotes: trainingSessions.trainingNotes,
  });
  // console.log(formState)

  const { durationMinutes, createdAt, hangBoard, hangBoardNotes, sprayBoard, moonBoard, kelterBoard, trainingBoardNotes, liftWeights, rating, trainingNotes } = formState

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    let sessionId = trainingSessions.id
    event.preventDefault();

    if (formState.durationMinutes === '') {
      return alert('Please add how long the session was')
    }
    if (formState.hangBoard === '') {
      return alert('Please add if you trained with the hangboard')
    }
    if (formState.sprayBoard === '') {
      return alert('Please add if you trained with the sprayBoard')
    }
    if (formState.moonBoard === '') {
      return alert('Please add if you trained with the moonBoard')
    }
    if (formState.kelterBoard === '') {
      return alert('Please add if you trained with the kelterBoard')
    }
    if (formState.liftWeights === '') {
      return alert('Please add if you lifted weights')
    }
    if (formState.rating === '') {
      return alert('Please add a rating')
    }

    const userData = {
      durationMinutes, sessionId, createdAt, hangBoard, hangBoardNotes, sprayBoard, moonBoard, kelterBoard, trainingBoardNotes, liftWeights, rating, trainingNotes
    }
    // console.log('Before dispatch', userData)
    dispatch(updateTrainingSession(userData))
    setFormState({
      durationMinutes: trainingSessions.durationMinutes,
      hangBoard: trainingSessions.hangBoard,
      hangBoardNotes: trainingSessions.hangBoardNotes,
      sprayBoard: trainingSessions.sprayBoard,
      moonBoard: trainingSessions.moonBoard,
      kelterBoard: trainingSessions.kelterBoard,
      createdAt: trainingSessions.createdAt,
      trainingBoardNotes: trainingSessions.trainingBoardNotes,
      liftWeights: trainingSessions.liftWeights,
      // weightSets: trainingSessions,
      // weightReps: trainingSessions,
      // weightLBS: trainingSessions,
      rating: trainingSessions.rating,
      trainingNotes: trainingSessions.trainingNotes,
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
            <h1 className="home-mission-statement-header">Training Session Update</h1>
          </div>
          <div>
            <button onClick={() => SetModalIsOpen(false)} className="modal-close-button">
              Close
            </button>
          </div>
        </section>
        <section className="modal-body-content">
          <form onSubmit={handleFormSubmit} className=''>
            <Col md={12} className="user-grades-inputs-col">
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="examplecreatedAt">
                  Date:
                </Label>
                <Input
                  id="examplecreatedAt"
                  name="createdAt"
                  placeholder={'hi'}
                  type="date"
                  required
                  value={formState.createdAt}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label className="labels user-grades-inputs-col" for="exampledurationMinutes">
                  How long was the session?*
                </Label>
                <Input
                  id="exampledurationMinutes"
                  name="durationMinutes"
                  placeholder="120 minutes"
                  min='0'
                  type="number"
                  required
                  value={formState.durationMinutes}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="user-grades-inputs-col">
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="examplehangBoard">
                  Did you hangboard?*
                </Label>
                <div className='div-padding-verysmall'></div>
                <div className='form-inputs-center'>
                  <p>Yes</p>
                  <Input
                    id="examplehangBoard"
                    name="hangBoard"
                    placeholder="True"
                    type="radio"
                    required
                    value={'1'}
                    checked={formState.hangBoard === true}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-inputs-center'>
                  <p>No</p>
                  <Input
                    id="examplehangBoard"
                    name="hangBoard"
                    placeholder="False"
                    type="radio"
                    required
                    value={'0'}
                    checked={formState.hangBoard === false}
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="examplehangBoardNotes">
                  Hangboard Notes
                </Label>
                <Input
                  id="examplehangBoardNotes"
                  name="hangBoardNotes"
                  placeholder="Notes..."
                  type="textarea"
                  value={formState.hangBoardNotes}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Row className="user-grades-inputs">
              <Col md={6} className="user-grades-inputs-col">
                <FormGroup >
                  <Label className="labels user-grades-inputs-col" for="examplekelterBoard">
                    Did you kelterboard?*
                  </Label>
                  <div className='div-padding-verysmall'></div>
                  <div className='form-inputs-center'>
                    <p>Yes</p>
                    <Input
                      id="examplekelterBoard"
                      name="kelterBoard"
                      placeholder="True"
                      type="radio"
                      required
                      value={'1'}
                      checked={formState.kelterBoard === true}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-inputs-center'>
                    <p>No</p>
                    <Input
                      id="examplekelterBoard"
                      name="kelterBoard"
                      placeholder="False"
                      type="radio"
                      required
                      value={'0'}
                      checked={formState.kelterBoard === false}
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md={6} className="user-grades-inputs-col">
                <FormGroup >
                  <Label className="labels user-grades-inputs-col" for="examplemoonBoard">
                    Did you moonboard?*
                  </Label>
                  <div className='div-padding-verysmall'></div>
                  <div className='form-inputs-center'>
                    <p>Yes</p>
                    <Input
                      id="examplemoonBoard"
                      name="moonBoard"
                      placeholder="True"
                      type="radio"
                      required
                      value={'1'}
                      checked={formState.moonBoard === true}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-inputs-center'>
                    <p>No</p>
                    <Input
                      id="examplemoonBoard"
                      name="moonBoard"
                      placeholder="False"
                      type="radio"
                      required
                      value={'0'}
                      checked={formState.moonBoard === false}
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Col md={12} className="user-grades-inputs-col">
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="examplesprayBoard">
                  Did you sprayboard?*
                </Label>
                <div className='div-padding-verysmall'></div>
                <div className='form-inputs-center'>
                  <p>Yes</p>
                  <Input
                    id="examplesprayBoard"
                    name="sprayBoard"
                    placeholder="True"
                    type="radio"
                    required
                    value={'1'}
                    checked={formState.sprayBoard === true}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-inputs-center'>
                  <p>No</p>
                  <Input
                    id="examplesprayBoard"
                    name="sprayBoard"
                    placeholder="False"
                    type="radio"
                    required
                    value={'0'}
                    checked={formState.sprayBoard === false}
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="exampletrainingBoardNotes">
                  Trainingboard Notes
                </Label>
                <Input
                  id="exampletrainingBoardNotes"
                  name="trainingBoardNotes"
                  placeholder="Notes..."
                  type="textarea"
                  value={formState.trainingBoardNotes}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="user-grades-inputs-col">
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="exampleliftWeights">
                  Did you lift weights?*
                </Label>
                <div className='div-padding-verysmall'></div>
                <div className='form-inputs-center'>
                  <p>Yes</p>
                  <Input
                    id="exampleliftWeights"
                    name="liftWeights"
                    placeholder="True"
                    type="radio"
                    required
                    value={'1'}
                    checked={formState.liftWeights === true}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-inputs-center'>
                  <p>No</p>
                  <Input
                    id="exampleliftWeights"
                    name="liftWeights"
                    placeholder="False"
                    type="radio"
                    required
                    value={'0'}
                    checked={formState.liftWeights === false}
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label className="labels user-grades-inputs-col" for="rating">
                  Rating 1-10*
                </Label>
                <Input
                  id="examplerating"
                  name="rating"
                  placeholder="3"
                  type="number"
                  min='1'
                  max='10'
                  onChange={handleChange}
                  required
                  value={formState.rating}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup >
                <Label className="labels user-grades-inputs-col" for="exampletrainingNotes">
                  Training Notes
                </Label>
                <Input
                  id="exampletrainingNotes"
                  name="trainingNotes"
                  placeholder="Notes..."
                  type="textarea"
                  value={formState.trainingNotes}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <div className='form-center-button'>
              <button className="login-button" onClick={handleFormSubmit}>Log</button>
            </div>
          </form>
        </section>
      </ReactModal>

      <div className='send-item'>
        <div className='send-item-buttons'>
          <div>
            <h3>{trainingSessions.createdAt}</h3>
            {/* {ifSent()} */}
          </div>
          <div className='div-padding-1'></div>

          <div>
            <button onClick={() => SetModalIsOpen(true)} className='close'>
              <GrUpdate />
            </button>
            <button onClick={() => dispatch(deleteTrainingSession(trainingSessions._id))} className='close margin-side'>
              <AiFillDelete />
            </button>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'><p>
            Session Length: <b>{trainingSessions.durationMinutes}</b> minutes
          </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'>
            {hangBoardFunction()}
          </div>
          <div className='div-padding-1'></div>
          <div className='send-item-grades-div'><p>
            Hangboard Notes: <b>{trainingSessions.hangBoardNotes}</b>
          </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'>
            <p>
              Board Training:</p>
            <ul>
              <li><b>{kelterBoardFunction()}</b></li>
              <li><b>{moonBoardFunction()}</b></li>
              <li><b>{sprayBoardFunction()}</b></li>
            </ul>

          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'>
            <p>
              {liftWeightsFunction()}
            </p>
          </div>
          <div className='div-padding-1'></div>
          <div className='send-item-grades-div'>
            <p>
              Total Sessions: <b>{trainingSessions.rating}</b>
            </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'>
            <p>
              Training Board Notes: <b>{trainingSessions.trainingBoardNotes}</b>
            </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'><p>
            Training Notes: <b>{trainingSessions.trainingNotes}</b>
          </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainingSessionItem
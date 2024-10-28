import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Spinner from '../Spinner'
import { deleteClimbingSession } from '../../features/climbingSessions/climbingSessionSlice'
// import { Link } from 'react-router-dom'
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { updateClimbingSession } from '../../features/climbingSessions/climbingSessionSlice'
import { Label, Input, Row, Col, FormGroup } from 'reactstrap';

function ClimbingSessionItem({ climbingSessions }) {
  const [modalIsOpen, SetModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { isLoading, isError, message } = useSelector(
    (state) => state.climbingSessions
  )
  const [formState, setFormState] = useState({
    boulderingOrSportClimbing: climbingSessions.boulderingOrSportClimbing,
    durationMinutes: climbingSessions.durationMinutes,
    numberOfSends: climbingSessions.numberOfSends,
    indoorOutdoor: climbingSessions.indoorOutdoor,
    createdAt: climbingSessions.createdAt,
    totalAttempts: climbingSessions.totalAttempts,
    climbingNotes: climbingSessions.climbingNotes,
    rating: climbingSessions.rating,
  });

  const { boulderingOrSportClimbing, durationMinutes, createdAt, numberOfSends, indoorOutdoor, climbingNotes, totalAttempts, rating,
    videoOrImg, climbingSession } = formState
  // console.log(formState)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    let sessionId = climbingSessions.id
    event.preventDefault();

    if (formState.boulderingOrSportClimbing === '') {
      return alert('Please add if it was a bouldering or sport climb')
    }
    if (formState.durationMinutes === '') {
      return alert('Please add how long the session was')
    }
    if (formState.indoorOutdoor === '') {
      return alert('Please add if it was an indoor or outdoor climb')
    }
    if (formState.rating === '') {
      return alert('Please add a rating')
    }

    const userData = {
      boulderingOrSportClimbing,
      durationMinutes,
      numberOfSends,
      indoorOutdoor,
      totalAttempts,
      sessionId,
      climbingNotes,
      rating,
      createdAt,
      videoOrImg,
      climbingSession
    }
    // console.log('Before dispatch', userData)
    dispatch(updateClimbingSession(userData))
    setFormState({
      boulderingOrSportClimbing: climbingSessions.boulderingOrSportClimbing,
      durationMinutes: climbingSessions.durationMinutes,
      numberOfSends: climbingSessions.numberOfSends,
      indoorOutdoor: climbingSessions.indoorOutdoor,
      createdAt: climbingSessions.createdAt,
      totalAttempts: climbingSessions.totalAttempts,
      climbingNotes: climbingSessions.climbingNotes,
      rating: climbingSessions.rating,
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
            <Row className="user-grades-inputs">
              <Col md={6}>
                <FormGroup>
                  <Label className="labels" for="totalAttempts">
                    How many total attempts?
                  </Label>
                  <Input
                    id="exampletotalAttempts"
                    name="totalAttempts"
                    placeholder="3"
                    min='0'
                    type="number"
                    onChange={handleChange}
                    required
                    value={formState.totalAttempts}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="labels" for="numberOfSends">
                    How many total sends?
                  </Label>
                  <Input
                    id="examplenumberOfSends"
                    name="numberOfSends"
                    placeholder="3"
                    min='0'
                    type="number"
                    onChange={handleChange}
                    required
                    value={formState.numberOfSends}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Col md={12}>
              <FormGroup>
                <Label className="labels user-grades-inputs-col" for="indoorOutdoor">
                  Indoor or Outdoor*
                </Label>
                <div className='div-padding-verysmall'></div>
                <div className='form-inputs-center'>
                  <p>Indoor</p>
                  <Input
                    id="exampleindoorOutdoor"
                    name="indoorOutdoor"
                    placeholder="Indoor"
                    type="radio"
                    onChange={handleChange}
                    required
                    checked={formState.indoorOutdoor === 'Indoor'}
                    value={'Indoor'}
                  />
                </div>
                <div className='form-inputs-center'>
                  <p>Outdoor</p>
                  <Input
                    id="exampleindoorOutdoor"
                    name="indoorOutdoor"
                    placeholder="Indoor"
                    type="radio"
                    onChange={handleChange}
                    checked={formState.indoorOutdoor === 'Outdoor'}
                    required
                    value={'Outdoor'}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={12}>
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
                <div className='form-inputs-center'>
                  <p>Both</p>
                  <Input
                    id="exampleboulderingOrSportClimbing"
                    name="boulderingOrSportClimbing"
                    placeholder="Indoor"
                    type="radio"
                    onChange={handleChange}
                    required
                    value={'Sport Climb and Boulder'}
                    checked={formState.boulderingOrSportClimbing === 'Sport Climb and Boulder'}
                  />
                </div>
              </FormGroup>
            </Col>
            {/* {ifBoulderingOrSportClimb()} */}
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
                <Label className="labels user-grades-inputs-col" for="exampleclimbingNotes">
                  Climbing Notes
                </Label>
                <Input
                  id="exampleclimbingNotes"
                  name="climbingNotes"
                  placeholder="Notes..."
                  type="textarea"
                  required
                  value={formState.climbingNotes}
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
            <h3>{climbingSessions.createdAt}</h3>
            <p>{climbingSessions.indoorOutdoor} climbing session</p>
            {/* {ifSent()} */}
          </div>
          <div className='div-padding-1'></div>

          <div>
            <button onClick={() => SetModalIsOpen(true)} className='close'>
              <GrUpdate />
            </button>
            <button onClick={() => dispatch(deleteClimbingSession(climbingSessions._id))} className='close margin-side'>
              <AiFillDelete />
            </button>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'><p>
            Session Length: <b>{climbingSessions.durationMinutes}</b> minutes
          </p>
          </div>
          <div className='div-padding-1'></div>
          <div className='send-item-grades-div'>
            <p>
              Total Sends: <b>{climbingSessions.numberOfSends}</b>
            </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'><p>
            Total Attempts: <b>{climbingSessions.totalAttempts}</b>
          </p>
          </div>
          <div className='div-padding-1'></div>
          <div className='send-item-grades-div'>
            <p>
              Rating: <b>{climbingSessions.rating}</b>
            </p>
          </div>
        </div>
        <div className='send-item-grades'>
          <div className='send-item-grades-div'><p>
            Climbing Notes: <b>{climbingSessions.climbingNotes}</b>
          </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClimbingSessionItem
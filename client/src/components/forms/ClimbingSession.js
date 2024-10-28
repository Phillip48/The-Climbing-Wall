import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Spinner from '../Spinner'
import { Label, Input, Row, Col, FormGroup } from 'reactstrap';
import { createClimbingSession } from '../../features/climbingSessions/climbingSessionSlice'

function ClimbingSessionForm() {
    const formatDate = () => {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month > 0 && month < 10) {
            month.toString()
            month = '0' + month
            // console.log('month', month)
            parseInt(month)
            // console.log('month', month)
        }
        let format = year + '-' + month + '-' + day;
        return (format)
    }
    const { isLoading, isError, message } = useSelector(
        (state) => state.climbingSessions
    )
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({
        boulderingOrSportClimbing: '',
        durationMinutes: '',
        numberOfSends: '',
        indoorOutdoor: '',
        createdAt: formatDate(),
        totalAttempts: '',
        climbingNotes: '',
        rating: '',
    });

    const { boulderingOrSportClimbing, durationMinutes, createdAt, numberOfSends, indoorOutdoor, climbingNotes, totalAttempts, rating,
        videoOrImg, climbingSession } = formState

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
            climbingNotes,
            rating,
            createdAt,
            videoOrImg,
            climbingSession
        }
        // console.log('Before dispatch', userData)
        dispatch(createClimbingSession(userData))
        // clear
        setFormState({
            boulderingOrSportClimbing: '',
            durationMinutes: '',
            numberOfSends: '',
            indoorOutdoor: '',
            createdAt: formatDate(),
            totalAttempts: '',
            climbingNotes: '',
            rating: '',
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
            <section className=''>
                <div className=''>
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
                </div>
            </section>
        </>
    )
}

export default ClimbingSessionForm
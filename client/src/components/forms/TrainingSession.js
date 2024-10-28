import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Spinner from '../Spinner'
import { Label, Input, Row, Col, FormGroup } from 'reactstrap';
import { createTrainingSession } from '../../features/trainingSessions/trainingSessionSlice'


function TrainingSessionForm() {
    const { isLoading, isError, message } = useSelector(
        (state) => state.trainingSessions
    )
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
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({
        durationMinutes: '',
        hangBoard: '',
        hangBoardNotes: '',
        sprayBoard: '',
        moonBoard: '',
        kelterBoard: '',
        createdAt: formatDate(),
        trainingBoardNotes: '',
        liftWeights: '',
        // weightSets: '',
        // weightReps: '',
        // weightLBS: '',
        rating: '',
        trainingNotes: '',
    });
    console.log(formState)

    const { durationMinutes, createdAt, hangBoard, hangBoardNotes, sprayBoard, moonBoard, kelterBoard, trainingBoardNotes, liftWeights, rating, trainingNotes } = formState
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
            durationMinutes, createdAt, hangBoard, hangBoardNotes, sprayBoard, moonBoard, kelterBoard, trainingBoardNotes, liftWeights, rating, trainingNotes
        }
        // console.log('Before dispatch', userData)
        dispatch(createTrainingSession(userData))
        setFormState({
            durationMinutes: '',
            hangBoard: '',
            hangBoardNotes: '',
            sprayBoard: '',
            moonBoard: '',
            kelterBoard: '',
            createdAt: formatDate(),
            trainingBoardNotes: '',
            liftWeights: '',
            // weightSets: '',
            // weightReps: '',
            // weightLBS: '',
            rating: '',
            trainingNotes: '',
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
                                    min='1'
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
                                        onChange={handleChange}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup >
                                <Label className="labels user-grades-inputs-col" for="exampletrainingBoardNotes">
                                    Trainingboard Notes*
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
                </div>
            </section>
        </>
    )
}

export default TrainingSessionForm
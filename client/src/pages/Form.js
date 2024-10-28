import React, {useState} from "react";
import SendForm from '../components/forms/Send'
import ProjectForm from '../components/forms/Project'
import ClimbingSessionForm from '../components/forms/ClimbingSession'
import TrainingSessionForm from '../components/forms/TrainingSession'

const Formpage = () => {
    const [active, setActive] = useState("LogSend");

    const isActive = () => {
        if (active === "LogSend"){
            return (< SendForm />)
        } else if (active === "LogClimbingSession") {
            return (< ClimbingSessionForm />)
        } else if (active === "LogTrainingSession") {
            return (< TrainingSessionForm />)
        } else if (active === "LogProject") {
            return (< ProjectForm />)
        }
    }
    const isActiveTitle = () => {
        if (active === "LogSend") {
            return ("Log a Send")
        } else if (active === "LogClimbingSession") {
            return ("Log a Climbing Session")
        } else if (active === "LogTrainingSession") {
            return ("Log a Training Session")
        } else if (active === "LogProject") {
            return ("Log a Project")
        }
    }
    return (
        <>
            <section className="form-holds-all">
                <h1>Start Logging</h1>
                <section className='dash-form-buttons'>
                    <div className='holds-different-form-buttons'>
                        <button onClick={() => setActive("LogClimbingSession")} className='different-form-buttons'>Climbing Sessions</button>
                        <button onClick={() => setActive("LogSend")} className='different-form-buttons'>Sends</button>
                    </div>
                    <div className='holds-different-form-buttons'>
                        <button onClick={() => setActive("LogTrainingSession")} className='different-form-buttons'>Training Sessions</button>
                        <button onClick={() => setActive("LogProject")} className='different-form-buttons'>Projects</button>
                    </div>
                    {/* <button onClick={() => setActive("LogClimbingSession")} className='different-form-buttons'>Log Climbing Session</button>
                    <div className='div-padding-1'></div>
                    <button onClick={() => setActive("LogSend")} className='different-form-buttons'>Log Send</button>
                    <div className='div-padding-1'></div>
                    <button onClick={() => setActive("LogTrainingSession")} className='different-form-buttons'>Log Trainging Session</button>
                    <div className='div-padding-1'></div>
                    <button onClick={() => setActive("LogProject")} className='different-form-buttons'>Log Project</button> */}
                </section>

                <section className="forms-rendered-user-selection">
                    <h1 style={{textAlign: 'center'}}>{isActiveTitle()}</h1>
                    {isActive()}
                </section>

            </section>
        </>
    );
};

export default Formpage;
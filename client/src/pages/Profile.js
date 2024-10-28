import React from "react";
// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import tempPic from '../../assets/other/blank-profile-picture-973460__340.webp';
// import LoggedInBanner from '../components/loggedinBanner/index';

const Profile = () => {


    return (
        <>
            <section className="holds-user-profile">
                <div className="user-username">
                    {/* <img className="profile-pic" src={tempPic} alt='profile'></img> */}
                    <div className="div-padding-1"></div>
                    <div className="user-info">
                        <h1 className="username-h1">UserName</h1>
                        <p className="user-bio-p">User Info...</p>
                    </div>

                </div>

                <div className="user-stats">
                    <div className="user-stats-sends user-stats-3parts">
                        <h3>Total sends:</h3>
                        <span>0</span>
                    </div>

                    <div className="user-stats-grade user-stats-3parts">
                        <h3>Top Grade:</h3>
                        <span>V0</span>
                    </div>

                    <div className="user-stats-sessions user-stats-3parts">
                        <h3>Total sessions:</h3>
                        <span>0</span>
                    </div>
                </div>

                <div className="user-previous-sessions-and-sends">
                    <div className="user-previous-sends">
                        <h3>Previous Sends</h3>
                        <div className="previous-sends">
                            {/* <p>No sends have been logged</p> */}
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Card title
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Card subtitle
                                    </CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="user-previous-sessions">
                        <h3>Previous Sessions</h3>
                        <div className="previous-sessions">
                            {/* <p>No sends have been logged</p> */}
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Card title
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Card subtitle
                                    </CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;
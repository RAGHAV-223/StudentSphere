// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css"


const Home = () => {
    return (
        <div className='body'>
            <section className="hero min-h-screen">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="detail_box">
                                <h1>
                                    Connect, Collaborate, Learn: StudentSphere Empowers You
                                </h1>
                                <p>
                                    Empowering College Students: Discover a Collaborative Platform for Mentorship, Communication and Study Collaboration
                                </p>
                                <Link to="/login">Join Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 offset-lg-1">
                            <div className="img_container">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <div className="img-box">
                                                <img src="/slider-img.jpg"  alt="Slide 1" />
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <div className="img-box">
                                                <img src="/slider-img_1.jpg"  alt="Slide 2" />
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <div className="img-box">
                                                <img src="/slider-img_2.jpg"  alt="Slide 3" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </section>

            {/* Servive section */}
            <section className="service_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>Our Services</h2>
                    </div>

                    <div className="service_container">
                        <div className="box">
                            <div className="img-box">
                                <img src="/s1.png" className="img1" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Discussion Forums</h5>
                                <p>Join the conversation, share your voice on forums</p>
                            </div>
                        </div>
                        <div className="box active">
                            <div className="img-box">
                                <img src="/s2.png" className="img1" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Project Space</h5>
                                <p>Build new things by Collaborating with like-minded peers.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="img-box">
                                <img src="/s3.png" className="img1" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Focused Classroom</h5>
                                <p>Learn and share knowledge in a peaceful space.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="img-box">
                                <img src="/s4.png" className="img1" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Stories</h5>
                                <p>Find the latest stories from your peers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            {/*About section */}
            <section className="about_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>About Us</h2>
                                </div>
                                <p>Nothing yet to add here</p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="img_container">
                                <div className="img-box b1">
                                    <img src="/about-img1.jpg" alt="" />
                                </div>
                                <div className="img-box b2">
                                    <img src="/about-img2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="info_section layout_padding">
                <div className="container">
                    <div className="info_contact">
                        <div className="row">
                            <div className="col-md-4">
                                <a href="#">
                                    <img src="/location-white.png" alt="" />
                                    <span>MIET Jammu</span>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <img src="/telephone-white.png" alt="" />
                                    <span>Call : +012334567890</span>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <img src="/envelope-white.png" alt="" />
                                    <span>demo@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lg-9">
                            <div className="info_form">
                                <form action="">
                                    <input type="text" placeholder="Enter your email" />
                                    <button>subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <div className="info_social">
                                <div>
                                    <a href="#">
                                        <img src="/fb.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="/twitter.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="/linkedin.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="/instagram.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;

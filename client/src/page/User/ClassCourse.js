import React from 'react';

const ClassCourse = () => {
    return (
        <>
            <div className="site-wrap">
                <div className="site-mobile-menu site-navbar-target">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle" />
                        </div>
                    </div>
                    <div className="site-mobile-menu-body" />
                </div>
                <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div className="site-logo">
                                <a href="index.html" className="d-block">
                                    <img src="images/logo.jpg" alt="Image" className="img-fluid" />
                                </a>
                            </div>
                            <div className="mr-auto">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                        <li>
                                            <a href="index.html" className="nav-link text-left">Home</a>
                                        </li>
                                        <li className="has-children">
                                            <a href="about.html" className="nav-link text-left">About Us</a>
                                            <ul className="dropdown">
                                                <li><a href="teachers.html">Our Teachers</a></li>
                                                <li><a href="about.html">Our School</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="admissions.html" className="nav-link text-left">Admissions</a>
                                        </li>
                                        <li className="active">
                                            <a href="courses.html" className="nav-link text-left">Courses</a>
                                        </li>
                                        <li>
                                            <a href="contact.html" className="nav-link text-left">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="ml-auto">
                                <div className="social-wrap">
                                    <button className="btn btn-sucsess" href="login.html" ><span className="icon-unlock-alt" /> Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="site-section ftco-subscribe-1 site-blocks-cover pb-4" style={{ backgroundImage: 'url("images/bg_1.jpg")' }}>
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-lg-7">
                                <h2 className="mb-0">Class</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-breadcrumns border-bottom">
                    <div className="container">
                        <a href="index.html">Home</a>
                        <span className="mx-3 icon-keyboard_arrow_right" />
                        <span className="current">Courses</span>
                    </div>
                </div>
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_1.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Mobile Application</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_2.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Web Application</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_3.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Database</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_4.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Clound computing</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_5.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Design Interface</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="course-1-item">
                                    <figure className="thumnail">
                                        <a href="course-single.html"><img src="images/course_6.jpg" alt="Image" className="img-fluid" /></a>
                                        {/* <div className="price">$99.00</div> */}
                                        <div className="category"><h3>Bussiness Analyzie</h3></div>
                                    </figure>
                                    <div className="course-1-content pb-4">
                                        <h2>How To Create Mobile Apps Using Ionic</h2>
                                        <div className="rating text-center mb-3">
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                            <span className="icon-star2 text-warning" />
                                        </div>
                                        <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                                        <p><a href="course-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer" style={{ padding: 0 }}>
                    <div className="container">

                        <div className="row">
                            <div className="col-12">
                                <div className="copyright" style={{ paddingTop: 30 }}>
                                    <p>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ClassCourse;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeAcademy = () => {
    const [check, setCheck] = useState(true)
    useEffect(() => {
        if(true){
            // window.location.reload()
            return setCheck(false)
        }
    }, []);
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
                                    <img src="./images/logo.jpg" alt="logo" className="img-fluid" />
                                </a>
                            </div>
                            <div className="mr-auto">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                        <li className="active">
                                            <Link to="/" className="nav-link text-left">Home</Link>
                                        </li>
                                        <li className="has-children">
                                            <span href="about.html" className="nav-link text-left">About academy</span>
                                            <ul className="dropdown">
                                                <li><Link to="/teacherClass">Teachers class</Link></li>
                                                <Link to="/classCourses" className="nav-link text-left">Class courses</Link>
                                            </ul>
                                        </li>
                                        {/* <li>
                                            <Link to="/admin" className="nav-link text-left">Admin</Link>
                                        </li> */}
                                        <li>
                                            <Link to="/joinClass" className="nav-link text-left">Join class</Link>
                                        </li>
                                        <li>
                                            <Link to="/about" className="nav-link text-left">About</Link>
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
                <div className="hero-slide owl-carousel site-blocks-cover">
                    <div className="intro-section" style={{ backgroundImage: 'url("./images/hero_1.jpg")' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-12 mx-auto text-center" data-aos="fade-up">
                                    <h1>Academics University</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-section" style={{ backgroundImage: 'url("./images/hero_1.jpg")' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-12 mx-auto text-center" data-aos="fade-up">
                                    <h1>You Can Learn Anything</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div />
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center text-center">
                            <div className="col-lg-4 mb-5">
                                <h2 className="section-title-underline mb-5">
                                    <span>Why Academics Works</span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div className="feature-1 border">
                                    <div className="icon-wrapper bg-primary">
                                        <span className="flaticon-mortarboard text-white" />
                                    </div>
                                    <div className="feature-1-content">
                                        <h2>Personalize Learning</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit</p>
                                        <p><a href="#" className="btn btn-primary px-4 rounded-0">Learn More</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div className="feature-1 border">
                                    <div className="icon-wrapper bg-primary">
                                        <span className="flaticon-school-material text-white" />
                                    </div>
                                    <div className="feature-1-content">
                                        <h2>Trusted Courses</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit</p>
                                        <p><a href="#" className="btn btn-primary px-4 rounded-0">Learn More</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div className="feature-1 border">
                                    <div className="icon-wrapper bg-primary">
                                        <span className="flaticon-library text-white" />
                                    </div>
                                    <div className="feature-1-content">
                                        <h2>Tools for Students</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit</p>
                                        <p><a href="#" className="btn btn-primary px-4 rounded-0">Learn More</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center text-center">
                            <div className="col-lg-6 mb-5">
                                <h2 className="section-title-underline mb-3">
                                    <span>Popular Courses</span>
                                </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, id?</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="owl-slide-3 owl-carousel">
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_1.jpg" alt="ima" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
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
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_2.jpg" alt="a" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
                                            <div className="category"><h3>Web Design</h3></div>
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
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_3.jpg" alt="sa" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
                                            <div className="category"><h3>Arithmetic</h3></div>
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
                                            <p><a href="courses-single.html" className="btn btn-primary rounded-0 px-4">Enroll In This Course</a></p>
                                        </div>
                                    </div>
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_4.jpg" alt="Image4" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
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
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_5.jpg" alt="Image5" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
                                            <div className="category"><h3>Web Design</h3></div>
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
                                    <div className="course-1-item">
                                        <figure className="thumnail">
                                            <a href="course-single.html"><img src="./images/course_6.jpg" alt="Image6" className="img-fluid" /></a>
                                            <div className="price">$99.00</div>
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
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="section-bg style-1" style={{ backgroundImage: 'url("images/hero_1.jpg")' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                                <span className="icon flaticon-mortarboard" />
                                <h3>Our Philosphy</h3>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea? Dolore, amet reprehenderit.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                                <span className="icon flaticon-school-material" />
                                <h3>Academics Principle</h3>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea?
                                    Dolore, amet reprehenderit.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                                <span className="icon flaticon-library" />
                                <h3>Key of Success</h3>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea?
                                    Dolore, amet reprehenderit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="news-updates">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="section-heading">
                                    <h2 className="text-black">News &amp; Updates</h2>
                                    <a href="#">Read All News</a>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="post-entry-big">
                                            <a href="news-single.html" className="img-link"><img src="./images/blog_large_1.jpg" alt="blog1" className="img-fluid" /></a>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <a href="#">June 6, 2019</a>
                                                    <span className="mx-1">/</span>
                                                    <a href="#">Admission</a>, <a href="#">Updates</a>
                                                </div>
                                                <h3 className="post-heading"><a href="news-single.html">Campus Camping and Learning Session</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="post-entry-big horizontal d-flex mb-4">
                                            <a href="news-single.html" className="img-link mr-4"><img src="./images/blog_1.jpg" alt="blog2" className="img-fluid" /></a>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <a href="#">June 6, 2019</a>
                                                    <span className="mx-1">/</span>
                                                    <a href="#">Admission</a>, <a href="#">Updates</a>
                                                </div>
                                                <h3 className="post-heading"><a href="news-single.html">Campus Camping and Learning Session</a></h3>
                                            </div>
                                        </div>
                                        <div className="post-entry-big horizontal d-flex mb-4">
                                            <a href="news-single.html" className="img-link mr-4"><img src="./images/blog_2.jpg" alt="blog3" className="img-fluid" /></a>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <a href="#">June 6, 2019</a>
                                                    <span className="mx-1">/</span>
                                                    <a href="#">Admission</a>, <a href="#">Updates</a>
                                                </div>
                                                <h3 className="post-heading"><a href="news-single.html">Campus Camping and Learning Session</a></h3>
                                            </div>
                                        </div>
                                        <div className="post-entry-big horizontal d-flex mb-4">
                                            <a href="news-single.html" className="img-link mr-4"><img src="./images/blog_1.jpg" alt="blog4" className="img-fluid" /></a>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <a href="#">June 6, 2019</a>
                                                    <span className="mx-1">/</span>
                                                    <a href="#">Admission</a>, <a href="#">Updates</a>
                                                </div>
                                                <h3 className="post-heading"><a href="news-single.html">Campus Camping and Learning Session</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="section-heading">
                                    <h2 className="text-black">Campus Videos</h2>
                                    <a href="#">View All Videos</a>
                                </div>
                                <a href="https://vimeo.com/45830194" className="video-1 mb-4" data-fancybox data-ratio={2}>
                                    <span className="play">
                                        <span className="icon-play" />
                                    </span>
                                    <img src="./images/course_5.jpg" alt="course5" className="img-fluid" />
                                </a>
                                <a href="https://vimeo.com/45830194" className="video-1 mb-4" data-fancybox data-ratio={2}>
                                    <span className="play">
                                        <span className="icon-play" />
                                    </span>
                                    <img src="./images/course_5.jpg" alt="course6" className="img-fluid" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="site-section ftco-subscribe-1" style={{ backgroundImage: 'url("images/bg_1.jpg")' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <h2>Subscribe to us!</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,</p>
                            </div>
                            <div className="col-lg-5">
                                <form action className="d-flex">
                                    <input type="text" className="rounded form-control mr-2 py-3" placeholder="Enter your email" />
                                    <button className="btn btn-primary rounded py-3 px-4" type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="footer" style={{padding: 0}}>
                    <div className="container">
                
                        <div className="row">
                            <div className="col-12">
                                <div className="copyright" style={{paddingTop: 30}}>
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

export default HomeAcademy;

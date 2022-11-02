import React from 'react';
import classNames from 'classnames/bind';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

const Login = () => {
    return (
        <section className={cx('ftco-section')}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        {/* <h2 className={cx('heading-section')}>Login </h2> */}
                        <img style={{width: 300, height: 200}} src="https://www.phoenixclassroom.com/logo-icon.png" alt="logo" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className={`${cx('text-wrap' , 'order-md-last')} p-4 p-lg-5 text-center d-flex align-items-center`}>
                                <div className={`${cx('text', 'w-100')} w-100`}>
                                    <h2>Welcome to login</h2>
                                    <p>Don't have an account?</p>
                                    {/* <a href="#" className="btn btn-white btn-outline-white">Sign Up</a> */}
                                </div>
                            </div>
                            <div className={`${cx('login-wrap')} p-4 p-lg-5`}>
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className={`${cx('mb-4')}`}>Sign In</h3>
                                    </div>
                                    <div className={`${cx('w-100')} w-100`}>
                                        {/* <p className="social-media d-flex justify-content-end">
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook" /></a>
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter" /></a>
                                        </p> */}
                                    </div>
                                </div>
                                <form action="#" className={cx('signin-form')}>
                                    <div className={`${cx('form-group')} mb-3`}>
                                        <label className={cx('label')} htmlFor="name">Username</label>
                                        <input type="text" className={cx('form-control')} placeholder="Username" required />
                                    </div>
                                    <div className={`${cx('form-group')} mb-3`}>
                                        <label className={cx('label')} htmlFor="password">Password</label>
                                        <input type="password" className={`${cx('form-control')} form-control`} placeholder="Password" required />
                                    </div>
                                    <div className={`${cx('form-group')} form-group`}>
                                        <button type="submit" className={`${cx('form-control', 'submit')}form-control submit btn btn-primary  px-3`}><a href='/home'>Sign In</a></button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                            {/* <label className={`${cx('checkbox-wrap' , 'checkbox-primary')} checkbox-wrap checkbox-primary mb-0`}>Remember Me
                                                <input type="checkbox" defaultChecked />
                                                <span className={cx('checkmark')} />
                                            </label> */}
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Login;

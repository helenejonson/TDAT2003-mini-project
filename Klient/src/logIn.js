// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

class User{
    username: string;
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}

export class logIn extends Component{
    render(){
        return(
            <div>
                <div className='login'>
                    <a href="http://localhost:3000/?#/Register" className="button">Register?</a>
                    <form>
                        {/*====== title ======*/}
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="Username" className="col-sm-1 col-form-label col-form-label-lg">Username</label>
                                <div className="col-sm-8">
                                    <input id="username" className="form-control form-control-lg" type="text" placeholder="Username" aria-describedby="titleHelp"/>
                                    <small id="userHelp" className="form-text text-muted">Insert Username</small>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="Password" className="col-sm-1 col-form-label col-form-label-lg">Password</label>
                                <div className="col-sm-8">
                                    <input id="password" className="form-control form-control-lg" type="password" placeholder="Password" aria-describedby="titleHelp"/>
                                    <small id="passwordHelp" className="form-text text-muted">Insert password</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </form>
                </div>
            </div>
        )
    }
}

export class Register extends Component{
    render(){
        return(
            <div>
                <div className='Register'>
                    <a href="http://localhost:3000/?#/LogIn" className="button">LogIn?</a>

                    <form>
                        {/*====== title ======*/}
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="Username" className="col-sm-1 col-form-label col-form-label-lg">Username</label>
                                <div className="col-sm-8">
                                    <input id="username" className="form-control form-control-lg" type="text" placeholder="Username" aria-describedby="titleHelp"/>
                                    <small id="userHelp" className="form-text text-muted">Insert Username</small>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="Password" className="col-sm-1 col-form-label col-form-label-lg">New Password</label>
                                <div className="col-sm-8">
                                    <input id="password" className="form-control form-control-lg" type="password" placeholder="New Password" aria-describedby="titleHelp"/>
                                    <small id="passwordHelp" className="form-text text-muted">Insert password</small>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="Password" className="col-sm-1 col-form-label col-form-label-lg">New Password</label>
                                <div className="col-sm-8">
                                    <input id="passwordNew" className="form-control form-control-lg" type="password" placeholder="New Password" aria-describedby="titleHelp"/>
                                    <small id="passwordNewHelp" className="form-text text-muted">Insert password again</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Register and Log in</button>
                    </form>
                </div>
            </div>
        )
    }
}
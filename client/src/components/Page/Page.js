import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header'
import MainTable from '../MainTable/MainTable'
import logo from '../../assets/logo.png';
import {links, login} from '../MockData';

import './Page.css';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin : false,
            isLogIn : false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
    }

    handleLogin() {
        this.setState({
            isLogIn : !this.state.isLogIn
        })
    }

    handleAdmin() {
        this.setState({
            isAdmin : !this.state.isAdmin
        });
    }

    render() {
    
        return (
            <div className="Page">
                {this.state.isLogIn && <LogInPage 
                                        handleLogin={this.handleLogin} 
                                        handleAdmin={this.handleAdmin}/>}
                <Header 
                        add={this.toggleInput} 
                        refresh={this.getData} 
                        isAdmin={this.state.isAdmin} 
                        handleLogin={this.handleLogin}/>
                <Sidebar 
                        logo={logo} 
                        links={links} />
                <MainTable />
            </div>
        );
    }
}

class LogInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            error : ""
        }
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name] : value
        });
    }

    validate() {
        if (this.state.username === login.username && this.state.password === login.password) {
             this.props.handleAdmin();
             this.props.handleLogin();
        } else {
            this.setState({
                error : "There is an error with your username or password"
            });
        }
    }

    render() {
        return (
            <div className="Login-page">
                <div className="Login-box">
                    <p className="close" onClick={this.props.handleLogin}>x</p>
                    <label className="InputLabel">{this.props.text}</label>
                    <input
                        className="Username RoundBox"
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <p className="error">{this.state.error}</p>
                    <button
                        className="SubmitButton RoundBox"
                        type="submit"
                        value="submit"
                        onClick={this.validate}>
                    Submit
                    </button> 
                </div>
            </div>    
        )
    }
}

export default Page;

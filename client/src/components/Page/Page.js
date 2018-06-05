import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header'
import MainTable from '../MainTable/MainTable'
import logo from '../../assets/logo.png';
import {links} from '../MockData';

import './Page.css';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin : false,
            isLogIn : false
        };
    }

    render() {
        const logIn = this.state.isLogIn ? (
            <LogInPage/>
        ) : (
            null
        );

        return (
            <div className="Page">
                {logIn}
                <Header add={this.toggleInput} refresh={this.getData} isAdmin={this.state.isAdmin} handleLogin={this.handleLogin}/>
                <Sidebar logo={logo} links={links} />
                <MainTable />
            </div>
        );
    }
}

class LogInPage extends Component {

}

export default Page;

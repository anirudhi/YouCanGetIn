import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header'
import MainTable from '../MainTable/MainTable'
import logo from '../../assets/logo.png';
import './Page.css';

var links = [
    {
        title: 'About Us',
        href: '/about'
    },
    {
        title: 'Universities',
        href: '/universities'
    }
];

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin : true,
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
                <Header add={this.toggleInput} refresh={this.getData} isAdmin={this.state.isAdmin}/>
                <Sidebar logo={logo} links={links} />
                <MainTable />
            </div>
        );
    }
}

class LogInPage extends Component {

}

export default Page;

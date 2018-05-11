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
    render() {
        return (
            <div className="Page">
                <Header add={this.toggleInput} refresh={this.getData} />
                <Sidebar logo={logo} links={links} />
                <MainTable />
            </div>
        );
    }
}

export default Page;

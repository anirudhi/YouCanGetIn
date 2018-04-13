import React, { Component } from 'react';
import logo from './assets/logo.png';
import './Page.css';

var links = {
  link1 : {
    title : 'About Us',
    href : '/about'
  },
  link2 : {
    title : 'Universities',
    href : '/href'
  }
};

class Page extends Component {
  render() {
    return (
      <div className="Page">
        <header className="Page-header">
          <img src={logo} className="Page-logo" alt="logo" />
          <h1 className="Page-title">You Can Get In</h1>
        </header>
        <Sidebar/>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div className="Page-sidebar">
        <Imagebar img={this.props.logo} />
        {/* Fetch sidebar links  */}
        <ul>
          {/* {links.forEach((val) => {
            return <li key={index}><a href={val.href}>{val.title}</a></li>;
          })} */}
        </ul>
      </div>  
    );
  }
}

class Imagebar extends Component {
  render() {
    return (
      <div>
        <img src={this.props} alt="logo"/>
      </div>
    )
  }
}

export default Page;

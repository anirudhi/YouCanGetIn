import React, { Component } from 'react';
import logo from './assets/logo.png';
import './Page.css';

var links = [
  {
    title : 'About Us',
    href : '/about'
  },
  {
    title : 'Universities',
    href : '/universities'
  }
];

class Page extends Component {
  render() {
    return (
      <div className="Page">
        <header className="Page-header">
          <img src={logo} className="Page-logo" alt="logo" />
          <h1 className="Page-title">You Can Get In</h1>
        </header>
        <Sidebar logo={logo} links={links}/>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    const listItems = this.props.links.map((link) => 
      <li key={link.title.toLowerCase().replace(" ", "-")}>
        <a href={link.href}>{link.title}</a>
      </li> 
    );
    return (
      <div className="Page-sidebar">
        <Imagebar img={this.props.logo} />
        <ul>
          {listItems}
        </ul>
      </div>  
    );
  }
}

class Imagebar extends Component {
  render() {
    return (
      <div>
        <img src={this.props.img} alt="logo"/>
      </div>
    )
  }
}

export default Page;

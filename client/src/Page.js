import React, { Component } from 'react';
import logo from './logo.svg';
import './Page.css';

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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Imagebar img={this.props.logo} />
        {/* Fetch sidebar links  */}
        <ul>
          {this.props.links.map((val, index) => {
            return <li key={index}>{val}</li>;
          })}
        </ul>
      </div>  
    );
  }
}

class Imagebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={this.props.link} alt={this.props.alt}/>
      </div>
    )
  }
}

export default Page;

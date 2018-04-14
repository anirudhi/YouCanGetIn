import React, { Component } from 'react';
import logo from './assets/logo.png';
import searchIcon from './assets/logo.png';
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
        <Sidebar logo={logo} links={links}/>
        <MainTable/>
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
        <ul className="Sidebar-links">
          {listItems}
        </ul>
      </div>  
    );
  }
}

class Imagebar extends Component {
  render() {
    return (
      <div className="Imagebar-box">
        <img src={this.props.img} alt="logo"/>
      </div>
    )
  }
}

class Searchbar extends Component {
  render() {
    return (
      <div>
        <img src='' alt='search'/>
         {this.props.text}
      </div>
    )    
  }
}

class MainTable extends Component {
  render() {
    return (
      <div className="Table-container">
        <TableHead/>
        <TableBody data={universities} />
      </div>
    )
  }
}

class TableHead extends Component {
  render() {
    return (
      <div>
        <AddButton/>
        <Searchbar/>
      </div>
    )
  }
} 

class TableBody extends Component {
  render() {
    return (
      <table>
        <th>University</th>
        <th>Location</th>
        
      </table>
    )
  }
}

export default Page;

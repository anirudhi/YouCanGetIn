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

var universities = [
  {
    name : "University of Waterloo",
    location : "Waterloo, ON",
    system : [
      {
        name : "International Baccalaureate",
        grade : 38
      },
      {
        name : "A Levels",
        grade : "A"
      },
      {
        name : "ICSE",
        grade : "95%"
      },
      {
        name : "CBSE",
        grade : "97%"
      },
      {
        name : "Canadian System",
        grade : "90%"
      }
    ]
  },
  {
    name : "Harvard",
    location : "Cambridge, MA",
    grade : 44,
  },
  {
    name : "Yale",
    location : "New Haven, CT",
    grade : 45,
  },
  {
    name : "University of Toronto",
    location : "Toronto, ON",
    grade : 36,
  },
  {
    name : "University of California Los Angeles",
    location : "Los Angeles, CA",
    grade : 37,
  }
];

var systems = [
  {
    name : "International Baccalaureate"
  },
  {
    name : "A Levels"
  },
  {
    name : "ICSE"
  },
  {
    name : "CBSE"
  }
];

class Page extends Component {
  render() {
    return (
      <div className="Page">
        <Sidebar logo={logo} links={links}/>
        <TableHead/>
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
      <label className="Searchbar">
        <i className="fa fa-search"></i>
        {this.props.text}
        <input type="text" placeholder="Search"/>
      </label>
    )    
  }
}

class MainTable extends Component {
  render() {
    return (
      <div className="Table-container">
        <TableBody universities={universities} systems={systems}/>
      </div>
    )
  }
}

class TableHead extends Component {
  render() {
    return (
      <div className="Table-head">
        <AddButton/>
        <Searchbar/>
      </div>
    )
  }
} 

class TableBody extends Component {
  render() {
    const UniList = this.props.universities.map((uni) => {
      return ( 
        <tr key={uni.name.toLowerCase().replace(" ", "-")}>
          <td>{uni.name}</td>
          <td>{uni.location}</td>
          <td>{uni.grade}</td>
          <td><ProgramDropdown systems={this.props.systems}/></td>
        </tr>
      )
    });

    return (
      <table className="Table-body">
        <thead>
          <tr>
            <th>University</th>
            <th>Location</th>
            <th>Average Grade</th>
            <th>School System</th>
          </tr>
        </thead>
        <tbody>
          {UniList}
        </tbody>
      </table>
    )
  }
}

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.addUniversity = this.handleClick.bind(this);
  }
  function addUniversity() {
    console.log("Plus clicked");
  }
  render() {
    return (
      <div className="AddButton" onClick={addUniversity}>
        <i className="fa fa-plus"></i>
      </div>  
    )
  }
}

class ProgramDropdown extends Component {
  render() {
    const systemList = this.props.systems.map((system) => {
      return (
        <option key={system.name.toLowerCase()} value={system.name.toLowerCase()}>{system.name}</option>
      )
    });
    return (
      <select>
        {systemList}
      </select>
    )
  }
}

export default Page;

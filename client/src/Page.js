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
        <div className="Imagebar-box">
          <img src={this.props.logo} alt="logo"/>
        </div>
        <ul className="Sidebar-links">
          {listItems}
        </ul>
      </div>  
    );
  }
}


class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universities : []
    };
  }
  
  componentDidMount() {
    fetch('https://localhost:9000/')
    .then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({
        universities : json 
      });
      }).catch((ex) => {
        console.log("Parsing Failed", ex);
      })  
    }
    
  render() {
    const UniList = this.state.universities.map((uni) => {
      var curSystem = this.state.system;
      return (
        <tr key={uni.name.toLowerCase().replace(" ", "-")}>
          <td>{uni.name}</td>
          <td>{uni.location}</td>
          <td>{uni.curSystem}</td>
          <td><ProgramDropdown systems={uni.systems}/></td>
        </tr>
      )
    });
    
    return (
      <div className="Table-container">
        <TableHead />  
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
      </div>  
    )
  }
}

class UniversityRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system : this.props.university.systems[0]
    };
  }
  
  handleChange(event) {
    var sys = event.target.value;
    this.setState({
      system : this.props.university.systems.sys
    });
  }

  render() {
    var uni = this.props.university;
    return (
      <tr key={uni.name.toLowerCase().replace(" ", "-")}>
        <td>{uni.name}</td>
        <td>{uni.location}</td>
        <td>{this.state.system.grade}</td>
        <td><ProgramDropdown systems={uni.systems} onChange={this.handleChange}/></td>
      </tr>
    )
  }
}

class TableHead extends Component {
  render() {
    return (
      <div className="Table-head">
        <div className="AddButton">
          <i className="fa fa-plus"></i>
        </div> 
        <Searchbar/>
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

class ProgramDropdown extends Component {
  render() {
    const systemList = this.props.systems.map((system) => {
      return (
        <option key={system.name.toLowerCase()} 
                value={system.name.toLowerCase()}>{system.name}</option>
      )
    });
    return (
      <select onChange={this.props.onChange}>
        {systemList}
      </select>
    )
  }
}

export default Page;

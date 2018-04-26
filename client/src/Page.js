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
    grades : [
      {
        system : "International Baccalaureate",
        score : 38
      },
      {
        system : "A Levels",
        score : "A"
      },
      {
        system : "ICSE",
        score : "95%"
      },
      {
        system : "CBSE",
        score : "97%"
      },
      {
        system : "Canadian System",
        score : "90%"
      }
    ]
  }
];

var systems = [
  {
    system : {
      name : "International Baccalaureate"
    }
  },
  {
    system : {
      name : "A Levels"
    }
  },
  {
    system : {
      name : "ICSE"
    }
  },
  {
    system : {
      name : "CBSE"
    }
  },
  {
    system : {
      name : "Canadian"
    }
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
      universities : [],
      showInput : false
    };
    this.toggleInput = this.toggleInput.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  componentDidMount() {
     this.getData();
  }

  getData() {
    fetch('http://localhost:9000/')
    .then((res) => {
      console.info(res);
      return res.json()
    }).then((json) => {
      console.log(json);
      this.setState({
        universities : json 
      });
    }).catch((ex) => {
        console.log("Parsing Failed", ex);
      }); 
  }

  toggleInput() {
    (this.state.showInput)? this.setState({showInput : false}) : this.setState({showInput : true})
  }
    
  render() {
    const UniList = this.state.universities.map((uni) => {
      return (
        <UniversityRow key={uni.name.toLowerCase().replace(" ", "-")} university={uni} update={this.getData}/>
      )
    });
    
    return (
      <div className="Table-container">
        <TableHead add={this.toggleInput} refresh={this.getData}/>  
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
            <InputBar uni={systems} toggle={this.toggleInput} show={this.state.showInput} />
            {UniList}
          </tbody>
        </table>
      </div>  
    )
  }
}

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniName : '',
      uniLocation : '',
      avgGrade : '',
      gradeSys : this.props.uni[0].system.name
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(this.state.gradeSys);

    this.setState({
      [name] : value
    });
    console.log(this.state.gradeSys);
  }

  handleSubmit(event) {
    var updatedGrades = this.props.uni;
    updatedGrades.map((system) => {
      if (system.system.name.toLowerCase() === this.state.gradeSys) {
        system.score = this.state.avgGrade;
      } else {
        system.score = '';
      }
      return system;
    });
    const data = {
      name : this.state.uniName,
      location : this.state.uniLocation,
      grades : updatedGrades
    }
    fetch("http://localhost:9000/", {
      method : "POST",
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
      },
      body : JSON.stringify(data)
    }).then((res) => {
      this.props.toggle();
      console.log(res);
      return res.json();
    }); 
  }

  render() {
    if (this.props.show) {
      return (
        <tr className="InputBar">
          <td><input name="uniName" value={this.state.uniName} type="text" onChange={this.handleChange} /></td>
          <td><input name="uniLocation" value={this.state.uniLocation} type="text" onChange={this.handleChange} /></td>
          <td><input name="avgGrade" value={this.state.avgGrade} type="text" onChange={this.handleChange} /></td>
          <td><ProgramDropdown name={"gradeSys"} value={this.state.gradeSys} systems={systems} onChange={this.handleChange} /></td>
          <td><input name="submit" type="submit" value="submit" onClick={this.handleSubmit}/></td>
        </tr>
      );
    } else {
      return (null);
    }
  }
}

class UniversityRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGrade : this.props.university.grades[0]
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteUniversity = this.deleteUniversity.bind(this);
  }
  
  handleChange(event) {
    var target = event.target.value;
    var newGrade;
    // Iterate over all the grade objects in the university to find the one corresponding
    // to the event. Set that object in the state
    for (var i = 0; i < this.props.university.grades.length; ++i) {
      if (target.toLowerCase() === this.props.university.grades[i].system.name.toLowerCase()) {
        newGrade = this.props.university.grades[i];
      }
    }
    this.setState({
      currentGrade : newGrade
    });
  }

  deleteUniversity(event) {
    fetch("http://localhost:9000/" + this.props.university.ID)
    .then((res) => {
      console.info(res);
      this.props.update();
      return res.json()
    })
    .then((json) => {
      console.log(json);
    })
  }

  render() {
    var uni = this.props.university;
    return (
      <tr>
        <td><span className="delete" onClick={this.deleteUniversity}><i className="fa fa-minus"></i></span>{uni.name}</td>
        <td>{uni.location}</td>
        <td>{this.state.currentGrade.score}</td>
        <td><ProgramDropdown systems={uni.grades} onChange={this.handleChange}/></td>
      </tr>
    )
  }
}

class TableHead extends Component {
  render() {
    return (
      <div className="Table-head">
        <div className="AddButton" onClick={this.props.add}>
          <i className="fa fa-plus"></i>
        </div> 
        <div className="RefreshButton" onClick={this.props.refresh}>
          <i className="fa fa-refresh"></i>
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  render() {
    const systemList = this.props.systems.map((system) => {
      return (
        <option key={system.system.name.toLowerCase()} 
                value={system.system.name.toLowerCase()}>{system.system.name}</option>
      )
    });
    return (
      <select name={this.props.name} onChange={this.handleChange}>
        {systemList}
      </select>
    )
  }
}

export default Page;

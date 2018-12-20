import React, { Component } from 'react';

import UniversityRow from './UniversityRow/UniversityRow';
import InputRow from './InputRow/InputRow';
import InfoBar from './InfoBar/InfoBar';
import {systems, universities, grades} from '../MockData';

// Contains most functional parts of the application
class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            showInput: false,
            currentUni: null,
            currentGrades: [],
            showMenu: false
        };
        this.toggleInput = this.toggleInput.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    handleMenu() {
        this.setState({
            showMenu : !this.state.showMenu
        });
    }

    // Load both grades and the corresponding university object
    handleClick(universityObj) {
        var newName = universityObj.name.replace(/ /g, '_').toLowerCase();
        if (grades.hasOwnProperty(newName)) {
            this.setState({
                currentGrades : grades[newName]
            });
        }
        this.setState({
            currentUni : universityObj
        });
        // console.info(this.state.currentUni);
    }

    getData() {
        // Production fetch data from API
        // fetch('http://localhost:9000/')
        //     .then((res) => {
        //         console.info(res);
        //         return res.json()
        //     }).then((json) => {
        //         console.log(json);
        //         this.setState({
        //             universities: json
        //         });
        //     }).catch((ex) => {
        //         console.log("Parsing Failed", ex);
        //     });

        // Demo purposes, use mock data
        this.setState({
            universities : universities
        });
    }

    toggleInput() {
        (this.state.showInput) ? this.setState({ showInput: false }) : this.setState({ showInput: true })
    }

    render() {
        const UniList = this.state.universities.map((uni) => {
            return (
                <UniversityRow 
                    key={uni.name.toLowerCase().replace(" ", "-")} 
                    university={uni} 
                    onSelect={this.handleClick} 
                    isAdmin={this.props.isAdmin}/>
            );
        });

        return (
            <div className="Table-container">
                <MenuButton handleClick={this.handleMenu} />
                <table className="Table-body">
                    <thead>
                        <tr>
                            <th>University</th>
                            <th>Location</th>
                            <th>Average Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InputRow 
                            uni={systems} 
                            toggle={this.toggleInput} 
                            show={this.state.showInput} />
                        {UniList}
                    </tbody>
                </table>
                <InfoBar 
                    university={this.state.currentUni} 
                    show={this.state.showMenu}
                    test="test"
                    grades={this.state.currentGrades}/>
            </div>
        );
    }
}

// Button to enable toggling of sidebar at mobile sizes
class MenuButton extends Component {
    render() {
        return (
            <button className="Menu-button"
                    onClick={this.props.handleClick}></button>
        );
    }
}

export default MainTable;
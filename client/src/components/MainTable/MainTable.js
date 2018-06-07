import React, { Component } from 'react';

import UniversityRow from './UniversityRow/UniversityRow';
import InputRow from './InputRow/InputRow';
import InfoBar from './InfoBar/InfoBar';
import {systems, universities} from '../MockData';


class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            showInput: false,
            currentUni: null,
            showMenu: true
        };
        this.toggleInput = this.toggleInput.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    handleClick(universityObj) {
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
                <UniversityRow key={uni.name.toLowerCase().replace(" ", "-")} university={uni} onSelect={this.handleClick} />
            );
        });

        return (
            <div className="Table-container">
                <table className="Table-body">
                    <thead>
                        <tr>
                            <th>University</th>
                            <th>Location</th>
                            <th>Average Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InputRow uni={systems} toggle={this.toggleInput} show={this.state.showInput} />
                        {UniList}
                    </tbody>
                </table>
                <InfoBar university={this.state.currentUni} />
            </div>
        );
    }
}

class MenuButton extends Component {
    render() {
        return (
            <button className="Menu-button"
                    onClick={this.props.handleClick}></button>
        );
    }
}

export default MainTable;
import React, { Component } from 'react';
import DropDown from '../../UI/DropDown/DropDown';
import './UniversityRow.css'

class UniversityRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentGrade: this.props.university.grades[0],
            showDesc: false,
            descText: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.deleteUniversity = this.deleteUniversity.bind(this);
        this.toggleDesc = this.toggleDesc.bind(this);
    }

    componentDidMount() {
        fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + this.props.university.name.replace(" ", "_"))
            .then(res => {
                console.info(res);
                return res.json()
            })
            .then(json => {
                console.log(json);
                this.setState({
                    descText: json
                });
            })
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
            currentGrade: newGrade
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

    toggleDesc() {
        this.setState({
            showDesc: !this.state.showDesc
        });
    }

    render() {
        var uni = this.props.university;
        return (
            <tr onClick={this.toggleDesc}>
                <td><span className="delete" onClick={this.deleteUniversity}><i className="fa fa-minus"></i></span>{uni.name}</td>
                <td>{uni.location}</td>
                <td>{/* this.state.currentGrade.score */}</td>
                <td><DropDown systems={uni.grades} onChange={this.handleChange} /></td>
            </tr>
        )
    }
}

export default UniversityRow
import React, { Component } from 'react';
import DropDown from '../../UI/DropDown/DropDown';
import {systems} from '../../MockData'

class UniversityRow extends Component {
    constructor(props) {
        super(props);
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

    render() {
        const deleteButton = this.props.isAdmin ? (
            <span className="delete" onClick={this.deleteUniversity}><i className="fa fa-minus"></i></span>
        ) : (
            null
        );
        return (
            <tr onClick={this.toggleDesc}>
                <td>{deleteButton}{this.props.university.name}</td>
                <td>{this.props.university.location}</td>
                <td>{this.props.university.average_acc_grade}</td>
            </tr>
        )
    }
}

export default UniversityRow
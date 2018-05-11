import React, { Component } from 'react';
import Dropdown from '../../UI/DropDown/DropDown';
import './InputRow.css'

class InputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uniName: '',
            uniLocation: '',
            avgGrade: '',
            gradeSys: this.props.uni[0].system.name,
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
            [name]: value
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
            name: this.state.uniName,
            location: this.state.uniLocation,
            grades: updatedGrades
        }
        fetch("http://localhost:9000/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(data)
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
                    <td><Dropdown name={"gradeSys"} value={this.state.gradeSys} systems={this.props.uni} onChange={this.handleChange} /></td>
                    <td><input name="submit" type="submit" value="submit" onClick={this.handleSubmit} /></td>
                </tr>
            );
        } else {
            return (null);
        }
    }
}

export default InputRow;
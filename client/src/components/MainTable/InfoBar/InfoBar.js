import React, { Component } from 'react';
import {grades} from '../../MockData';
import {Bar} from 'react-chartjs-2';
import Dropdown from '../../UI/DropDown/DropDown';


class InfoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text : "",
            image : "",
            uniGrades : []
        };
        
        this.fetchText = this.fetchText.bind(this);
        this.fetchGrades = this.fetchGrades.bind(this);
    }

    componentDidMount() {
        if (this.props.university) {
            // this.fetchText();
            this.fetchGrades();    
        }
    }

    // Fetch description text for the university from wikipedia
    fetchText() {
        fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + this.props.university.name.replace(" ", "_"))
            .then(res => {
                console.info(res);
                return res.json()
            })
            .then(json => {
                console.log(json);
                this.setState({
                    text : json
                });
            });
    }
    
    // Fetch an array containing the submitted grades for a university
    fetchGrades() {
        // Dummy code for testing
        var newName = this.props.university.name.replace(' ', '_');
        this.setState({
            uniGrades : grades.newName
        })
        console.info(this.state.uniGrades);
        // Production code using API endpoint getGrade
        // fetch("http://localhost:9000/grades/" + this.props.university.ID)
        //     .then((res) => {
        //         return res.json()
        //     })
        //     .then((json) => {
        //         this.setState({
        //             uniGrades : json
        //         });
        //         console.log("Sucessfully retrieved information from getGrades");
        //     })
    }

    render() {
        // const dataDisp = this.state.uniGrades.length ? (
        //     <p>Data</p>
        // ) : (
        //     <p>There are currently no submitted grades for this university</p>
        // );

        // const infobarDisp = (this.props.university != null) ? (
        //     <div className="Infobar">
        //         {/* <Image name={this.props.university.name} /> */}
        //         <div className="Desc-text">
        //             {/* <h3 className="Title">{this.props.university.name}</h3> */}
        //             <p>{this.state.text}</p>
        //         </div>
        //         <div className="Data-display">
        //             {/* {dataDisp} */}
        //             {/* <InputGrade id={this.props.university.ID}/> */}
        //         </div>
        //     </div>
        // ) : (
        //     <div className="Infobar">
        //         <p>Please select a university to view its information</p>
        //     </div>
        // );
        return (
            this.state.uniGrades
        )
    }
}

class Image extends Component {
    render() {
        return (
            <img src="https://www.w3schools.com/howto/img_lights.jpg"/>
        )
    }
}

class InputGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade : "",
            date : "",
            system : "",
            error : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate() {
        if (this.state.grade.length && this.state.date.length) {
            console.info(this.state);
        } else {
            this.setState({
                error : "One of the fields is empty"
            });
        }
    }

    render() {
        return (
            <div className="Input-grade">
                <label for="grade">Grade</label>
                <input type="text" name="grade" id="grade" value={this.state.grade} onChange={this.handleChange} />
                <label for="date">Date</label>
                <input type="text" name="date" id="date" value={this.state.date} onChange={this.handleChange} />
                <label for="system">School System</label>
                <Dropdown name="system" onChange={this.handleChange} />
                <p className="error">{this.state.error}</p>
                <button type="submit"
                        value="Submit"
                        onClick={this.validate} />
            </div>
        )
    }
}

export default InfoBar
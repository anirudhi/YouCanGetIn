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
        this.addGrade = this.addGrade.bind(this);
    }

    componentDidMount() {
        if (this.props.university) {
            // this.fetchText();
            this.fetchGrades();    
        }
    }

    addGrade(gradeObj) {
        this.setState({
            uniGrades : this.state.uniGrades.push(gradeObj)
        });
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
        if (this.props.university != null) {
            var newName = this.props.university.name.replace(/ /g, '_').toLowerCase();
            var newGrades = grades[newName];
            if (newGrades.length) {
                this.setState({
                    uniGrades : newGrades
                });
            }
        }
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
        var dataDisp = <p>There are currently no submitted grades for this university</p>
        if (this.props.grades.length) {
            dataDisp = this.props.grades.map((grade) => {
                return (
                    <GradeCard key={grade.score + grade.score_percent} grade={grade} />
                );
            });
        }

        var hideMenu = (this.props.show) ? "show" : "hide";

        const infobarDisp = this.props.university ? (
            <div className="Desc-text">
                     <h3 className="Title">{this.props.university.name}</h3>
                 <div className="Data-display">
                     {dataDisp}
                     <InputGrade id={this.props.university.ID} addGrade={this.addGrade}/>
                 </div>
            </div>
        ) : (
            <p>Please select a university to view its information</p>
        );
        return (
            <div className={"Infobar " + hideMenu}>
                {infobarDisp}
            </div>
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
            error : "",
            submitted: false
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
            this.setState({
                submitted : true    
            });
            this.props.addGrade({
                ID : this.props.id,
                score : this.state.grade,
                system : this.state.system,
                score_percent : 80,
                date : this.state.date
            });
        } else {
            this.setState({
                error : "One of the fields is empty"
            });
        }
    }

    render() {
        const output = this.state.submitted ? (
            <h4>Submitted</h4>
        ) : (
            <div className="Input-grade">
                <h4>Enter your own grade</h4>
                <label htmlFor="grade">Grade</label>
                <input 
                    className="RoundBox"
                    type="text" 
                    name="grade" 
                    id="grade" 
                    value={this.state.grade} 
                    onChange={this.handleChange} />
                <label htmlFor="date">Date</label>
                <input 
                    className="RoundBox"
                    type="text" 
                    name="date" 
                    id="date" 
                    value={this.state.date} 
                    onChange={this.handleChange} 
                    placeholder="MMM-YYYY"/>
                <label htmlFor="system">School System</label>
                <Dropdown name="system" onChange={this.handleChange} />
                <p className="error">{this.state.error}</p>
                <button 
                    className="SubmitButton RoundBox"
                    type="submit"
                    value="Submit"
                    onClick={this.validate}>Submit</button>
            </div>
        )
        return (
            output
        )
    }
}

class GradeCard extends Component {
    render() {
        return (
            <div className="GradeCard">
                <p className="Score"><em>{this.props.grade.score}     </em>{this.props.grade.score_percent + "%"}</p>
                <p className="System">{this.props.grade.system}</p>
                <p className="Date">{this.props.grade.date}</p>
            </div>
        );
    }
}



export default InfoBar
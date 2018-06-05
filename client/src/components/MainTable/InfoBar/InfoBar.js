import React, { Component } from 'react';
import {grades} from '../../MockData';
import {Bar} from 'react-chartjs-2';

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
            this.fetchText();
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
        const dataDisp = this.state.uniGrades.length ? (
            <p>Data</p>
        ) : (
            <p>There are currently no submitted grades for this university</p>
        );

        const infobarDisp = this.props.university ? (
            <div className="Infobar">
                <Image name={this.props.university.name} />
                <div className="Desc-text">
                    <h3 className="Title">{this.props.university.name}</h3>
                    <p>{this.state.text}</p>
                </div>
                <div className="Data-display">
                    {dataDisp}
                    <InputGrade id={this.props.university.ID}/>
                </div>
            </div>
        ) : (
            <div className="Infobar">
                <p>Please select a university to view its information</p>
            </div>
        );
        return (
            infobarDisp
        )
    }
}

class Image extends Component {

}

class InputGrade extends Component {

}

export default InfoBar
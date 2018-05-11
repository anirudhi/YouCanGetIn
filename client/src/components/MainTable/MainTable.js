import React, { Component } from 'react';
import UniversityRow from './UniversityRow/UniversityRow';
import InputRow from './InputRow/InputRow';

import './MainTable.css'

var systems = [
    {
        system: {
            name: "International Baccalaureate"
        }
    },
    {
        system: {
            name: "A Levels"
        }
    },
    {
        system: {
            name: "ICSE"
        }
    },
    {
        system: {
            name: "CBSE"
        }
    },
    {
        system: {
            name: "Canadian"
        }
    }
];


class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            showInput: false
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
                    universities: json
                });
            }).catch((ex) => {
                console.log("Parsing Failed", ex);
            });
    }

    toggleInput() {
        (this.state.showInput) ? this.setState({ showInput: false }) : this.setState({ showInput: true })
    }

    render() {
        const UniList = this.state.universities.map((uni) => {
            return (
                <UniversityRow key={uni.name.toLowerCase().replace(" ", "-")} university={uni} update={this.getData} />
            )
        });

        return (
            <div className="Table-container">
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
                        <InputRow uni={systems} toggle={this.toggleInput} show={this.state.showInput} />
                        {UniList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MainTable;
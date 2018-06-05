import React, { Component } from 'react';
import {systems} from '../../MockData';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    render() {
        const systemList = systems.map((system) => {
            return (
                <option key={system.name.toLowerCase()}
                    value={system.name.toLowerCase()}>{system.name}</option>
            )
        });
        return (
            <select name={this.props.name} onChange={this.handleChange}>
                {systemList}
            </select>
        )
    }
}

export default Dropdown;
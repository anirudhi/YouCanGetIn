import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    render() {
        const systemList = this.props.systems.map((system) => {
            return (
                <option key={system.system.name.toLowerCase()}
                    value={system.system.name.toLowerCase()}>{system.system.name}</option>
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
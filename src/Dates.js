import React, { Component } from 'react';
import classes from './dates.module.css'

class Dates extends Component {
    render() {
        return (
            <div className={classes.date}>
                   <label>{this.props.title}</label> 
                   <input className={classes.enter} type="date" value={this.props.value} onChange={this.props.handleDateInput} />
            </div>
        );
    }
}

export default Dates;
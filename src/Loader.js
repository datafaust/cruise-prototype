import React, { Component } from 'react';
import classes from './loader.module.css';

class Loader extends Component {
    render() {
        return (
            <div className={classes.loader}></div>
        );
    }
}

export default Loader;


/**old
 *  <div className={classes.container}>
                <div className={classes.ball_one}></div>
                <div className={classes.ball_two}></div>
                <div className={classes.ball_three}></div>
                <div className={classes.ball_four}></div>
                <div className="shadow shadow-one"></div>
                <div className="shadow shadow-two"></div>
                <div className="shadow shadow-three"></div>
                <div className="shadow shadow-four"></div>
            </div>
 */
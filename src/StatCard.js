import React from 'react';
import { Card, Accordion, Button, Container } from 'react-bootstrap';
import classes from './statcard.module.css';

const StatCard = (props) => {

    return (
        <Card className={classes.cards}>
            <Card.Body>
                <p className={classes.title}>{props.value}</p>
            </Card.Body>
        </Card>
    )
};

export default StatCard;

/**
 * old code
 *  <Card className={classes.cards}>
            <Card.Body>
                <p className={classes.title}>{props.value}</p>
            </Card.Body>
        </Card>
 */
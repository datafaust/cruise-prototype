import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classes from './pop.module.css'

class Pop extends Component {
    render() {
        return (
            <Modal
                dialogClassName={classes.modal}
                show={this.props.showModal}
                onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Cruiser!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Cruiser is built to help taxi drivers plan their work day. We've crunched hourly data to produce hot spots with popular demand. Selet a specific hour and day to see the what hot spots we reccomend based on previous trips.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Pop;
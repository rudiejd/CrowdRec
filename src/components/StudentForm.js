import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux';

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const Styles = styled.div``;

    }

    handleChange(event) {

    }

    handleSubmit(event) {
        
        this.props.history.push('/class')
    }


    render() { return (
        <Card>
            <Card.Header as="h5">Initiate Session</Card.Header>
            <Card.Body>
                <Card.Title>Type your info here</Card.Title>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name (same name you use in canvas)</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="stuName" onChange={this.handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"  name="email" onChange={this.handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Secret Code for your Class</Form.Label>
                        <Form.Control type="text" placeholder="Secret Code"  name="code" onChange={this.handleChange} required></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Start</Button>
                </Form>
            </Card.Body>
        </Card>
    )
    }
}

// mapping our redux state to box props
const mapStateToProps = (state) => {
    return {
      vars:state.vars
    }
  };
  
  // mapping the dispatches from our reducer to box props 
  const mapDispatchToProps = (dispatch) => {
    return {
      change: (vName) => dispatch( {type: 'CHANGE', name: vName} ),
  
    }
  
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentForm));
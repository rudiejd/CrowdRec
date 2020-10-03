import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const Styles = styled.div``;

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.change({name, value});
        console.log(this.props.vars);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:9000/classes/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.props.vars.email,
                name: this.props.vars.clsName,
                timeout: this.props.vars.timeout
                
            })
        }).then(res => res.json()).then(result => this.props.change({name: "secret", value: result.secret}));
       
        this.props.history.push('/class')
    }


    render() { return (
        <Card>
            <Card.Header as="h5">Initiate Session</Card.Header>
            <Card.Body>
                <Card.Title>Type your info here</Card.Title>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"  name="email" onChange={this.handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Class name</Form.Label>
                        <Form.Control type="text" placeholder="Class name"  name="clsName" onChange={this.handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Timeout</Form.Label>
                        <Form.Control type="number" placeholder="Timeout (minutes)"  name="timeout" onChange={this.handleChange} required></Form.Control>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
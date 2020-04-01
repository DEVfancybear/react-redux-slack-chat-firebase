import React, {useState} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"

const Register = () => {
    const [valueRegister, setValueRegister] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    let onHandleChange;
    onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValueRegister({
            ...valueRegister,
            [name]: value
        })
    };
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: "450px"}}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange"/>
                    Register for SlackChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" onChange={onHandleChange} icon="user" iconPosition="left"
                                    placeholder="Username"/>
                        <Form.Input fluid name="email" onChange={onHandleChange} icon="mail" iconPosition="left"
                                    placeholder="Email"/>

                        <Form.Input fluid name="password" onChange={onHandleChange} icon="lock" iconPosition="left"
                                    placeholder="Password"/>
                        <Form.Input fluid name="passwordConfirm" onChange={onHandleChange} icon="repeat"
                                    iconPosition="left"
                                    placeholder="Password Confirm"/>
                        <Button color="orange" fluid size="large" type="Submit">
                            Register Account
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already a user ? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );

}

export default Register;
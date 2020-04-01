import React, {useState} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom";
import firebase from "../../firebase";

const Register = () => {
    const [valueRegister, setValueRegister] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: []
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
    let onSubmit;
    onSubmit = e => {
        e.preventDefault();
        console.log("connect success");
        // valid form
        if (isFormValid()) {
            //connect firebase with auth register
            firebase.auth().createUserWithEmailAndPassword(valueRegister.email, valueRegister.password).then(createdUser => {
                console.log(createdUser);
            }).catch(err => {
                console.log(err)
            })
        }
    }
    // xử lí validate form
    let isFormValid;
    isFormValid = () => {
        let errors = [];
        let err;

        if (isFormEmpty(valueRegister)) {
            err = {message: 'Fill in all fields'};
            setValueRegister({
                ...valueRegister,
                errors: errors.concat(err)
            });
            return false;
        } else if (!isPasswordValid(valueRegister)) {
            err = {message: 'Password is invalid'}
            setValueRegister({
                ...valueRegister,
                errors: errors.concat(err)
            });
            return false;
        } else {
            return true;
        }
    }
    const isFormEmpty = ({username, email, password, passwordConfirm}) => {
        return !username.length || !email.length || !password.length || !passwordConfirm.length
    }

    const isPasswordValid = ({password, passwordConfirm}) => {
        // kiểm tra độ dài password luôn >= 6
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false
            // kiểm tra password và password xác nhận phải giống nhau thì mới cho submit
        } else if (password !== passwordConfirm) {
            return false
        } else {
            return true;
        }
    }
    // xử lí hiển thị thông báo form ra màn hình cho người dùng biết
    const displayErrors = errors => errors.map((error, index) => {
        return (
            <div>
                <p key={index}>
                    {error.message}
                </p>
            </div>
        )
    })
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: "450px"}}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange"/>
                    Register for SlackChat
                </Header>
                <Form onSubmit={onSubmit} size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" value={valueRegister.username} onChange={onHandleChange}
                                    icon="user" iconPosition="left"
                                    placeholder="Username"/>
                        <Form.Input fluid name="email" value={valueRegister.email} onChange={onHandleChange} icon="mail"
                                    iconPosition="left"
                                    placeholder="Email"/>

                        <Form.Input fluid name="password" value={valueRegister.password} onChange={onHandleChange}
                                    icon="lock" iconPosition="left"
                                    type="password"
                                    placeholder="Password"/>
                        <Form.Input fluid name="passwordConfirm" value={valueRegister.passwordConfirm}
                                    onChange={onHandleChange} icon="repeat"
                                    iconPosition="left"
                                    type="password"
                                    placeholder="Password Confirm"/>
                        <Button color="orange" fluid size="large" type="Submit">
                            Register Account
                        </Button>
                    </Segment>
                </Form>
                {valueRegister.errors.length > 0 && (
                    <Message>
                        <h3>Error</h3>
                        {displayErrors(valueRegister.errors)}
                    </Message>
                )}
                <Message>
                    Already a user ? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );

}

export default Register;
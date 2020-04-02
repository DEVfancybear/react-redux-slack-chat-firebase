import React, {useState} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom";
import firebase from "../../firebase";

const Login = () => {
    const [valueRegister, setValueRegister] = useState({
        email: "",
        password: "",
        errors: [],
        loading: false
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
        if (isFormValid(valueRegister)) {
            setValueRegister({
                ...valueRegister,
                errors: [],
                loading: true
            });
            // lấy dữ liệu người dùng đã đăng kí owr database để đăng nhập (email, passs)
            firebase
                .auth()
                .signInWithEmailAndPassword(valueRegister.email, valueRegister.password)
                .then((signedInUser) => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.log(err);
                    setValueRegister({
                        ...valueRegister,
                        errors: valueRegister.errors.concat(err),
                        loading: false
                    })
                })
        }
    }
    // check value của các trường đăng nhập
    const isFormValid = ({email, password}) => email && password


    // xử lí hiển thị thông báo form ra màn hình cho người dùng biết
    const displayErrors = errors => errors.map((error, index) => {
        return (
            <div key={index}>
                <p key={index}>
                    {error.message}
                </p>
            </div>
        )
    })
    // hiển thị khung màu tô đậm vào ô input email để cho người dùng biết răng email đã được dùng/đăng kí từ trước đó (hàm này có thể dùng cho các ô input khác)
    const handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? "error"
            : "";
    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: "450px"}}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet"/>
                    Login for SlackChat
                </Header>
                <Form onSubmit={onSubmit} size="large">
                    <Segment stacked>

                        <Form.Input fluid name="email" value={valueRegister.email} onChange={onHandleChange} icon="mail"
                                    iconPosition="left"
                                    type="email"
                                    className={handleInputError(valueRegister.errors, "email")}
                                    placeholder="Email"/>

                        <Form.Input fluid name="password" value={valueRegister.password} onChange={onHandleChange}
                                    icon="lock" iconPosition="left"
                                    type="password"
                                    className={handleInputError(valueRegister.errors, "password")}
                                    placeholder="Password"/>

                        <Button disabled={valueRegister.loading} className={valueRegister.loading ? "loading" : ""}
                                color="violet" fluid size="large" type="Submit">
                            Login Now !
                        </Button>
                    </Segment>
                </Form>
                {valueRegister.errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {displayErrors(valueRegister.errors)}
                    </Message>
                )}
                <Message>
                    Don't have an account ? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;
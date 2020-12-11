import React, { Component } from "react";
import { Form, Container, Button, Row } from 'react-bootstrap';
import axios from 'axios';
var ip = "https://hitsthai.com/API";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user: []
        };

        this.onLogin = this.onLogin.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassWord = this.onChangePassWord.bind(this);
    }

    async onLogin() {
        const data = {
            userName: this.state.username,
            passWord: this.state.password
        };

        var config = {
            method: 'post',
            url: ip + '/UserProfile/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const project = await axios(config);
        const data_project = project.data;
        console.log(data_project, " data_project");
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassWord(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <Container style={{ width: "20%", marginBottom: "2%", marginTop: "2%" }}>
                <Form>
                    <Form.Group controlId="formGroupUserName">
                        <Form.Label>USERNAME</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={this.onChangeUserName} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassWord">
                        <Form.Label>PASSWORD</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChangePassWord} />
                    </Form.Group>
                </Form>
                <Row style={{ justifyContent: "center" }}>
                    <Button style={{ background: 'Navy', marginTop: '1%' }} onClick={this.onLogin}>Login</Button>
                </Row>
            </Container>
        )
    }
}
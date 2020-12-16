import React, { Component } from "react";
import { Col, Form, Input, Row, Button,} from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Changepass.css';
import axios from 'axios';
var ip = "http://localhost:5000";

axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [ip];
      const token = localStorage.getItem('token');
  if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export default class Changepass extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.onChangepass = this.onChangepass.bind(this);
    }

    async onChangepass(values) {
        const data = {
            userName: values.username,
            passWord: values.password
        };

        var config = {
            method: 'post',
            url: ip + '/UserProfile/UploadImg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const login = await axios(config);
        const data_login = login.data;
        // setJwt(data_login.token);
        console.log(data_login, " data");
    }

    render() {
        return(
            <Container>
                <Row id="Header">เปลี่ยนรหัสผ่าน</Row>
                <Form onFinish={this.onChangepass}>
                    <Row id="Changpass">
                        <Col xs={2} md={4} xl={6}>
                        </Col >
                        <Col xs={20} md={16} xl={12}>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    รหัสผ่านเดิม 
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'กรุณากรอกรหัสผ่านเดิม!' }]}>
                                        <Input id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col   Col xs={24} md={8} xl={6} id="List">
                                    รหัสผ่านใหม่ 
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="passwordOld"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่านใหม่!',
                                            },
                                        ]}
                                        hasFeedback >
                                        <Input.Password id="Password"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col   Col xs={24} md={8} xl={6} id="List">
                                    ยืนยันรหัสผ่าน 
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="passwordNew"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่านใหม่!',
                                            },
                                        ]}
                                        hasFeedback >
                                        <Input.Password id="Password"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row id="Row">
                                <Button type="primary" htmlType="submit" id="Button-submit">
                                    ยืนยันรหัสผ่าน
                                </Button>
                            </Row>
                        </Col>
                        <Col xs={2} md={4} xl={6}>
                        </Col>
                    </Row>
                </Form>
            
            </Container>
        )
    }
}
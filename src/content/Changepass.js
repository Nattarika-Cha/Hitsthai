import React, { Component } from "react";
import { Col, Form, Input, Row, Button, Spin } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Changepass.css';
import axios from 'axios';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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

export default class Changepass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            statusSend: false
        };
        this.onChangepass = this.onChangepass.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });

    }

    async onChangepass(values) {
        this.setState({
            statusSend: true
        });
        if (values.passwordNew === values.passwordNewCon) {
            const data = {
                userName: this.state.user.username,
                passWord: values.password,
                passwordNew: values.passwordNew
            };

            var config = {
                method: 'post',
                url: ip + '/UserProfile/Changepass',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            const changPasseord = await axios(config);
            const data_changPasseord = changPasseord.data;
            if (data_changPasseord.statusCode === 200) {
                swal("Success!", "เปลี่นน Password สำเร็จ", "success").then((value) => {
                    window.location.replace('/Profile', false);
                });
            } else if (data_changPasseord.statusCode === 401) {
                swal("Warning!", "Password ผิด", "warning").then((value) => {
                    this.setState({
                        statusSend: false
                    });
                });
            } else {
                swal("Error!", "เกิดข้อผิดพลาด", "error").then((value) => {
                    this.setState({
                        statusSend: false
                    });
                });

            }
        }
        else {
            swal("Warning!", "Password ใหม่ไม่ตรงกัน", "warning").then((value) => {
                this.setState({
                    statusSend: false
                });
            });
        }
    }

    render() {
        return (
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
                                        <Input.Password id="Password" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col Col xs={24} md={8} xl={6} id="List">
                                    รหัสผ่านใหม่
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
                                        <Input.Password id="Password" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col Col xs={24} md={8} xl={6} id="List">
                                    ยืนยันรหัสผ่าน
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="passwordNewCon"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่านใหม่!',
                                            },
                                        ]}
                                        hasFeedback >
                                        <Input.Password id="Password" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row id="Row">
                                {/* <Button type="primary" htmlType="submit" id="Button-submit">ยืนยันรหัสผ่าน</Button> */}
                                {
                                    (!this.state.statusSend) ? <Button type="primary" htmlType="submit" id="Button-submit">ยืนยันรหัสผ่าน</Button> : <Spin />
                                }
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
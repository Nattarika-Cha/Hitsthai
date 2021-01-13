import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input } from 'antd';
import '../css/FormRegister.css';

export default class MemberPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        };

    }
    render() {
        return(
            <Container>
                <Row id="Header-FR">สมัครสมาชิก</Row>
                <Form>
                    <Row id="FR">
                        <Col xs={2} md={4} xl={4}></Col>
                        <Col xs={20} md={16} xl={16}>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Username
                                </Col>
                                <Col xs={22} md={14} xl={14}id="List-db">ชื่อผู้ติดต่อ</Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Password
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่าน!',
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
                                <Col xs={24} md={8} xl={6} id="List">
                                    Confirm Password
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่าน!',
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
                                <Col xs={24} md={8} xl={6} id="List">
                                    Name
                                </Col>
                                <Col xs={22} md={14} xl={14} id="List-db">ชื่อผู้ติดต่อ</Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Phone
                                </Col>
                                <Col xs={22} md={14} xl={14} id="List-db">เบอร์โทรศัพท์</Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    ID Line
                                </Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    E-mail
                            </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'E-mail ไม่ถูกต้อง!',
                                            },
                                            {
                                                required: true,
                                                message: 'กรุณากรอก E-mail!',
                                            },
                                        ]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2} md={4} xl={4}></Col>
                    </Row>  
                </Form>
            </Container>
        )
    }
}
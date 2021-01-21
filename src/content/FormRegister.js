import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import '../css/FormRegister.css';
import axios from 'axios';
import swal from 'sweetalert';

var ip = "http://localhost:5000";

export default class MemberPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: [],
            contactStatus: false,
            statusSend: false
        };

        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount() {
        var url_contact = ip + "/Contact/find/keyregister/" + this.props.match.params.key;
        const contact = await (await axios.get(url_contact)).data;
        this.setState({
            contact: contact,
            contactStatus: true
        });
    }

    Fall() {
        swal("Error!", "ไม่พบข้อมูล กรุณาติดต่อผู้ดูแลระบบ", "error").then((value) => {
            window.location.replace('/Home', false);
        });
    }

    async onSave(value) {
        this.setState({
            statusSend: true
        });

        if (value.password === value.conpassword) {
            const data = {
                userName: this.state.contact?.phone,
                passWord: value.password,
                name: value.name,
                line: value.line,
                email: value.email,
                phone: value.phone,
                key: this.props.match.params.key,
                userStatus: "A"
            };

            var config = {
                method: 'post',
                url: ip + '/UserProfile/register/slae',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            const profile = await axios(config);
            const data_profile = profile.data;
            if (data_profile.statusCode === 200) {
                swal("Success!", data_profile.message, "success").then((value) => {
                    this.setState({
                        flagEdit: !this.state.flagEdit,
                        statusSend: false
                    })
                    window.location.replace('/Home', false);
                });
            } else {
                swal("Error!", data_profile.message, "error").then((value) => {
                    this.setState({
                        statusSend: false
                    })
                });

            }
        }
        else {
            swal("Warning!", "Password ไม่ตรงกัน", "warning").then((value) => {
                this.setState({
                    statusSend: false
                });
            });
        }

    }

    render() {
        return (
            <Container>
                <Row id="Header-FR">สมัครสมาชิก</Row>
                {
                    (!this.state.contactStatus) ?
                        <Row id="row-spin">
                            <Spin size="large" />
                        </Row>
                        :
                        (this.state.contact === null) ?
                            this.Fall()
                            // <></>
                            :
                            <>
                                <Form
                                    initialValues={{
                                        username: this.state.contact?.phone,
                                        name: this.state.contact?.name,
                                        line: this.state.contact?.line,
                                        email: this.state.contact?.email,
                                        phone: this.state.contact?.phone
                                    }}
                                    onFinish={this.onSave}
                                >
                                    <Row id="FR">
                                        <Col xs={2} md={4} xl={4}></Col>
                                        <Col xs={20} md={16} xl={16}>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">Username</Col>
                                                <Col xs={22} md={14} xl={14}>
                                                    <Form.Item name="username">
                                                        <Input id="Input" disabled={true} />
                                                    </Form.Item></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">Password</Col>
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
                                                <Col xs={2} md={2} xl={4} id="request-mask"> * </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">Confirm Password</Col>
                                                <Col xs={22} md={14} xl={14}>
                                                    <Form.Item
                                                        name="conpassword"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกยืนยันรหัสผ่าน!',
                                                            },
                                                        ]}
                                                        hasFeedback >
                                                        <Input.Password id="Password" />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={2} md={2} xl={4} id="request-mask"> * </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">Name</Col>
                                                <Col xs={22} md={14} xl={14}>
                                                    <Form.Item name="name">
                                                        <Input id="Input" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">Phone</Col>
                                                <Col xs={22} md={14} xl={14}>
                                                    <Form.Item name="phone">
                                                        <Input id="Input" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">ID Line</Col>
                                                <Col xs={22} md={14} xl={14} >
                                                    <Form.Item name="line">
                                                        <Input id="Input" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} md={8} xl={6} id="List">E-mail</Col>
                                                <Col xs={22} md={14} xl={14}>
                                                    <Form.Item
                                                        name="email"
                                                        rules={[
                                                            {
                                                                type: 'email',
                                                                message: 'E-mail ไม่ถูกต้อง!',
                                                            },
                                                        ]}>
                                                        <Input id="Input" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row id="Row">
                                                {
                                                    (!this.state.statusSend) ? <Button type="primary" htmlType="submit" id="Button-submit">ยืนยัน</Button> : <Spin />
                                                }
                                            </Row>
                                        </Col>
                                        <Col xs={2} md={4} xl={4}></Col>
                                    </Row>
                                </Form>
                            </>
                }
            </Container>
        )
    }
}
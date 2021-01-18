import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Col, Form, Input, Button, Select, Spin } from 'antd';
import '../css/Contact.css';
import axios from 'axios';
import swal from 'sweetalert';
import map from'../img/map.png';
var ip = "http://localhost:5000";

const { Option } = Select;
export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusSend: false
        };

        this.onRegister = this.onRegister.bind(this);
    }

    async onRegister(values) {
        console.log(values, " values");
        this.setState({
            statusSend: true
        });

        const data = {
            // contactId: 1,
            name: values.name,
            email: values.email,
            line: values.line,
            phone: values.phone,
            type: values.type,
            msg: values.msg,
            numCall: 0,
            contactStatus: "A",
            acceptStatus: "N",
            registerStatus: "N"
        };

        var config = {
            method: 'post',
            url: ip + '/Contact/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const contact = await axios(config);
        // const data_contact = contact.data;
        console.log(contact, " contact");
        if (contact.status === 200) {
            swal("บันทึกข้อมูลสำเร็จ", "กรุณารอการติดต่อกลับจากเจ้าหน้าที่", "success").then((value) => {
                window.location.replace('/Contact', false);
            });
        } else {
            swal("บันทึกข้อมูลไม่สำเร็จ!", "กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
                this.setState({
                    statusSend: false
                });
            });

        }
    }

    render() {
        return (
            <Container fluid>
                <Form onFinish={this.onRegister}>
                    <Row id="contact">
                        <Col xs={24} md={24} xl={12} id="map" >
                            <Image src={map} fluid></Image>
                        </Col>
                        <Col xs={24} md={24} xl={12} id="form-contact">
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">ชื่อผู้ติดต่อ</Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: 'กรุณากรอกชื่อ - นามสกุล!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="request-mask">*</Col>
                            </Row>
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">เบอร์โทรศัพท์</Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="request-mask">*</Col>
                            </Row>
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">Line Id</Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="line"
                                        >
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="mask"></Col>
                            </Row>
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">E - mail</Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="email"
                                        // rules={[
                                        //     {
                                        //         type: 'email',
                                        //         message: 'E-mail ไม่ถูกต้อง!',
                                        //     },
                                        //     {
                                        //         required: true,
                                        //         message: 'กรุณากรอก E-mail!',
                                        //     },
                                        // ]}
                                    >
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="mask"></Col>
                            </Row>
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">การติดต่อ</Col>
                                <Col xs={22} md={14} xl={14} id="select">
                                    <Form.Item
                                        name="type"
                                        rules={[{ required: true, message: 'กรุณาเลือกรูปแบบการติดต่อ' }]}
                                    >
                                        <Select placeholder="โปรดเลือกรูปแบบการติดต่อ">
                                            <Option value="สมัครตัวแทนจำหน่าย">สมัครตัวแทนจำหน่าย</Option>
                                            <Option value="สอบถามข้อมูลเพิ่มเติม">สอบถามข้อมูลเพิ่มเติม</Option>
                                            <Option value="สั่งซื้อสินค้า">สั่งซื้อสินค้า</Option>
                                            <Option value="อื่น ๆ">อื่น ๆ</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="request-mask">*</Col>
                            </Row>
                            <Row id="form">
                                <Col xs={24} md={6} xl={6} id="List">ข้อความ</Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="msg"
                                    //rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}
                                    >
                                        <Input.TextArea id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={4} xl={4} id="mask"></Col>
                            </Row>
                            <Row id="Row">
                                {
                                    (!this.state.statusSend) ? <Button type="primary" htmlType="submit" id="Button-submit">ส่ง</Button> : <Spin />
                                }
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )

    }
}
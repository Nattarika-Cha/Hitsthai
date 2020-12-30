import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import '../css/Contact.css';

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container fluid>
                <Row id="contact">
                    <Col xs={24} md={24} xl={12} id="map" >
                    </Col>
                    <Col xs={24} md={24} xl={12} id="form-contact">
                        <Row id="form">
                            <Col xs={24} md={6} xl={6} id="List">
                                 ชื่อ - นามสกุล
                            </Col>
                            <Col xs={22} md={14} xl={14} >
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'กรุณากรอกชื่อ - นามสกุล!' }]}>
                                    <Input id="Input" />
                                </Form.Item>
                            </Col>
                            <Col xs={2} md={4} xl={4} id="request-mask">
                                *
                            </Col>
                        </Row>
                        <Row id="form">
                            <Col xs={24} md={6} xl={6} id="List">
                                 เบอร์โทรศัพท์
                            </Col>
                            <Col xs={22} md={14} xl={14} >
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
                                    <Input id="Input" />
                                </Form.Item>
                            </Col>
                            <Col xs={2} md={4} xl={4} id="request-mask">
                                *
                            </Col>
                        </Row>
                        <Row id="form">
                            <Col xs={24} md={6} xl={6} id="List">
                                 E - mail
                            </Col>
                            <Col xs={22} md={14} xl={14} >
                                <Form.Item
                                    name="phone"                                  
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'กรุณากรอกเบอร์โทรศัพท์!',
                                        },
                                        ]}
                                    >
                                    <Input id="Input" />
                                </Form.Item>
                            </Col>
                            <Col xs={2} md={4} xl={4} id="request-mask">
                                *
                            </Col>
                        </Row>
                        <Row id="form">
                            <Col xs={24} md={6} xl={6} id="List">
                                 การติดต่อ
                            </Col>
                            <Col xs={22} md={14} xl={14} id="select">
                                <Select
                                    showSearch
                                    placeholder="โปรดเลือกรูปแบบการติดต่อ"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    id="select1"
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Dealer">สมัครตัวแทนจำหน่าย</Option>
                                    <Option value="Information">สอบถามข้อมูลเพิ่มเติม</Option>
                                    <Option value="Order">สั่งซื้อสินค้า</Option>
                                </Select>
                            </Col>
                            <Col xs={2} md={4} xl={4} id="request-mask">
                                *
                            </Col>
                        </Row>
                        <Row id="form">
                            <Col xs={24} md={6} xl={6} id="List">
                                 ข้อความ
                            </Col>
                            <Col xs={22} md={14} xl={14}>
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}>
                                    <Input.TextArea id="Input" />
                                </Form.Item>
                            </Col>
                            <Col xs={2} md={4} xl={4} id="request-mask">
                                *
                            </Col>
                        </Row>
                        <Row id="Row">
                            <Button type="primary" htmlType="submit" id="Button-submit">
                                ส่ง
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )

    }
}
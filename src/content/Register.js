import React, { Component } from "react";
import { Col, Form, Input, Row, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import '../css/Register.css';
import axios from 'axios';
import swal from 'sweetalert';
var ip = "http://localhost:5000";

const normFile = e => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
};

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            flagUplode: false
        };

        this.onRegister = this.onRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPreview = this.onPreview(this);
    }

    onPreview(info) {
        console.log(info, " info info info ");
        this.setState({ flagUplode: false });
        return;
    }

    handleChange(info) {
        // if (info.file.status === 'uploading') {
        //     this.setState({ flagUplode: true });
        //     return;
        // } else if (info.file.status === 'remove') {
        //     this.setState({ flagUplode: false });
        //     return;
        // }
    }

    async onRegister(values) {
        // console.log('Success:', values);

        const isJpgOrPng = values.upload[0].type === 'image/jpeg' || values.upload[0].type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return 0;
        }
        const isLt2M = values.upload[0].size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
            return 0;
        }

        const data = {
            userName: values.username,
            passWord: values.password,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            img: values.upload[0]
        };

        var config = {
            method: 'post',
            url: ip + '/UserProfile/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const profile = await axios(config);
        const data_profile = profile.data;
        if (data_profile.statusCode === 200) {
            swal("Success!", data_profile.message, "success").then((value) => {
                window.location.replace('/Login', false);
            });
        } else {
            swal("Error!", data_profile.message, "error").then((value) => {
            });

        }
    }

    render() {
        return (
            <Container fluid>
                <Row id="Header">สมัครสมาชิก</Row>
                <Form onFinish={this.onRegister} onFinishFailed={onFinishFailed}>
                    <Row id="Register">
                        <Col xs={2} md={4} xl={6}></Col>
                        <Col xs={20} md={16} xl={12}>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Username
                                </Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
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
                                    ชื่อ - นามสกุล
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
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
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    เบอร์โทรศัพท์
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    ที่อยู่
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="address"
                                        rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}>
                                        <Input.TextArea id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    รูปภาพ
                                </Col>
                                <Col>
                                    <Form.Item
                                        name="upload"
                                        // valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        extra="สำเนาบัตรประจำตัวประชาชน"
                                    >
                                        <Upload
                                            action={ip + "/UserProfile/UploadImg"}
                                            listType="picture"
                                            className="upload-list-inline"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                            // onRemove={this.handleRemove}
                                            onPreview={this.onPreview}
                                        >
                                            <Button icon={<UploadOutlined />} disabled={this.state.flagUplode}>อัพโหลดรูปภาพ</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row id="Row">
                                <Button type="primary" htmlType="submit" id="Button-submit">
                                    ยืนยัน
                            </Button>
                            </Row>
                        </Col>
                        <Col xs={2} md={8} xl={6}></Col>
                    </Row>

                </Form>
            </Container>
        )
    }
}
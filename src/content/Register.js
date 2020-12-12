import React, { Component } from "react";
import { Col, Form, Input, Row, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import '../css/Register.css';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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
            loading: false
        };
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Container fluid>
                <Row id="Header">สมัครสมาชิก</Row>
                <Form>
                    <Row id="Register">
                        <Col xs={2} md={4} xl={6}></Col>
                        <Col xs={20} md={16} xl={12}>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Username :
                                </Col>
                                <Col xs={20} md={14} xl={14} >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}>
                                        <Input id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Password :
                            </Col>
                                <Col xs={20} md={14} xl={14}>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่าน!',
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
                                <Col xs={24} md={8} xl={6} id="List">
                                    ชื่อ - นามสกุล :
                                </Col>
                                <Col xs={20} md={14} xl={14}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล!' }]}>
                                        <Input id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    E-mail :
                            </Col>
                                <Col xs={20} md={14} xl={14}>
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
                                        <Input id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    เบอร์โทรศัพท์ :
                                </Col>
                                <Col xs={20} md={14} xl={14}>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
                                        <Input id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    ที่อยู่ :
                                </Col>
                                <Col xs={20} md={14} xl={14}>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}>
                                         <Input.TextArea id="Input"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row id="row-img">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
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
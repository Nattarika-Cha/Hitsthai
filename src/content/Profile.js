import React, { Component } from "react";
import { Col, Form, Input, Row, Button, Upload, message, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Container, Image } from 'react-bootstrap';
import '../css/Profile.css';
// import { changeConfirmLocale } from "antd/lib/modal/locale";
import axios from 'axios';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var ip = "http://localhost:5000";
var ip_img_profile = "http://128.199.198.10/API/profile/";

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

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
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            flagEdit: true,
            token: "",
            user: [],
            userEdit: [],
            imageUrl: ""
        };

        this.changeFlagEdit = this.changeFlagEdit.bind(this);
        this.onEditProfile = this.onEditProfile.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onFieldsChange = this.onFieldsChange.bind(this);
        // this.setFieldsValue = this.setFieldsValue.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async componentDidMount() {
        var url_profile = ip + "/UserProfile//find/id/" + this.state.user.id;
        const profile = await (await axios.get(url_profile)).data;
        // const data_file = profile.data;
        this.setState({
            userEdit: profile,
            imageUrl: ip_img_profile + profile.img
        });
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

    changeFlagEdit() {
        this.setState({
            flagEdit: !this.state.flagEdit
        })

        // const { form } = this.props;
        // if(this.state.flagEdit) {
        //     this.props.form.resetFields()
        // }
    }

    async onEditProfile(values) {
        console.log(values, " values");
        // console.log(this.state.imageUrl, " jdkjasdasd");
        var img = "";
        if (this.state.imageUrl !== (ip_img_profile + this.state.userEdit.img)) {
            var length = values.upload.length - 1;
            img = values.upload[length];
        }
        const data = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            img: img,
            nameimg: this.state.userEdit.img
        };

        var config = {
            method: 'post',
            url: ip + '/UserProfile/updateprofile/' + this.state.user.id,
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
                    flagEdit: !this.state.flagEdit
                })
            });
        } else {
            swal("Error!", data_profile.message, "error").then((value) => {
            });

        }

    }

    // onChange(e) {
    //     console.log(e.target.value, " eeee");

    // }

    // onFieldsChange(e) {
    //     console.log(e, " wwwwwwww");
    // }

    // setFieldsValue(e) {
    //     console.log(e, " sssss");
    // }

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>);

        return (
            <Container>
                {/* <Spin tip="Loading..."> */}
                    <Row id="Header">โปรไฟล์</Row>
                    <Row id="Profile">
                        {this.state.userEdit.name === undefined ?
                            <div id="displaycenterspen">
                                <Spin size="large" />
                            </div>
                            :
                            <Form
                                id="displaycenter"
                                initialValues={{
                                    name: this.state.userEdit.name,
                                    email: this.state.userEdit.email,
                                    phone: this.state.userEdit.phone,
                                    address: this.state.userEdit.address
                                }}
                                onFinish={this.onEditProfile}
                            >
                                <Col xs={2} md={4} xl={6}></Col>
                                <Col xs={20} md={16} xl={12}>
                                    <Row id="displaycenterspen">
                                        <Form.Item
                                            name="upload"
                                            // valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={true}
                                                showPreviewIcon={false}
                                                // previewFile={false}
                                                size={{ xs: 74, sm: 82, md: 90, lg: 114, xl: 130, xxl: 150 }}
                                                action={ip + "/UserProfile/UploadImg"}
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                                disabled={this.state.flagEdit}>
                                                {imageUrl ? <div><Image src={imageUrl} alt="imgProfile" id="imgprofile" responsive /></div> : uploadButton}
                                            </Upload >
                                        </Form.Item>
                                    </Row>
                                    <Row id="edit-button">
                                        {
                                            (this.state.flagEdit) ?
                                                <div onClick={this.changeFlagEdit}>แก้ไข</div>
                                                :
                                                <></> // <div onClick={this.changeFlagEdit} id="cancelButtom">ยกเลิก</div>
                                        }
                                    </Row>
                                    <Row style={{ marginTop: "2%" }}>
                                        <Col xs={24} md={8} xl={6} id="List">ชื่อ - นามสกุล</Col>
                                        <Col xs={22} md={14} xl={14}>
                                            <Form.Item
                                                name="name"
                                                rules={[{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล!' }]}>
                                                <Input
                                                    id="Input"
                                                    disabled={this.state.flagEdit}
                                                // defaultValue={this.state.userEdit.name} 
                                                // onChange={this.onChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={2} md={2} xl={4} id="request-mask" hidden={this.state.flagEdit}> * </Col>
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
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอก E-mail!',
                                                    },
                                                ]}>
                                                <Input id="Input" disabled={this.state.flagEdit} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={2} md={2} xl={4} id="request-mask" hidden={this.state.flagEdit}> * </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} md={8} xl={6} id="List">เบอร์โทรศัพท์</Col>
                                        <Col xs={22} md={14} xl={14}>
                                            <Form.Item
                                                name="phone"
                                                rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
                                                <Input id="Input" disabled={this.state.flagEdit} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={2} md={2} xl={4} id="request-mask" hidden={this.state.flagEdit}> * </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} md={8} xl={6} id="List">ที่อยู่</Col>
                                        <Col xs={22} md={14} xl={14}>
                                            <Form.Item
                                                name="address"
                                                rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}>
                                                <Input.TextArea id="Input" disabled={this.state.flagEdit} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={2} md={2} xl={4} id="request-mask" hidden={this.state.flagEdit}> * </Col>
                                    </Row>
                                    {/* <Row>
                                    <Col xs={24} md={8} xl={6} id="List">รูปภาพ</Col>
                                    <Col>
                                        <Form.Item
                                            name="upload"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            extra="สำเนาบัตรประจำตัวประชาชน">
                                            <Upload name="logo" action="/upload.do" listType="picture.jpg">
                                                <Button icon={<UploadOutlined />} disabled={this.state.flagEdit}>อัพโหลดรูปภาพ</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                                    <Row id="Row">
                                        <Button type="primary" htmlType="submit" id="Button-submit" hidden={this.state.flagEdit}>ยืนยันการแก้ไข</Button>
                                    </Row>
                                </Col>
                                <Col xs={2} md={8} xl={6}></Col>
                            </Form>
                        }
                    </Row>
                {/* </Spin> */}
            </Container>
        )
    }
}

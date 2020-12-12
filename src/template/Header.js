import React, { Component } from 'react';
import '../css/Header.css';
import { Row, Col, Avatar, Select, Input } from 'antd';
import { Container } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import logo from '../img/logo.png'

const { Option } = Select;

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log(window.location.pathname, " window.location.pathname Head1");
        return (
            // <div>
            <Container fluid>
                <div id="header-frist">

                    <Row>
                        <Col xs={6} xl={6}>
                            <img
                                src={logo}
                                width="110px"
                                height="auto"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                                style={{ paddingBottom: "0.3%", paddingTop: "0.3%" }}
                            />
                        </Col>
                        <Col xs={12} xl={12} id="col-Headder-center">
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                placeholder="สินค้าทั้งหมด"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                            <Input.Search allowClear style={{ width: '50%' }} placeholder="ค้นหา" />
                        </Col>
                        <Col xs={6} xl={6} style={{ textAlign: "end" }}>
                            <strong style={{ paddingRight: "15%" }}> TH | EN </strong>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
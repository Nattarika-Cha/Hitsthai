import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form } from 'antd';
import '../css/MemberPoint.css';
// var ip = "http://localhost:5000";

export default class MemberPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        };
        // this.handleDeleteUser = this.handleDeleteUser.bind(this);

        // async componentDidMount() {
        //     var url_user = ip + "/UserProfile/find/all/admin";
        //     const user = await (await axios.get(url_user)).data;
        //     this.setState({
        //         user: user,
        //         userstatus: false
        //     });
        //   }
    }
    render() {
        return(
            <Container>
                <Row id="Header-Point">Hits Points</Row>
                <Form>
                    <Row id="MemberPoint">
                        <Col xs={2} md={4} xl={2}></Col>
                        <Col xs={20} md={16} xl={20}>
                            <Col xs={24} md={24} xl={24} id="Point-Header"> 
                                คะแนนทั้งหมด
                            </Col>
                            <Col xs={24} md={24} xl={24} id="Point"> 
                                1000
                            </Col>
                            <Col xs={24} md={24} xl={24} id="Point-History">ประวัติ</Col>
                            <Col xs={24} md={24} xl={24}>
                                <Row id="row-point">
                                    <Col xs={24} md={24} xl={24} id="col-order">Order123456</Col>
                                    <Col xs={16} md={16} xl={16} id="col-datepoint">12-12-4444</Col>
                                    <Col xs={8} md={8} xl={8} id="col-point">+1000</Col>
                                </Row>
                            </Col>
                        </Col>
                        <Col xs={2} md={8} xl={2}></Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}
import React, { Component } from "react";
// import Close from '../img/Close.png';
import { Row, Col, Card } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';

export default class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Row id="home">
                    <Col xs={14} xl={14} id="col-img-head1">
                        {/* <img src={Close} alt="logo" width="70%" /> */}
                    </Col>
                    <Col xs={10} xl={10} id="col-img-head2">
                        <Row id="row-col-img-head2">
                            {/* <img src={Close} alt="logo" width="50%" /> */}
                        </Row>
                        <Row id="row-col-img-head3">
                            {/* <img src={Close} alt="logo" width="50%" /> */}
                        </Row>
                    </Col>
                </Row>
                <Row id="hade-standate">
                    <div id="standate">มาตฐานการรับรอง</div>
                </Row>
                <Row  id="img-standate">
                    <Col xs={2} xl={2} ></Col>
                    <Col xs={4} xl={4} id="black-img1"> </Col>
                    <Col xs={4} xl={4} id="black-img2"> </Col>
                    <Col xs={4} xl={4} id="black-img3"> </Col>
                    <Col xs={4} xl={4} id="black-img4"> </Col>
                    <Col xs={4} xl={4} id="black-img5"> </Col>
                    <Col xs={2} xl={2} ></Col>
                </Row>
                <Row id="hade-standate">
                    <div id="standate">ช่องทางการจัดจำหน่าย</div>
                </Row>
                <Row gutter={16} id="row-pay">
                    <Col span={12}>
                        <Card title="อุตสาหกรรมและธุรกอจ" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={12}>
                        <Card title="ร้าน Histthai" bordered={false}>Card content</Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
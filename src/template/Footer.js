import React, { Component } from "react";
import '../css/Footer.css';
import { Container } from 'react-bootstrap';
import { Row, Col,  } from 'antd';

export default class Footer extends Component {
    render() {
        return (
            <Container fluid>
                <div id="footer-frist">
                    <Row>
                        <Col xs={14} md={6} xl={6} id="col-footer">
                            <Row id="header-footer"> ติดต่อเรา </Row>
                            <Row id="body-footer"> ทีมตัวแทนจำหน่าย</Row>
                            <Row id="body-footer">โทร : xxxxxxxxxx</Row>
                            <Row id="body-footer"> ทีมขายอุตสาหกรรม</Row>
                            <Row id="body-footer">โทร : xxxxxxxxxx</Row>
                            <Row id="body-footer"> ทีม e-commerce</Row>
                            <Row id="body-footer">โทร : xxxxxxxxxx</Row>
                            <Row id="body-footer">เวลาทำการ : จ. - ส. 08.30 - 17.30</Row>
                            <Row id="body-footer"></Row>
                            <Row id="body-footer">email : xxxxxxxxxx</Row>
                        </Col>
                        <Col xs={10} md={6} xl={6} id="col-footer">
                            <Row id="header-footer"> หมวดหมู่ทั้งหมด </Row>
                            <Row id="body-footer"> ใบตัด</Row>
                            <Row id="body-footer"> ใบตัดโลหะ</Row>
                            <Row id="body-footer"> แผ่นสแตนเลส</Row>
                            <Row id="body-footer"> แผ่นสแตนเลสติดผนัง</Row>
                        </Col>
                        <Col xs={12} md={6} xl={6} id="col-footer">
                            <Row id="header-footer"> อื่นๆ </Row>
                            <Row id="body-footer"> เกี่ยวกับเรา</Row>
                            <Row id="body-footer"> สินค้า</Row>
                            <Row id="body-footer"> ติดต่อเรา</Row>
                            <Row id="body-footer"> บัญชี</Row>
                        </Col>
                        <Col xs={12} md={6} xl={6} id="col-footer">
                            
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}


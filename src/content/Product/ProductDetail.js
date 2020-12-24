import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Row, Col, Descriptions, PageHeader, } from 'antd';
import '../../css/ProductDetail.css';
import ImageGallery from 'react-image-gallery';
import { CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';

const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  const routes = [
    {
      path: 'index',
      breadcrumbName: 'First-level Menu',
    },
    {
      path: 'first',
      breadcrumbName: 'Second-level Menu',
    },
    {
      path: 'second',
      breadcrumbName: 'Third-level Menu',
    },
  ];

export default class Abount extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container fluid>
               <Row id="pageheader">
               <PageHeader
                    className="site-page-header"
                    breadcrumb={{ routes }}
                />
               </Row>
                <Col id="Product-detail">
                    <Row id="Product-name" >
                        <div>ใบตัดเหล็ก 7"</div>
                    </Row>
                    <Row id="detailname">
                        <div>180x3.2x22.2มม</div>
                    </Row>

                    <Row>
                        <Col xs={24} md={24} xl={10} id="img-showproduct">
                            <ImageGallery items={images} />
                        </Col>
                        <Col xs={24} md={24} xl={12}>
                            <Row id="Row-List">
                                <Col xs={10} md={5} xl={5}>
                                    <div>ราคา   :</div>
                                </Col>
                                <Col xs={12} md={12} xl={12} id="detial">
                                    <div>500.00 บาท/ใบ</div>
                                </Col>                           
                            </Row>
                            <Row id="Row-List">
                                <Col xs={10} md={5} xl={5}>
                                    <div>รหัสสินค้า   :</div>
                                </Col>
                                <Col xs={12} md={12} xl={12} id="detial">
                                    <div>G4110510</div>
                                </Col>                           
                            </Row>
                            <Row id="Row-List">
                                <Col xs={10} md={5} xl={5}>
                                    <div>สถานะ   :</div>
                                </Col>
                                <Col xs={12} md={12} xl={12} id="detial">
                                    <Row>
                                        <Col id="col-icon">
                                            <div className="icons-list"  id="icon">
                                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                            </div> 
                                        </Col>
                                        <Col id="color-product">
                                            <div>มีจำหน่าย</div> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col id="col-icon">
                                            <div className="icons-list" id="icon">
                                                <CloseCircleTwoTone twoToneColor="#ff0404"/> 
                                            </div>
                                        </Col>
                                        <Col id="color-product1">
                                            <div>รอเพิ่มเติมสินค้า</div> 
                                        </Col>
                                    </Row>
                                </Col>                          
                            </Row>
                            <Row id="dercript">
                                <div>
                                    - สวมอุปกรณ์ป้องกันใบหน้าในขณะใช้งาน <br />
                                    - ศึกษารายละเอียดการใช้งานให้ถูกต้องกับวัสดุ <br />
                                    - จำกัดความเร็วรอบตามที่ระบุไว้ <br />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    
                </Col>

                <Col id="Product-detail1">
                    <Descriptions
                        title="ข้อมูลเพิ่มเติมเพิ่มเติม"
                        bordered
                        column={{ xl: 2, md: 2, xs: 1, sm: 1,}}
                        >
                        <Descriptions.Item label="ตราสินค้า">Hits</Descriptions.Item>
                        <Descriptions.Item label="ความกว้าง (มม.)" labelStyle={{width:"25%"}}>180 มม.</Descriptions.Item>
                        <Descriptions.Item label="วิธีใช้งาน">ใช้ร่วมกับแท่นตัดโลหะไฟฟ้า</Descriptions.Item>
                        <Descriptions.Item label="ความหนา (มม.)">3.3 มม.</Descriptions.Item>
                        <Descriptions.Item label="ข้อควรระวัง" span={2}>
                            - สวมอุปกรณ์ป้องกันใบหน้าในขณะใช้งาน 
                            <br />
                            - ศึกษารายละเอียดการใช้งานให้ถูกต้องกับวัสดุ 
                            <br />
                            - จำกัดความเร็วรอบตามที่ระบุไว้
                            <br />
                        </Descriptions.Item>
                        <Descriptions.Item label="วิธีเก็บรักษา" labelStyle={{width:"25%"}} span={2}>ควรเก็บรักษาในที่แห้งไม่ให้โดนน้ำและความชื้น</Descriptions.Item>
                        <Descriptions.Item label="ขั้นตอนการปฐมพยาบาล" span={2}>หากสะเก็ดทรายกระเด็นเข้าตา ห้ามขยี้ตา และรีบพบแพทย์โดยเร็ว</Descriptions.Item>
                    </Descriptions>
                </Col>
                
            </Container>
        )

    }
}
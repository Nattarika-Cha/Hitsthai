import React, { Component } from "react";
import bg from '../img/Comp1.mp4';
// import P1 from '../img/h1.svg';
// import P2 from '../img/h2.svg';
// import P1 from '../img/ho1.svg';
// import P2 from '../img/ho2.svg';
import { Row, Col, Empty, Spin } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';
import ProductHomeCard from './Home/ProductHomeCard';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactPlayer from 'react-player'
import swal from 'sweetalert';

const cookies = new Cookies();

var ip = "http://128.199.198.10/API";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product_new: [],
            product_hit: [],
            statusDataNew: false,
            statusDataHit: false,
            img_top: [], 
            img_buttom: []
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async componentDidMount() {

        var url_product_new = "";
        var url_product_hit = "";
        var url_statisticsuser = "";

        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            url_product_new = ip + "/Product/find/notauthorization/new/16/";
            url_product_hit = ip + "/Product/find/notauthorization/hit/16/";
            url_statisticsuser = ip + "/StatisticsUser/update/enduser/";
        } else {
            url_product_new = ip + "/Product/find/authorization/new/";
            url_product_hit = ip + "/Product/find/authorization/hit/";
            url_statisticsuser = ip + "/StatisticsUser/update/memberuser/";
        }

        const product_new = await (await axios.get(url_product_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((product_new.statusCode === 500) || (product_new.statusCode === 400)) {
            swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                this.setState({
                    token: cookies.remove('token', { path: '/' }),
                    user: cookies.remove('user', { path: '/' })
                });
                window.location.replace('/Login', false);
            });
        } else {
            this.setState({
                product_new: product_new,
                statusDataNew: true
            });
        }

        const product_hit = await (await axios.get(url_product_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((product_hit.statusCode === 500) || (product_hit.statusCode === 400)) {
            swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
                this.setState({
                    token: cookies.remove('token', { path: '/' }),
                    user: cookies.remove('user', { path: '/' })
                });
                window.location.replace('/Login', false);
            });
        } else {
            this.setState({
                product_hit: product_hit,
                statusDataHit: true
            });
        }

        await (await axios.put(url_statisticsuser, {}, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;

        var url_img_top = ip + "/ImgSetting/find/home/top";
        const img_top = await (await axios.get(url_img_top)).data;
        this.setState({
            img_top: img_top[0]
        });

        var url_img_buttom = ip + "/ImgSetting/find/home/bottom";
        const img_buttom = await (await axios.get(url_img_buttom)).data;
        this.setState({
            img_buttom: img_buttom[0]
        });
    }

    list_product_new() {
        return this.state.product_new.map((product) => {
            return <Col xs={12} md={8} xl={4}> <ProductHomeCard product={product} /> </Col>
        });
    }

    list_product_hit() {
        return this.state.product_hit.map((product) => {
            return <Col xs={12} md={8} xl={4}> <ProductHomeCard product={product} /> </Col>
        });
    }

    linkTop() {
        this.props.history.push(this.state.img_top?.url);
    }

    linkButtom() {
        this.props.history.push(this.state.img_buttom?.url);
    }

    render() {
        return (
            <Container fluid>
                <Row id="home">
                    <Col xs={24} md={24} xl={12} id="col-img-head1">
                        {/* <img src={Close} alt="logo" width="70%" /> */}
                        <ReactPlayer 
                            url={bg} 
                            width='100%'
                            height='max-content'
                            // controls = {true}
                            autoplay = {true}
                            playing = {true}
                            loop = {true}
                            fluid/>
                    </Col>
                    <Col xs={24} md={24} xl={12} id="col-img-head2">
                        <Row id="row-col-img-head2">
                            <img src={this.state.img_top?.urlimg} alt="logo" width="100%" onClick={() => this.linkTop()} style={{cursor: "pointer"}} fluid/>
                        </Row>
                        <Row id="row-col-img-head3">
                            <img src={this.state.img_buttom?.urlimg} alt="logo" width="100%" onClick={() => this.linkButtom()} style={{cursor: "pointer"}} fluid/>
                        </Row>
                    </Col>
                </Row>
                <Row id="hade-standate">
                    <div id="standate">สินค้าใหม่</div>
                </Row>

                {
                    (this.state.statusDataNew) ?
                        (this.state.product_new.length > 0) ?
                            <Row id="row-pay">
                                {this.list_product_new()}
                            </Row>
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        :
                        <Row id="row-spin">
                            <Spin size="large" />
                        </Row>
                }

                <Row id="hade-standate">
                    <div id="standate">สินค้ายอดนิยม</div>
                </Row>

                {
                    (this.state.statusDataHit) ?
                        (this.state.product_hit.length > 0) ?
                            <Row id="row-pay">
                                {this.list_product_hit()}
                            </Row>
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        :
                        <Row id="row-spin">
                            <Spin size="large" />
                        </Row>
                }
            </Container>
        )
    }
}
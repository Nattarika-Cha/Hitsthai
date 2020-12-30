import React, { Component } from "react";
// import Close from '../img/Close.png';
import { Row, Col } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';

import ProductHomeCard from './Home/ProductHomeCard';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();

var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product_new: [],
            product_hit: []
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

        if (this.state.token === "" || this.state.token === null || this.state.token === undefined ||
            this.state.user.levelId === "" || this.state.user.levelId === null || this.state.user.levelId === undefined) {
            url_product_new = ip + "/Product/find/notauthorization/new/16/";
            url_product_hit = ip + "/Product/find/notauthorization/hit/16/";

        } else {
            url_product_new = ip + "/Product/find/authorization/new/";
            url_product_hit = ip + "/Product/find/authorization/hit/";
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
                product_new: product_new
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
                product_hit: product_hit
            });
        }

        // var url_product_new = ip + "/Product/find/new/";
        // const product_new = await (await axios.get(url_product_new)).data;
        // this.setState({
        //     product_new: product_new
        // });

        // var url_product_hit = ip + "/Product/find/hit/";
        // const product_hit = await (await axios.get(url_product_hit)).data;
        // this.setState({
        //     product_hit: product_hit
        // });
    }

    list_product_new() {
        return this.state.product_new.map((product) => {
            return <Col xs={4} xl={4}> <ProductHomeCard product={product}/> </Col>
        });
    }

    list_product_hit() {
        return this.state.product_hit.map((product) => {
            return <Col xs={4} xl={4}> <ProductHomeCard product={product}/> </Col>
        });
    }

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
                    <div id="standate">สินค้าใหม่</div>
                </Row>
                <Row  id="img-standate">
                    <Col xs={2} xl={2} ></Col>
                    {this.list_product_new()}
                    {/* <Col xs={4} xl={4} id="black-img1"> <ProductHomeCard /> </Col>
                    <Col xs={4} xl={4} id="black-img2"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img3"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img4"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img5"> <ProductHomeCard /></Col> */}
                    <Col xs={2} xl={2} ></Col>
                </Row>
                <Row id="hade-standate">
                    <div id="standate">สินค้ายอดนิยม</div>
                </Row>
                <Row  id="img-standate">
                    <Col xs={2} xl={2} ></Col>
                    {this.list_product_hit()}
                    {/* <Col xs={4} xl={4} id="black-img1"> <ProductHomeCard /> </Col>
                    <Col xs={4} xl={4} id="black-img2"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img3"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img4"> <ProductHomeCard /></Col>
                    <Col xs={4} xl={4} id="black-img5"> <ProductHomeCard /></Col> */}
                    <Col xs={2} xl={2} ></Col>
                </Row>
            </Container>
        )
    }
}
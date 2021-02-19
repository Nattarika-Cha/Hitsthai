import React, { Component } from "react";
import { Container, } from 'react-bootstrap';
import { Tabs, Empty, Spin, Row } from 'antd';
import '../../css/Profile.css';
import axios from 'axios';
// import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import ProductTab from './ProductTab';
import { config } from '../../config/config';

const cookies = new Cookies();

var ip = config.ipServer;

const { TabPane } = Tabs;

var mode = "";
var page = "";
var size = "";
export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            catalog: [],
            statusDataCat: false,
            mode: "",
            page: "",
            tab: "",
            catIdOld: "",
            size: 12
        };

        this.callback = this.callback.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            mode: this.props.match.params.mode,
            page: parseInt(this.props.match.params.page),
            tab: this.props.match.params.catid,
            catIdOld: this.props.match.params.catid
            // size: parseInt(this.props.match.params.size)
        });
    }

    async componentDidMount() {
        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog,
            statusDataCat: true
        });
    }

    async componentDidUpdate() {
        // if (this.props.props.match.params.size !== this.state.sizeOld) {  
        if ((this.state.catIdOld !== this.props.match.params.catid)) {
            this.setState({
                tab: this.props.match.params.catid,
                catIdOld: this.props.match.params.catid
            });
        }
    }

    tab_product() {
        return this.state.catalog.map((cat) => {
            return <TabPane tab={cat.catName} key={cat.catId}>
                <ProductTab catId={cat.catId} mode={mode} page={page} size={size} props={this.props} />
            </TabPane>
        });
    }

    callback(key) {
        page = 1;
        this.setState({
            tab: key
        });
    }

    render() {
        mode = this.props.match.params.mode;
        // page = this.props.match.params.page;
        // size = this.props.match.params.size;
        return (
            <Container fluid id="container-productlist">
                {
                    (this.state.statusDataCat) ?
                        (this.state.catalog.length > 0) ?
                            <Tabs activeKey={this.state.tab.toString()} onChange={this.callback}>
                                {this.tab_product()}
                            </Tabs>
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
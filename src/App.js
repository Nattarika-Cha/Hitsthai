/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-image-gallery/styles/css/image-gallery.css";

import { BrowserRouter as Router } from "react-router-dom";
import PageHeader from "./template/Header";
import PageHeader2 from "./template/Header2";
import PageFooter from "./template/Footer";
import LiveChat from "./template/LiveChat";
import Routing from "./routes";
// import bg from './img/bg.svg';
// import { browserHistory } from 'react-router';


//Your initialization
const { Header, Content, Footer } = Layout;
var heightContent = "";
export default class App extends Component {
  render() {
    heightContent = (window.innerHeight - 210 - 64 - 47) + "px";
    console.log(window.innerHeight, " window");
    return (

      // <div className="App">
      //   <header className="App-header">
      //     <Router>
      //       <PageHeader />
      //       <PageHeader2 />
      //       <Routing /> 
      //       <PageFooter />
      //     </Router>
      //   </header>
      // </div>

      <Router>
        <Layout>
          <Layout className="site-layout">
            <div id="back-img">
              <Header id="layout-header" > <PageHeader /> </Header>
              <Header id="layout-header" > <PageHeader2 /> </Header>
              <Content style={{ minHeight: heightContent }}>
                <Routing />
              </Content>
              <Footer style={{ textAlign: 'center' }}><PageFooter /></Footer>
              <LiveChat />
            </div>
          </Layout>
        </Layout>
      </Router>
    );
  }
}


// ReactDOM.render(
//   <Layout>
//     <Sider
//       style={{
//         overflow: 'auto',
//         height: '100vh',
//         position: 'fixed',
//         left: 0,
//       }}
//     >
//       <div className="logo" />
//       <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
//         <Menu.Item key="1" icon={<UserOutlined />}>
//           nav 1
//         </Menu.Item>
//         <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//           nav 2
//         </Menu.Item>
//         <Menu.Item key="3" icon={<UploadOutlined />}>
//           nav 3
//         </Menu.Item>
//         <Menu.Item key="4" icon={<BarChartOutlined />}>
//           nav 4
//         </Menu.Item>
//         <Menu.Item key="5" icon={<CloudOutlined />}>
//           nav 5
//         </Menu.Item>
//         <Menu.Item key="6" icon={<AppstoreOutlined />}>
//           nav 6
//         </Menu.Item>
//         <Menu.Item key="7" icon={<TeamOutlined />}>
//           nav 7
//         </Menu.Item>
//         <Menu.Item key="8" icon={<ShopOutlined />}>
//           nav 8
//         </Menu.Item>
//       </Menu>
//     </Sider>
//     <Layout className="site-layout" style={{ marginLeft: 200 }}>
//       <Header className="site-layout-background" style={{ padding: 0 }} />
//       <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
//         <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
//           ...
//           <br />
//           Really
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           long
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           ...
//           <br />
//           content
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//     </Layout>
//   </Layout>,
//   mountNode,
// );
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import '../css/Footer.css';

import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import { MdForum } from 'react-icons/md';
import { FaFacebookMessenger, FaPhoneAlt, FaTimes, FaMapMarkerAlt, FaLine } from 'react-icons/fa'; //FaCommentDots
// import LineIcon from 'react-lineicons';
import { Tooltip } from 'antd';


export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            isOpen: true
        }
    }

    render() {
        return (
            <FloatingMenu
                slideSpeed={500}
                direction="up"
                isOpen={this.state.isOpen}
                style={{ position: 'fixed', bottom: '20px', right: '3%', zIndex: '100000' }}
            >
                <MainButton
                    iconResting={<Tooltip placement="left" title="ติดต่อเพิ่มเติม"><MdForum style={{ fontSize: 40, color: "aliceblue", padding: "20%" }} /></Tooltip>}
                    iconActive={<Tooltip placement="left" title="ติดต่อเพิ่มเติม"><FaTimes style={{ fontSize: 40, color: "aliceblue", padding: "20%" }} /></Tooltip>}
                    style={{ backgroundColor: '#FF9C00' }}
                    size={50}
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                />

                <ChildButton
                    icon={<Tooltip placement="left" title="ติดต่อเรา"><NavLink to="/Contact"><FaMapMarkerAlt name="comment" style={{ fontSize: 40, color: "aliceblue", padding: "20%" }} /></NavLink></Tooltip>}
                    background='darkred'
                    size={45}
                    //onClick={() => { window.location = "/Request"; }}
                />

                <ChildButton
                    icon={<Tooltip placement="left" title="โทรศัพท์"><FaPhoneAlt style={{ fontSize: 40 , color: "aliceblue", padding: "20%" }} /></Tooltip>}
                    background='teal'
                    size={43}
                    onClick={() => { window.open("tel:+66905436000"); }}
                />


                <ChildButton
                    icon={<Tooltip placement="left" title="Line"><FaLine style={{ fontSize: 50, color: "aliceblue", padding: "20%" }} /></Tooltip>}
                    background='#00C300'
                    size={43}
                    onClick={() => { window.open("http://line.me/ti/p/~hitsthai", "_blank"); }}
                />
                <ChildButton
                    icon={<Tooltip placement="left" title="Facebook"><FaFacebookMessenger style={{ fontSize: 50, color: "aliceblue", padding: "20%" }} /></Tooltip>}
                    background='blue'
                    size={40}
                    onClick={() => { window.open("https://m.me/hits.thai.9", "_blank"); }}
                />
                {/* <ChildButton
                    icon={<NavLink to="/Contact"><FaMapMarkerAlt style={{ fontSize: 50, color: "aliceblue", padding: "20%" }} /></NavLink>}
                    background='darkred'
                    size={50}
                    // onClick={() => { window.open("https://goo.gl/maps/pJUA7Ufye1yqayxY9", "_blank"); }}
                    //onClick={() => { window.location = "/Contact"; }}
                /> */}
            </FloatingMenu>
        )
    }
}


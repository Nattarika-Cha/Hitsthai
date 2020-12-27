import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import '../css/Footer.css';

import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import { MdForum } from 'react-icons/md';
import { FaFacebookMessenger, FaPhoneAlt, FaTimes, FaMapMarkerAlt } from 'react-icons/fa'; //FaCommentDots
import LineIcon from 'react-lineicons';


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
                    iconResting={<MdForum style={{ fontSize: 30, color: "aliceblue" }} />}
                    iconActive={<FaTimes style={{ fontSize: 30, color: "aliceblue" }} />}
                    style={{ backgroundColor: '#FF9C00' }}
                    size={60}
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                />

                <ChildButton
                    icon={<NavLink to="/Contact"><FaMapMarkerAlt name="comment" style={{ fontSize: 50, color: "aliceblue", padding: "20%" }} /></NavLink>}
                    background='darkred'
                    size={50}
                    //onClick={() => { window.location = "/Request"; }}
                />

                <ChildButton
                    icon={
                        <FaPhoneAlt style={{ fontSize: 25, color: "aliceblue" }} />
                    }
                    background='teal'
                    size={50}
                    // onClick={() => { window.open("tel:+66831885535"); }}
                />


                <ChildButton
                    icon={<LineIcon name="line" style={{ fontSize: 25, color: "aliceblue" }} />}
                    background='#00C300'
                    size={50}
                    // onClick={() => { window.open("http://line.me/ti/p/0831885535", "_blank"); }}
                />
                <ChildButton
                    icon={<FaFacebookMessenger style={{ fontSize: 25, color: "aliceblue" }} />}
                    background='blue'
                    size={50}
                    // onClick={() => { window.open("https://web.facebook.com/ptscombinationTH?_rdc=1&_rdr", "_blank"); }}
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


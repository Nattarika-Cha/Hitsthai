import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Abount from "../content/About";
import Product from "../content/Product";
import Contact from "../content/Contact";

// import Davelop from "../content/Davelop";
// import Register from "../content/Register";
import Login from "../content/Login";
import Changepass from "../content/Changepass";
import Profile from "../content/Profile";
import ProductList from "../content/Product/ProductList";
import Logout from "../content/Logout";
import SearchProduct from "../content/SearchProduct";
import ProductDetail from "../content/Product/ProductDetail"
import MemberPoint from "../content/MemberPoint"
import FormRegister from "../content/FormRegister";
export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Abount" component={Abount} />
                <Route exact path="/Product" component={Product} />
                <Route exact path="/Contact" component={Contact} />
                <Route exact path="/Login" component={Login} />
                {/* <Route exact path="/Register" component={Register} /> */}
                <Route exact path="/Changepass" component={Changepass} />
                <Route exact path="/Profile" component={Profile} />
                <Route exact path="/Logout" component={Logout} />

                <Route exact path="/ProductList" component={ProductList} />
                <Route exact path="/ProductDetail/:productId" component={ProductDetail} />
                
                <Route exact path="/ProductList/:catid/:mode" component={ProductList} />

                <Route exact path="/SearchProduct/:mode/:search/:s1/:s2/:s3" component={SearchProduct} />
                <Route exact path="/SearchProduct/:mode/:search/:s1/:s2" component={SearchProduct} />
                <Route exact path="/SearchProduct/:mode/:search/:s1" component={SearchProduct} />
                <Route exact path="/SearchProduct/:mode/:search" component={SearchProduct} />
                <Route exact path="/SearchProduct/:mode" component={SearchProduct} />
                <Route exact path="/MemberPoint" component={MemberPoint} />
                <Route exact path="/FormRegister/:key" component={FormRegister} />
            </Switch>
        );
    }
}

// export default React.createClass( {
//     render() {
//         return (
//             <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route exact path="/Login" component={Login} />
//                 <Route exact path="/Register" component={Register} />
//             </Switch>
//         );
//     }
// });


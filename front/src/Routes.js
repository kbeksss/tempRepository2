import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Products from "./containers/Products/Products";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewProduct from "./containers/NewProduct/NewProduct";
import ProductPage from "./containers/ProductPage/ProductPage";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to='/login'/>
);

const Routes = () => {
    const user = useSelector(state => state.users.user);
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/login' exact component={Login}/>
            <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/products/new' exact component={NewProduct}/>
            <Route path='/products/:id' exact component={ProductPage}/>
        </Switch>
    );
};

export default Routes;

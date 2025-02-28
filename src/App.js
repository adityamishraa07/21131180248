import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ProductList} />
                <Route path="/product/:id" component={ProductDetails} />
            </Switch>
        </Router>
    );
};

export default App;


import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import {Words} from './components/Words.js';
import Inputs from './Inputs';

function App(){
    return(
        <HashRouter>
            <Route path='/' exact={true} component={Inputs}/>
            <Route path='/:word' exact={true} component={Words}/>
        </HashRouter>
    );
}

export {App}
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app.jsx';

class Routes extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={()=><App type="wallet"/>}/>
          <Route path='/wallet' exact render={()=><App type="wallet"/>}/>
          <Route path='/send' exact render={()=><App type="send"/>}/>
          <Route render={()=><App type="wallet"/>}/>
        </Switch>
      </BrowserRouter>
    );
  }//render ends
}

export default Routes;

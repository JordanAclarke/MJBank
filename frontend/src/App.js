import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from './components/Account';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import CloseAccount from './components/DeleteAccount'
function App() {
  return (
    <div style={{height:'100vh'}} >
      <div className="d-flex h-100 w-100" id="wrapper">
       <div className="bg-light border-right" style={{width:"17%"}}id="sidebar-wrapper">
      <div className="sidebar-heading" style={{fontSize: "40px", fontFamily: "'Bangers', cursive", color: "#673ab7"}}>MJ Bank 💸 </div>
      <div className="list-group list-group-flush">
        <a href="/Account" className="list-group-item list-group-item-action bg-light">Accounts</a>
        <a href="/Deposit" className="list-group-item list-group-item-action bg-light">Deposit</a>
        <a href="/Withdraw" className="list-group-item list-group-item-action bg-light">Withdraw</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Transfer</a>
        <a href="/CloseAccount" className="list-group-item list-group-item-action bg-light">Close Account</a>
      </div> 
    </div>
    <div className="container-fluid"style={{width:"83%"}}>
          <Router>
                <Switch>
                    <Route exact path='/Account' component={Account}/>
                    <Route exact path='/Deposit' component={Deposit}/>
                    <Route exact path='/Withdraw' component={Withdraw}/>
                    <Route exact path='/CloseAccount' component={CloseAccount}/>
                </Switch>
            </Router>
      </div>
    </div>
   </div>
    
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from './components/Account';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import CloseAccount from './components/DeleteAccount'
import Home from './components/Home';
import Nav from './components/Nav'
function App() {
  
  return (
    <div style={{height:'100vh'}} >
      <div className="d-flex h-100 w-100" id="wrapper" style={{background: "transparent"}}>
       {/* <div className="bg-light border-right" style={{width:"17%"}}id="sidebar-wrapper"> */}
      {/* <div id ="logo" className="sidebar-heading" style={{fontSize: "40px", fontFamily: "'Bangers', cursive", color: "#673ab7"}}>MJ Bank 💸 </div>
      <div className="list-group list-group-flush">
        <a href="/Account" className="list-group-item list-group-item-action bg-light">Accounts</a>
        <a href="/Deposit" className="list-group-item list-group-item-action bg-light">Deposit</a>
        <a href="/Withdraw" className="list-group-item list-group-item-action bg-light">Withdraw</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Transfer</a>
        <a href="/CloseAccount" className="list-group-item list-group-item-action bg-light">Close Account</a> */}
  {/* </div>
    </div>  */}
    
          <Router>
                <Switch>
                <Route exact path='/' component={Home} />
                    <Route exact path='/Account' > 
                    <Nav />
                    <div className="container-fluid"style={{width:"83%"}}><Account /></div>
                    </Route>
                    <Route exact path='/Deposit' > 
                    <Nav />
                    <div className="container-fluid"style={{width:"83%"}}><Deposit /></div>
                    </Route>
                      <Route exact path='/CloseAccount' >
                        <Nav />
                        <div className="container-fluid"style={{width:"83%"}}><CloseAccount /></div>
                        </Route>
                    

                </Switch>
            </Router>

     </div>
   </div>
    
  );
}

export default App;

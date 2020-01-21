import React, { Component } from 'react';

class  Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  

 
       <div className="bg-light border-right" style={{width:"17%"}}id="sidebar-wrapper">
      <div id ="logo" className="sidebar-heading" style={{fontSize: "40px", fontFamily: "'Bangers', cursive", color: "#673ab7"}}><a href="/" style={{color: "#673ab7", textDecoration: "none" }}>MJ Bank 💸</a> </div>
      <div className="list-group list-group-flush">
        <a href="/Account" className="list-group-item list-group-item-action bg-light">Accounts</a>
        <a href="/Deposit" className="list-group-item list-group-item-action bg-light">Deposit</a>
        <a href="/Withdraw" className="list-group-item list-group-item-action bg-light">Withdraw</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Transfer</a>
        <a href="/CloseAccount" className="list-group-item list-group-item-action bg-light">Close Account</a>
      </div> 
    </div>
        );
    }
}
 
export default Nav;
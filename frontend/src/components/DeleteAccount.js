import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
class DeleteAccount extends Component {
    state = {
        account: {},
        id: '',
        accountNum: '',
        display: false,
        balanceToAdd: '',
        redirectToAllAccounts: false
    }

    getAccount=(e) => {
        e.preventDefault();
        console.log(this.state.id)
        axios.get(`http://localhost:8080/api/getAccount/${this.state.id}`).then((res) => {
        console.log(res.data)    
        this.setState({account: res.data,
        display: true})
        })
    }
    getByAccountNum=(e) => {
        e.preventDefault();
        console.log(this.state.accountNum)
        axios.get(`http://localhost:8080/api/getByAccountNum/${this.state.accountNum}`).then((res) => {
        console.log(res.data)    
        this.setState({account: res.data,
        display: true})
        })
    }
    deleteAccount=(e) => {
        e.preventDefault();
        console.log(this.state.account.balance);
        axios.delete(`http://localhost:8080/api/deleteAccount/${this.state.id}`).then((res) => {
            this.setState({redirectToAllAccounts: true});
        })
    }
    denyDelete=() => {
        this.setState({redirectToAllAccounts: true})
    }

    onChange = (e) => {
        this.setState({id: e.target.value})
        
    }
    balanceOnChange = (e) => {
        this.setState({balance: e.target.value})
        
    }
    accountNumOnChange =(e) => {
        this.setState({accountNum: e.target.value})
    }
    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = await request.json();
        console.log(body);
        // this.setState({accounts:body});
    }
    render() { 
      if(this.state.redirectToAllAccounts) {
        return <Redirect to="/Account" />
      }
        if(this.state.display) {
            return (
                <div>
                <Table className="text-center border border-warning rounded-top ">
                    <thead>
                        <tr style={{color:"white", background:"#673ab7", borderRadius:"10%"}}>
                        <th>A/C Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                       <td>{this.state.account.accountNumber}</td>
                       <td>{this.state.account.firstName}</td>
                       <td>{this.state.account.lastName}</td>
                       <td>$ {(this.state.account.balance)}</td>
                    </tbody>
                    </Table>
                  <Form.Label>Are You Sure You Want To Delete This Account?</Form.Label>
                  &nbsp;&nbsp;
                  <Button variant="outline-danger" onClick={this.deleteAccount}>Yes</Button>
                  &nbsp;&nbsp;
                  <Button variant="outline-warning"onClick={this.denyDelete} >No</Button>
                </div>
            );
            
        }
        return ( <div>
            <h1 className="title" style={{textAlign: "center"}}>😔</h1>
            <form onSubmit={this.getAccount}className="mx-auto mt-5 w-50" >
                {/* <input name="id" type =" text" placeholder="Enter Account ID" value={this.state.id} 
                onChange={this.onChange}
                /> */}
                <Form.Group controlId="Balance" value={this.state.id} 
                onChange={this.onChange}>
                    <Form.Label>Enter Account ID</Form.Label>
                    <Form.Control name="id" type="text" placeholder="AccountID:" />
                </Form.Group>
                <Button style={{color:"white", background:"#673ab7"}} variant="success" type="submit">Submit</Button>
           
            </form>

            <hr></hr>

<form onSubmit={this.getByAccountNum}className="mx-auto mt-5 w-50" >
    {/* <input name="id" type =" text" placeholder="Enter Account ID" value={this.state.id} 
    onChange={this.onChange}
    /> */}
    <Form.Group controlId="Balance" value={this.state.accountNum} 
    onChange={this.accountNumOnChange}>
        <Form.Label>Enter Account Number</Form.Label>
        <Form.Control name="id" type="text" placeholder="Account Number:" />
    </Form.Group>
    <Button style={{color:"white", background:"#673ab7"}} variant="success" type="submit">Submit</Button>
</form>

        </div> );
    }
}
 
export default DeleteAccount;
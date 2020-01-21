import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Popup from "reactjs-popup";
import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
class Deposit extends Component {
    state = {
        account: {},
        id: '',
        accountNum: '',
        display: false,
        balanceToAdd: '',
        redirectToAllAccounts: false,
        desposited: false,
        accounts:[]
    }

    getAccount=(id) => {
        this.setState({id:id});
        axios.get(`http://localhost:8080/api/getAccount/${id}`).then((res) => {
        console.log(res.data)    
        this.setState({account: res.data,
        display: true})
        })
    }

    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = await request.json();
        console.log(body);
        this.setState({accounts:body});
    }

    deposit=(e) => {
        e.preventDefault();
        console.log(this.state.account.balance);
    
        // axios.put(`http://localhost:8080/api/deposit/${this.state.id}balance=${this.state.balance}`)
        let formData = new FormData();
        formData.append("balance",this.state.balanceToAdd)
        axios.put(`http://localhost:8080/api/deposit/${this.state.id}?balance=${this.state.balance}`).then((res) => {
            this.setState({account: res.data, redirectToAllAccounts: true, desposited: true});
        })
    }

   
    balanceOnChange = (e) => {
        this.setState({balance: e.target.value})
    }
    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = await request.json();
        this.setState({accounts:body});
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
                    <form onSubmit={this.deposit} className="mx-auto mt-5 w-50" >
                <Form.Group controlId="Balance" value={this.state.account.balance} onChange={this.balanceOnChange}>
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control name="balance" type="text" placeholder="Enter Deposit Amount" />
                </Form.Group>
                <Button style={{color:"white", background:"#673ab7"}} variant="success" type="submit">Submit</Button>
    
                </form>
                </div>
            );
        }
        const filterByFields = ['accountNumber','firstName','lastName','ssNo'];
        const {accounts} =this.state;
        return ( <div>
            <h1 className="title" style={{textAlign: "center"}}>🏧</h1>
            <Typeahead
          filterBy={filterByFields}
          labelKey="accountNumber"
          options={accounts}
          placeholder="Search by A/C Number, First Name, Last Name or SSNO"
          renderMenuItemChildren={(option) => (
            <div onClick={()=>this.getAccount(option.id)}>
              <div>
                 <h6>{option.firstName} {option.lastName}</h6>
                <small>A/C Number: {option.accountNumber}</small>
              </div>
            </div>
          )}
        />
        </div> );
    }
}
 
export default Deposit;
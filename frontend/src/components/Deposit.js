import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Popup from "reactjs-popup";
import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import Modal from 'react-bootstrap/Modal';


class Deposit extends Component {
    state = {
        account: {},
        id: '',
        accountNum: '',
        balanceToAdd: '',
        redirectToAllAccounts: false,
        desposited: false,
        accounts:[],
        show:false
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

    withdraw=(e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("balance",this.state.balanceToAdd)
        axios.put(`http://localhost:8080/api/withdraw/${this.state.id}?balance=${this.state.balance}`).then((res) => {
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

    setShow=(a,id)=>{
        this.setState({show:a, id:id})
        this.getAccount(id);
    }
    setnotShow=(a)=>{
        this.setState({show:a, id:''})
    }
    
    render() { 
      
      if(this.state.redirectToAllAccounts) {
        return <Redirect to="/Account" />
      }
       
        const filterByFields = ['accountNumber','firstName','lastName','ssNo'];
        const {accounts,account} =this.state;
        return ( <div>
            <h1 className="title" style={{textAlign: "center"}}>🏧</h1>
            <Container style={{width:"40%", marginTop:"10%"}}>
                    <h6>Search Account:</h6>
                    <Typeahead
                    filterBy={filterByFields}
                    labelKey="accountNumber"
                    options={accounts}
                    placeholder="Search by A/C Number, First Name, Last Name or SSNO"
                    renderMenuItemChildren={(option) => (
                        <div onClick={()=>this.setShow(true,option.id)}>
                        <div>
                            <h6>{option.firstName} {option.lastName}</h6>
                            <small>A/C Number: {option.accountNumber}</small>
                        </div>
                        </div>
                    )}
                    />


        <Modal
            size="lg"
            show={this.state.show}
            onHide={this.setnotShow.bind(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title-lg"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title-lg">
          {account.firstName} {account.lastName}<br/>A/C No: {account.accountNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h6>Balance: {account.balance}</h6>
            </div>
        <form onSubmit={this.deposit} className="mx-auto mt-5 w-50" >
                <Form.Group controlId="Balance" value={this.state.account.balance} onChange={this.balanceOnChange}>
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control name="balance" type="text" placeholder="Enter Deposit Amount" />
                </Form.Group>
                <Button style={{color:"white", background:"#673ab7"}} variant="success" type="submit">Deposit</Button>
    
        </form>

        <form onSubmit={this.withdraw} className="mx-auto mt-5 w-50" >
                <Form.Group controlId="Balance" value={this.state.account.balance} onChange={this.balanceOnChange}>
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control name="balance" type="text" placeholder="Enter Deposit Amount" />
                </Form.Group>
                <Button style={{color:"white", background:"#673ab7"}} variant="success" type="submit">Withdraw</Button>
    
        </form>

        </Modal.Body>
      </Modal>
           </Container>
        </div> );
    }
}
 
export default Deposit;
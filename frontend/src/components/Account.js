import React, { Component } from 'react';
import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import {axios} from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class Account extends Component {
 
    state = { viewtable:true,
             accounts:[],
             newaccount: {
                 firstName:'',
                 lastName:'',
                 address:'',
                 ssNo:'',
                 openingDeposit:''
             } }
 
    viewacc=()=>{
        this.setState({viewtable:true})
    }
    viewform=()=>{
        this.setState({viewtable:false})
    }

    onChange = (e) => {
        let copied = {...this.state.newaccount}
        copied[e.target.name] = e.target.value;
        this.setState({newaccount: copied});
        
    }

    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = await request.json();
        console.log(body);
        this.setState({accounts:body});
    }

    createaccount = () =>
    {
        axios.post('http://localhost:8080/api/addAccount',this.state.newaccount).then((res)=>{
            console.log(res);
        }).catch(error =>{console.log(error)})
        
    }
    
    
    render() { 
        const {accounts} = this.state;
        var form;
        if(!this.state.viewtable){
        form =  <div className="mx-auto mt-5 w-50">
            <div >
                <Form.Group controlId="FirstName" value={this.state.newaccount.firstName} onChange={this.onChange}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="text"  placeholder="Please Enter First Name" />
                </Form.Group>
    
                <Form.Group controlId="LastName" value={this.state.newaccount.lastName} onChange={this.onChange}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="text"  placeholder="Please Enter Last Name" />
                </Form.Group>
    
                <Form.Group controlId="Address" value={this.state.newaccount.address} onChange={this.onChange}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" type="text"  placeholder="Please Enter Address" />
                </Form.Group>
    
                <Form.Group controlId="Ss" value={this.state.newaccount.ssNo} onChange={this.onChange}>
                    <Form.Label>SS#</Form.Label>
                    <Form.Control name="ssNo" type="password"  placeholder="Please Enter SS Number" />
                </Form.Group>
    
                <Form.Group controlId="Opening Deposit" value={this.state.newaccount.openingDeposit} onChange={this.onChange}>
                    <Form.Label>Opening Deposit</Form.Label>
                    <Form.Control name="openingDeposit" type="text" placeholder="Minimum amount $500.00" />
                </Form.Group>
                
                <Button variant="primary" onClick={this.createaccount}>
                    Submit
                </Button>
            </div>
        </div>;
        }else{
            form =<div className="mx-auto mt-5">
                <Table responsive className="text-center border border-warning rounded-top ">
                    <thead>
                        <tr style={{color:"white", background:"#673ab7", borderRadius:"10%"}}>
                        <th>A/C Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                       {accounts.map((account) =>  (<tr>
                       <td>{account.accountNumber}</td>
                       <td>{account.firstName}</td>
                       <td>{account.lastName}</td>
                       <td>{account.address}</td>
                       <td>$ {(account.balance).toFixed(2)}</td>
                        </tr>))}
                    </tbody>
                    </Table>
            </div>;
        }
    
        return ( <div>
            <Container >
            <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={this.viewacc} >View All Accounts</Nav.Link>
             </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={this.viewform}>Add New Account</Nav.Link>
            </Nav.Item>
            </Nav>
          
            {form}
   
    
    </Container></div> );
    }
}
 
export default Account ;
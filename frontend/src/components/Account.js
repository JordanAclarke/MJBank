import React, { Component } from 'react';
import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';



class Account extends Component {
 
    state = { viewtable:true,
             accounts:[],

             newaccount: {} ,

             newaccount: {
                 firstName:'',
                 lastName:'',
                 address:'',
                 ssNo:'',
                 openingBalance:''
             },
             show:false,
             accountNumber:'',
             Transaction:[]
            } 

 
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
        this.setState({accounts:body});
    }

    getAccount=(e) => {
        e.preventDefault();
        console.log(this.state.id)
        axios.get(`http://localhost:8080/api/getAccount/${this.state.id}`).then((res) => {
        console.log(res.data)    
        this.setState({singleAccount: res.data})
        })
    }

    createaccount = () =>
    {
        

        console.log(this.state)
        axios.post('http://localhost:8080/api/addAccount/',this.state.newaccount).then(()=>{
            this.componentDidMount();


        }).catch(error =>{console.log(error)})
        
    }

    setShow=(a,accountNumber)=>{
        this.setState({show:a, accountNumber:accountNumber})
        axios.get('http://localhost:8080/api/transactions/'+accountNumber).then((res)=>{
            this.setState({Transaction:res.data});
        })
    }
    setnotShow=(a)=>{
        this.setState({show:a})
    }
    

    
    
    render() { 
        const {accounts} = this.state;
        var form;
        if(!this.state.viewtable){
        form =  <div className="mx-auto mt-5 w-50">

            <div >
                <form onSubmit={this.createaccount}>

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
    
                <Form.Group controlId="Opening Deposit" value={this.state.newaccount.openingBalance} onChange={this.onChange}>
                    <Form.Label>Opening Deposit</Form.Label>
                    <Form.Control name="openingBalance" type="text" placeholder="Minimum amount $500.00" />
                </Form.Group>
                
                <input type="submit" />
                <Form />
                </form>
            </div>

                <Button variant="primary" type="submit" onClick={this.createaccount}>
                    Submit
                </Button>
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
                       {accounts.map((account) =>  (<tr onClick={() => this.setShow(true,account.id)}>
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

        
            <Modal
            size="xl"
            show={this.state.show}
            onHide={this.setnotShow.bind(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title-xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title-xl">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {this.state.Transaction.map((trans) => <p>
            {trans.id}
            {trans.type}
            {trans.date}
            {trans.amount}
          </p>)}
        </Modal.Body>
      </Modal>
   
    
    </Container></div> );
    }
}
 
export default Account ;
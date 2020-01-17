import React, { Component } from 'react';
import { Container,Form,Button,Nav} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { viewtable:false, accounts:[] }
      
    }
 
    viewacc=()=>{
        this.setState({viewtable:true})
    }
    viewform=()=>{
        this.setState({viewtable:false})
    }

    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = request.json();
        console.log(body);
        this.setState({accounts:body});
    }
    
    
    render() { 
        var form;
        if(!this.state.viewtable){
        form =  <div className="mx-auto mt-5 w-50">
            <Form>
                <Form.Group controlId="FirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Please Enter First Name" />
                </Form.Group>
    
                <Form.Group controlId="LastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Please Enter Last Name" />
                </Form.Group>
    
                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Please Enter Address" />
                </Form.Group>
    
                <Form.Group controlId="Ss">
                    <Form.Label>SS#</Form.Label>
                    <Form.Control type="text" placeholder="Please Enter SS Number" />
                </Form.Group>
    
                <Form.Group controlId="Opening Deposit">
                    <Form.Label>Opening Deposit</Form.Label>
                    <Form.Control type="text" placeholder="Minimum amount $500.00" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
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
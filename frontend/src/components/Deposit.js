import React, { Component } from 'react';
import axios from 'axios';
import { Container,Form,Button,Nav,Table} from 'react-bootstrap';
class Deposit extends Component {
    state = {
        account: {},
        id: '',
        display: false,
        balanceToAdd: ''
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
    deposit=(e) => {
        e.preventDefault();
        console.log(this.state.account.balance)
        // axios.put(`http://localhost:8080/api/deposit/${this.state.id}balance=${this.state.balance}`)
        let formData = new FormData();
        formData.append("balance",this.state.balanceToAdd)
        axios.put(`http://localhost:8080/api/deposit/${this.state.id}?balance=${this.state.balance}`).then((res) => {
            this.setState({account: res.data});
        })
    }

    onChange = (e) => {
        this.setState({id: e.target.value})
        
    }
    balanceOnChange = (e) => {
        this.setState({balance: e.target.value})
        
    }
    async componentDidMount(){
        const request = await fetch('http://localhost:8080/api/getAllAccounts');
        const body = await request.json();
        console.log(body);
        // this.setState({accounts:body});
    }
    render() { 
      
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
                    <form onSubmit={this.deposit}>
                <Form.Group controlId="Balance" value={this.state.account.balance} onChange={this.balanceOnChange}>
                    <Form.Label>Deposit</Form.Label>
                    <Form.Control name="balance" type="text" placeholder="Minimum amount $500.00" />
                </Form.Group>
                
                <input type="submit" />
                </form>
                </div>
            );
        }
        return ( <div>
            <form onSubmit={this.getAccount}>
                <input name="id" type =" text" placeholder="Enter Account ID" value={this.state.id} 
                onChange={this.onChange}
                />
                <input type="submit" />
            </form>
        </div> );
    }
}
 
export default Deposit;
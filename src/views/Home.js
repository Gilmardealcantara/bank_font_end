import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from '../components/Header' 
import ClientTable from '../components/ClientTable' 
import FormCreate from '../components/FormCreate' 

const API = 'http://localhost:8080/api/'

class Home extends Component {
 	constructor(props){
    super(props);
		this.fetchClients = this.fetchClients.bind(this);
		this.setOperation = this.setOperation.bind(this);
    this.state = { 
			op: 1, // 0 criar cliente, 1 listar cliente, 2 listar contas, 3 listar transações
			isLoading: true,
			clients: [],
			accounts: [],
			transactions: []
		}
  }
	
	fetchClients(){
  	fetch(API + 'clients')
    	.then((response) => response.json())
    	.then((responseJson) => {
				console.log(responseJson)
				this.setState({isLoading: false, clients: responseJson});	
			})
      .catch((error) =>{
        console.error(error);
   	});
	}

	setOperation(op){
		console.log(op);
	}	

	componentDidMount(){
  	this.fetchClients();
	}
  
	render() {
		return (
			<Router>
				<div>
					<Header/>
					<hr />
					<Route exact path="/" render={()=><ClientTable clients={this.state.clients}/>} />
					<Route exact path="/create" render={()=><FormCreate API={API} setOp={this.setOperation}/>} />
				</div>
			</Router>
		);
  }
}

export default Home;

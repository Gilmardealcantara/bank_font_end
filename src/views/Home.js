import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from '../components/Header' 
import ClientTable from '../components/ClientTable' 
import AccountTable from '../components/AccountTable' 
import FormCreate from '../components/FormCreate' 

const API = 'http://localhost:8080/api/'

class Home extends Component {
 	constructor(props){
    super(props);
		this.fetchClients = this.fetchClients.bind(this);
    this.state = { 
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
					<Route exact path="/accountslist" render={()=><AccountTable clients={this.state.clients}/>} />
					<Route exact path="/create" render={()=><FormCreate API={API} setOp={this.setOperation}/>} />
				</div>
			</Router>
		);
  }
}

export default Home;

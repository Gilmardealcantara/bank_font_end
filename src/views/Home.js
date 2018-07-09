import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../components/Header' 
import ClientTable from '../components/ClientTable' 
import AccountTable from '../components/AccountTable' 
import TransactionsTable from '../components/TransactionsTable' 
import FormCreate from '../components/FormCreate' 

const API = 'http://localhost:8080/api/'

class Home extends Component {
 	constructor(props){
    super(props);
		this.fetchClients = this.fetchClients.bind(this);
    this.state = { 
			isLoading: true,
			clients: [],
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


	fetchTransactions(){
  	fetch(API + 'transactions')
    	.then((response) => response.json())
    	.then((responseJson) => {
				console.log(responseJson)
				this.setState({isLoading: false, transactions: responseJson});	
			})
      .catch((error) =>{
        console.error(error);
   	});
	}

	componentDidMount(){
  	this.fetchClients();
  	this.fetchTransactions();
	}
  
	render() {
		return (
      <Container>
        <Row>
          <Col>
						<Router>
							<div>
								<Header/>
								<hr />
								<Route exact path="/" render={()=><ClientTable clients={this.state.clients}/>} />
								<Route exact path="/accountslist" render={()=><AccountTable clients={this.state.clients}/>} />
								<Route exact path="/transactionslist" render={()=><TransactionsTable transactions={this.state.transactions}/>} />
								<Route exact path="/create" render={()=><FormCreate API={API} setOp={this.setOperation}/>} />
							</div>
						</Router>
          </Col>
        </Row>
      </Container>
		);
  }
}

export default Home;

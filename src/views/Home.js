import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Header from '../components/Header' 
import ClientTable from '../components/ClientTable' 
import FormCreate from '../components/FormCreate' 

const API = 'http://localhost:8080/api/'

//<ClientTable clients={this.state.clients}/>
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
      <Container>
        <Row>
          <Col>
						<Header/>
          </Col>
        </Row>
        <Row style={{padding: 10}}>
          <Col>
            <FormCreate/>
          </Col>
        </Row>
      </Container>
		);
  }
}

export default Home;

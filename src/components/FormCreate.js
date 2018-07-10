import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from "react-router-dom";

import swal from 'sweetalert';

export default class FormCreate extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			name:"", 
			age: 0,
			addr: {
				street: "",
				number: 0,
				city: "",
				state: "",
				country: "",
				zipcode: "" 
			},
			account: {
				number: 0, 
				balance: 0
			}
		}
	}

	sendData(){
		if(this.state.name === "" || this.state.age === 0){
  		swal("Dados Obrigatórios!", "Nome e Idade!", "warning");
			return;
		}
		fetch(this.props.API + 'clients',
			{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(this.state)
			})
    		.then((response) => response.json())
    		.then((responseJson) => {
  				swal("Sucesso", "Novo cliente e conta adicionados!", "success");
					console.log(responseJson)
				})
      	.catch((error) =>{
  				swal("Falha!", error, "error");
   	});
	}

	render() {
   	return (
			<div>
				<Form>
					<h6 style={{"textAlign": "center"}}>Dados Do Cliente</h6>
					<FormGroup row>
						<Label for="clientName" sm={1}>Nome</Label>
						<Col sm={9}>
							<Input 
								type="text" 
								id="clientName" 
								value={this.state.name}
								onChange={(e) => this.setState({name: e.target.value})}
							/>
						</Col>
						<Label for="clientAge" sm={1}>Idade</Label>
						<Col sm={1}>
							<Input 
								type="number" 
								id="clientAge" 
								value={this.state.age}
								onChange={(e) => this.setState({age: e.target.value})}
							/>
						</Col>
					</FormGroup>
				</Form>
				<hr />
				<Form>
					<h6 style={{"textAlign": "center"}}>Endereço</h6>
					<FormGroup row>
						<Label for="clientStreet" sm={1}>Rua/Av</Label>
						<Col sm={9}>
							<Input 
								type="text" 
								id="clientStreet" 
								value={this.state.addr.street}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.street = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col>
						<Label for="clientNum" sm={1}>Número</Label>
						<Col sm={1}>
							<Input 
								type="number" 
								id="clientNum" 
								value={this.state.addr.number}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.number = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col> 
					</FormGroup>
					<FormGroup row>
						<Label for="clientCity" sm={1}>Cidade</Label>
						<Col sm={3}>
							<Input  
								type="text" 
								id="clientCity" 
								value={this.state.addr.city}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.city = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col>
						<Label for="clientState" sm={1}>Estado</Label>
						<Col sm={1}>
							<Input  
								type="text" 
								id="clientState" 
								value={this.state.addr.state}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.state = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col>
						<Label for="clientCountry" sm={1}>País</Label>
						<Col sm={2}>
							<Input  
								type="text" 
								id="clientCountry" 
								value={this.state.addr.country}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.country = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col> 
						<Label for="clientZipCode" sm={1}>CEP</Label>
						<Col sm={2}>
							<Input  
								type="text" 
								id="clientZipCode" 
								value={this.state.addr.zipcode}
								onChange={(e) => {
									let new_addr = this.state.addr;
									new_addr.zipcode = e.target.value;	
									this.setState({addr: new_addr})
								}}
							/>
						</Col>
					</FormGroup>
				</Form>
				<hr />
				<Form>
					<h6 style={{"textAlign": "center"}}>Dados Da conta</h6>
					<FormGroup row>
						<Label for="clientBalance" sm={2}>Saldo Inicial</Label>
						<Col sm={{ size: 2, order: 2, offset: 3 }}>
							<Input 
								type="number" 
								id="clientBalance" 
								value={this.state.account.balance}
								onChange={(e) => {
									let new_acc = this.state.account;
									new_acc.balance = e.target.value;	
									this.setState({account: new_acc})
								}}
							/>
						</Col>
					</FormGroup>
				</Form>
				<hr />
				<Row>
					<Col sm={{ size: 8, offset: 2}}>
						<Link to="/">
							<Button color="secondary">Voltar</Button>
						</Link>	
				 	</Col>
					<Col sm={{ size: 2}}>
						<Button 
							color="success"
							onClick={this.sendData.bind(this)}
						>Adicionar Cliente</Button>
				 	</Col>
				</Row>
			</div>
    );
  }
}

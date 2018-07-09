import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
		console.log(this.state);
	}

	render() {
    return (
			<div>
				<Form>
					<h6 style={{"textAlign": "center"}}>Dados Do Cliente</h6>
					<FormGroup row>
						<Label for="clientName" sm={2}>Nome</Label>
						<Col sm={7}>
							<Input 
								type="text" 
								id="clientName" 
								value={this.state.name}
								onChange={(e) => this.setState({name: e.target.value})}
							/>
						</Col>
						<Label for="clientAge" sm={1}>Idade</Label>
						<Col sm={2}>
							<Input 
								type="number" 
								id="clientAge" 
								value={this.state.age}
								onChange={(e) => this.setState({age: e.target.value})}
							/>
						</Col>
					</FormGroup>
				</Form>
				<Form>
					<h6 style={{"textAlign": "center"}}>Endereço</h6>
					<FormGroup row>
						<Label for="clientStreet" sm={2}>Rua/Avenida</Label>
						<Col sm={7}>
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
						<Col sm={2}>
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
						<Label for="clientCity" sm={2}>Cidade</Label>
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
						<Col sm={2}>
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
						<Col sm={3}>
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
					</FormGroup>
				</Form>
				<Form>
					<h6 style={{"textAlign": "center"}}>Dados Da conta</h6>
					<FormGroup row>
						<Label for="clientBalance" sm={2}>Saldo Inicial</Label>
						<Col sm={4}>
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
				<Row><Col sm={{ size: 4, order: 2, offset: 10 }}>
					<Button 
						color="success"
						onClick={this.sendData.bind(this)}
					>Adicionar Cliente</Button>
				</Col></Row>

			</div>
    );
  }
}
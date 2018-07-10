import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Badge, Button, Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from "react-router-dom";

import swal from 'sweetalert';

class NewTransaction extends Component {
 	constructor(props){
		super(props);
		this.state = {
			value: 0,
      dest_acc: "0000000000"
		}
	} 
	
	numberFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return val ;
	}

	sendData(send, rcv){
		fetch(this.props.API + 'transactions',
 			{
	 			method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					value: this.state.value,
					send: {id: send.id},
					rcv: {id: rcv.id}
				})
			})
    		.then((response) => response.json())
    		.then((responseJson) => {
					swal(
						"Sucesso", 
						"Transferencia Realizada!\nSaldo Atual:" + responseJson.send.balance, 
						"success");
				})
      	.catch((error) =>{
  				swal("Falha!", error, "error");
   	});
	}
	
	checkData(send){
		if(this.state.dest_acc === "" || this.state.value === 0){
  		swal("Dados Obrigatórios!", "Valor e Conta de destino!", "warning");
			return;
		}
		
    if(this.state.dest_acc.length != 10){
  		swal("Error!", "Conta deve ter exatamente 10 digitos!", "warning");
			return;
		}
    let dest_cli = this.props.clients.filter((c) => {return c.account.id === Number(this.state.dest_acc)})[0]
    
    if(!dest_cli){
  		swal("Error!", "Conta não extiste", "warning");
			return;
		}
		
		swal({
			title: "Confirmar Tranferência",
			text:   "Seu Saudo Atual: 	R$ " + send.account.balance.toFixed(2) + 
							"\nDestintário: 		" + dest_cli.name + 
							"\nConta:   				" + this.state.dest_acc + 
							"\nVALOR: 					R$ " + this.state.value.toFixed(2),
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				this.sendData(send.account, dest_cli.account);
			} else {
				swal("Transação cancelada");
			}
		}); 
	}

	render() {
    const url = new URL(window.location.href);
    const client_id = url.searchParams.get('client_id');
    let client = this.props.clients.filter((c) => {return c.id === Number(client_id)})[0];
		
		if(!client){
      return (<div>Carrengando...</div>)
    }

    if(client.length <= 0){
      return (<div>Client não encontrado</div>)
    }
		
    const now = new Date();
    
		return (
			<div>
        <div>
					<Link to="/">
						<Button size="sm" color="secondary">Voltar</Button>
					</Link>	
					<h4 style={{"textAlign": "center"}}>Nova Transação</h4>
				<Row>
          <Col sm={8}> 
            <h5><Badge color="success">Nome</Badge>{" " + client.name}</h5>
          </Col> 
          <Col sm={4}> 
            <h5><Badge color="success">Conta</Badge>{this.numberFormat(client.account, client[0])}</h5>
          </Col> 
        </Row>
        <Row>
          <Col sm={8}> 
            <h5><Badge color="success">Data: </Badge>{ " " + now.toLocaleDateString() }</h5>
          </Col> 
          <Col sm={4}> 
            <h5><Badge color="success">Horário: </Badge>{ " " + now.toLocaleTimeString() }</h5>
          </Col> 
        </Row>
        <Row>
          <Col sm={4}> 
            <h5><Badge color="primary">Saldo Atual: </Badge>{ " R$ " + client.account.balance.toFixed(2) }</h5>
          </Col> 
        </Row>
        <Row>
          <Col>
            <Form style={{padding: '30px'}}>
              <FormGroup row>
                <Col sm={4}>
                  <Label for="value" >Valor a ser transferido</Label>
                  <Input 
                    type="number" 
                    id="value" 
                    value={this.state.value}
                    onChange={(e) => {this.setState({value: Number(e.target.value)})}}
                  />
                </Col>
                <Col sm={4}>
                  <Label for="acc" >Conta de Destino</Label>
                  <Input 
                    type="text" 
                    id="acc" 
                    value={this.state.dest_acc}
                    onChange={(e) => {this.setState({dest_acc: e.target.value})}}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
				<hr />
				<Row>
					<Col sm={10}>
						<Link to="/">
							<Button color="secondary">Voltar</Button>
						</Link>	
				 	</Col>
					<Col sm={{ size: 2}}>
						<Button 
							color="success"
							onClick={() => this.checkData(client)}
						>Efetuar Transferência</Button>
				 	</Col>
				</Row>
				</div>
			</div>
    );
  }
}

export default NewTransaction;

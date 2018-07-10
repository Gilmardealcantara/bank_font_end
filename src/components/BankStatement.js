import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Badge, Button, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class BankStatement extends Component {
 	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	} 
	
	numberFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return val ;
	}
	

	calcStatements(cli, trans){
		let data = [];
    let current_balance = cli.account.balance;
		trans.reverse().forEach((t) => {
			if(cli.account.id === t.send.id){
        let row = {}
				row['date'] = new Date(t.createdAt).toLocaleString();
				row['event'] = 'Envio de dinheiro para ' + this.numberFormat(t.rcv, t)
				row['value'] = 'R$ -' + t.value.toFixed(2);
				row['real_value'] = - t.value;
        current_balance -= t.value;
				row['balance'] = 'R$ ' + current_balance.toFixed(2);
				data.push(row) 
			}else if(cli.account.id === t.rcv.id){
				let row = {}
				row['date'] = new Date(t.createdAt).toLocaleString();
				row['event'] = 'Recebimento de dinheiro de ' + this.numberFormat(t.send, t)
				row['value'] = 'R$ ' + t.value.toFixed(2);
				row['real_value'] = t.value;
        current_balance += t.value;
				row['balance'] = 'R$ ' + current_balance.toFixed(2);
				data.push(row)
			}
		});
		return data;
	}
	
  trStyle = (row, rowIndex) => {
			if(row.real_value < 0)
	    	return { backgroundColor: '#FFFAFA', color: 'red' };
			else
	    	return { backgroundColor: '#FFFAFA', color: 'green' };
	}


	render() {
    const url = new URL(window.location.href);
    const client_id = url.searchParams.get('client_id');
    let client = this.props.clients.filter((c) => {return c.id === Number(client_id)})[0];
		
		if(!client){
      return (<div>Carrengando...</div>)
    }
		
		if(this.props.transactions.length <= 0){
      return (<div>Client ainda não possui transações</div>)
    }

    if(client.length <= 0){
      return (<div>Client não encontrado</div>)
    }
		
    const now = new Date();
   	let data = this.calcStatements(client, this.props.transactions); 
    
		return (
			<div>
        <div>
					<Link to="/">
						<Button size="sm" color="secondary">Voltar</Button>
					</Link>	
					<h4 style={{"textAlign": "center"}}>Extrato Bancário</h4>
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
				</div>
        <hr/>
				<h4 style={{"textAlign": "center"}}>Movimentações</h4>
        <BootstrapTable data={ data } trStyle={ this.trStyle } pagination>
					<TableHeaderColumn dataField='date' isKey width='200'>Data</TableHeaderColumn>
					<TableHeaderColumn dataField='event' > Lançamento</TableHeaderColumn>
					<TableHeaderColumn dataField='value' width='200'>Valor</TableHeaderColumn>
					<TableHeaderColumn dataField='balance' width='200'>Saldo</TableHeaderColumn>
				</BootstrapTable>
			</div>
    );
  }
}

export default BankStatement;

import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button, ButtonGroup} from 'reactstrap';
import { Link } from "react-router-dom";

class ClientTable extends Component {
	
	accountFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return (
      <div>
			<ButtonGroup>
      	<Button outline size="sm" color="primary" disabled>{val}</Button>
				<Link to={"/statement?client_id=" + row.id}>
      	  <Button outline size="sm" color="primary">Extrato</Button>
				</Link>	
				<Link to={"/newtrans?client_id=" + row.id}>
      	  <Button outline size="sm" color="success">Nova Transação</Button>
				</Link>	
			</ButtonGroup>
      </div>
    );
	}

	addrFormat(cell, row){
		return(
			<div>
				<div> {cell.street + ", " + cell.number + ", " + cell.city} </div> 
				<div> { cell.state + ", " +  cell.country + ", " + cell.zipcode} 
				</div>
			</div>
		)
	}
  
	render() {
    return (
			<div>
				<h4 style={{"textAlign": "center"}}>Lista de Clientes</h4>
				<BootstrapTable data={ this.props.clients } pagination>
					<TableHeaderColumn dataField='account' dataFormat={this.accountFormat} width='30%' isKey>Conta</TableHeaderColumn>
					<TableHeaderColumn dataField='name' width='30%'>Nome do Cliente</TableHeaderColumn>
					<TableHeaderColumn dataField='age'  width='10%'>Idade</TableHeaderColumn>
					<TableHeaderColumn dataField='addr' dataFormat={this.addrFormat} width='30%'>Endereço</TableHeaderColumn>
				</BootstrapTable>
			</div>
    );
  }
}

export default ClientTable;

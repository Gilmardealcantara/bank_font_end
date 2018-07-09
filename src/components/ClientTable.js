import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'reactstrap';

class ClientTable extends Component {
	
	accountFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return (
      <div>
      {val} <Button outline size="sm" color="primary">Extrato</Button>
      </div>
    );
	}

	addrFormat(cell, row){
		return(
			<div>
				<div> {cell.street + ", " + 
					cell.number + ", " + 
					cell.city 	 + ", " + 
					cell.state + ", " + 
					cell.country + ", " + 
					cell.zipcode} 
				</div>
			</div>
		)
	}
  
	render() {
    return (
			<div>
				<h4 style={{"textAlign": "center"}}>Lista de Clientes</h4>
				<BootstrapTable data={ this.props.clients }>
					<TableHeaderColumn dataField='account' dataFormat={this.accountFormat} isKey>Número da Conta</TableHeaderColumn>
					<TableHeaderColumn dataField='name'>Nome do Cliente</TableHeaderColumn>
					<TableHeaderColumn dataField='age'>Idade</TableHeaderColumn>
					<TableHeaderColumn dataField='addr' dataFormat={this.addrFormat}>Endereço</TableHeaderColumn>
				</BootstrapTable>
			</div>
    );
  }
}

export default ClientTable;

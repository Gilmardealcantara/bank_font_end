import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ClientTable extends Component {
	
	accountFormat(cell, row){
		return(
			<div>
				<div> {cell.id }</div>
			</div>
		)
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

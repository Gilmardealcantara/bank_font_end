import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class AccountTable extends Component {
	
	numberFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return val ;
	}
	
	balanceFormat(cell, row){
		return 'R$ ' + cell.balance.toFixed(2);
	}

	createFormat(cell, row){
		return new Date(cell.createdAt).toLocaleString();
 	}
 
	updateFormat(cell, row){
		return new Date(cell.updatedAt).toLocaleString();
	}
	
	render() {
    return (
			<div>
				<h4 style={{"textAlign": "center"}}>Saldo da Conta de Todos os Clientes</h4>
				<BootstrapTable data={ this.props.clients }>
					<TableHeaderColumn dataField='name'>Nome do Cliente</TableHeaderColumn>
					<TableHeaderColumn dataField='account' dataFormat={this.numberFormat} isKey>Número da Conta</TableHeaderColumn>
					<TableHeaderColumn dataField='account' dataFormat={this.balanceFormat} >Saldo</TableHeaderColumn>
					<TableHeaderColumn dataField='account' dataFormat={this.createFormat} >Data de Criação</TableHeaderColumn>
					<TableHeaderColumn dataField='account' dataFormat={this.updateFormat} >Ultima atualização</TableHeaderColumn>
				</BootstrapTable>
			</div>
    );
  }
}

export default AccountTable;

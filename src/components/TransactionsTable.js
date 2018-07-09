import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TransactionsTable extends Component {
	
	numberFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return val ;
	}
	
	valueFormat(cell, row){
		return 'R$ ' + cell.toFixed(2);
	}

	dateFormat(cell, row){
		return new Date(cell).toLocaleString();
 	}
	
	accFormat(cell, row){
		let val = cell.id.toString();
		for(var i = val.length; i < 10; i++) val = '0' + val;
		return val;
	}
	
	render() {
		/*let today = new Date().toLocaleDateString();
		let transactions = this.props.transactions.filter((t) => {
					return today === (new Date(t.createdAt).toLocaleDateString())
		})
		*/
    return (
			<div>
				<h4 style={{"textAlign": "center"}}>Log Diário de Transações</h4>
				<BootstrapTable data={ this.props.transactions }>
					<TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
					<TableHeaderColumn dataField='createdAt' dataFormat={this.dateFormat} >Data</TableHeaderColumn>
					<TableHeaderColumn dataField='send' dataFormat={this.accFormat}>Conta Depositante</TableHeaderColumn>
					<TableHeaderColumn dataField='value' dataFormat={this.valueFormat}>Valor Transferido</TableHeaderColumn>
					<TableHeaderColumn dataField='rcv' dataFormat={this.accFormat}>Conta Beneficiada</TableHeaderColumn>
				</BootstrapTable>
			</div>
    );
  }
}

export default TransactionsTable;

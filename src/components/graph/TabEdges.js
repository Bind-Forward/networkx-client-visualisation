import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const TabEdges = ({ edges, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked, centralitySort }) => {
	const rowEvents = setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked);
	console.log(edges)	
	let tmpEdges = Object.assign([], edges.map((edge, idx) => {
		edge.id = idx + 1;
		return edge;
	}));

	return (
		<Row>
			<BootstrapTable keyField="id"
				data={tmpEdges}
				columns={setColumns()}
				pagination={paginationFactory(setPaginationOptions())}
				filter={filterFactory()}
				rowEvents={rowEvents}
				selectRow={setSelectRow()}
				striped
				hover
				condensed />
		</Row>
	);
}

function setColumns() {
	return [{
		dataField: 'id',
		text: 'Id',
		sort: true
	},{
		dataField: 'source',
		text: 'Source',
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'target',
		text: 'Target',
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'weight',
		text: 'Weight',
		sort: true,
		filter: textFilter()
	}];
}

function setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked) {
	return {
		onClick: (e) => {
			onTableRowClicked(e);
		},
		onMouseOver: (e) => {
			onTableRowMouseOver(e);
		},
		onMouseLeave: (e) => {
			onTableRowMouseLeave(e);
		}
	}
}

function setSelectRow() {
	return {
		mode: 'checkbox',
		clickToSelect: true,
		style: { backgroundColor: '#c8e6c9' }
	};
}

function setPaginationOptions() {
	return {
		paginationSize: 4,
		sizePerPageList: [{
			text: '7', value: 7
		}],
		hideSizePerPage: true, // Hide the sizePerPage dropdown always
  	hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	};
}

TabEdges.propTypes = {
	edges: PropTypes.array,
	onTableRowMouseOver: PropTypes.func,
	onTableRowMouseLeave: PropTypes.func,
	onTableRowClicked: PropTypes.func
};

export default TabEdges;

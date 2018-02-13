import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const TabNodes = ({ nodes, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked }) => {
	const rowEvents = setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked);
	
	return (
		<Row>
			<BootstrapTable keyField="id"
				data={nodes}
				columns={setColumns()}
				pagination={paginationFactory()}
				filter={filterFactory()}
				rowEvents={rowEvents}
				selectRow={ setSelectRow() }
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
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'original',
		text: 'Original',
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'degreeCentrality',
		text: 'Degree Centrality',
		sort: true
	}, {
		dataField: 'betweennessCentrality',
		text: 'Betwenness Centrality',
		sort: true
	}, {
		dataField: 'pagerank',
		text: 'Pagerank',
		sort: true
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

TabNodes.propTypes = {
	nodes: PropTypes.array,
	onTableRowMouseOver: PropTypes.func,
	onTableRowMouseLeave: PropTypes.func,
	onTableRowClicked: PropTypes.func
};

export default TabNodes;

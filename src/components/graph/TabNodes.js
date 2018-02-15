import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as constants from '../../constants/appConstants';

const TabNodes = ({ nodes, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked, centralitySort, shouldClickTableTrigger }) => {
	const rowEvents = setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked);

	return (
		<Row>
			<BootstrapTable keyField="id"
				data={nodes}
				columns={setColumns()}
				pagination={paginationFactory(setPaginationOptions())}
				filter={filterFactory()}
				rowEvents={rowEvents}
				selectRow={shouldClickTableTrigger && setSelectRow()}
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

function setDefaultSort(centralitySort) {
	let centrality;
	switch (centralitySort) {
		case constants.CENTRALITY.DegreeCentrality:
			centrality = 'degreeCentrality';
			break;
		case constants.CENTRALITY.BetweennessCentrality:
			centrality = 'betweennessCentrality';
			break;
		case constants.CENTRALITY.Pagerank:
			centrality = 'pagerank';
			break;
		default:
			break;
	}

	return [{
		dataField: centrality,
		order: 'asc'
	}];
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

TabNodes.propTypes = {
	nodes: PropTypes.array,
	onTableRowMouseOver: PropTypes.func,
	onTableRowMouseLeave: PropTypes.func,
	onTableRowClicked: PropTypes.func,
	centralitySort: PropTypes.string,
	shouldClickTableTrigger: PropTypes.bool
};

export default TabNodes;

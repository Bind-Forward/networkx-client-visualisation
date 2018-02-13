import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const TabNodes = ({ nodes }) => {
	return (
		<Row>
			<BootstrapTable keyField="id"
				data={nodes}
				columns={getColumns()}
				pagination={paginationFactory()}
				filter={ filterFactory() } />
		</Row>
	);
}

function getColumns() {
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

TabNodes.propTypes = {
	nodes: PropTypes.array
};

export default TabNodes;

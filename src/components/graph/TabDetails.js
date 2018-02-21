import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import * as constants from '../../constants/appConstants';

const TabDetails = ({ graph }) => {

	const dictionaryTypeListSummary = () => {
		return Object.keys(constants.DICTIONARY_TYPE).map((key, idx) => {
			let count = graph.nodes.filter(node => node.wordType === constants.DICTIONARY_TYPE[key]).length;
			if (count > 0) {
				return (
					<ListGroupItem key={idx}>
						<strong>{key} Count: </strong> {count}
					</ListGroupItem>
				);
			}

			return undefined;
		});
	}

	return (
		<div>
			<ListGroup style={{maxHeight: '300px', overflow: 'auto'}}>
				<ListGroupItem><strong>Number of nodes:</strong> {graph.nodes.length}</ListGroupItem>
				<ListGroupItem><strong>Number of edges:</strong> {graph.edges.length}</ListGroupItem>
				{dictionaryTypeListSummary()}
			</ListGroup>
		</div>
	);
}

TabDetails.propTypes = {
	graph: PropTypes.object.isRequired
};

export default TabDetails;
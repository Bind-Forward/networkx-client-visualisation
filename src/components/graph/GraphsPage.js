import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import GraphWindow from './GraphWindow';

class GraphsPage extends React.Component {

	constructor(props, context) {
		super(props);
	}

	componentWillReceiveProps = (nextProps) => {
		
	}

	render() {
		
		const {
			graph
		} = this.props;

		return (
			<div>				
				<h1>Graph</h1>
				<hr />
				<Row>
					<Col xs={12} md={12} lg={6}>
						<GraphWindow
							graph={graph}
							initialSize={30}
							settings={{drawEdges: true, drawLabels: true, minEdgeSize: 0.5, maxEdgeSize: 10, clone: false}} />
						</Col>
				</Row>
			</div>
		);
	}
}

GraphsPage.propTypes = {
	graph: PropTypes.object.isRequired,	
}

function mapStateToProps(state, ownProps) {
	return {
		graph: state.graph
	};
}

export default connect(mapStateToProps)(GraphsPage);
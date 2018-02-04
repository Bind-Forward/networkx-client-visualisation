import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import * as graphActions from '../../actions/graphActions';
import GraphWindow from './GraphWindow';
import TextWindow from './TextWindow';

class GraphsPage extends React.Component {

	constructor(props, context) {
		super(props);

		this.state = {
			loading: false
		};
	}

	componentWillReceiveProps = (nextProps) => {
		console.log(nextProps.graph);
	}

	componentWillMount = () => {

	}

	handleClick = (event) => {
		this.setState({
			loading: true
		});

		this.props.actions.loadGraph(1, ["N", "V"])
			.then(() => {
				this.setState({
					loading: false
				});
			})
	}

	render = () => {

		const {
			graph,
			article,
			articles
		} = this.props;

		return (
			<div>
				<Row>
					<Button onClick={this.handleClick} >Default</Button>
					<Col xs={12} md={12} lg={8}>
						<GraphWindow
							graph={graph}
							loading={this.state.loading}
							initialSize={30}
							settings={{ drawEdges: true, drawLabels: true, minEdgeSize: 0.5, maxEdgeSize: 10, clone: false }} />
					</Col>
					<Col xs={12} md={12} lg={4}>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={12} lg={8}>
						<TextWindow							
							article={graph.article}
							loading={this.state.loading} />
					</Col>
				</Row>
			</div>
		);
	}
}

GraphsPage.propTypes = {
	graph: PropTypes.object.isRequired,
	articles: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {	
	return {
		graph: state.graph,
		articles: state.articles
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(graphActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphsPage);
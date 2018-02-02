import React from 'react'
import { connect } from 'react-redux';

class GraphsPage extends React.Component {
	constructor(props, context) {
		super(props);
	}

	render() {
		return (
			<div>
				GraphsPage
				<div>
					{this.props.graph.toString()}
				</div>
			</div>
		);
	}
}


function mapStateToProps (state, ownProps) {
	return {
		graph: state.graph
	};
}

export default connect(mapStateToProps)(GraphsPage);
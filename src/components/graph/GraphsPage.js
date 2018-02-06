import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import * as graphActions from '../../actions/graphActions';
import GraphWindow from './GraphWindow';
import TextWindow from './TextWindow';
import GraphMenu from './GraphMenu';
import graphSettings from '../../constants/graphSettings';
import * as utility from '../../utility';

class GraphsPage extends React.Component {

	constructor(props, context) {
		super(props);

		this.state = {
			loading: false,
			selectedArticleId: -1
		};
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			selectedArticleId: nextProps.selectedArticle.id
		});
	}

	onWordMouseOver = (event) => {
		const el = event.currentTarget;
		el.classList.toggle('word-hover');
	}

	onWordMouseLeave = (event) => {
		const el = event.currentTarget;
		el.classList.toggle('word-hover');
	}

	onWordClick = (event) => {
		const el = event.currentTarget;
		el.classList.toggle('word-click');
	}

	onSelectedArticle = (event) => {
		this.setState({
			selectedArticleId: _.toNumber(event.currentTarget.value)
		});
	}

	onMenuAccept = (event) => {
		debugger;
		let errorMsgs = [];
		if (this.state.selectedArticleId < 0) {
			errorMsgs.push("Select article.")
		}

		if (!_.isEmpty(errorMsgs)) {
			utility.displayAlertMessages(errorMsgs);
			return;
		}

		this.setState({
			loading: true
		}, () => {
			this.props.actions.loadGraph(this.state.selectedArticleId, ['N'])
			.then(() => {
				this.setState({
					loading: false
				});
			});
		});
	}

	render = () => {
		const {
			graph,
			articles,
			selectedArticle
		} = this.props;

		return (
			<div>
				<Row>
					<Col xs={12} md={12} lg={7} className="h-resizeable">
						<GraphWindow
							graph={graph}
							loading={this.state.loading}
							settings={graphSettings}
							renderer={"webgl"}
							selectedArticle={selectedArticle} />
					</Col>
					<Col xs={12} md={12} lg={5}>
						<GraphMenu
							articles={articles}
							selectedArticleId={selectedArticle.id}
							onSelectedArticle={this.onSelectedArticle}
							onMenuAccept={this.onMenuAccept}
							loading={this.state.loading} />
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={12} lg={7}>
						<TextWindow
							article={selectedArticle}
							nodes={graph.nodes}
							loading={this.state.loading}
							onWordMouseOver={this.onWordMouseOver}
							onWordMouseLeave={this.onWordMouseLeave}
							onWordClick={this.onWordClick} />
					</Col>
					<Col xs={12} md={12} lg={5}>
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

function get_selected_article(articles, graph) {
	if (graph && !_.isEmpty(articles)) {
		let selectedArticle = _.find(articles, { id: graph.articleId });
		if (selectedArticle) {
			return selectedArticle;
		}
	}

	return { id: -1, url: "", sentences: [], name: "" };
}

function mapStateToProps(state, ownProps) {
	let selectedArticle = get_selected_article(state.articles, state.graph);

	return {
		graph: state.graph,
		articles: state.articles,
		selectedArticle: selectedArticle
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(graphActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphsPage);
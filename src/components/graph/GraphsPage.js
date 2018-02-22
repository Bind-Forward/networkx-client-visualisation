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
import * as utility from '../../utility';
import GraphDetails from './GraphDetails';
import graphSettings from '../../constants/graphSettings';

class GraphsPage extends React.Component {

	constructor(props, context) {
		super(props);

		this.state = {
			loading: false,
			dispatchEventName: '',
			actionNode: '',
			isFullscreen: false,
			highlightCentralityNodesNum: 5,
			graphSettings: graphSettings,
			articleKeywords: []
		};
	}

	/* --- Private methods --- */
	_setKeywords = (article, nodes) => {
		if (_.isEmpty(article) || nodes.length === 0) {
			return [];
		}

		return article.keywords.map((keyword, idx) => {
			return {
				id: idx,
				word: keyword,
				isInGraph: (_.some(nodes, (node) => 
											node.id === keyword || node.original === keyword))
			}
		});
	}

	/* --- Lifecycle methods --- */
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			dispatchEventName: '',
			articleKeywords: this._setKeywords(nextProps.selectedArticle, nextProps.graph.nodes)
		});
	}
	
	/* --- Public methods --- */
	dispatchGraphEventOnNode = (eventName, nodeId) => {
		this.setState({
			dispatchEventName: eventName,
			actionNode: nodeId
		});
	}

	updateGraphSettings = (propertyName, value) => {
		let graphSettings = Object.assign({}, this.state.graphSettings);
		graphSettings[propertyName] = value;

		this.setState({
			graphSettings
		});
	}

	onDictionaryTypeChange = (event) => {
		const el = event.currentTarget;

		if (_.includes(this.props.dictionaryTypes, el.value)) {
			this.props.actions.removeDictionaryType(el.value);
			el.checked = false;
		} else {
			this.props.actions.addDictionaryType(el.value);
			el.checked = true;
		}
	}

	onLayoutChange = (event) => {
		const el = event.currentTarget;
		el.checked = true;
		this.props.actions.setLayout(el.value);
	}

	onHighlightCentralityNodesNumChange = (event) => {
		const el = event.currentTarget;

		let number = 0;

		if (!el.value || isNaN(el.value) || parseInt(el.value, 10) < 0) {
			number = 0;
		} else {
			number = parseInt(el.value, 10);
		}

		this.setState({
			highlightCentralityNodesNum: number,
			dispatchEventName: ''
		});
	}

	changeGraphData = (articleId) => {
		this.setState({
			loading: true
		}, () => {
			this.props.actions.loadGraph(articleId, this.props.dictionaryTypes)
				.then(() => {
					this.setState({
						loading: false
					});
				}).catch(error => {
					utility.displayAlertMessage(error, 'Error');
				});
		});
	}

	onChangeGraphSize = (event) => {
		this.setState(prevState => ({
			isFullscreen: !prevState.isFullscreen,
			dispatchEventName: ''
		}));
	}

	onCentralityChange = (event) => {
		const el = event.currentTarget;
		el.checked = true;
		this.props.actions.selectCentrality(el.value);
	}

	render = () => {
		const {
			graph,
			articles,
			selectedArticle,
			dictionaryTypes,
			layoutType,
			centrality
		} = this.props;

		return (
			<div>
				<Row>
					<Col xs={8} sm={8} md={10} lg={10}>
						<Col xs={12} sm={12} md={this.state.isFullscreen ? 12 : 6} lg={this.state.isFullscreen ? 12 : 6}>
							<Row>
								<GraphWindow
									graph={graph}
									graphSettings={this.state.graphSettings}
									loading={this.state.loading}
									selectedArticle={selectedArticle}
									dispatchEventName={this.state.dispatchEventName}
									actionNode={this.state.actionNode}
									layoutType={layoutType}
									onChangeGraphSize={this.onChangeGraphSize}
									centrality={centrality}
									highlightCentralityNodesNum={this.state.highlightCentralityNodesNum} />
							</Row>
						</Col>
						<Col xs={12} sm={12} md={this.state.isFullscreen ? 12 : 6} lg={this.state.isFullscreen ? 12 : 6}>
							<Row style={{ paddingLeft: '5px' }}>
								<GraphDetails
									graph={graph}
									centrality={centrality}
									loading={this.state.loading}
									dispatchGraphEventOnNode={this.dispatchGraphEventOnNode}
									keywords={this.state.articleKeywords} />
							</Row>
							<Row style={{ paddingLeft: '5px' }}>
								<TextWindow
									article={selectedArticle}
									nodes={graph.nodes}
									loading={this.state.loading}
									dispatchGraphEventOnNode={this.dispatchGraphEventOnNode} />
							</Row>
						</Col>
					</Col>
					<Col xs={4} sm={4} md={2} lg={2}>
						<Row>
							<GraphMenu
								changeGraphData={this.changeGraphData}
								updateGraphSettings={this.updateGraphSettings}
								articles={articles}
								layoutType={layoutType}
								selectedArticle={selectedArticle}
								selectedDictionaryTypes={dictionaryTypes}
								centrality={centrality}
								loading={this.state.loading}
								onDictionaryTypeChange={this.onDictionaryTypeChange}
								onLayoutChange={this.onLayoutChange}
								onCentralityChange={this.onCentralityChange}
								highlightCentralityNodesNum={this.state.highlightCentralityNodesNum}
								onHighlightCentralityNodesNumChange={this.onHighlightCentralityNodesNumChange}
								nodeShapes={this.state.graphSettings.nodeShapes}
								edgeShapes={this.state.graphSettings.edgeShapes} />
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

GraphsPage.propTypes = {
	graph: PropTypes.object.isRequired,
	articles: PropTypes.array.isRequired,
	dictionaryTypes: PropTypes.array.isRequired,
	layoutType: PropTypes.string.isRequired
}

function getSelectedArticle(articles, graph) {
	if (graph && !_.isEmpty(articles)) {
		let selectedArticle = _.find(articles, { id: graph.articleId });
		if (selectedArticle) {
			return selectedArticle;
		}
	}

	return { id: -1, url: "", sentences: [], name: "", keywords: [] };
}

function mapStateToProps(state, ownProps) {
	let selectedArticle = getSelectedArticle(state.articles, state.graph);

	return {
		graph: state.graph,
		articles: state.articles,
		selectedArticle: selectedArticle,
		dictionaryTypes: state.dictionaryTypes,
		layoutType: state.layoutType,
		centrality: state.centrality
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(graphActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphsPage);
import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import Sentence from './Sentence';
import graphEvents from '../../constants/graphEvents';

class TextWindow extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			shouldHoverWordTrigger: true,
			shouldClickWordTrigger: true
		};
	}
	
	/* --- Lifecycle methods --- */
	shouldComponentUpdate = (nextProps, nextState) => {
		const {
			article,
			nodes,
			loading
		} = this.props;

		if (!_.isEqual(article, nextProps.article) || 
			!_.isEqual(nodes, nextProps.nodes) || 
			loading !== nextProps.loading ||
			!_.isEqual(this.state, nextState)) {
			return true;
		}
		return false;
	}

	/* --- Public methods --- */
	onWordNodeMouseOver = (event) => {
		const el = event.currentTarget;
		if (el.dataset.clicked === '1' || !this.state.shouldHoverWordTrigger)
			return;

		el.classList.toggle('word-hover');

		this.props.dispatchGraphEventOnNode(graphEvents.overNode, el.dataset.nominative);
	}

	onWordNodeMouseLeave = (event) => {
		const el = event.currentTarget;
		if (el.dataset.clicked === '1' || !this.state.shouldHoverWordTrigger) {
			return;
		}

		el.classList.toggle('word-hover');

		this.props.dispatchGraphEventOnNode(graphEvents.outNode, el.dataset.nominative);
	}

	onWordNodeClick = (event) => {
		if (!this.state.shouldClickWordTrigger) {
			return;
		}

		const el = event.currentTarget;
		el.classList.toggle('word-click');
		el.dataset.clicked = el.dataset.clicked === '1' ? '0' : '1';

		this.props.dispatchGraphEventOnNode(graphEvents.clickNode, el.dataset.nominative);
	}

	onShouldHoverWordChange = (event) => {
		this.setState(prevState => ({
			shouldHoverWordTrigger: !prevState.shouldHoverWordTrigger
		}));
	}

	onShouldClickWordChange = (event) => {
		this.setState(prevState => ({
			shouldClickWordTrigger: !prevState.shouldClickWordTrigger
		}));
	}

	render() {
		const {
			article, 
			nodes, 
			loading,			
		} = this.props;

		return (
			<Panel bsStyle={"success"}>
				<Panel.Heading>
					<Row>
						<Col xs={6} sm={6} md={6} lg={6}>
							<Panel.Title componentClass="h3">Sentences</Panel.Title>
						</Col>					
						<Col xs={6} sm={6} md={6} lg={6}>
							<Panel style={{color: '#000'}}>
								<Checkbox
									value={1}
									checked={this.state.shouldHoverWordTrigger}
									onChange={this.onShouldHoverWordChange}
									inline>
									Show on mouse hover
								</Checkbox>
								<Checkbox
									value={1}
									checked={this.state.shouldClickWordTrigger}
									onChange={this.onShouldClickWordChange}
									inline>
									Show on mouse click
								</Checkbox>
							</Panel>
						</Col>
					</Row>
				</Panel.Heading>
				<Panel.Body style={{ maxHeight: "300px", overflow: 'auto' }}>
					{
						_.isEmpty(article.sentences) || loading ?
							<div className="loader"></div> :
							<div>
								{
									article.sentences.map((sentence, idx) => {
										return <Sentence
											key={idx}
											sentence={sentence}
											nodes={nodes}
											onWordNodeMouseOver={this.onWordNodeMouseOver}
											onWordNodeMouseLeave={this.onWordNodeMouseLeave}
											onWordNodeClick={this.onWordNodeClick} />
									})
								}
							</div>
					}
				</Panel.Body>
			</Panel>
		);
	}
}

TextWindow.propTypes = {
	article: PropTypes.object.isRequired,
	nodes: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	dispatchGraphEventOnNode: PropTypes.func.isRequired
};

export default TextWindow;

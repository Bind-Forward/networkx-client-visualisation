import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import Sentence from './Sentence';

const TextWindow = ({ article, nodes, loading, onWordNodeMouseOver, onWordNodeMouseLeave, onWordNodeClick, 
		shouldHoverWordTrigger, onShouldHoverWordChange, shouldClickWordTrigger, onShouldClickWordChange }) => {
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
								checked={shouldHoverWordTrigger}
								onChange={onShouldHoverWordChange}
								inline>
								Show on mouse hover
							</Checkbox>
							<Checkbox
								value={1}
								checked={shouldClickWordTrigger}
								onChange={onShouldClickWordChange}
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
										onWordNodeMouseOver={onWordNodeMouseOver}
										onWordNodeMouseLeave={onWordNodeMouseLeave}
										onWordNodeClick={onWordNodeClick} />
								})
							}
						</div>
				}
			</Panel.Body>
		</Panel>
	);
}

TextWindow.propTypes = {
	article: PropTypes.object.isRequired,
	nodes: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	onWordNodeMouseOver: PropTypes.func.isRequired,
	onWordNodeMouseLeave: PropTypes.func.isRequired,
	onWordNodeClick: PropTypes.func.isRequired,
	shouldHoverWordTrigger: PropTypes.bool.isRequired,
	onShouldHoverWordChange: PropTypes.func.isRequired,
	shouldClickWordTrigger: PropTypes.bool.isRequired,
	onShouldClickWordChange: PropTypes.func.isRequired
};

export default TextWindow;

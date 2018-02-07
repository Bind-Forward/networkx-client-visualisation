import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';
import Sentence from './Sentence';

const TextWindow = ({ article, nodes, loading, onWordNodeMouseOver, onWordNodeMouseLeave, onWordNodeClick }) => {
	return (
		<Panel className="resizeable" bsStyle={"primary"}>
			<Panel.Heading>
				<Panel.Title componentClass="h3">Sentences</Panel.Title>
			</Panel.Heading>
			<Panel.Body>
				{
					_.isEmpty(article.sentences) || loading ?
						<div className="loader"></div> :
						<div style={{ maxHeight: "300px" }}>
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
};

export default TextWindow;

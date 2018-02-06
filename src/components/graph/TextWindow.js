import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';
import Sentence from './Sentence';

const TextWindow = ({ article, nodes, loading, onWordMouseOver, onWordMouseLeave, onWordClick }) => {
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
										onWordMouseOver={onWordMouseOver}
										onWordMouseLeave={onWordMouseLeave}
										onWordClick={onWordClick} />
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
	onWordMouseOver: PropTypes.func.isRequired,
	onWordMouseLeave: PropTypes.func.isRequired,
	onWordClick: PropTypes.func.isRequired,
};

export default TextWindow;

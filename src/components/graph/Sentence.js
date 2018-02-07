import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Word from './Word';

const Sentence = ({ sentence, nodes, onNodeMouseOver, onNodeMouseLeave, onNodeClick }) => {
	const getNode = (word) => {
		return _.find(nodes, {id: word})
	}

	return (
		<p>
			{
				sentence.split(" ").map((word, idx) => {
					let node = getNode(word); 
					let dataTipId = !_.isEmpty(node) ? `${word}-${idx}` : "";

					return (
						<Word key={idx}
							word={word}
							node={node}
							dataTipId={dataTipId}
							onNodeMouseOver={onNodeMouseOver}
							onNodeMouseLeave={onNodeMouseLeave}
							onNodeClick={onNodeClick} />			
					);
				})
			}
		</p>
	);
}

Sentence.propTypes = {
	sentence: PropTypes.string.isRequired,
	onNodeMouseOver: PropTypes.func.isRequired,
	onNodeMouseLeave: PropTypes.func.isRequired,
	onNodeClick: PropTypes.func.isRequired,
};

export default Sentence;

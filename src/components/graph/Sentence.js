import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Word from './Word';

const Sentence = ({ sentence, nodes, onWordNodeMouseOver, onWordNodeMouseLeave, onWordNodeClick }) => {
	const getNode = (word) => {
		return _.find(nodes, (node) => {
			// if (node.original.includes('medij') && word.includes('medij')) { debugger;}
			return node.original.toLowerCase() === word.toLowerCase()
		})
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
							onWordNodeMouseOver={onWordNodeMouseOver}
							onWordNodeMouseLeave={onWordNodeMouseLeave}
							onWordNodeClick={onWordNodeClick} />			
					);
				})
			}
		</p>
	);
}

Sentence.propTypes = {
	sentence: PropTypes.string.isRequired,
	onWordNodeMouseOver: PropTypes.func.isRequired,
	onWordNodeMouseLeave: PropTypes.func.isRequired,
	onWordNodeClick: PropTypes.func.isRequired,
};

export default Sentence;

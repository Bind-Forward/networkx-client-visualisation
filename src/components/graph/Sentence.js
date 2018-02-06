import React from 'react';
import PropTypes from 'prop-types';

import Word from './Word';

const Sentence = ({ sentence, nodes, onWordMouseOver, onWordMouseLeave, onWordClick }) => {
	const isWordInNodes = (word) => {
		return nodes.findIndex(node =>
			node.id === word
		) > -1;
	}

	return (
		<p>
			{
				sentence.split(" ").map((word, idx) => {
					// Check if word is graph node
					let isNode = isWordInNodes(word);
					let dataTipId = isNode ? `${word}-${idx}` : "";

					return (
						<Word key={idx}
							word={word}
							isNode={isNode}
							dataTipId={dataTipId}
							onWordMouseOver={onWordMouseOver}
							onWordMouseLeave={onWordMouseLeave}
							onWordClick={onWordClick} />			
					);
				})
			}
		</p>
	);
}

Sentence.propTypes = {
	sentence: PropTypes.string.isRequired,
	onWordMouseOver: PropTypes.func.isRequired,
	onWordMouseLeave: PropTypes.func.isRequired,
	onWordClick: PropTypes.func.isRequired,
};

export default Sentence;

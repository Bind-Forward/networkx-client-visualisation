import React from 'react';
import PropTypes from 'prop-types';

const Word = ({ word, isNode, onWordMouseOver, onWordMouseLeave, onWordClick }) => {
// todo: Add popover
	return (
		<span>
			{
				isNode ?
					<span
						onMouseOver={onWordMouseOver}
						onMouseLeave={onWordMouseLeave}
						onClick={onWordClick}
						className={"badge"}
						data-node-id={word.id}>
						{word}
					</span> :
					<span>
						{word}
					</span>
			}
			<span>&nbsp;</span>
		</span>
	);
}

Word.propTypes = {
	word: PropTypes.string.isRequired,
	isNode: PropTypes.bool.isRequired,
	onWordMouseOver: PropTypes.func.isRequired,
	onWordMouseLeave: PropTypes.func.isRequired,
	onWordClick: PropTypes.func.isRequired,
};

export default Word;

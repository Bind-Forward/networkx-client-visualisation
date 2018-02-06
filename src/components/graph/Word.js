import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Word = ({ word, isNode, onWordMouseOver, onWordMouseLeave, onWordClick, dataTipId }) => {
	// todo: Add popover
	return (
		<span>
			{
				isNode ?
					<span>
						<a
							onMouseOver={onWordMouseOver}
							onMouseLeave={onWordMouseLeave}
							onClick={onWordClick}
							className={"badge"}
							data-node-id={word.id}
							data-tip
							data-for={dataTipId}>
							{word}
						</a>
						<ReactTooltip id={dataTipId} aria-haspopup='true' wrapper="span">
							<ul>
								<li>Word</li>
								<li>Chart</li>
								<li>Else</li>
							</ul>
						</ReactTooltip>
					</span>
					:
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
	dataTipId: PropTypes.string
};

export default Word;

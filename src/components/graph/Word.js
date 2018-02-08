import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

const Word = ({ word, onWordNodeMouseOver, onWordNodeMouseLeave, onWordNodeClick, node, dataTipId }) => {
	// todo: Add popover
	return (
		<span>
			{
				!_.isEmpty(node) ?
					<span>
						<a
							onMouseOver={onWordNodeMouseOver}
							onMouseLeave={onWordNodeMouseLeave}
							onClick={onWordNodeClick}
							className={"badge"}
							data-original={node.original}
							data-nominative={node.id}
							data-tip
							data-for={dataTipId}>
							{word}
						</a>
						<ReactTooltip id={dataTipId} data-place="top" aria-haspopup='true' wrapper="span">
							<span>Degree Centrality: {node.degreeCentrality}</span><br/>
							<span>Betweenness Centrality: {node.betweennessCentrality}</span><br/>
							<span>Pagerank: {node.pagerank}</span>
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
	onWordNodeMouseOver: PropTypes.func.isRequired,
	onWordNodeMouseLeave: PropTypes.func.isRequired,
	onWordNodeClick: PropTypes.func.isRequired,
	node: PropTypes.object,
	dataTipId: PropTypes.string,
};

export default Word;

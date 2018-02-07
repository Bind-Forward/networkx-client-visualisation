import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

const Word = ({ word, onNodeMouseOver, onNodeMouseLeave, onNodeClick, node, dataTipId }) => {
	// todo: Add popover
	return (
		<span>
			{
				!_.isEmpty(node) ?
					<span>
						<a
							onMouseOver={onNodeMouseOver}
							onMouseLeave={onNodeMouseLeave}
							onClick={onNodeClick}
							className={"badge"}
							data-node-id={node.id}
							data-tip
							data-for={dataTipId}>
							{word}
						</a>
						<ReactTooltip id={dataTipId} aria-haspopup='true' wrapper="span">
							<p>Degree Centrality: {node.degreeCentrality}</p>
							<p>Betweenness Centrality: {node.betweennessCentrality}</p>
							<p>Pagerank: {node.pagerank}</p>
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
	onNodeMouseOver: PropTypes.func.isRequired,
	onNodeMouseLeave: PropTypes.func.isRequired,
	onNodeClick: PropTypes.func.isRequired,
	node: PropTypes.object,
	dataTipId: PropTypes.string,
};

export default Word;

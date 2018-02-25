import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import * as utility from '../../utility';

const Word = ({ word, isKeyword, onWordNodeMouseOver, onWordNodeMouseLeave, onWordNodeClick, node, dataTipId }) => {
	
	return (
		<span>
			{
				!_.isEmpty(node) ?
					<span>
						<a style={{textDecoration: isKeyword ? 'underline' : 'none'}}						
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
							<span>Pagerank: {node.pagerank}</span><br/>
							<span>Word type: {utility.getWordType(node.wordType)}</span>							
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

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const TabKeywords = ({ keywords, onSelectedKeyword }) => {
	
	const keywordsList = () => {
		return keywords.map((keyword, idx) => {
			return (
				<ListGroupItem key={idx}
					onClick={onSelectedKeyword}
					bsStyle={keyword.isInGraph ? "success" : "danger"}>
					{keyword.word}
				</ListGroupItem>
			);
		});
	}

	return (
		<div>
			<ListGroup style={{ maxHeight: '300px', overflow: 'auto' }}>
				{keywordsList()}
			</ListGroup>
		</div>
	);
}

TabKeywords.propTypes = {
	keywords: PropTypes.array.isRequired,
	onSelectedKeyword: PropTypes.func.isRequired
};

export default TabKeywords;
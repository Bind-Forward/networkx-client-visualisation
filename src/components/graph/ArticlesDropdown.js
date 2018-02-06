import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ArticleDropdown = ({ articles, selectedArticleId }) => {	
	return (
		<FormGroup controlId="formControlsSelect">
			<ControlLabel>Articles</ControlLabel>
			<FormControl componentClass="select" placeholder="select" value={selectedArticleId}>
				{
					articles.map(article => {
						return (
							<option key={article.id}
								value={article.id}>
								{article.name}
							</option>
						);
					})
				}
			</FormControl>
		</FormGroup>

	);
}

ArticleDropdown.propTypes = {
	articles: PropTypes.array.isRequired,
	selectedArticleId: PropTypes.number
};

export default ArticleDropdown;
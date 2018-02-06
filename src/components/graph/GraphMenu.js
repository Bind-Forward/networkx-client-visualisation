import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import ArticlesDropdown from './ArticlesDropdown';

const GraphMenu = ({ articles, onMenuAccept, loading, articleId }) => {
	return (
		<Panel bsStyle={"danger"}>
			<Panel.Heading>
				<Panel.Title componentClass="h3">Graph Menu</Panel.Title>
			</Panel.Heading>
			<Panel.Body>
				{
					_.isEmpty(articles) || loading ?
						<div className="loader">Loading...</div> :
						<div>
							<Row>
								<Col xs={6} sm={6} md={6} lg={6}>
									<ArticlesDropdown
										articles={articles}
										selectedArticleId={articleId} />
								</Col>
								<Col xs={6} sm={6} md={6} lg={6}>
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={6} md={6} lg={6}>
								</Col>
								<Col xs={6} sm={6} md={6} lg={6}>
								</Col>
							</Row>
						</div>
				}
			</Panel.Body>
		</Panel>
	);
}

GraphMenu.propTypes = {
	articles: PropTypes.array.isRequired,
	onMenuAccept: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	articleId: PropTypes.number
};

export default GraphMenu;

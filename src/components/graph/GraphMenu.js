import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from '../common/Dropdown';

const GraphMenu = ({ articles, onSelectedArticle, onMenuAccept, loading, selectedArticleId }) => {
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
									<Dropdown
										items={articles}
										labelText={"Articles"}
										onSelectedItemChange={onSelectedArticle}
										selectedItemId={selectedArticleId}
										emptyFieldText={"Select article"} />
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
			<Panel.Footer>
				<Button bsStyle={"primary"}
					onClick={onMenuAccept}>
					Submit
				</Button>
			</Panel.Footer>
		</Panel>
	);
}

GraphMenu.propTypes = {
	articles: PropTypes.array.isRequired,
	onSelectedArticle: PropTypes.func.isRequired,
	onMenuAccept: PropTypes.func.isRequired,	
	loading: PropTypes.bool.isRequired,
	selectedArticleId: PropTypes.number
};

export default GraphMenu;

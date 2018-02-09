import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Row, Col, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from '../common/Dropdown';
import * as constants from '../../constants/appConstants';

const GraphMenu = ({ articles, onSelectedArticle, onMenuAccept, loading, selectedArticleId, selectedDictionaryTypes, onDictionaryTypeChange }) => {
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
									<Panel style={{maxHeight: '150px'}}>
										<Panel.Body>
											{
												Object.keys(constants.DICTIONARY_TYPE).map(key => {
													const value = constants.DICTIONARY_TYPE[key];
													let checked = _.indexOf(selectedDictionaryTypes, value) > -1;
													return (
														<Checkbox key={key}
															value={value}
															checked={checked}
															onChange={onDictionaryTypeChange}
															id={value}>
															{key}
														</Checkbox>
													);
												})
											}
										</Panel.Body>
									</Panel>
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
	selectedArticleId: PropTypes.number,
	selectedDictionaryTypes: PropTypes.array,
	onDictionaryTypeChange: PropTypes.func
};

export default GraphMenu;

import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Row, Col, FormGroup, Checkbox, ControlLabel, Radio } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from '../common/Dropdown';
import * as constants from '../../constants/appConstants';

const GraphMenu = ({ articles, onSelectedArticle, onMenuAccept, loading, selectedArticleId, selectedDictionaryTypes, 
		onDictionaryTypeChange, layoutType, onLayoutChange, centralitySort, onCentralitySortChange }) => {
	return (
		<Panel bsStyle={"danger"}>
			<Panel.Heading>
				<Panel.Title componentClass="h3">Graph Menu</Panel.Title>
			</Panel.Heading>
			<Panel.Body  style={{maxHeight: '750px', overflowY: 'auto'}}>
				{
					_.isEmpty(articles) || loading ?
						<div className="loader">Loading...</div> :
						<div>
							<Row>
								<Button bsStyle={"default"}
									onClick={onMenuAccept}
									style={{width: '100%'}}>
									Submit
								</Button>
							</Row>
							<hr />
							<Row>
								<Col xs={12} sm={12} md={12} lg={12}>
									<FormGroup>
										<Dropdown
											items={articles}
											labelText={"Articles"}
											onSelectedItemChange={onSelectedArticle}
											selectedItemId={selectedArticleId}
											emptyFieldText={"Select article"} />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Select Graph Layout</ControlLabel>
										<Panel style={{ maxHeight: '150px', overflow: 'auto' }}>
											<Panel.Body>
												{
													Object.keys(constants.LAYOUT_TYPE).map(key => {
														let value = constants.LAYOUT_TYPE[key];
														const checked = layoutType === value;
														return (
															<Radio key={key}
																value={value}
																name="layoutType"
																checked={checked}
																onChange={onLayoutChange}
																id={value}>
																{value}
															</Radio>
														);
													})
												}
											</Panel.Body>
										</Panel>
									</FormGroup>
								</Col>
								<Col xs={12} sm={12} md={12} lg={12}>
									<FormGroup>
										<ControlLabel>Select Word Types</ControlLabel>
										<Panel style={{ maxHeight: '225px', overflow: 'auto' }}>
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
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={12} md={12} lg={12}>
									<FormGroup>
										<ControlLabel>Select Sort By Centrality</ControlLabel>
										<Panel>
											<Panel.Body>
												{
													Object.keys(constants.CENTRALITY).map(key => {
														const value = constants.CENTRALITY[key];
														const checked = centralitySort === value;
														return (
															<Radio key={key}
																value={value}
																name="centralitySort"
																checked={checked}
																onChange={onCentralitySortChange}
																id={value}>
																{key}
															</Radio>
														);
													})
												}
											</Panel.Body>
										</Panel>
									</FormGroup>
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
	onSelectedArticle: PropTypes.func.isRequired,
	onMenuAccept: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	selectedArticleId: PropTypes.number,
	selectedDictionaryTypes: PropTypes.array,
	onDictionaryTypeChange: PropTypes.func,
	layoutType: PropTypes.string,
	onLayoutChange: PropTypes.func,
	centralitySort: PropTypes.string,
	onCentralitySortChange: PropTypes.func
};

export default GraphMenu;

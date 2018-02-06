import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const Dropdown = ({ items, selectedItemId, emptyFieldText }) => {	
	return (
		<FormGroup controlId="formControlsSelect">
			<ControlLabel>Articles</ControlLabel>
			<FormControl componentClass="select" placeholder="select" value={selectedItemId}>
				<option value={-100}>
					{emptyFieldText}
				</option>
				{
					items.map(item => {
						return (
							<option key={selectedItemId}
								value={item.id}>
								{item.name}
							</option>
						);
					})
				}
			</FormControl>
		</FormGroup>

	);
}

Dropdown.defaultProps = {
	emptyFieldText: "Selected item",
	selectedItemId: -1
};

Dropdown.propTypes = {
	items: PropTypes.array.isRequired,
	selectedItem: PropTypes.number,
	emptyFieldText: PropTypes.string,
};

export default Dropdown;
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const Dropdown = ({ items, labelText, onSelectedItemChange, selectedItemId, emptyFieldText }) => {	
	return (
		<FormGroup controlId="formControlsSelect">
			<ControlLabel>{labelText}</ControlLabel>
			<FormControl 			
				componentClass="select" 
				onChange={onSelectedItemChange}
				defaultValue={selectedItemId}>
				<option value={-1}>
					--- {emptyFieldText} ---
				</option>
				{
					items.map(item => {
						return (
							<option key={item.id}
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
	labelText: "Items",
	emptyFieldText: "Select item",
	selectedItemId: -1
};

Dropdown.propTypes = {
	items: PropTypes.array.isRequired,
	labelText: PropTypes.string.isRequired,
	onSelectedItemChange: PropTypes.func.isRequired,
	selectedItem: PropTypes.number,
	emptyFieldText: PropTypes.string
};

export default Dropdown;
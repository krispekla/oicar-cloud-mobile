import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({ selected, setCloud, items }) => (
	<RNPickerSelect
		onValueChange={value => setCloud(value)}
		items={items}
		value={selected}
	/>
);

export default Dropdown;

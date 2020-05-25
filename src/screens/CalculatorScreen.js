import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '../constants/colors';

import CloudCategory from '../components/CloudCategory/CloudCategory';

const CalculatorScreen = props => {
	return (
		<View style={styles.screen}>
			<CloudCategory category="Function" title="Cloud Functions" {...props} />
			<CloudCategory category="VM" title="Cloud VM" {...props} />
			<CloudCategory category="SQL" title="Cloud Databases SQL" {...props} />
			<CloudCategory category="Storage" title="Cloud Storage" {...props} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.blue,
	},
});

export default CalculatorScreen;

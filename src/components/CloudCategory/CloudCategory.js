import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const CloudCategory = ({ category, title, navigation }) => (
	<TouchableOpacity
		style={styles.category}
		onPress={() => navigation.navigate(category)}
	>
		<Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	category: {
		flexDirection: 'row',
		flexGrow: 1,
		width: '90%',
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.orange,
	},
	text: {
		fontSize: 20,
		color: colors.white,
	},
});

export default CloudCategory;

import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ press, text }) => (
	<TouchableOpacity style={styles.customBtn} onPress={press}>
		<Text style={styles.customText}>{text}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	customBtn: {
		width: '80%',
		backgroundColor: '#fb5b5a',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10,
	},
	customText: {
		color: 'white',
	},
});

export default CustomButton;

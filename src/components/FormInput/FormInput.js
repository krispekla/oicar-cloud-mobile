import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FormInput = ({
	placeholder,
	placeholderText,
	value,
	change,
	...otherProps
}) => (
	<View style={styles.inputView}>
		<TextInput
			style={styles.inputText}
			placeholder={placeholder}
			placeholderTextColor={placeholderText}
			onChangeText={text => change(text)}
			placeholderText="#003f5c"
			value={value}
			{...otherProps}
			returnKeyType="done"
		/>
	</View>
);

const styles = StyleSheet.create({
	inputView: {
		width: '80%',
		backgroundColor: '#465881',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
	},
	inputText: {
		height: 50,
		color: 'white',
	},
});

export default FormInput;

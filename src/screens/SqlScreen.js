import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

const SQLScreen = props => {
	return (
		<View style={styles.screen}>
			<FontAwesome name="database" size={72} color="black" />
			<Text>The SQL Screen!</Text>
		</View>
	);
};

SQLScreen.navigationOptions = {
	headerStyle: {
		backgroundColor: colors.primaryColor,
	},
	headerTintColor: 'white',
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SQLScreen;

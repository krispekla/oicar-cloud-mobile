import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { Entypo } from '@expo/vector-icons';

const VMScreen = props => {
	return (
		<View style={styles.screen}>
			<Entypo name="classic-computer" size={72} color="black" />
			<Text>The VM Screen!</Text>
		</View>
	);
};

VMScreen.navigationOptions = {
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

export default VMScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const StorageScreen = props => {
	return (
		<View style={styles.screen}>
			<MaterialIcons name="storage" size={72} color="black" />
			<Text>The Storage Screen!</Text>
		</View>
	);
};

StorageScreen.navigationOptions = {
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

export default StorageScreen;

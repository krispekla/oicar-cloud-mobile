import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { checkInteger, checkDoubles } from '../constants/checkInputValues';

const FunctionScreen = props => {
	const [
		executinPerRequestInMiliseconds,
		setExecutinPerRequestInMiliseconds,
	] = useState('');
	const [memorySizeInMB, setMemorySizeInMB] = useState('');
	const [executionsPerMonth, setExecutionsPerMonth] = useState('');

	const checkNumbers = () => {
		if (
			checkInteger.test(executinPerRequestInMiliseconds) &&
			checkInteger.test(memorySizeInMB) &&
			checkDoubles.test(executionsPerMonth)
		) {
			console.log('All clear');
		}
	};

	return (
		<View style={styles.screen}>
			<MaterialCommunityIcons name="function" size={72} color="black" />
			<Text>The Function Screen!</Text>
			<Input
				placeholder="requests (ms)"
				label="Executin per Request (ms)"
				leftIcon={{
					type: 'font-awesome',
					name: 'info',
					color: colors.primaryColor,
				}}
				keyboardType="number-pad"
				returnKeyType="done"
				value={executinPerRequestInMiliseconds}
				onChangeText={value => setExecutinPerRequestInMiliseconds(value)}
			/>
			<Input
				placeholder="memory (mb)"
				label="Memory Size (mb)"
				leftIcon={{
					type: 'font-awesome',
					name: 'info',
					color: colors.primaryColor,
				}}
				keyboardType="number-pad"
				returnKeyType="done"
				value={memorySizeInMB}
				onChangeText={value => setMemorySizeInMB(value)}
			/>

			<Input
				placeholder="execution (months)"
				label="Execution per Month"
				leftIcon={{
					type: 'font-awesome',
					name: 'info',
					color: colors.primaryColor,
				}}
				keyboardType="decimal-pad"
				returnKeyType="done"
				value={executionsPerMonth}
				onChangeText={value => setExecutionsPerMonth(value)}
			/>

			<Button
				style={{ width: 250 }}
				icon={<Ionicons name="ios-bonfire" size={24} color="white" />}
				title="Calculate"
				onPress={checkNumbers}
			/>
		</View>
	);
};

FunctionScreen.navigationOptions = {
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

export default FunctionScreen;

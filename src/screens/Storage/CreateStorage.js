import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import CloudStorage from '../../models/CloudStorage';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger, checkDoubles } from '../../utils/checkInputValues';
import { storageUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';
import { CLOUD_PROVIDER } from '../../constants/enum';

const CreateStorage = props => {
	const [totalAmount, setTotalAmount] = useState('');
	const [readOperationsPerMonth, setReadOperationsPerMonth] = useState('');
	const [writeOperationsPerMonth, setWriteOperationsPerMonth] = useState('');
	const [cloudProvider, setCloudProvider] = useState('');
	const [price, setPrice] = useState('');
	const [message, setMessage] = useState(null);

	const createCloudStorage = async () => {
		Keyboard.dismiss();
		if (
			checkInteger.test(totalAmount) &&
			checkInteger.test(readOperationsPerMonth) &&
			checkDoubles.test(writeOperationsPerMonth) &&
			checkDoubles.test(price)
		) {
			const data = new CloudStorage();

			data.id = null;
			data.totalAmount = Number.parseInt(totalAmount);
			data.readOperationsPerMonth = Number.parseInt(readOperationsPerMonth);
			data.writeOperationsPerMonth = Number.parseFloat(writeOperationsPerMonth);
			data.cloudProvider = Number.parseInt(cloudProvider);
			data.price = Number.parseInt(price);

			const response = await fetch(`${storageUrl}/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					totalAmount,
					readOperationsPerMonth,
					writeOperationsPerMonth,
					price,
					cloudProvider,
				}),
			});

			if (response.ok) {
				const dataJson = await response.json();
				setMessage(dataJson.message);
				setTotalAmount('');
				setReadOperationsPerMonth('');
				setWriteOperationsPerMonth('');
				setPrice('');
				setCloudProvider('');
			}
		}
	};

	let msg = null;
	if (message) {
		msg = <Text>{message}</Text>;
	}

	return (
		<View style={styles.screen}>
			{msg}
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Total Amount"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={totalAmount.toString()}
					onChangeText={value => setTotalAmount(value)}
				/>

				<Input
					placeholder="Read Operations Per Month"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={readOperationsPerMonth.toString()}
					onChangeText={value => setReadOperationsPerMonth(value)}
				/>

				<Input
					placeholder="Write Operations Per Month"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={writeOperationsPerMonth.toString()}
					onChangeText={value => setWriteOperationsPerMonth(value)}
				/>

				<Input
					placeholder="Price"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={price.toString()}
					onChangeText={value => setPrice(value)}
				/>

				<Dropdown
					setCloud={setCloudProvider}
					items={[
						{ label: 'AWS', value: '0' },
						{ label: 'AZURE', value: '1' },
						{ label: 'GCLOUD', value: '2' },
					]}
				/>
				<Button
					title="Create Storage"
					buttonStyle={styles.button}
					onPress={createCloudStorage}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	input: {
		backgroundColor: colors.primaryColor,
		padding: 8,
		color: colors.orange,
	},
	label: {
		color: colors.accentColor,
		fontSize: 22,
	},
	button: {
		backgroundColor: colors.primaryColor,
		width: '70%',
		alignSelf: 'center',
	},
	cardText: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingTop: 5,
	},
});

export default CreateStorage;

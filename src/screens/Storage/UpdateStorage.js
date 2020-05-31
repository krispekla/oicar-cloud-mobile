import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { storageUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';

const UpdateStorage = props => {
	const [id, setId] = useState('');
	const [cloudStorage, setCloudStorage] = useState(null);

	const [totalAmount, setTotalAmount] = useState();
	const [readOperationsPerMonth, setReadOperationsPerMonth] = useState();
	const [writeOperationsPerMonth, setWriteOperationsPerMonth] = useState();
	const [cloudProvider, setCloudProvider] = useState();
	const [price, setPrice] = useState();

	const getStorageById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();

		try {
			const response = await fetch(`${storageUrl}?id=${id}`, {
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			});

			const data = await response.json();

			setTotalAmount(data.totalAmount);
			setReadOperationsPerMonth(data.readOperationsPerMonth);
			setWriteOperationsPerMonth(data.writeOperationsPerMonth);
			setPrice(data.price);
			setCloudProvider(data.cloudProvider);
			setCloudStorage(data);
		} catch (err) {
			console.log(err);
		}
	};

	const updateStorageHandler = async () => {
		const existingStorage = { ...cloudStorage };

		existingStorage['totalAmount'] = Number.parseInt(totalAmount);
		existingStorage['readOperationsPerMonth'] = Number.parseInt(
			readOperationsPerMonth
		);
		existingStorage['writeOperationsPerMonth'] = Number.parseFloat(
			writeOperationsPerMonth
		);
		existingStorage['price'] = Number.parseFloat(price);
		existingStorage['cloudProvider'] = Number.parseInt(cloudProvider);

		try {
			const response = await fetch(`${storageUrl}/update`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(existingStorage),
			});

			if (response.ok) {
				const resJson = await response.json();
				alert('Storage updated');
			}
		} catch (error) {
			console.log(error);
		}
	};

	let data = null;
	if (cloudStorage) {
		data = (
			<Card title="Update Cloud Storage" containerStyle={{ width: '80%' }}>
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
					selected={cloudProvider.toString()}
					setCloud={setCloudProvider}
					items={[
						{ label: 'AWS', value: '0' },
						{ label: 'AZURE', value: '1' },
						{ label: 'GCLOUD', value: '2' },
					]}
				/>

				<Button
					title="Update"
					buttonStyle={styles.button}
					onPress={updateStorageHandler}
				/>
			</Card>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Insert id of cloud storage"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={id}
					onChangeText={value => setId(value)}
				/>

				<Button
					title="Find Storage"
					buttonStyle={styles.button}
					onPress={getStorageById}
				/>
			</View>
			{data}
		</ScrollView>
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

export default UpdateStorage;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { CLOUD_PROVIDER } from '../../constants/enum';
import { functionUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';
import CloudFunction from '../../models/CloudFunction';

const UpdateFunction = props => {
	const [id, setId] = useState('');
	const [cloudFunc, setCloudFunc] = useState(null);

	const [
		executinPerRequestInMiliseconds,
		setExecutinPerRequestInMiliseconds,
	] = useState();
	const [memorySizeInMB, setMemorySizeInMB] = useState();
	const [executionsPerMonth, setExecutionsPerMonth] = useState();
	const [cloudProvider, setCloudProvider] = useState();
	const [price, setPrice] = useState();

	const getFunctionById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();

		try {
			const response = await fetch(`${functionUrl}?id=${id}`, {
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			});

			const data = await response.json();

			setExecutinPerRequestInMiliseconds(data.executinPerRequestInMiliseconds);
			setMemorySizeInMB(data.memorySizeInMB);
			setExecutionsPerMonth(data.executionsPerMonth);
			setPrice(data.price);
			setCloudProvider(data.cloudProvider);
			setCloudFunc(data);
		} catch (err) {
			console.log(err);
		}
	};

	const updateFunctionHandler = async () => {
		console.log('CLOUD FUNC', cloudFunc);
		const existingFunction = { ...cloudFunc };

		existingFunction['executinPerRequestInMiliseconds'] = Number.parseInt(
			executinPerRequestInMiliseconds
		);
		existingFunction['memorySizeInMB'] = Number.parseInt(memorySizeInMB);
		existingFunction['executionsPerMonth'] = Number.parseFloat(
			executionsPerMonth
		);
		existingFunction['price'] = Number.parseFloat(price);
		existingFunction['cloudProvider'] = Number.parseInt(cloudProvider);

		try {
			const response = await fetch(`${functionUrl}/update`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(existingFunction),
			});

			if (response.ok) {
				const resJson = await response.json();

				console.log(resJson);
			}
		} catch (error) {}
	};

	let data = null;
	if (cloudFunc) {
		data = (
			<Card title="Update Cloud Function" containerStyle={{ width: '80%' }}>
				<Input
					placeholder="Executin Per Request In Miliseconds"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={executinPerRequestInMiliseconds.toString()}
					onChangeText={value => setExecutinPerRequestInMiliseconds(value)}
				/>

				<Input
					placeholder="Memory Size In MB"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={memorySizeInMB.toString()}
					onChangeText={value => setMemorySizeInMB(value)}
				/>

				<Input
					placeholder="Executions Per Month"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={executionsPerMonth.toString()}
					onChangeText={value => setExecutionsPerMonth(value)}
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
					onPress={updateFunctionHandler}
				/>
			</Card>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<Image
				style={{ height: '100%', width: '100%', position: 'absolute' }}
				source={{
					uri:
						'https://www.amaze.com.au/wp-content/uploads/2017/08/xiStock-490487412-2000x1328.jpg.pagespeed.ic.Y2hn-HvMDU.jpg',
				}}
			/>
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Insert id of cloud function"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={id}
					onChangeText={value => setId(value)}
				/>

				<Button
					title="Find Function"
					buttonStyle={styles.button}
					onPress={getFunctionById}
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

export default UpdateFunction;

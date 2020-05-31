import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import CloudFunction from '../../models/CloudFunction';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { functionUrl } from '../../utils/api';
import { CLOUD_PROVIDER } from '../../constants/enum';

const FindFunctionById = props => {
	const [id, setId] = useState('');
	const [cloudFunc, setCloudFunc] = useState(null);

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

			let cloud;
			switch (data.cloudProvider) {
				case 0:
					cloud = CLOUD_PROVIDER.aws;
					break;

				case 1:
					cloud = CLOUD_PROVIDER.azure;
					break;

				case 2:
					cloud = CLOUD_PROVIDER.gcloud;
					break;

				default:
					cloud = 'Unknown Cloud';
					break;
			}

			setCloudFunc(
				new CloudFunction(
					data.id,
					data.executinPerRequestInMiliseconds,
					data.memorySizeInMB,
					data.executionsPerMonth,
					cloud,
					data.price
				)
			);

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	let card = null;

	if (cloudFunc) {
		card = (
			<Card
				key={`${cloudFunc.id}-func`}
				title={cloudFunc.cloudProvider}
				containerStyle={{ backgroundColor: colors.lightBlue }}
			>
				<Text style={styles.cardText}>
					Execution per Request (ms):
					<Text style={{ color: colors.accentColor }}>
						{cloudFunc.executinPerRequestInMiliseconds}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Memory Size (mb):{' '}
					<Text style={{ color: colors.accentColor }}>
						{cloudFunc.memorySizeInMB}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Execution per Month:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudFunc.executionsPerMonth}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Price:{' '}
					<Text style={{ color: colors.primaryColor }}>
						{' '}
						${cloudFunc.price}
					</Text>
				</Text>
			</Card>
		);
	}

	return (
		<View style={styles.screen}>
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
			{card}
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

export default FindFunctionById;

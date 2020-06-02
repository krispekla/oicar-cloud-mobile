import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { storageUrl } from '../../utils/api';
import CloudStorage from '../../models/CloudStorage';
import { CLOUD_PROVIDER } from '../../constants/enum';

const FindStorageById = props => {
	const [id, setId] = useState('');
	const [cloudStorage, setCloudStorage] = useState(null);

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

			setCloudStorage(
				new CloudStorage(
					data.id,
					data.totalAmount,
					data.readOperationsPerMonth,
					data.writeOperationsPerMonth,
					cloud,
					data.price
				)
			);

			setId('');
		} catch (err) {
			console.log(err);
		}
	};

	let card = null;

	if (cloudStorage) {
		card = (
			<Card
				key={`${cloudStorage.id}-func`}
				title={cloudStorage.cloudProvider}
				containerStyle={{ backgroundColor: colors.lightBlue }}
			>
				<Text style={styles.cardText}>
					Total Amount:
					<Text style={{ color: colors.accentColor }}>
						{cloudStorage.totalAmount}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Read Operations Per Month:{' '}
					<Text style={{ color: colors.accentColor }}>
						{cloudStorage.readOperationsPerMonth}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Write Operations Per Month:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudStorage.writeOperationsPerMonth}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Price:{' '}
					<Text style={{ color: colors.primaryColor }}>
						{' '}
						${cloudStorage.price}
					</Text>
				</Text>
			</Card>
		);
	}

	return (
		<View style={styles.screen}>
			<Image
				style={{ height: '100%', width: '100%', position: 'absolute' }}
				source={{
					uri:
						'https://www.amaze.com.au/wp-content/uploads/2017/08/xiStock-490487412-2000x1328.jpg.pagespeed.ic.Y2hn-HvMDU.jpg',
				}}
			/>
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

export default FindStorageById;

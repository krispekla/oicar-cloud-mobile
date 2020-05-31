import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { vmUrl } from '../../utils/api';
import CloudVM from '../../models/CloudVM';
import {
	CLOUD_PROVIDER,
	OPERATING_SYSTEM,
	STORAGE_TYPE,
} from '../../constants/enum';

const FindVMById = props => {
	const [id, setId] = useState('');
	const [cloudVM, setCloudVM] = useState(null);

	const getVMById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();
		try {
			const response = await fetch(`${vmUrl}?id=${id}`, {
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

			let storageType;
			switch (data.storageType) {
				case 0:
					storageType = STORAGE_TYPE.hdd;
					break;
				case 1:
					storageType = STORAGE_TYPE.ssd;
					break;

				default:
					storageType = 'Unknown Cloud';
			}

			let operatingSystem;
			switch (data.operatingSystem) {
				case 0:
					operatingSystem = OPERATING_SYSTEM.windows;
					break;
				case 1:
					operatingSystem = OPERATING_SYSTEM.linux;
					break;

				default:
					operatingSystem = 'Unknown Cloud';
			}

			setCloudVM(
				new CloudVM(
					data.id,
					data.instanceNb,
					operatingSystem,
					data.core,
					data.ram,
					data.storage,
					storageType,
					data.averageHoursPerDay,
					data.averageDaysPerWeek,
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

	if (cloudVM) {
		card = (
			<Card
				key={`${cloudVM.id}-v,`}
				title={cloudVM.cloudProvider}
				containerStyle={{ backgroundColor: colors.lightBlue }}
			>
				<Text style={styles.cardText}>
					Number of Instance:
					<Text style={{ color: colors.accentColor }}>
						{cloudVM.instanceNb}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Operating System:{' '}
					<Text style={{ color: colors.accentColor }}>
						{cloudVM.operatingSystem}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					CPU Core:{' '}
					<Text style={{ color: colors.accentColor }}> {cloudVM.core}</Text>
				</Text>
				<Text style={styles.cardText}>
					RAM: <Text style={{ color: colors.accentColor }}> {cloudVM.ram}</Text>
				</Text>
				<Text style={styles.cardText}>
					RAM: <Text style={{ color: colors.accentColor }}> {cloudVM.ram}</Text>
				</Text>
				<Text style={styles.cardText}>
					Storage:{' '}
					<Text style={{ color: colors.accentColor }}> {cloudVM.storage}</Text>
				</Text>
				<Text style={styles.cardText}>
					Storage Type:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudVM.storageType}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Average Hours Per Day:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudVM.averageHoursPerDay}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Average Days Per Week:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudVM.averageDaysPerWeek}
					</Text>
				</Text>

				<Text style={styles.cardText}>
					Price:{' '}
					<Text style={{ color: colors.primaryColor }}> ${cloudVM.price}</Text>
				</Text>
			</Card>
		);
	}

	return (
		<View style={styles.screen}>
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Insert id of cloud vm"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={id}
					onChangeText={value => setId(value)}
				/>

				<Button
					title="Find VM"
					buttonStyle={styles.button}
					onPress={getVMById}
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

export default FindVMById;

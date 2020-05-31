import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { sqlUrl } from '../../utils/api';
import CloudDbSQL from '../../models/CloudDbSQL';
import { CLOUD_PROVIDER, SQL_SERVER_TYPE } from '../../constants/enum';

const FindDbSQLById = props => {
	const [id, setId] = useState('');
	const [cloudDbSQL, setCloudDbSQL] = useState(null);

	const getSQLById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();
		try {
			const response = await fetch(`${sqlUrl}?id=${id}`, {
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

			let sqlType;
			switch (data.sqlServerType) {
				case 0:
					sqlType = SQL_SERVER_TYPE.standard;
					break;
				case 1:
					sqlType = SQL_SERVER_TYPE.enterprise;
					break;

				case 2:
					sqlType = SQL_SERVER_TYPE.express;
					break;

				case 3:
					sqlType = SQL_SERVER_TYPE.web;
					break;

				default:
					sqlType = 'Unknown Cloud';
			}

			setCloudDbSQL(
				new CloudDbSQL(
					data.id,
					data.ram,
					data.instance,
					data.cpuCores,
					data.baskupSize,
					data.averageHoursPerDay,
					data.averageDaysPerWeek,
					sqlType,
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

	if (cloudDbSQL) {
		card = (
			<Card
				key={`${cloudDbSQL.id}-sql`}
				title={cloudDbSQL.cloudProvider}
				containerStyle={{ backgroundColor: colors.lightBlue }}
			>
				<Text style={styles.cardText}>
					Instance:
					<Text style={{ color: colors.accentColor }}>
						{cloudDbSQL.instance}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					RAM:{' '}
					<Text style={{ color: colors.accentColor }}>{cloudDbSQL.ram}</Text>
				</Text>
				<Text style={styles.cardText}>
					CPU Cores:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudDbSQL.cpuCores}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Backup Size:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudDbSQL.baskupSize}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Average Hours Per Day:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudDbSQL.averageHoursPerDay}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Average Days Per Week:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudDbSQL.averageDaysPerWeek}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					SQL Server Type:{' '}
					<Text style={{ color: colors.accentColor }}>
						{' '}
						{cloudDbSQL.sqlServerType}
					</Text>
				</Text>
				<Text style={styles.cardText}>
					Price:{' '}
					<Text style={{ color: colors.primaryColor }}>
						{' '}
						${cloudDbSQL.price}
					</Text>
				</Text>
			</Card>
		);
	}

	return (
		<View style={styles.screen}>
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
					onPress={getSQLById}
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

export default FindDbSQLById;

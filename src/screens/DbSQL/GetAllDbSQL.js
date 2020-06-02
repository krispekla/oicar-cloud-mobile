import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import CloudDbSQL from '../../models/CloudDbSQL';
import { CLOUD_PROVIDER, SQL_SERVER_TYPE } from '../../constants/enum';
import { sqlUrl } from '../../utils/api';

const GetAllDbSQL = props => {
	const [sqlList, setSqlList] = useState([]);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			const response = await fetch(`${sqlUrl}/getAll`);

			const resData = await response.json();

			const arr = [];
			resData.map(data => {
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

				arr.push(
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
			});

			setSqlList(arr);
			setRecords(resData);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async id => {
		console.log(id);
		try {
			const cloudSQL = records.find(item => item.id === id);

			const response = await fetch(`${sqlUrl}/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cloudSQL),
			});

			const s = await response.json();
			if (response.ok) {
				alert('SQL Database Deleted');
				const sql = [...sqlList];
				const newSDbSQLList = sql.filter(item => item.id !== id);
				setSqlList(newSDbSQLList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	let data = <Text>No Data</Text>;

	if (sqlList) {
		data = (
			<ScrollView>
				{sqlList.map(item => (
					<Card
						key={`${item.id}-sql`}
						title={item.cloudProvider}
						containerStyle={{ backgroundColor: colors.lightBlue }}
					>
						<Text style={styles.cardText}>
							Instance:
							<Text style={{ color: colors.accentColor }}>{item.instance}</Text>
						</Text>
						<Text style={styles.cardText}>
							RAM: <Text style={{ color: colors.accentColor }}>{item.ram}</Text>
						</Text>
						<Text style={styles.cardText}>
							CPU Cores:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.cpuCores}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Backup Size:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.baskupSize}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Average Hours Per Day:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.averageHoursPerDay}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Average Days Per Week:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.averageDaysPerWeek}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							SQL Server Type:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.sqlServerType}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Price:{' '}
							<Text style={{ color: colors.primaryColor }}> ${item.price}</Text>
						</Text>
						<Button
							title="Delete"
							containerStyle={{ marginTop: 10 }}
							onPress={() => deleteItem(item.id)}
							buttonStyle={styles.button}
						/>
					</Card>
				))}
			</ScrollView>
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
			<View style={{ margin: 10 }}>
				<FontAwesome name="database" size={25} color="black" />
			</View>

			{data}
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
	cardText: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingTop: 5,
	},
	button: {
		backgroundColor: colors.red,
	},
});

export default GetAllDbSQL;

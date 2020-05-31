import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import CloudStorage from '../../models/CloudStorage';
import { CLOUD_PROVIDER } from '../../constants/enum';
import { storageUrl } from '../../utils/api';

const GetAllStorage = props => {
	const [storageList, setStorageList] = useState([]);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			const response = await fetch(`${storageUrl}/getAll`);

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

				arr.push(
					new CloudStorage(
						data.id,
						data.totalAmount,
						data.readOperationsPerMonth,
						data.writeOperationsPerMonth,
						cloud,
						data.price
					)
				);
			});

			setStorageList(arr);
			setRecords(resData);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async id => {
		console.log(id);
		try {
			const cloudStorage = records.find(item => item.id === id);

			console.log(cloudStorage);

			const response = await fetch(`${storageUrl}/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cloudStorage),
			});

			const s = await response.json();
			if (response.ok) {
				alert('Storage Deleted');
				const storage = [...storageList];
				const newStorageList = storage.filter(item => item.id !== id);
				setStorageList(newStorageList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	let data = <Text>No Data</Text>;

	if (storageList) {
		data = (
			<ScrollView>
				{storageList.map(item => (
					<Card
						key={`${item.id}-func`}
						title={item.cloudProvider}
						containerStyle={{ backgroundColor: colors.lightBlue }}
					>
						<Text style={styles.cardText}>
							Total Amount:
							<Text style={{ color: colors.accentColor }}>
								{item.totalAmount}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Read Operations Per Month:{' '}
							<Text style={{ color: colors.accentColor }}>
								{item.readOperationsPerMonth}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Write Operations Per Month:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.writeOperationsPerMonth}
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

export default GetAllStorage;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import {
	CLOUD_PROVIDER,
	OPERATING_SYSTEM,
	STORAGE_TYPE,
} from '../../constants/enum';
import { vmUrl } from '../../utils/api';
import CloudVM from '../../models/CloudVM';

const GetAllVM = props => {
	const [vmList, setVMList] = useState([]);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			const response = await fetch(`${vmUrl}/getAll`);

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

				arr.push(
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
			});

			setVMList(arr);
			setRecords(resData);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async id => {
		try {
			const cloudVM = records.find(item => item.id === id);

			const response = await fetch(`${vmUrl}/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cloudVM),
			});

			const s = await response.json();
			if (response.ok) {
				alert('VM Deleted');
				const vms = [...vmList];
				const newVMList = vms.filter(item => item.id !== id);
				setVMList(newVMList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	let data = <Text>No Data</Text>;

	if (vmList) {
		data = (
			<ScrollView>
				{vmList.map(item => (
					<Card
						key={`${item.id}-vm`}
						title={item.cloudProvider}
						containerStyle={{
							backgroundColor: colors.lightBlue,
							width: '100%',
						}}
					>
						<Text style={styles.cardText}>
							Number of Instances:
							<Text style={{ color: colors.accentColor }}>
								{item.instanceNb}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Operating System:{' '}
							<Text style={{ color: colors.accentColor }}>
								{item.operatingSystem}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Core:{' '}
							<Text style={{ color: colors.accentColor }}> {item.core}</Text>
						</Text>
						<Text style={styles.cardText}>
							RAM:{' '}
							<Text style={{ color: colors.accentColor }}> {item.ram}</Text>
						</Text>
						<Text style={styles.cardText}>
							Storage:{' '}
							<Text style={{ color: colors.accentColor }}> {item.storage}</Text>
						</Text>
						<Text style={styles.cardText}>
							Storage Type:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.storageType}
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

export default GetAllVM;

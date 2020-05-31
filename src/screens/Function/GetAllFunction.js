import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Card, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import CloudFunction from '../../models/CloudFunction';
import { CLOUD_PROVIDER } from '../../constants/enum';
import { functionUrl } from '../../utils/api';
import { AntDesign } from '@expo/vector-icons';

const GetAllFunction = props => {
	const [functionsList, setFunctionList] = useState([]);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			const response = await fetch(`${functionUrl}/getAll`);

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
					new CloudFunction(
						data.id,
						data.executinPerRequestInMiliseconds,
						data.memorySizeInMB,
						data.executionsPerMonth,
						cloud,
						data.price
					)
				);
			});

			setFunctionList(arr);
			setRecords(resData);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async id => {
		try {
			const cloudFunc = records.find(item => item.id === id);

			const response = await fetch(`${functionUrl}/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cloudFunc),
			});

			const s = await response.json();

			if (response.ok) {
				alert('Function Deleted');
				const func = [...functionsList];
				const newFunctionsList = func.filter(item => item.id !== id);
				setFunctionList(newFunctionsList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	let data = <Text>No Data</Text>;

	if (functionsList) {
		data = (
			<ScrollView>
				{functionsList.map(item => (
					<Card
						key={`${item.id}-func`}
						title={item.cloudProvider}
						containerStyle={{ backgroundColor: colors.lightBlue }}
					>
						<Text style={styles.cardText}>
							Execution per Request (ms):
							<Text style={{ color: colors.accentColor }}>
								{item.executinPerRequestInMiliseconds}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Memory Size (mb):{' '}
							<Text style={{ color: colors.accentColor }}>
								{item.memorySizeInMB}
							</Text>
						</Text>
						<Text style={styles.cardText}>
							Execution per Month:{' '}
							<Text style={{ color: colors.accentColor }}>
								{' '}
								{item.executionsPerMonth}
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

export default GetAllFunction;

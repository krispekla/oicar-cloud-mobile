import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PricingCard } from 'react-native-elements';
import { suggestionUrl } from '../../utils/api';
import { colors } from '../../constants/colors';

const Suggestion = () => {
	const [configuration, setConfiguration] = useState();

	const [cloudDbSQL, setCloudDbSQL] = useState();
	const [cloudStorage, setCloudStorage] = useState();
	const [cloudVM, setCloudVM] = useState();
	const [cloudFunction, setCloudFunction] = useState();

	useEffect(() => {
		fetchSuggestion();
	}, []);

	const fetchSuggestion = async () => {
		try {
			const response = await fetch(`${suggestionUrl}/topCombination`, {
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			});

			const data = await response.json();

			setConfiguration(data);

			data.map(config => {
				setCloudDbSQL(config.cloudDbSQL);
				setCloudStorage(config.cloudStorage);
				setCloudVM(config.cloudVM);
				setCloudFunction(config.cloudFunction);
			});
		} catch (err) {
			console.log(err);
		}
	};

	let data;
	if (configuration) {
		data = (
			<PricingCard
				onButtonPress={() => alert('Purchased')}
				title={configuration[0].provider}
				price={['$', configuration[0].totalPrice].join('')}
				info={[
					cloudStorage ? `Cloud Storage: $${cloudStorage.price}` : null,
					cloudDbSQL ? `Cloud SQL: $${cloudDbSQL.price}` : null,
					cloudVM ? `Cloud VM: $${cloudVM.price}` : null,
					cloudFunction ? `Cloud Functions: $${cloudFunction.price}` : null,
				]}
				button={{ title: 'Purchase', icon: 'flight-takeoff' }}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<Text style={{ fontSize: 24, color: colors.red }}>
					Daily Suggestion
				</Text>
			</View>
			{data}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default Suggestion;

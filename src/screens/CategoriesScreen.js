import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CategoryGridTile from '../components/CategoryGridTile/CategoryGridTile';

const CategoriesScreen = props => {
	const [token, setToken] = useState();

	useEffect(() => {
		getToken();

		return () => {
			console.log('Get Token');
		};
	}, []);

	const getToken = async () => {
		const data = await SecureStore.getItemAsync('token');

		setToken(data);
	};

	const renderGridItem = itemGrid => {
		const { title, navigate } = itemGrid.item;

		return (
			<CategoryGridTile
				title={title}
				navigate={() => props.navigation.navigate(navigate)}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<Image
				style={{ height: '100%', width: '100%', position: 'absolute' }}
				source={{
					uri:
						'https://www.amaze.com.au/wp-content/uploads/2017/08/xiStock-490487412-2000x1328.jpg.pagespeed.ic.Y2hn-HvMDU.jpg',
				}}
			/>
			<FlatList
				numColumns={2}
				data={[
					{ id: 1, title: 'Functions', navigate: 'Function' },
					{ id: 2, title: 'SQL Databases', navigate: 'SQL' },
					{ id: 3, title: 'Virtual Machines', navigate: 'VM' },
					{ id: 4, title: 'Storage', navigate: 'Storage' },
				]}
				renderItem={renderGridItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoriesScreen;

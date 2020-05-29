import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

import CategoryGridTile from '../components/CategoryGridTile/CategoryGridTile';

const CategoriesScreen = props => {
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
	);
};

CategoriesScreen.navigationOptions = {
	headerTitle: 'Cloud Calculator Categories',
	headerStyle: {
		backgroundColor: colors.primaryColor,
	},
	headerTintColor: 'white',
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoriesScreen;

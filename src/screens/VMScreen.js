import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import CategoryGridTile from '../components/CategoryGridTile/CategoryGridTile';

const VMScreen = props => {
	const renderGridItem = itemGrid => {
		const { title, navigate } = itemGrid.item;

		return (
			<CategoryGridTile
				title={title}
				navigate={() => props.navigation.navigate(navigate)}
			/>
		);
	};

	const getHeader = () => (
		<View style={styles.screen}>
			<Entypo name="classic-computer" size={72} color="black" />
			<Text>The VM Screen!</Text>
		</View>
	);
	return (
		<FlatList
			numColumns={2}
			data={[
				{ id: 1, title: 'GetAll', navigate: 'GetAll' },
				{ id: 2, title: 'FindById', navigate: 'FindById' },
				{ id: 3, title: 'Create', navigate: 'Create' },
				{ id: 4, title: 'Update', navigate: 'Update' },
			]}
			renderItem={renderGridItem}
			ListHeaderComponent={getHeader}
		/>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default VMScreen;

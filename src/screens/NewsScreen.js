import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../constants/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { checkInteger, checkDoubles } from '../utils/checkInputValues';
import CategoryGridTile from '../components/CategoryGridTile/CategoryGridTile';

const NewsScreen = props => {
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
			<MaterialCommunityIcons name="function" size={32} color="black" />
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

export default NewsScreen;

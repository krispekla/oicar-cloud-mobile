import React, { useState, useLayoutEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	Image,
} from 'react-native';
import { colors } from '../constants/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { checkInteger, checkDoubles } from '../utils/checkInputValues';
import CategoryGridTile from '../components/CategoryGridTile/CategoryGridTile';

const FunctionScreen = props => {
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
					{ id: 1, title: 'GetAll', navigate: 'GetAll' },
					{ id: 2, title: 'FindById', navigate: 'FindById' },
					{ id: 3, title: 'Create', navigate: 'Create' },
					{ id: 4, title: 'Update', navigate: 'Update' },
				]}
				renderItem={renderGridItem}
				ListHeaderComponent={getHeader}
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

export default FunctionScreen;

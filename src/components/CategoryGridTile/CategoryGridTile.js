import React from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';

const CategoryGridTile = ({ title, navigate }) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<View style={styles.gridItem}>
			<TouchableCmp onPress={navigate} style={{ flex: 1 }}>
				<View style={styles.card}>
					<Text style={styles.title} numberOfLines={2}>
						{title}
					</Text>
				</View>
			</TouchableCmp>
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 15,
		height: 200,
		borderRadius: 10,
		overflow: 'hidden',
	},
	card: {
		backgroundColor: '#89cff0',
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.6,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		elevation: 3,
		padding: 15,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	title: {
		fontSize: 22,
		textAlign: 'right',
	},
});

export default CategoryGridTile;

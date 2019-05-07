import React from "react";

import {
	TouchableOpacity,

	StyleSheet
} from "react-native";

import Triangle from "react-native-triangle";

export default class DogEar extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					width: 60,
					height: 60,
					position: "absolute",
					zIndex: 1
				}}

				onPress={() =>
					this.props.navigation.dispatch({
						type: "Navigation/BACK"
					})
				}
			>
				<Triangle
					width={60}
					height={60}
					color="#fff"
					direction="up-left"
					style={{
						position: "absolute"
					}}
				/>
				<Triangle
					width={60}
					height={60}
					color="#fff"
					direction="down-right"
					style={{
						shadowOffset: {
							width: 1,
							height: 1
						},
						shadowColor: "#111",
						shadowOpacity: 0.16,

						position: "absolute",
						left: 0,
						top: 0
					}}
				/>
			</TouchableOpacity>
		);
	}
}

import React from "react";
import {
	View
} from "react-native";

export default class Hr extends React.Component {
	render() {
		return (
        <View
          style={{
            borderBottomColor: "#303030",
            borderBottomWidth: 6,
						marginLeft: 16,
						marginRight: 16,
          }}
        />
		);
	}
}

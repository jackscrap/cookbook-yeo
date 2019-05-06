import React from "react";
import {
  SafeAreaView,
	View,
	Text
} from "react-native";
export default class Head extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text
            style={{
              margin: 8,
              fontFamily: "Times New Roman",
              fontSize: 100,
              textAlign: "center",
              color: "#303030"
            }}
          >
            A
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

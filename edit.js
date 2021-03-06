import React from "react";

import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,

	StyleSheet
} from "react-native";

import DogEar from "./dogEar";
import Head from "./head";
import Ctrl from "./ctrl";

import Hr from "./hr";

import style from "./style";

import * as firebase from "firebase";

export default class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ln: [],
      recipe: [],

			title: "",
			email: "",
			ingredient: [],
			note: "",
			step: [
				{
					title: "",
					desc: ""
				}
			],

			errorMessage: null,

			user: this.props.navigation.getParam("user", "...")
    };
  }

	update = () => {
		let i = this.props.navigation.getParam("i");

		firebase.database().ref().child("recipe/" + i).update(
			{
				email: this.state.email,

				title: this.state.title,
				ingredient: this.state.ingredient,
				note: this.state.note,
				step: this.state.step
			}
		);

		this.props.navigation.navigate(
			"Recipe",
			{
				i: i
			}
		);
	}

  static navigationOptions = {
    headerLeft: null
  };

  componentDidMount() {
    const
			root = firebase.database().ref(),
      ref = root.child("recipe");

    ref.on("value", snap => {
			let
				i = this.props.navigation.getParam("i"),

				inst = snap.val()[i];

      this.setState({
        recipe: snap.val(),

				title: inst.title,
				email: inst.email,
				ingredient: inst.ingredient,
				note: inst.note,
				step: inst.step
      });
    });

		firebase.auth().onAuthStateChanged(
			(user) => {
				this.setState({
					user: user
				});
			}
		);
  }

  alphabet() {
    let
			c = [],
      i = "a".charCodeAt(0);

    const j = "z".charCodeAt(0);

    for (
			;
			i <= j;
			++i
		) {
      c.push(String.fromCharCode(i));
    }

    return c;
  }

  render() {
		const styles = StyleSheet.create({
			head: {
				margin: 8,
				fontSize: 26
			},
			txt: {
				margin: 8
			}
		});

		if (this.state.title != undefined) {
			return (
				<SafeAreaView
					style={{
						flex: 1,
						borderWidth: 26,
						borderColor: "#303030"
					}}
				>
					<DogEar
						navigation={this.props.navigation}
					/>

					<Head />

					<Hr />

					<Ctrl
						user={this.state.user}
						navigation={this.props.navigation}
					/>

					<Hr />

					<ScrollView>
						<View
							style={{
								padding: 8
							}}
						>
							<Text
								style={{
									fontSize: 26,
									margin: 8
								}}
							>
								Title
							</Text>

							<TextInput
								placeholder="Title"
								autoCapitalize="none"
								style={
									style.txtInput
								}
								onChangeText={
									title => this.setState({
										title: title
									})
								}
								defaultValue={
									this.state.title
								}
							/>

							<Text
								style={{
									fontSize: 26,
									margin: 8
								}}
							>
								Notes
							</Text>

							<TextInput
								placeholder="Notes"
								autoCapitalize="none"
								style={
									style.txtInput
								}
								onChangeText={
									note => this.setState({
										note: note
									})
								}
								defaultValue={
									this.state.note
								}
							/>

							<View>
								<Text
									style={
										styles.head
									}
								>
									Ingredients
								</Text>

								<TouchableOpacity
									onPress={
										() => {
											this.setState({
												ingredient: [
													...this.state.ingredient,
													""
												]
											});
										}
									}
								>
									<Text
										style={{
											margin: 8,
											color: "grey"
										}}
									>
										New
									</Text>
								</TouchableOpacity>

								<View>
									{
										this.state.ingredient.map((val, i) => {
											return (
												<TextInput
													key={i}
													defaultValue={this.state.ingredient[i]}
													placeholder="Ingredient"
													style={
														style.txtInput
													}
													onChangeText={
														(txt) => {
															this.state.ingredient[i] = txt;
														}
													}
												>
													{
														val.body
													}
												</TextInput>
											)
										})
									}
								</View>
							</View>

							<View>
								<Text
									style={
										styles.head
									}
								>
									Steps
								</Text>

								<TouchableOpacity
									onPress={
										() => {
											this.setState({
												step: [
													...this.state.step,
													{
														title: "",
														desc: ""
													}
												]
											});
										}
									}
								>
									<Text
										style={{
											margin: 8,
											color: "grey"
										}}
									>
										New
									</Text>
								</TouchableOpacity>

								<View>
									{
										this.state.step.map((val, i) => {
											return (
												<View
													key={i}
												>
													<Text
														style={{
															margin: 8,
															fontSize: 40,
														}}
													>
														{
															i
														}
													</Text>

													<TextInput
														placeholder="Header"
														defaultValue={this.state.step[i]["title"]}
														onChangeText={
															(txt) => {
																this.state.step[i]["title"] = txt;
															}
														}
														style={
															style.txtInput
														}
													>
														{
															val.name
														}
													</TextInput>

													<TextInput
														placeholder="Instructions"
														defaultValue={this.state.step[i]["desc"]}
														onChangeText={
															(txt) => {
																this.state.step[i]["desc"] = txt;
															}
														}
														style={
															style.txtInput
														}
													>
														{
															val.body
														}
													</TextInput>
												</View>
											)
										})
									}
								</View>
							</View>
						</View>

						<TouchableOpacity
							onPress={
								this.update
							}
							style={{
								padding: 8
							}}
						>
							<Text
								style={{
									margin: 8,
									color: "grey"
								}}
							>
								Enter
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			);
		} else {
			return (
				<Text>
					...
				</Text>
			);
		}
  }
}


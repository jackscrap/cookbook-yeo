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

import Head from "./head";
import Hr from "./hr";
import Ctrl from "./ctrl";
import DogEar from "./dogEar";

import * as firebase from "firebase";

export default class New extends React.Component {
	constructor(props) {
		super(props);
	}

  static navigationOptions = {
    headerLeft: null
  };

	state = {
		header: "",
		author: "Jack Alma",
		email: "jackhasakeyboard@gmail.com",
		ingredient: [
			""
		],
		note: [],
		step: [
			{
				header: "",
				inst: ""
			}
		],

		errorMessage: null,

		user: this.props.navigation.getParam("user", "...")
	};

	post = () => {
		firebase.database().ref().child("recipe").push(
			{
				"header": this.state.header,
				"author": this.state.author,
				"email": this.state.email,
				"ingredient": this.state.ingredient,
				"note": [
				],
				"step": [
				]
			}
		).then(
			this.props.navigation.navigate("Recipe", {
				i: 0
			})
		);
	}

	render() {
		const styles = StyleSheet.create({
			head: {
				margin: 8,
				fontSize: 26
			},
			txt: {
				margin: 8
			},
			textInput: {
				padding: 8,
				margin: 8,
				height: 40,
				// borderBottomWidth: 6,
				// borderColor: "#303030"

				borderWidth: 2,
				borderColor: "grey"
			}
		});

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
						<TextInput
							placeholder="Header"
							autoCapitalize="none"
							style={
								styles.textInput
							}
							onChangeText={
								header => this.setState({
									header: header
								})
							}
							value={
								this.state.header
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
									New Ingredient
								</Text>
							</TouchableOpacity>

							<View>
								{
									this.state.ingredient.map((val, i) => {
										return (
											<TextInput
												placeholder="Ingredient"
												style={
													styles.textInput
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
													name: "",
													cont: ""
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
									New Step
								</Text>
							</TouchableOpacity>

							<View
								style={{
									margin: 8
								}}
							>
								{
									this.state.step.map((val, i) => {
										return (
											<View>
												<Text
													style={{
														fontSize: 40
													}}
												>
													{
														i
													}
												</Text>

												<TextInput
													placeholder="Header"
													onChangeText={
														(txt) => {
															this.state.step[i]["Title"] = txt;
														}
													}
													style={
														styles.textInput
													}
												>
													{
														val.name
													}
												</TextInput>

												<TextInput
													placeholder="Instructions"
													onChangeText={
														(txt) => {
															this.state.step[i]["inst"] = txt;
														}
													}
													style={
														styles.textInput
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
							this.post
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
	}
}

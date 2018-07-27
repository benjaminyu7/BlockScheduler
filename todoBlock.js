import React, {Component} from 'react';
import {Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';

//This component contain the text and title for a todo item
export default class TodoBlock extends React.Component<props> {
	constructor(title, description) {
		super();
		this.title=title;
		this.description=description;
	}

	render(){
		return(
			<View style={todoStyle.block}>
				<Text>{this.props.title}</Text>
				<Text>{this.props.description}</Text>
			</View>
		);
		
	}
}

//Style the Component
const todoStyle = StyleSheet.create({
	block: {
		width: 100,
		height: 100,
		backgroundColor: '#AFEEEE'
	},
});
export {TodoBlock}

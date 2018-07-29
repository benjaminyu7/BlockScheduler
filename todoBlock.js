import React, {Component} from 'react';
import {TouchableOpacity,Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';

//This component contain the text and title for a todo item
export default class TodoBlock extends React.Component<props> {
	constructor(title, description,func, index, selected) {
		super();
		this.title=title;
		this.description=description;
		this.index=index;
		this.selected=selected;
	}

	getSelected

	render(){
		var style = todoStyle.block;
		if (this.props.index === this.props.selected) {
			style = todoStyle.selected;
		}
		return(
			<TouchableOpacity style={style} onPress={this.props.func.bind(this,this.props.index)}>
				<Text style={{fontSize: 20, textAlign: 'center', marginTop: 5}}>{this.props.title}</Text>
				<Text style={{fontSize: 12, textAlign: 'center', margin: 5}}>{this.props.description}</Text>
			</TouchableOpacity>
		);
		
	}
}

//Style the Component
const todoStyle = StyleSheet.create({
	block: {
		width: 100,
		height: 100,
		backgroundColor: '#AFEEEE',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 10,
	},
	selected: {
		width: 100,
		height: 100,
		backgroundColor: '#AFEEEE',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'brown',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop:10,
	},
});
export {TodoBlock}

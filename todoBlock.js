import React, {Component} from 'react';
import {TouchableOpacity,Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';

//This component contain the text and title for a todo item, with passed block selection func, index of the block, currently selected block, category of the block
export default class TodoBlock extends React.Component<props> {
	
	constructor(title, description,func, index, selected, category, parentBlock,childrenBlock) {
		super();
		this.title=title;
		this.description=description;
		this.index=index;
		this.selected=selected;
		this.category=category;
		this.parentBlock=parentBlock;
		this.childrenBlock=childrenBlock;
	}

	getSelected

	render(){
		var style = todoStyle.block;
		//selected styling
		if (this.props.index === this.props.selected) {
			style = todoStyle.selected;
		} else if (this.props.category === 'urgentImportant') {
			style = todoStyle.urgentImportant;
		} else if (this.props.category === 'important') {
			style = todoStyle.important;
		} else if (this.props.category === 'urgentUnimportant') {
			style = todoStyle.urgentUnimportant;
		} else if (this.props.category === 'unimportant') {
			style = todoStyle.unimportant;
		} else {
			style = todoStyle.other;
		}


		//categorical styling
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
	urgentImportant: {
		width: 120,
		height: 120,
		backgroundColor: 'palevioletred',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop: 0,
	},
	important: {
		width: 120,
		height: 120,
		backgroundColor: 'palegreen',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop: 0,
	},
	urgentUnimportant: {
		width: 120,
		height: 120,
		backgroundColor: 'palegoldenrod',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop: 0,
	},
	unimportant: {
		width: 120,
		height: 120,
		backgroundColor: '#AFEEEE',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop: 0,
	},
	other: {
		width: 120,
		height: 120,
		backgroundColor: 'wheat',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'grey',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop:0,
	},

	selected: {
		width: 120,
		height: 120,
		backgroundColor: 'lightsalmon',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'brown',
		//marginLeft: 'auto',
		//marginRight: 'auto',
		marginTop:0,
	},
});
export {TodoBlock}

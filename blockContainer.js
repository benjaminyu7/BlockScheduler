import React, {Component} from 'react';
import {ScrollView,Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';
import TodoBlock from './todoBlock';

class BlockContainer extends Component<Props> {
	constructor() {
		super();
		this.state={
			blockArray: null,
			selected: 1,
		};
		this.handleInput = this.handleInput.bind(this);
		this.selectBlock = this.selectBlock.bind(this);
		this.deleteBlock = this.deleteBlock.bind(this);
	}

	//get all the blocks from storage and set the block state 'blockArray'
	componentDidMount() {
		AsyncStorage.getItem('urgentImportant').then((value)=>this.setState({blockArray: JSON.parse(value)})); 
	}

	//Sets the state of input, creates a block
	handleInput (newTitle,newDescription) {
		//input function for BlockInput as props
		var urgentImportant ; 
		if (this.state.blockArray === null) {
			this.setState({blockArray: [{title:newTitle, description:newDescription}]});
		} else {
			this.state.blockArray.push({title: newTitle , description: newDescription})
			this.setState((prevState)=>(  {blockArray: prevState.blockArray }));
		}
		AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
	}

	//Sets the selected block state, for editing and deleting
	selectBlock (index) {
		this.setState({selected: index});
	}

	//Handles the deletion of a block
	deleteBlock () {
		if (this.state.selected !== -1) {
			this.state.blockArray.splice(this.state.selected,1);
			this.setState((prevState)=>({blockArray:prevState.blockArray, selected: -1}));
			AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
		}	
	}

	render() {
		//Takes the blockArray State and creates all of the blocks
		var blocks = [];
		var x;
		if (this.state.blockArray !== null) {
			for (x=0; x<this.state.blockArray.length; x++) {
				blocks.push(<TodoBlock key={x} title={this.state.blockArray[x].title} description={this.state.blockArray[x].description} func={this.selectBlock} index={x} selected={this.state.selected}/>);
			}
		}
		return(
			<View style={{alignItems: 'center'}}>
				<ScrollView contentContainerStyle={todoStyle.container} style={{flex:1}}>
					{blocks}
				</ScrollView>
				<BlockInput func={this.handleInput} deleteBlock={this.deleteBlock} style={{flex:1}}/>
				<Text>{this.state.selected}</Text>
			</View>
		);
	}
}


const todoStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export {BlockContainer}

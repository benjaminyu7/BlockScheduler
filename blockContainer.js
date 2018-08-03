import React, {Component} from 'react';
import {ScrollView,Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';
import TodoBlock from './todoBlock';
import {TipBar} from './tipBar';

class BlockContainer extends Component<Props> {
	constructor() {
		super();
		this.state={
			blockArray: null,
			selected: -1,
		};
		this.handleInput = this.handleInput.bind(this);
		this.selectBlock = this.selectBlock.bind(this);
		this.deleteBlock = this.deleteBlock.bind(this);
	}

	//get all the blocks from storage and set the block state 'blockArray'
	componentDidMount() {
		AsyncStorage.getItem('urgentImportant').then((value)=>this.setState({blockArray: JSON.parse(value)})); 
	}

	//creates the block data object w/ title, description, category
	handleInput (newTitle,newDescription,newCategory) {
		//input function for BlockInput as props
		var urgentImportant ; 
		if (this.state.blockArray === null) {
			this.setState({blockArray: [{title:newTitle, description:newDescription, category: newCategory}]});
		} else {
			this.state.blockArray.push({title: newTitle , description: newDescription, category: newCategory})
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
		//Create the list of blocks from the state of block data, 4 categories
		if (this.state.blockArray !== null) {
			for (x=this.state.blockArray.length-1; x>=0; x--) {
				blocks.push(<TodoBlock key={x} title={this.state.blockArray[x].title} description={this.state.blockArray[x].description} func={this.selectBlock} index={x} selected={this.state.selected} category={this.state.blockArray[x].category}/>);
			}
		}
		return(
			<View>
				<TipBar />
				<ScrollView contentContainerStyle={todoStyle.container} style={{flex:1}}>
					{blocks}
				</ScrollView>
				<BlockInput func={this.handleInput} deleteBlock={this.deleteBlock} style={{flex:1}}/>
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

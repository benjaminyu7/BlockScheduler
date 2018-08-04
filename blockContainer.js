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
			directory: null, //the block directory located in
		};
		this.loadRoot = this.loadRoot.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.selectBlock = this.selectBlock.bind(this);
		this.deleteBlock = this.deleteBlock.bind(this);
		this.changeDirectory = this.changeDirectory.bind(this);
	}

	//get all the blocks from storage and set the block state 'blockArray'
	componentDidMount() {
		this.loadRoot();
	}

	loadRoot () {
		AsyncStorage.getItem('urgentImportant').then((value)=>this.setState({blockArray: JSON.parse(value), selected: -1, directory:null})); 
	}
	/*creates the block data object w/ title, description, category, and parent
	*/
	handleInput (newTitle,newDescription,newCategory) {
		//input function for BlockInput as props
		var urgentImportant ; 
		var newObject = {title:newTitle, description:newDescription, category: newCategory, parentBlock: null, childrenBlock: null};
		if (this.state.blockArray === null) {
			this.setState({blockArray: [newObject]});
		} else {
			this.state.blockArray.push(newObject)
			this.setState((prevState)=>(  {blockArray: prevState.blockArray }));
		}
		AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
	}
	
	//changes the toodblock directory for the blocks which are displayed
	changeDirectory(index){
		if(this.state.directory===this.state.blockArray[index]) {
			if(this.state.directory.parentBlock===null) {
				this.loadRoot();
			} else {
				//load the parent directory
				this.setState((prevState)=>{return {
					blockArray: [prevState.directory.parentBlock],
					directory: prevState.directory.parentBlock,
					selected: -1,
				}});
			}
		} else {
			//sets the array block with the parent and children
			this.setState((prevState)=>{return {
				blockArray: [prevState.blockArray[prevState.selected]],
				directory: prevState.blockArray[prevState.selected],
				selected: -1,
			}});
		}
	}

	/*Sets the selected block state, for editing and deleting
	 Double tap: goes into the block's directory if it has children
	 If it's the parent block, go to the parent's parent
	 */
	selectBlock (index) {
		if (index===this.state.selected) {
			this.changeDirectory(index);
			this.setState({selected: -1});
		}
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
			<View style={{alignItems:'center', flexDirection: 'column',flex:1}}>
				<TipBar />
				<ScrollView contentContainerStyle={todoStyle.container}> 
					{blocks}
				</ScrollView>
				<BlockInput func={this.handleInput} deleteBlock={this.deleteBlock} />
			</View>
		);
	}
}


const todoStyle = StyleSheet.create({
	container: {
		width:360,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export {BlockContainer}

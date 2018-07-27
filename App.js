/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {BlockContainer,TodoBlock} from './todoBlock';
import BlockInput from './blockInput';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
	  super();
	  this.state={text: "",
	  	description: ""};
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} style={{flex:1}}>
	    <BlockContainer/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
});

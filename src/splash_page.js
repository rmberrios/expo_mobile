
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

class SplashPage extends Component {
  componentDidMount(){
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'HomePage',
      });
    }, 1500);
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 24,}}>Mozilla exposition</Text>
        <Text style={{color: '#e2e2e2', fontSize: 18,}}>Rommel Berrios :)</Text>
      </View>
    );
  }
}

module.exports = SplashPage;

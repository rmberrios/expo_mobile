/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  BackAndroid,
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

var HomePage = require('./src/home_page')
var SplashPage = require('./src/splash_page')
var ViewTopic = require('./src/view_topic')

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends Component {
render() {
    return (
      <Navigator
          initialRoute={{id: 'SplashPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
    renderScene(route, navigator) {
    var {id, bundle} = route;
    _navigator = navigator
    switch (id){
      case "SplashPage":
        return (
          <SplashPage
          navigator={navigator}/>
        );
      case "HomePage":
        return (
          <HomePage
            navigator={navigator} />
        );
      case "ViewTopic":
        return (
          <ViewTopic
            navigator={navigator} bundle={bundle} />
        )
        default:
          //return this.noRoute(navigator);
      }
  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>è¯·åœ¨ index.js çš„ renderScene ä¸­é…ç½®è¿™ä¸ªé¡µé¢çš„è·¯ç”±</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => App);

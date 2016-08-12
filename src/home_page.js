/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  ToastAndroid,
  TouchableOpacity,
  ToolbarAndroid,
  ScrollView,
  ActivityIndicator,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { styles } from './stylesheet';

import {HOST} from './expo_api';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let endpoint = 'topics/';
    fetch(HOST + endpoint)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.listviewContainer}>
          <ToolbarAndroid
          title="Mozilla UCC Expo"
          style={{
            backgroundColor: '#113B51',
            height: 56
          }}
          titleColor="#fff"
          />

           <View style={styles.listviewContainer}>
            <ListView
              renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`}
              style={styles.separator} />}
              dataSource={this.state.dataSource}
              renderRow={this.renderTopic.bind(this)}
              style={styles.listView}
              onEndReachedThreshold={40}
              renderFooter={this.renderFooter}

              onEndReached={ () => {ToastAndroid.show("That's all, more expo coming soon!", ToastAndroid.SHORT)}}
            />
            </View>
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with love in Nicaragua</Text>
      </View>)
  }
  renderLoadingView() {
    return (
      <View>
      <ToolbarAndroid
      title="AwesomeApp"
      style={{
        backgroundColor: '#113B51',
        height: 56
      }}
      titleColor="#fff"
      />
      <ActivityIndicator
        animating={!this.state.loaded}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
        <Text style={{fontSize: 18}}>
          Fetching cool topics...
        </Text>
      </View>
    );
  }

  renderTopic(topic) {
    return (
      <TouchableOpacity onPress={this._onSelectTopic.bind(this,topic)}>
      <View style={styles.container}>

          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
            <Text style={styles.title}>{topic.when}</Text>
            <Text style={styles.title}>{topic.where}</Text>
            <Text style={styles.year}>{topic.start_time}</Text>
            <Text style={styles.year}>{topic.end_time}</Text>
          </View>
        </View>
        </TouchableOpacity>
    );
  }
  _onSelectTopic(topic){
    var navigator = this.props.navigator
    navigator.push({
      id: 'ViewTopic',
      bundle: {id: topic.id}
    });
  }
}

module.exports = HomePage;

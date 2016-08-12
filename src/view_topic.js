/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  ToolbarAndroid,
  ScrollView,
  ActivityIndicator,
  Container,
  ProgressBarAndroid,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { styles } from './stylesheet';
import {HOST} from './expo_api';

class ViewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var {bundle}  = this.props
    var REQUEST_URL = HOST+ 'topics/' + bundle.id + '/comments';
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          topic: responseData.topic || false,
          presenter: responseData.presenter || false,
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var {comments, topic, presenter} = this.state
    var _scrollView: ScrollView;
    return (
      <View style={{flex:1}}>
          <View style={{flex:1}}>
            <ToolbarAndroid
            title={topic.title}
            style={styles.toolbar}
            titleColor="#fff"
            />
            <Text style={[styles.title,{color: '#393939'}]}>
              Presenter: {presenter.name}
            </Text>
            <Text style={[styles.title,{color: '#393939'}]}>
              reach me at {presenter.email}
            </Text>
          </View>

          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            style={styles.scrollView}>
            <ListView
              renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`}
              style={styles.separator} />}
              dataSource={this.state.dataSource}
              renderRow={this.renderComments.bind(this)}
              style={styles.listView}
              onEndReachedThreshold={40}
              renderFooter={this.renderFooter}
            />
          </ScrollView>
      </View>
    );
  }

  renderComments(comment) {
    return (
      <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{comment.name}</Text>
            <Text style={styles.title}>{comment.email}</Text>
            <Text style={styles.year}>{comment.comment}</Text>
          </View>
        </View>
    );
  }

  renderLoadingView() {
    return (
      <View >
        <ToolbarAndroid
        title="AwesomeApp"
        style={styles.toolbar}
        titleColor="#fff"
        />
        <ActivityIndicator
          animating={!this.state.loaded}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
        <Text>
          Loading topic...
        </Text>
      </View>
    );
  }
}

module.exports = ViewTopic;

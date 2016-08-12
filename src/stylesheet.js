import {
  StyleSheet
} from 'react-native';

module.exports ={
  styles : StyleSheet.create({
    scrollView: {
      backgroundColor: '#6A85B1',
      //height:300,
      flex: 2,
    },
    toolbar: {
      backgroundColor: '#113B51',
      height: 56
    },
    container: {
      flex: 1,
      margin: 8,
      marginBottom:0,
      padding: 8,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    separator:{
      height: 2,
      backgroundColor: '#CCCCCC',
    },
    rightContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
    },
    year: {
      textAlign: 'center',
    },
    thumbnail: {
      width: 53,
      height: 81,
    },
    listviewContainer:{
      flex: 1
    },
    listView: {
      backgroundColor: '#f2f2f2',
    },
    footer: {
      backgroundColor: '#616777',
      padding: 10
    },
    footerText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center'
    }
  })
}

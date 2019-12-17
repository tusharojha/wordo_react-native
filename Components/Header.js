import React, {Component} from 'react';
import {StyleSheet, Text, View, PixelRatio} from 'react-native';
class Header extends Component{
    
    render(){
      
        return(
            <View style={styles.box}>
                <Text style={styles.welcome}>WorDo</Text>
                <Text style={styles.instructions}>Create &amp; Manage Work</Text>
            </View>
        )
    }

}
var FONT_BACK_LABEL   = 18;

if (PixelRatio.get() <= 2) {
     FONT_BACK_LABEL = 14;
    }

const styles = StyleSheet.create({
    box:{
        
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'royalblue'
    },
  welcome: {
    fontSize: 30,
    color: '#fff'

  },
  instructions: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: FONT_BACK_LABEL,
    color: 'yellow',
},
});
export default Header;
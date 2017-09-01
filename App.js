import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Asset, Audio } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeLayout: null, layouts: [], pictures: [] };
    this.loadLayoutList();
  }

  onPressImage = pic => e => {
    console.log('onPressImage', pic);
    pic.sound.playAsync();
  };

  onPressLayout = layout => e => {
    console.log('onPress', layout);
    this.loadLayout(layout.location);
    this.setState({ activeLayout: layout });
  };

  loadPicture = async p => {
    const { sound, status } = await Expo.Audio.Sound.create({
      uri: p.soundUri,
    });
    const retVal = { ...p, sound };
    console.log('retVal', retVal);
    return retVal;
  };

  loadLayout = async uri => {
    try {
      let response = await fetch(uri);
      let responseJson = await response.json();
      const pics = await Promise.all(responseJson.map(this.loadPicture));
      console.log('pics is', pics);
      this.setState({ pictures: pics });
    } catch (error) {
      console.error(error);
    }
  };

  loadLayoutList = async () => {
    let response = await fetch(
      'https://raw.githubusercontent.com/mforsyth/ollietalk/master/assets/layout_list.json',
    );
    let responseJson = await response.json();
    this.setState({ layouts: responseJson });
  };

  render() {
    console.log('state', this.state);
    let { activeLayout, layouts, pictures } = this.state;
    if (activeLayout) {
      return (
        <View style={styles.container}>
          <Text>{activeLayout.title}</Text>
          {pictures.map(pic => (
            <View key={pic.caption}>
              <TouchableHighlight onPress={this.onPressImage(pic)}>
                <Image
                  source={{ uri: pic.imageUri }}
                  style={{ width: 193, height: 110 }}
                />
              </TouchableHighlight>
              <Text>{pic.caption}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Choose a layout:</Text>
          {layouts.map(layout => (
            <View key={layout.title}>
              <TouchableHighlight onPress={this.onPressLayout(layout)}>
                <Text>{layout.title}</Text>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

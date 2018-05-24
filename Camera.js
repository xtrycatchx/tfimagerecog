import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={styles.container}>

                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />

                <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> CLICK LAH </Text>
                </TouchableOpacity>

            </View>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            this.props.navigation.navigate('Recognition', { base64: data.base64, uri: data.uri })
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
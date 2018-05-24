

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

const width = Dimensions.get('screen').width

import { TfImageRecognition } from 'react-native-tensorflow';

export default class Recognition extends Component {

    constructor(props) {
        super(props)
        this.recognizeImage = this.recognizeImage.bind(this)
        this.state = {
            image: null,
            location: null,
            result: null,
            loading: false
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', }}>
                {this.state.image &&
                    <Image style={{ width: width, height: width, resizeMode: 'contain' }} source={{ uri: `data:image/png;base64,${this.state.image}` }} />
                }
                <Text style={styles.results}>
                    {this.state.result}
                </Text>

                <View style={styles.buttonBottomViewContainer} >
                    {this.state.loading
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        :



                        <TouchableHighlight
                            style={styles.buttonBottom}
                            activeOpacity={0.6}
                            underlayColor={'white'}
                            onPress={() => this.recognizeImage()} >
                            <Text style={styles.buttonBottomText}> RECOGNIZE </Text>
                        </TouchableHighlight>
                }
                </View>
            </View>)
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log("RECEVIED", params)
        this.setState({
            image: params.base64,
            location: params.uri
        })

    }

    async recognizeImage() {

        this.setState({
            loading: true
        })

        try {
            const tfImageRecognition = new TfImageRecognition({
                model: require('./assets/tensorflow_inception_graph.pb'),
                labels: require('./assets/tensorflow_labels.txt')
            })


            //console.log("HERE:", this.state.location.substring(7))

            const results = await tfImageRecognition.recognize({
                image: this.state.location //.substring(7)
            })

            const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
            this.setState({ result: resultText, loading: false })

            await tfImageRecognition.close()
        } catch (err) {
            this.setState({ loading: false })
            alert(err)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    results: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: 150,
        height: 100
    },
    buttonBottomViewContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30
    },
    buttonBottom: {
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#6700ff'
    }

});
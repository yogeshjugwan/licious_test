import { View, Text, Image, TextStyle, Animated, Easing, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Config from '../helpers/Config.js';
import * as Icons from '../helpers/Icons.js';
import { SvgRefreshBtn } from '../helpers/Svg.js';
import { widthToDp } from '../helpers/Responsive.js';

const LoadingSpinner = ({commonWidth=widthToDp(10),commonHeigth=widthToDp(10),isLoading=false}) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Simulate an asynchronous operation (e.g., fetching data)
        const fetchData = async () => {
            // Simulating a delay of 3 seconds
            setTimeout(() => {
                //   setIsLoading(false);
            }, 3000);
        };

        // Call the fetchData function
        fetchData();

        // Start the rotation animation
        startRotationAnimation();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const startRotationAnimation = () => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Animated.View style={[styles.loadingContainer, { transform: [{ rotate: spin }] }]}>
                    {/* Add your custom loading spinner content here */}
                    {/* <Text>Loading...</Text> */}
                    {/* <Image source={Icons.bell_icon} style={{
                        width: 50,
                        height: 50,
                    }} /> */}
                 <Image source={Icons.loading_icon} style={{width:commonWidth,height:commonHeigth}} resizeMode='contain' />
                </Animated.View>
            ) : (
                <View>
                 <Image source={Icons.loading_icon} style={{width:commonWidth,height:commonHeigth}} resizeMode='contain' />
                    {/* Add the rest of your component content here */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        // width: 50,
        // height: 50,
        // borderRadius: 25,
        // borderWidth: 2,
        // borderColor: '#000',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});

export default LoadingSpinner
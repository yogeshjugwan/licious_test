import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { Fragment } from 'react'
import { heightToDp, widthToDp } from '../helpers/Responsive';
import * as Config from '../helpers/Config';
import * as Icons from '../helpers/Icons';

import LinearGradient from 'react-native-linear-gradient';


export const Header_2 = ({
    leftText,
}) => {
    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <View style={Styles.commonHeader}>
                    <View style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        paddingLeft:20
                    }}>
                        {leftText ? <Text style={{
                            color: '#fff',
                            fontSize: 24,
                            fontFamily: Config.fontFamilys.Poppins_SemiBold
                        }}>{leftText}</Text> : null}
                    </View>
            </View>

        </View>
    )
}


const Styles = StyleSheet.create({
    container: {
        // height: heightToDp(35),
        backgroundColor: Config.Colors.primary,
        borderBottomRightRadius: 100,
    },
 
    commonHeader: {
        width: '92%',
        minHeight: heightToDp(8),
        backgroundColor: Config.Colors.themeColor,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
    },
})
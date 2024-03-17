import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { Header_1, Header_2, Header_3 } from '../../components/Header';
import * as Icons from '../../helpers/Icons';
import * as Config from '../../helpers/Config';
import { SvgCalender } from '../../helpers/Svg';
import { heightToDp, widthToDp } from '../../helpers/Responsive';
import { useSelector } from 'react-redux';
import CustomMenu from '../../components/CustomMenu';
import CustomModal from '../../components/CustomModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedModal from '../../Animated/AnimatedModal';

const BottomSheet = () => {
    const ref =React.useRef(null);

  const onPress = React.useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <View style={styles.container}>
    <Header_2
      leftImage={Icons.arrow_back}
      commonWidth={widthToDp(12)}
      commonHeight={heightToDp(5)}
      leftText={Config?.yourActivityArray[2]?.title}
      animated={true}
      onPressLeft={goBackScreen}
    />
    {/* <View style={styles.body}>
    <View style={styles?.boxContainerIner}>
      <FlatList
        data={Config?.LeaveAttendanceArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        // style={{height:heightToDp(70)}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </View> */}
    <View style={{ bottom: heightToDp(2), position: 'absolute', right: widthToDp(5) }}>
      <TouchableOpacity style={styles.addButtonBox}>
        <Image source={Icons.add_icon} style={{ width: widthToDp(8), height: heightToDp(4), tintColor: Config.Colors.defaultColor }} resizeMode='contain' />
      </TouchableOpacity>
    </View>
    {/* <CustomModal>

    </CustomModal> */}
       <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} />
      <AnimatedModal ref={ref} >
        <View style={{ flex: 1, backgroundColor: 'orange',width:widthToDp(100) }} />
      </AnimatedModal>
    </View>
  </GestureHandlerRootView>
  </View >
  )
}
const styles = StyleSheet.create({
    // container: {
    //   flex: 1
    // },
    body: {
      marginTop: 10
    },
    text: {
      fontFamily: Config.fontFamilys.Poppins_Bold,
      color: '#000'
    },
    box: {
      backgroundColor: '#fff',
      borderRadius: 20,
      width: widthToDp(90),
      margin: 10,
      padding: 10
    },
    boxContainer: {
      alignSelf: 'center',
      bottom: 10
    },
    boxContainerIner: {
      marginBottom: widthToDp(30),
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomImg: {
      backgroundColor: Config.Colors.bodyBg,
      width: widthToDp(10),
      alignItems: 'center',
      borderRadius: 20
    },
    addButtonBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: widthToDp(16),
      height: heightToDp(8),
      backgroundColor: Config.Colors.themeColor,
      borderRadius:100
    },
    container: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center',
      width:widthToDp(100)
    },
    button: {
      height: 50,
      borderRadius: 25,
      aspectRatio: 1,
      backgroundColor: 'white',
      opacity: 0.6,
    },
  
  })
export default BottomSheet
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Fragment } from 'react'
import * as Config from '../helpers/Config';
import * as Icons from '../helpers/Icons';
import { widthToDp } from '../helpers/Responsive';
const RenderBooksItem = ({ item, index, handleOnPress, handleFavoriteBooks, defaultIcon = Icons?.favorite_icon }) => {
    const [loader, setLoader] = React.useState(false)
    return (
        <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Config.Colors.defaultColor,
            borderRadius: 10,
            marginBottom: 10,
            paddingTop: 10
        }}
            onPress={() => handleOnPress(item)}
        >
            <View style={{ width: widthToDp(70), height: widthToDp(70), }}>
                <View style={{ width: widthToDp(70), height: widthToDp(70) }}>
                    {item?.cover_i || item?.cover_id ?
                        <Image source={{ uri: `https://covers.openlibrary.org/b/id/${item?.cover_i ? item?.cover_i : item?.cover_id}-L.jpg` }}
                            style={{ width: widthToDp(70), height: widthToDp(70), borderRadius: 10, resizeMode: 'contain' }}
                            onLayout={() => setLoader(true)} onLoadStart={() => setLoader(true)} onLoadEnd={() => setLoader(false)}
                        />
                        :
                        <View style={{ width: widthToDp(70), height: widthToDp(70), position: 'absolute', justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={Icons.library_icon}
                            style={{ width: widthToDp(70), height: widthToDp(70), borderRadius: 10, resizeMode: 'contain' }}
                            onLayout={() => setLoader(true)} onLoadStart={() => setLoader(true)} onLoadEnd={() => setLoader(false)}
                        />
                        </View>
                    }
                    {loader ?
                        <View style={{ width: widthToDp(70), height: widthToDp(70), position: 'absolute', justifyContent: 'center', alignItems: 'center', }}>
                            <ActivityIndicator size={35} />
                        </View>
                        : null}
                </View>
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 0,
                    width: widthToDp(10), height: widthToDp(10),
                    backgroundColor: Config.Colors.bodyBg,
                    borderRadius: 10
                }} onPress={() => handleFavoriteBooks(item)}>
                    <Image source={defaultIcon}
                        style={{ width: widthToDp(10), height: widthToDp(10), borderRadius: 10, resizeMode: 'contain', tintColor: Config.Colors.black }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                padding: 10, backgroundColor: Config.Colors.defaultColor, width: widthToDp(80), justifyContent: "center", alignItems: 'center',
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Title: </Text>
                    <Text style={{}}>{item?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Authors: </Text>
                    {item?.authors?.map((data, index) => {
                        return (
                            <Fragment key={index}>
                                <Text >{data?.name}{item?.authors.length > 1 ? item?.authors.length - 1 != index ? ", " : " " : ""}</Text>
                            </Fragment>
                        )
                    })}
                    {item?.author_name?.map((data, index) => {
                        return (
                            <Fragment key={index}>
                                <Text >{data}{item?.author_name.length > 1 ? item?.author_name.length - 1 != index ? ", " : " " : ""}</Text>
                            </Fragment>
                        )
                    })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>First Publish Year: </Text>
                    <Text style={{}}>{item?.first_publish_year}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Total Edition: </Text>
                    <Text >{item?.edition_count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(RenderBooksItem)
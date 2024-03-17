import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { Fragment } from 'react'
import * as Constants from '../helpers/Constants'
import * as Config from '../helpers/Config'
import * as Icons from '../helpers/Icons'
import { widthToDp } from '../helpers/Responsive'
const BookDetail = ({ bookDetails, onRequestClose }) => {
    const [loader, setLoader] = React.useState(false)
    const keyExtractor = React.useCallback((item, index) => String(index), [])
    return (
        <View style={{ width: '100%' }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Config.Colors.defaultColor,
                borderRadius: 10,
                marginBottom: 10,
                paddingTop: 10
            }}
            >
                <TouchableOpacity style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', top: -10 }} onPress={onRequestClose}>
                    <Image source={Icons.close_icon} style={{ width: widthToDp(7), height: widthToDp(7) }} />
                </TouchableOpacity>
                <View style={{ width: widthToDp(70), height: widthToDp(70), }}>
                    <View style={{ width: widthToDp(70), height: widthToDp(70) }}>
                        <FlatList
                            data={bookDetails?.covers}
                            extraData={bookDetails?.covers}
                            renderItem={(data) => {
                                return (
                                    <View>
                                        <Image source={{ uri: `https://covers.openlibrary.org/b/id/${data?.item}-L.jpg` }}
                                            style={{ width: widthToDp(70), height: widthToDp(70), borderRadius: 10, resizeMode: 'contain' }}
                                            onLoad={() => setLoader(true)} onLoadStart={() => setLoader(true)} onLoadEnd={() => setLoader(false)}
                                        />
                                        {loader ?
                                            <View style={{ width: widthToDp(70), height: widthToDp(70), position: 'absolute', justifyContent: 'center', alignItems: 'center', }}>
                                                <ActivityIndicator size={35} />
                                            </View>
                                            : null}
                                    </View>
                                )
                            }}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.1}
                            removeClippedSubviews={true}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: widthToDp(40),
                                paddingTop: 20
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 0, }}>
                        <Image source={Icons.favorite_icon}
                            style={{ width: widthToDp(10), height: widthToDp(10), borderRadius: 10, resizeMode: 'contain', tintColor: Config.Colors.defaultColor }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    padding: 10, backgroundColor: Config.Colors.defaultColor, width: widthToDp(80), justifyContent: "flex-start", alignItems: "flex-start",
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Title: </Text>
                        <Text style={{}}>{bookDetails?.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Authors: </Text>
                        {bookDetails?.authors||bookDetails?.author_name?
                        <View>
                            {bookDetails?.authors?.map((data, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Text >{data?.name}{bookDetails?.authors.length > 1 ? bookDetails?.authors.length - 1 != index ? ", " : " " : ""}</Text>
                                    </Fragment>
                                )
                            })}
                            {bookDetails?.author_name?.map((data, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Text >{data}{bookDetails?.author_name.length > 1 ? bookDetails?.author_name.length - 1 != index ? ", " : " " : ""}</Text>
                                    </Fragment>
                                )
                            })}
                        </View>
                            :
                            <Text style={{ color: "#000", flexWrap: 'wrap', textAlign: 'justify', }}>
                            <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Authors: </Text>{"  is Empty"}</Text>
                            }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Publish Year: </Text>
                        <Text style={{ color: "#000" }}>{bookDetails?.first_publish_year}</Text>
                    </View>
                    {bookDetails?.subjects ?
                        <View style={{ width: widthToDp(70), height: widthToDp(20), }}>
                            <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Genre</Text>
                            <FlatList
                                data={bookDetails?.subjects}
                                extraData={bookDetails?.subjects}
                                renderItem={(data) => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
                                            <Text style={{
                                                borderColor: Config.Colors.bodyBg,
                                                borderWidth: 2,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                minWidth: 20,
                                                backgroundColor: Config.Colors.defaultColor,
                                                color: Config.Colors.black,
                                                borderRadius: 6,
                                                padding: 10
                                            }}>{data?.item}</Text>
                                        </View>
                                    )
                                }}
                                keyExtractor={keyExtractor}
                                onEndReachedThreshold={0.1}
                                removeClippedSubviews={true}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            // contentContainerStyle={{
                            //   height: widthToDp(50),
                            //   width:"100%",
                            // }}
                            />
                        </View>
                        :
                        <Text style={{ color: "#000", flexWrap: 'wrap', textAlign: 'justify', }}>
                            <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Genre: </Text>{"  is Empty"}</Text>
                    }

                    {bookDetails?.description ?
                        <View style={{ width: widthToDp(75), height: widthToDp(40), }}>
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    // padding: 10,
                                }}
                            >
                                <Text style={{ color: "#000", flexWrap: 'wrap', textAlign: 'justify', }}>
                                    <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Description: </Text>
                                    {bookDetails?.description}</Text>
                            </ScrollView>
                        </View>
                        :
                        <Text style={{ color: "#000", flexWrap: 'wrap', textAlign: 'justify', }}>
                            <Text style={{ fontSize: widthToDp(4), fontFamily: Config.fontFamilys.Poppins_SemiBold, color: Config.Colors.black }}>Description: </Text>{" is Empty"}</Text>
                    }
                </View>
            </View>
        </View>
    )
}

export default React.memo(BookDetail)
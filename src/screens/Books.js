import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { Fragment, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { apiGetService } from '../helpers/services';
import * as Constants from '../helpers/Constants'
import * as Config from '../helpers/Config'
import * as Icons from '../helpers/Icons'
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteBooks, books } from '../redux/slices/books.slice';
import { heightToDp, widthToDp } from '../helpers/Responsive';
import { Header_2 } from '../components/Header';
import CustomInput from '../components/CustomInput';

import RenderBooksItem from '../components/RenderBooksItem';
import CustomModal from '../components/CustomModal';
import { toLocaleDateString } from '../helpers/utils';
import Toast from 'react-native-toast-message';
import BookDetail from '../components/BookDetail';
const Books = () => {
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.books)
  const [search, setSearch] = React.useState('');
  const [pullRefresh, setPullRefresh] = React.useState(false)
  const [loader, setLoader] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [bookDetails, setBookDetails] = React.useState(null)
  const inputRef = useRef(null);
  // console.log("booksData", booksData)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getBooks();
  //   }, [])
  // );
  useEffect(() => {
    getBooks();
  }, [])
  //Get First Time "details=true" Books
  const getBooks = async () => {
    setPullRefresh(true);
    setLoader(true)
    let apiData = await apiGetService(Constants.book_data_details_api);
    console.log("apiData---1", apiData?.data);
    if (apiData?.data) {
      dispatch(books(apiData?.data?.works))
      setPullRefresh(false)
      setLoader(false)
    }
  }
  //Get Search  Books
  const handleSearch = async (text) => {
    if (text.length > 3) {
      setSearch(text);
      setPullRefresh(true)
      setLoader(true)
      let apiData = await apiGetService(Constants.book_data_search_api + text);
      console.log("apiData---2", apiData?.data?.docs);
      if (apiData?.data?.docs) {
        dispatch(books(apiData?.data?.docs))
        setPullRefresh(false)
        setLoader(false)
      }
    } else if (text === '') {
      getBooks();
      setSearch('');
    }
  }
  //Get books Details 
  const getBooksDetails = async (item) => {
    setPullRefresh(true)
    let apiData = await apiGetService(`${item?.key}.json`);
    console.log("apiData---3", apiData?.data);
    if (apiData?.data) {
      setOpenModal(true)
      setBookDetails({
        ...apiData?.data,
        first_publish_year: item?.first_publish_year,
        authors: item?.authors
      })
      setPullRefresh(false)
      setLoader(false)
    }

  }
  const handleFavoriteBooks = (item) => {
    let data = booksData?.favoriteBooks.filter((data) => data.key === item?.key);
    if (data.length) {
      Toast.show({
        type: 'info',
        text1: 'Book Already added in Your Favorite List',
        position: 'top',
      });
    } else {
      dispatch(addFavoriteBooks(item))
      Toast.show({
        type: 'info',
        text1: 'Book add successfuly in Your Favorite List',
        position: 'top',
      });
    }

  }

  //Render Inital Components
  const renderItem = ({ item, index }) => {
    return (
      <RenderBooksItem item={item} index={index} handleOnPress={getBooksDetails} handleFavoriteBooks={handleFavoriteBooks} />
    )
  }
  //Render Search Components
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <Header_2
          leftText={"Books"}
        />
        <View style={{ justifyContent: "center", alignItems: 'center', marginTop: widthToDp(3) }}>
          <CustomInput
            commonWidth={widthToDp(80)}
            commonHeight={widthToDp(15)}
            placeholder={"Search Books"}
            onChangeText={(text) => handleSearch(text)}
            inputRef={inputRef}
          />
        </View>
        {/* <View> */}
        {booksData?.data.length > 0 ?
          <FlatList
            refreshing={pullRefresh}
            onRefresh={() => getBooks()}
            data={booksData?.data}
            extraData={booksData?.data}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item, index) => String(index)}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            initialNumToRender={7}
            contentContainerStyle={{
              paddingBottom: widthToDp(40),
              paddingTop: 20
            }}
          />
          :
          loader ?
            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', height: heightToDp(100) }}>
              <ActivityIndicator size={35} />
            </View>
            :
            <View style={{
              width: '100%', justifyContent: 'center', alignItems: 'center',
              height: heightToDp(100), position: 'absolute', zIndex: 2,
            }}>
              <Text>Data Not Empty</Text>
            </View>

        }
        {/* </View> */}
        <View>
          {openModal ?
            <CustomModal
              modalVisible={openModal}
              onRequestClose={() => setOpenModal(!openModal)}
              alignItems='center'
              justifyContent='center'
              disableOnPress={false}
              showHeader={false}
              animationType='slide'
            >
              <View style={{
                width: widthToDp(100),
                backgroundColor: '#fff',
                borderRadius: widthToDp(2),
                padding: widthToDp(5),
              }}><BookDetail bookDetails={bookDetails} onRequestClose={() => setOpenModal(!openModal)}/></View>
            </CustomModal>
            : null}
        </View>
      </SafeAreaView >
    </TouchableWithoutFeedback>
  )
}

export default React.memo(Books)
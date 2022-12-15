import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, Pressable, Image, Alert, TouchableOpacity, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerPort from '../../Components/ServerPort';

import StarRating from 'react-native-star-rating-widget';

// 더보기 눌렀을 때 수정 삭제 tooltip
import Tooltip from "react-native-walkthrough-tooltip";

const initialRegion = {
    latitude: 51.1261218,
    longitude: 3.347519199999965,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
};



//로딩
import LottieView from 'lottie-react-native';


const WalkReview = ({ navigation, route }) => {
    const [region, setRegion] = React.useState(initialRegion);
    const [mapRegion, setmapRegion] = React.useState("")

    //에니메이션으로 이동
    const mapRef = React.useRef(null);
    // bottomsheet
    const sheetRef = React.useRef(null);
    //별점
    const [rating, setRating] = React.useState(0);

    // 전체 목록 리스트
    const [all, setAll] = React.useState();
    // 주변 산책로 리스트
    const [data, setData] = React.useState();

    //아이디
    const [id, setId] = React.useState("user");
    // tooltip
    const [tiplist, setTipList] = React.useState();
    const [check, setcheck] = React.useState(false);



    //검색
    const [search, setSearch] = React.useState();

    const IP = ServerPort();

    useEffect(() => {
        console.log('all')
        axios.post(`${IP}/review/list`, null, {
            params: {
                // latitude: location.coords.latitude,
                // longitude: location.coords.longitude,
            }
        })
            .then(function (res) {
                console.log("all", res.data);
                setAll(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])

    useEffect(() => {
        (async () => {
            // const searchid = await AsyncStorage.getItem("id");
            // setId(searchid)

            //위치 수집 허용하는지 물어보기
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            // id 가져오기
            const value = await AsyncStorage.getItem("id");
            if (value!=null){
                setId(value)
            }
            

            // 제일 처음에 들어왔을 때 내주변 리뷰 
            axios.post(`${IP}/review/surrounding`, null, {
                params: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }
            })
                .then(function (res) {
                    console.log("resgister", res.data);
                    sizeCheck(res.data)
                    setData(res.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
            setmapRegion({ // 현재 위치
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })

        })();
    }, []);

    // 배열 만드는 함수
    const sizeCheck = (e) => {
        console.log('length', e.length)
        const value = []
        for (var i = 0; i < e.length; i++) {
            value.push(false)
        }
        setTipList(value)
    }

    const request = (latitude, longitude) => {
        axios.post(`${IP}/review/surrounding`, null, {
            params: {
                latitude: latitude,
                longitude: longitude,
            }
        })
            .then(function (res) {
                console.log("resgister", res.data);
                sizeCheck(res.data)
                setData(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const removeRequest = (e) => {
        return Alert.alert(
            "삭제하기",
            "정말 삭제하시겠습니까?",
            [
                // The "Yes" button
                {
                    text: "삭제하기",
                    onPress: () => {
                        axios.post(`${IP}/review/remove`, null, {
                            params: {
                                vNo: e
                            }
                        })
                            .then(function (res) {
                                console.log("resgister", res.data);
                                if (res.data) {
                                    Alert.alert("삭제되었습니다.")
                                    setcheck(!check)
                                } else {
                                    Alert.alert("다시 시도해주세요")
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            })

                    },
                },

                {
                    text: "취소",
                },
            ]
        );
    }



    const mapRegionChangehandle = (region) => {
        setRegion(region);
    };


    //이동하기
    const onDetail = (lat, lon) => { // 병원 리스트 중 하나 클릭하면 해당 위도, 경도 가져옴....
        setmapRegion({ // 현재 위치
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007
        })
        mapRef.current.animateToRegion({ // 해당 위치로 지도 이동
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007
        }, 3 * 1000);

        request(lat, lon)

    }
    //리뷰 장소 내용 핸들러
    const handleSearchChange = (text) => {
        setSearch(text)

    }

    //검색
    const searchValue = (text) => {
        console.log(text)
        axios.post(`${IP}/review/search`, null, {
            params: {
                search : text
            }
        })
            .then(function (res) {
                console.log("resgister", res.data);
                setData(res.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const renderContent = () => (
        <View
            style={styles.swipe}
        >
            <ScrollView >
                {

                    data && data.map((e, idx) => {

                        return (
                            <View sytle={{ width: '100%', padding: 5, marginBottom: 10, borderBottomWidth: 2, }} key={idx}>
                                <View style={{ flexDirection: 'row', padding: 5 }}>

                                    <View style={{ width: '20%' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '50%', alignItems: 'center', }}>
                                                <Image style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 50, }} source={{ uri: "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg" }} />
                                            </View>
                                            <Text style={{ fontSize: 18 }}>{e.nickname}</Text>
                                        </View>
                                    </View>
                                    <Pressable
                                        style={{ width: '70%' }}
                                        onPress={() => {
                                            onDetail(e.latitude, e.longitude)
                                        }}
                                    >
                                        <View style={{ width: '100%', }}>
                                            <View sytle={{ justifyContent: 'center', }}>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{e.address}</Text>
                                            </View>
                                            <View>
                                                <StarRating
                                                    rating={e.star}
                                                    onChange={setRating}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ fontSize: 15, color: 'gray', }}>{e.vdate}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                    <View style={{ width: '10%', justifyContent: 'center' }}>
                                        {
                                            id === e.id ?

                                                <Tooltip
                                                    isVisible={tiplist[idx]}
                                                    content={
                                                        <View>
                                                            <Pressable
                                                                style={[styles.tooltipButton, { marginBottom: 10, }]}
                                                                onPress={() => {
                                                                    for (var i = 0; i < tiplist.length; i++) {
                                                                        tiplist[i] = false
                                                                    }
                                                                    setTipList(tiplist)
                                                                    setcheck(!check)


                                                                    navigation.navigate("ModifyReview", {
                                                                        info: [e.latitude, e.longitude, e.vphoto, e.vcontent, e.address, e.star, e.vno],
                                                                        title: "title",
                                                                    })
                                                                }}
                                                            >
                                                                <View style={{ paddin: 10 }}>
                                                                    <Text style={{ fontSize: 20 }}> 수정 </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                style={styles.tooltipButton}
                                                                onPress={() => {
                                                                    console.log("삭제")
                                                                    for (var i = 0; i < tiplist.length; i++) {
                                                                        tiplist[i] = false
                                                                    }
                                                                    setTipList(tiplist)
                                                                    setcheck(!check)

                                                                    removeRequest(e.vno)
                                                                }}
                                                            >
                                                                <View style={{ paddin: 10 }} >
                                                                    <Text style={{ fontSize: 20 }}> 삭제 </Text>
                                                                </View>
                                                            </Pressable>

                                                        </View>
                                                    }
                                                    onClose={() => {
                                                        console.log('close', tiplist)
                                                        for (var i = 0; i < tiplist.length; i++) {
                                                            tiplist[i] = false
                                                        }
                                                        setTipList(tiplist)
                                                        setcheck(!check)
                                                        // setTip(false)
                                                    }}
                                                    placement="bottom"
                                                    useInteractionManager={true}
                                                    // below is for the status bar of react navigation bar
                                                    topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                                                >


                                                    <TouchableOpacity
                                                        style={[{ width: '100%', marginTop: 20 }, styles.button]}
                                                        onPress={() => {
                                                            tiplist[idx] = true
                                                            console.log('true idx', idx, tiplist[idx])
                                                            setTipList(tiplist)
                                                            // setTip(true)
                                                            setcheck(!check)
                                                        }}
                                                    >
                                                        <Image style={{ resizeMode: "cover", width: 30, height: 30, }} source={require('../../assets/images/more.png')} />
                                                    </TouchableOpacity>

                                                </Tooltip>
                                                :
                                                null
                                        }

                                    </View>
                                </View>
                                <View >
                                    {
                                        e.vphoto === null ? null :
                                            <View style={{ width: '100%', height: 200, alignItems: 'center' }}>
                                                <Image style={{ resizeMode: "cover", width: '95%', height: '100%', }} source={{ uri: e.vphoto }} />
                                            </View>
                                    }
                                </View>
                                <View style={{ padding: 5, marginBottom: 15 }}>
                                    <View style={{ width: '100%', padding: 5 }}>
                                        <View style={styles.reviewText}>
                                            <Text>{e.vcontent}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })

                }


            </ScrollView>
        </View>
    );





    return (
        <View style={styles.container}>
            {
                mapRegion != "" ?
                    <View style={styles.containerMap}>
                        <MapView
                            style={styles.map}
                            region={mapRegion}
                            ref={mapRef}

                            onRegionChange={mapRegionChangehandle}

                            //사용자 위치에 맞게 마커가 표시된다.
                            showsUserLocation={true}
                        >



                            {
                                //주변 리뷰 작성 마커
                                all && all.map((e, idx) => {
                                    return (
                                        <Marker
                                            key={e.vno}

                                            coordinate={{
                                                latitude: e.latitude,
                                                longitude: e.longitude,
                                            }}
                                            onPress={() => {
                                                onDetail(e.latitude, e.longitude)
                                            }}
                                        >
                                            <Callout>
                                                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image style={{ resizeMode: "cover", width: 200, height: 150, }} source={{ uri: e.vphoto }} />
                                                    <View>
                                                        <StarRating
                                                            rating={e.star}
                                                            onChange={setRating}
                                                        />
                                                    </View>
                                                    <View style={[styles.reviewText, { width: 250 }]}>
                                                        <Text numberOfLines={5} ellipsizeMode="tail">{e.vcontent}</Text>
                                                    </View>
                                                </View>
                                            </Callout>
                                        </Marker>

                                    )
                                })
                            }





                        </MapView>

                        <BottomSheet
                            ref={sheetRef}
                            snapPoints={[Dimensions.get('window').height * 0.69, Dimensions.get('window').width, 0]}
                            // snapPoints={[450, 300, 0]}
                            borderRadius={10}
                            renderContent={renderContent}
                        />
                        <View style={{ padding: 10, flexDirection:'row' }}>
                            <TextInput
                                style={[styles.textinput, {backgroundColor : 'white', width:'60%',} ]}
                                numberOfLines={4}
                                onChangeText={handleSearchChange}
                                value={search}
                                placeholder="검색 내용 (읍/면/동)"
                            ></TextInput>
                            <Text>  </Text>
                            <Pressable
                                style={styles.searchbutton}
                                onPress={() => {
                                    console.log('검색')
                                    searchValue(search)

                                }}>
                                <View style={styles.listarea}>
                                    <Text style={{color:'white', fontWeight: 'bold'}}>검색</Text>
                                </View>
                            </Pressable>

                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View></View>
                            <View></View>
                            {/* 목록보기 */}
                            <Pressable
                                style={styles.listbutton}
                                onPress={() => {
                                    console.log('목록보기')
                                    sheetRef.current.snapTo(0)
                                }}>
                                <View style={styles.listarea}>
                                    <View>
                                        <Image style={{ resizeMode: "cover", width: 40, height: 40, }}
                                            source={require('../../assets/images/swipe.png')}></Image>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> 목록보기 </Text>
                                    </View>
                                </View>
                            </Pressable>

                            {/* 리뷰작성하기 */}
                            <Pressable
                                style={[styles.listbutton, { backgroundColor: 'white', marginRight:5 }]}
                                onPress={() => {
                                    navigation.navigate("ReviewWrite")
                                }}>
                                <View style={styles.listarea}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#FE7474', fontWeight: 'bold' }}> 작성 </Text>
                                    </View>
                                </View>
                            </Pressable>

                        </View>
                    </View> :
                    <LottieView
                        source={require('../../assets/dog.json') /** 움직이는 LottieView */
                        }
                        autoPlay loop
                    />
            }
        </View>
    );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}
export default WalkReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    containerMap: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        ...StyleSheet.absoluteFillObject,
    },
    swipe: {
        padding: 16,
        height: Dimensions.get('window').height * 0.71,
        backgroundColor: 'white',
    },
    listbutton: {
        borderRadius: 50,
        backgroundColor: '#FE7474',
        marginBottom : 10
    },
    listarea: {
        flexDirection: 'row',
        padding: 10,
    },
    reviewText: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#FE7474',
        borderRadius: 8,
    },
    tooltipButton: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    textinput: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#FE7474',
        borderRadius: 8,
    },
    searchbutton :{ 
        borderRadius: 10, 
        backgroundColor: '#FE7474', 
        width:'15%', 
        justifyContent:'center', 
        alignItems:'center'
    },
});
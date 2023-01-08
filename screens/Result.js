import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Result = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Result</Text>
            </View>
            <View style={styles.bannerContainer}>
                <Image source={{ uri: 'https://raw.githubusercontent.com/tylerkwallace/Images/master/Sorting%20thoughts-bro.png' }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Result;

const styles = StyleSheet.create({
    banner:{
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
});
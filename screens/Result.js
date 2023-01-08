import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Title from "../components/Title";

const Result = ({navigation, route}) => {
    const {score} = route.params
    const resultBanner = score > 40 ? "https://raw.githubusercontent.com/tylerkwallace/Images/master/Breaking%20barriers-bro.png":
    "https://raw.githubusercontent.com/tylerkwallace/Images/master/Headache-bro.png"
    return (
        <View style={styles.container}>
            <View>
                <Title titleText='Results' />
                <Text style={styles.score}>Your score is {score}/100</Text>
            </View>
            <View style={styles.bannerContainer}>
                <Image source={{ uri: resultBanner }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Home</Text>
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
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#0E1D6A',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    score: {
        fontSize: 30,
        fontWeight: '500',
        alignSelf: 'center',
    },
});
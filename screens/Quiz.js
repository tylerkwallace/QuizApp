import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Quiz = ({ navigation, route }) => {
    const params = route.params
    const shuffleAnswers = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const [questions, setQuestions] = useState();
    const [questionNum, setQuestionNum] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple&encode=url3986'
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results);
        setOptions(data.results);
        setOptions(generateOptionsAndShuffle(data.results[0]));
        setIsLoading(false);
    }

    useEffect(() => {
        getQuiz();
    }, []);

    const handleNextPress = () => {
        setQuestionNum(questionNum + 1);
        setOptions(generateOptionsAndShuffle(questions[questionNum + 1]));
    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers]
        options.push(_question.correct_answer);
        shuffleAnswers(options);
        return options;
    }

    const handleSelectedOption = (_option) => {
        if(_option===questions[questionNum].correct_answer){
            setScore(score + 10)
        }
        if(questionNum !== 9){
            setQuestionNum(questionNum + 1);
            setOptions(generateOptionsAndShuffle(questions[questionNum + 1]));
        }
        if(questionNum === 9) {
            handleShowResult();
        }
    }

    const handleShowResult = () => {
        navigation.navigate('Result', {
            score: score
        })

    }

    return (
        <View style={styles.container}>

            {isLoading ? 
            <View style={styles.loading}>
                <Text style={styles.loadingText}>LOADING...</Text>
                </View> : 
                questions && (

                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {decodeURIComponent(questions[questionNum].question)}</Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[0])}>
                            <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[1])}>
                            <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[2])}>
                            <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[3])}>
                            <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        {/* <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>BACK</Text>
                        </TouchableOpacity> */}

                        {questionNum !== 9 &&
                            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                <Text style={styles.buttonText}>SKIP</Text>
                            </TouchableOpacity>
                        }

                        {questionNum === 9 &&
                            <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                                <Text style={styles.buttonText}>SHOW RESULTS</Text>
                            </TouchableOpacity>
                        }
                        {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>END</Text>
                </TouchableOpacity> */}
                    </View>
                </View>
            )}
        </View>
    );
};

export default Quiz;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
    top: {
        marginVertical: 16,
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#0E1D6A',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 28,
    },
    option: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white'
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#6A040F',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    loadingText: {
        fontSize: 32,
        fontWeight: '700'
    },

});
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';


const genrateRandomBetween = (min, max, exlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exlude) {
    return genrateRandomBetween(min, max, exlude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setcurrentGuess] = useState(
    genrateRandomBetween(1, 100, props.userChoise)
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoise) ||
      (direction === 'greater' && currentGuess > props.userChoise)) {
      Alert.alert("Dont lie", 'That is wrong...', [
        { text: 'Sorry', onPress: () => console.log('cancel') }
      ],
      {cancelable: false},
    );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = genrateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setcurrentGuess(nextNumber);
  };

return (
  <View style={styles.screen}>
    <Text>Opponent's Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
  </View>
);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;

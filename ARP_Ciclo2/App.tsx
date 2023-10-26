// Universidade Evangelica de Goias
// Caique Oliveira Carvalho - 2111304
// Programacao para dispositivos moveis

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [average, setAverage] = useState(null);

  const isNumeric = (value) => value === "" || (!isNaN(parseFloat(value)) && isFinite(value));

  const calculate = () => {
    if (isNumeric(note1) && isNumeric(note2)) {
      const n1 = parseFloat(note1);
      const n2 = parseFloat(note2);
      const n3 = isNumeric(note3) ? parseFloat(note3) : 0;

      const validNotes = [n1, n2, n3].filter((note) => note >= 0 && note <= 100);
      const validNotesCount = validNotes.length;

      if (validNotesCount > 0) {
        if (validNotesCount === 3) {
          const result = validNotes.reduce((sum, note) => sum + note, 0) / 3;
          setAverage(result.toFixed(2));
        } else {
          const currentAverage = validNotes.reduce((sum, note) => sum + note, 0) / validNotesCount;
          const remainingNeeded = 60 - currentAverage;
          setAverage(remainingNeeded.toFixed(2));
        }
      } else {
        setAverage("Notas inválidas");
      }
    }
  };

  const clearNote1 = () => {
    setNote1("");
    setAverage(null);
  };

  const clearNote2 = () => {
    setNote2("");
    setAverage(null);
  };

  const clearNote3 = () => {
    setNote3("");
    setAverage(null);
  };

  return (
    <View style={styles.container}>
      <Text>Nota 1:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={note1}
        placeholder="Insira a Nota 1"
        onChangeText={(text) => {
          if (isNumeric(text) && parseFloat(text) >= 0 && parseFloat(text) <= 100) {
            setNote1(text);
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Limpar" onPress={clearNote1} />
      </View>

      <Text>Nota 2:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={note2}
        placeholder="Insira a Nota 2"
        onChangeText={(text) => {
          if (isNumeric(text) && parseFloat(text) >= 0 && parseFloat(text) <= 100) {
            setNote2(text);
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Limpar" onPress={clearNote2} />
      </View>

      <Text>Nota 3 (opcional):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={note3}
        placeholder="Insira a Nota 3"
        onChangeText={(text) => {
          if (isNumeric(text) && parseFloat(text) >= 0 && parseFloat(text) <= 100) {
            setNote3(text);
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Limpar" onPress={clearNote3} />
      </View>

      <Button title="Calcular Média" onPress={calculate} />
      {average !== null && <Text>Média Final: {average}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    marginBottom: 20,
    padding: 5,
    borderRadius: 32,
  },
});

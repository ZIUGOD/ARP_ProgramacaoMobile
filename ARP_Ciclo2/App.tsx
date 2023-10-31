import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [note1, setNote1] = useState('');
  const [note2, setNote2] = useState('');
  const [note3, setNote3] = useState('');
  const [average, setAverage] = useState('0.00');

  const calculate = () => {
    const n1 = parseFloat(note1) || 0;
    const n2 = parseFloat(note2) || 0;
    const n3 = parseFloat(note3) || 0;

    const validNotes = [n1, n2, n3].filter((note) => note >= 0 && note <= 100);

    if (validNotes.length > 0) {
      const sumOfValidNotes = validNotes.reduce((sum, note) => sum + note, 0);
      const averageResult = sumOfValidNotes / validNotes.length;
      setAverage(averageResult.toFixed(2));
    } else {
      setAverage('0.00');
    }
  };

  const clearNote = (setter) => {
    setter('');
    calculate();
  };

  useEffect(() => {
    calculate();
  }, [note1, note2, note3]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>NotaSegura</Text>
      <Text style={styles.instructions}>Insira suas notas (0-100):</Text>

      <View style={styles.inputContainer}>
        <Text>Nota 1:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={note1}
          placeholder="Nota 1"
          onChangeText={(value) => setNote1(value)}
        />
        <Button title="Limpar" onPress={() => clearNote(setNote1)} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Nota 2:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={note2}
          placeholder="Nota 2"
          onChangeText={(value) => setNote2(value)}
        />
        <Button title="Limpar" onPress={() => clearNote(setNote2)} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Nota 3 (opcional):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={note3}
          placeholder="Nota 3"
          onChangeText={(value) => setNote3(value)}
        />
        <Button title="Limpar" onPress={() => clearNote(setNote3)} />
      </View>

      <Text style={styles.resultText}>Resultado em Tempo Real:</Text>
      <Text style={styles.averageText}>Média Final: {average}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    width: 100,
    marginLeft: 10,
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  averageText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a7495',
  },
});

import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('')



  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existe um participante com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {


    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Não",
        style: 'cancel'
      },
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }

    ])
  }



  return (
    <View style={styles.container} >

      <Text style={styles.eventName}
      >
        Campeonato de Counter Striker
      </Text>

      <Text
        style={styles.eventDate}
      >
        Domingo, 10 de agosto de 2024
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Digite o nome do participante'
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>
            Nenhum participante cadastrado!
          </Text>
        }
      />

    </View>
  );
}
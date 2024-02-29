import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_PRINCIPAL } from '@env';

const PrincipalScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [originalPatientList, setOriginalPatientList] = useState([]);
  const [filteredPatientList, setFilteredPatientList] = useState([]);

  const url = `${API_BASE_PRINCIPAL}/pacientes`;

  const handleCrearPress = () => {
    navigation.navigate('CrearPaciente');
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOriginalPatientList(data);
      setFilteredPatientList(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  
  useEffect(() => {
    fetchPatients();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPatients();
    }, [])
  );

  const handleSearch = (text) => {
    setSearch(text);
    const searchText = text.toLowerCase();
    const filteredPatients = originalPatientList.filter(patient =>
      patient.nombre.toLowerCase().includes(searchText)
    );
    setFilteredPatientList(filteredPatients);
  };


  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar pacientes..."
        onChangeText={handleSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <FlatList
        data={filteredPatientList}
        keyExtractor={(item) => item.id_paciente.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => {
              navigation.navigate('Escaner', { 
                pacienteId: item.id_paciente, 
                medicoId: item.id_medico, 
                email: item.email, 
                nombre: item.nombre
              });
            }}
          >
            <ListItem key={item.id_paciente} containerStyle={styles.touchableOpacityContainer} bottomDivider>
              <Avatar
                rounded
                source={{ uri: item.imagen_uri }}
                size="large"
                containerStyle={styles.avatarContainer}
              />
              <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title>👤 {item.nombre}</ListItem.Title>
                <ListItem.Title>📧 {item.email}</ListItem.Title>
                <ListItem.Title>📞 {item.telefono}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCrearPress}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  listItemContainer: {
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  avatarContainer: {
    marginRight: 10,
  },
  listItemContent: {
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    backgroundColor: '#0C9CB6',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 50,
  },
});

export default PrincipalScreen;

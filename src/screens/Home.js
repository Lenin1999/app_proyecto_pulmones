import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {



  const navigation = useNavigation();

  const handleIniciarPress = () => {
    // Navegar a la pantalla "Login"
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/TBGuardIAn_Imagotipo1.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/Logotipo_TBGuardIAn.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleIniciarPress}>
          <Text style={styles.buttonText}>Iniciar ➜</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinea los elementos en la parte superior del contenedor
    paddingTop: 50, // Ajusta el espacio superior para que los elementos se muestren más arriba
  },
  content: {
    alignItems: 'center', // Alinea los elementos secundarios en el centro horizontal
  },
  imageContainer: {
    marginBottom: windowWidth * 0.1, // Reduzco el margen inferior para que los elementos se coloquen más arriba
  },
  imagen: {
    width: windowWidth * 0.9,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
    marginTop: -100,
  },
  button: {
    backgroundColor: '#0C9CB6',
    padding: 10,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
  },
});

export default HomeScreen;

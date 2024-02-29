import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, StyleSheet, Modal, KeyboardAvoidingView,  ScrollView, Alert  } from 'react-native';
import { API_BASE_CREAR } from '@env';

const CrearPaciente = ({ navigation, route }) => {

  
  
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const url = `${API_BASE_CREAR}/pacientes/crear_paciente`;

  
// Define tus datos de imágenes de avatar
const avatars = [
  { id: 1, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 2, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671134.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 3, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671161.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 4, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671151.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 5, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671159.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 6, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671126.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 7, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671124.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },
  { id: 8, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Hombres' },



  { id: 9, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671138.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 10, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671128.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 11, uri: 'https://img.freepik.com/psd-premium/ilustracion-3d-avatar-o-perfil-humano_23-2150671175.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 12, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671136.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },

  { id: 13, uri: 'https://img.freepik.com/psd-premium/ilustracion-3d-avatar-o-perfil-humano_23-2150671171.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 14, uri: 'https://img.freepik.com/psd-premium/ilustracion-3d-avatar-o-perfil-humano_23-2150671147.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 15, uri: 'https://img.freepik.com/psd-premium/ilustracion-3d-avatar-o-perfil-humano_23-2150671167.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
  { id: 16, uri: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671163.jpg?size=626&ext=jpg&ga=GA1.1.176861579.1706570441', category: 'Mujeres' },
 
];

// Filtrar avatares por categoría
const hombresAvatars = avatars.filter(avatar => avatar.category === 'Hombres');
const mujeresAvatars = avatars.filter(avatar => avatar.category === 'Mujeres');



const confirmar = async () => {
  Alert.alert('Confirmar creación de paciente', '¿Estás seguro de que deseas crear este paciente?', [
    { text: 'Aceptar', onPress: () => enviarDatos() },
    { text: 'Cancelar', onPress: () => console.log('Cancelar presionado'), style: 'cancel' }
  ]);
}

 


const enviarDatos = async () => {
  try {
    // Crear FormData
    const formData = new FormData();
    formData.append('id_medico', '1');
    formData.append('nombre', nombreCompleto);
    formData.append('telefono', telefono);
    formData.append('email', email);
    formData.append('imagen_uri', selectedAvatar);

    console.log(nombreCompleto);
    console.log(telefono);
    console.log(email);
    console.log(selectedAvatar);

    const paciente = {
      method: 'POST',
      body: formData,
    };

    // Enviar datos al backend
    const response = await fetch(url, paciente);

    // Manejar la respuesta del backend si es necesario
    const responseData = await response.json();
    // Accede a la propiedad "mensaje" del objeto JSON
    const message = responseData.mensaje;
    Alert.alert('Aviso', message, [{ text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }]);
    navigation.navigate('Principal');
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    Alert.alert('Error', 'Ocurrió un error al enviar los datos. Inténtalo de nuevo más tarde.');
  }
};




  // Función para manejar la selección de avatar
  const handleAvatarSelection = (avatarUri) => {
    setSelectedAvatar(avatarUri);
    console.log("este es " ,selectedAvatar);
    setShowModal(false); // Ocultar el modal después de seleccionar un avatar
  };

  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.medicalCard}>
            <View style={styles.imageContainer}>
              {selectedAvatar ? (
                <Image source={{ uri: selectedAvatar }} style={styles.patientImage} />
              ) : (
                <Image
                  source={require('../../assets/images/user.png')}
                  style={styles.placeholderImage}
                  resizeMode="contain"
                />
              )}
              
            </View>
            <TouchableOpacity style={styles.changeAvatarButton} onPress={() => setShowModal(true)}>
                <Text style={styles.changeAvatarButtonText}>✏️</Text>
              </TouchableOpacity>
          </View>

          {/* Modal para seleccionar avatar */}
          <Modal visible={showModal} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  {/* Lista de avatares de hombres */}
                  <View>
                    <Text style={styles.listTitle}>Hombres</Text>
                    <View style={styles.avatarRow}>
                      {hombresAvatars.map((avatar) => (
                        <TouchableOpacity key={avatar.id} onPress={() => handleAvatarSelection(avatar.uri)}>
                          <Image source={{ uri: avatar.uri }} style={styles.avatarThumbnail} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  {/* Lista de avatares de mujeres */}
                  <View>
                    <Text style={styles.listTitle}>Mujeres</Text>
                    <View style={styles.avatarRow}>
                      {mujeresAvatars.map((avatar) => (
                        <TouchableOpacity key={avatar.id} onPress={() => handleAvatarSelection(avatar.uri)}>
                          <Image source={{ uri: avatar.uri }} style={styles.avatarThumbnail} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                 
                </ScrollView>
                {/* Botón para cerrar el modal */}
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowModal(false)}>
                  <Text style={styles.closeModalButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Sección para ingresar datos del paciente */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre Completo</Text>
              <TextInput
                style={styles.input}
                placeholder='Ingrese el nombre completo'
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
                autoFocus={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Teléfono</Text>
              <TextInput
                style={styles.input}
                placeholder='Ingrese el teléfono'
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder='Ingrese el email'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            {/* Botón de guardar */}
            <TouchableOpacity style={styles.button} onPress={confirmar}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 50,
  },
  medicalCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    position: 'relative', // Para que el botón se posicione correctamente
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  patientImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 20, // Ajustar según sea necesario para que el botón esté visible
    right: 60, // Ajustar según sea necesario para que el botón esté visible
    backgroundColor: '#0C9CB6',
    padding: 10,
    borderRadius: 50,
    zIndex: 999, // Para controlar el apilamiento de elementos
    elevation: 10, // Para controlar la elevación en Android
  },
  changeAvatarButtonText: {
    color: 'white',
    fontSize: 20,
  },
  inputSection: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#0C9CB6',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  avatarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#0C9CB6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CrearPaciente;

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'kullaniciadi' && password === 'sifre') {
      // Giriş başarılı, haberlerin olduğu sayfaya yönlendir
      navigation.navigate('News');
    } else {
      // Giriş başarısız
      Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış');
    }
  };
    
  
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/NEWS_logo.png')} // Resmin yerel yolunu buraya ekleyin
        style={{ flex: 0.7 }} // Esnek boyutlar
        resizeMode="contain"
      />
      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Text style={styles.label}>Şifre</Text>
      <TextInput
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.buttonSpacing} />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <View style={styles.buttonSpacing} />
      <Button title="Üye Ol" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  buttonSpacing: {
    height: 20,
  },
});

export default LoginScreen;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
    Banco, createTable, insertUsuario, selectUsuarios, selectUsuarioById, selectUsuarioNome
    , deleteUsuario, updateUsuario
} from './Banco/Config';

import {useEffect} from 'react';

export default function App() {

    useEffect(()=>{
     async function Main () {
       const db = await Banco();
      await createTable(db);
      };



     Main();
    },[])


  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

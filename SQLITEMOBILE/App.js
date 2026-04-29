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
     insertUsuario(db,  "unit4" , "stoopid4@email.com" , "4")    ;

     // exibir campos down here
   //  const resp = await selectUsuarios (db) ;
    // console.log(resp);
   //exibir por id
    // let idCampo = await selectUsuarioById(db,3);
   // console.log(idCampo)
      
    //  let nomeCampo = await selectUsuarioNome(db, "unit4" )
    //  console.log(nomeCampo);

       let delCampo = await deleteUsuario(db, 3 )
      console.log(delCampo);
  
  
  
  
  
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

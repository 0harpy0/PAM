import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';

import {
  Banco,
  createTable,
  insertUsuario,
  selectUsuarios,
  updateUsuario,
  deleteUsuario,
} from './Banco/Config';

import { useEffect, useState } from 'react';

export default function App() {

  const [db, setDb] = useState(null);

  // CONTROLE DE TELAS
  const [tela, setTela] = useState('inicio');

  // CAMPOS
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // LISTA
  const [usuarios, setUsuarios] = useState([]);

  // EDIÇÃO
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // INICIAR BANCO
  useEffect(() => {
    async function iniciarBanco() {

      const database = await Banco();

      setDb(database);

      await createTable(database);

      carregarUsuarios(database);
    }

    iniciarBanco();
  }, []);

  // CARREGAR USUÁRIOS
  async function carregarUsuarios(database = db) {

    const lista = await selectUsuarios(database);

    setUsuarios(lista);
  }

  // SALVAR
  async function salvarUsuario() {

    if (!nome || !email) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    if (editando) {

      await updateUsuario(
        db,
        idEditando,
        nome,
        email
      );

      Alert.alert('Usuário atualizado');

    } else {

      await insertUsuario(
        db,
        nome,
        email
      );

      Alert.alert('Usuário cadastrado');
    }

    limparCampos();

    carregarUsuarios();
  }

  // REMOVER
  async function removerUsuario(id) {

    await deleteUsuario(db, id);

    Alert.alert('Usuário removido');

    carregarUsuarios();
  }

  // EDITAR
  function editarUsuario(usuario) {

    setNome(usuario.NOME_US);

    setEmail(usuario.EMAIL_US);

    setIdEditando(usuario.ID_US);

    setEditando(true);
  }

  // LIMPAR
  function limparCampos() {

    setNome('');

    setEmail('');

    setEditando(false);

    setIdEditando(null);
  }

  // =========================================
  // TELA INICIAL
  // =========================================

  if (tela === 'inicio') {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>
          Sistema CRUD Mobile
        </Text>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setTela('menu')}
        >
          <Text style={styles.buttonText}>
            Iniciar CRUD
          </Text>
        </TouchableOpacity>

        <StatusBar style="light" />

      </View>
    );
  }

  // =========================================
  // MENU
  // =========================================

  if (tela === 'menu') {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>
          Escolha uma tabela
        </Text>

        {/* TABELA USUÁRIOS */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setTela('usuarios')}
        >
          <Text style={styles.buttonText}>
            Usuários
          </Text>
        </TouchableOpacity>

        {/* FUTURAS TABELAS */}
        <TouchableOpacity style={styles.disabledButton}>
          <Text style={styles.buttonText}>
            Produtos (em breve)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledButton}>
          <Text style={styles.buttonText}>
            Clientes (em breve)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledButton}>
          <Text style={styles.buttonText}>
            Pedidos (em breve)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setTela('inicio')}
        >
          <Text style={styles.buttonText}>
            Voltar
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  // =========================================
  // CRUD USUÁRIOS
  // =========================================

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        CRUD Usuários
      </Text>

      {/* INPUTS */}

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      {/* BOTÃO */}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarUsuario}
      >
        <Text style={styles.buttonText}>
          {editando ? 'Atualizar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      {/* LISTA */}

      <ScrollView style={{ width: '100%' }}>

        <FlatList
          data={usuarios}
          keyExtractor={(item) =>
            item.ID_US.toString()
          }

          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                ID: {item.ID_US}
              </Text>

              <Text style={styles.cardText}>
                Nome: {item.NOME_US}
              </Text>

              <Text style={styles.cardText}>
                Email: {item.EMAIL_US}
              </Text>

              <View style={styles.actions}>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editarUsuario(item)}
                >
                  <Text style={styles.buttonText}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    removerUsuario(item.ID_US)
                  }
                >
                  <Text style={styles.buttonText}>
                    Excluir
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          )}
        />

      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setTela('menu')}
      >
        <Text style={styles.buttonText}>
          Voltar ao Menu
        </Text>
      </TouchableOpacity>

      <StatusBar style="light" />

    </View>
  );
}

// =========================================
// ESTILOS
// =========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  mainButton: {
    backgroundColor: '#4630EB',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },

  menuButton: {
    backgroundColor: '#2196F3',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  disabledButton: {
    backgroundColor: '#666',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: '#4CAF50',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#FF9800',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },

  cardText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 3,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

});

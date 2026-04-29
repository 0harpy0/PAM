import * as SQLite from 'expo-sqlite';




//----------------------------------------------------------------------------
// Função para abrir ou criar  o banco de dados
async function Banco() {
    // Open the database
    try {
        const db = await SQLite.openDatabaseAsync('PAM2.db');
        console.log('Banco de dados aberto');

        return db;
    } catch (error) {
        console.log(error);

    }



}


//----------------------------------------------------------------------------
async function createTable(db: SQLite.SQLiteDatabase) {

    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS USUARIO (
                    ID_US  INTEGER PRIMARY KEY AUTOINCREMENT,
                    NOME_US VARCHAR(100),
                    EMAIL_US VARCHAR(100)
                );
`
        ) ;
        console.log('Tabela USUARIO criada');
    } catch (error) {
        console.log('Erro ao criar tabela', error);

    }

}
//----------------------------------------------------------------------------

//Inserir novo usuario

async function insertUsuario(db: SQLite.SQLiteDatabase,
    nome: string, email: string) {
    try {
        await db.runAsync(
            " INSERT INTO USUARIO (NOME_US, EMAIL_US) VALUES ( ? , ? )",
             nome, email);
        console.log('Usuario inserido');

    } catch (error) {
        console.log('Erro ao inserir usuario', error);
    }
}

//----------------------------------------------------------------------------

// Exibir todos os usuarios


async function selectUsuarios(db: SQLite.SQLiteDatabase) {
    try {
        const result = await db.getAllAsync('SELECT * FROM USUARIO ORDER BY ID_US DESC');
        console.log('Usuarios encontrados');
        return result;
    } catch (erro) {
        console.log('Erro ao buscar usuarios', erro);
    }}

//----------------------------------------------------------------------------

// Exibir usuario pelo ID
async function selectUsuarioById(db: SQLite.SQLiteDatabase, id: number){
    try {
        const result = await db.getFirstAsync('SELECT * FROM USUARIO WHERE ID_US = ?', id);
        console.log('Usuario encontrado');
        return result;
    } catch (erro) {
        console.log('Erro ao buscar usuario', erro);
    }
}

//----------------------------------------------------------------------------

//usuario pelo nome
async function selectUsuarioNome(db: SQLite.SQLiteDatabase, nome: string) {
    try {
        const result = await db.getAllAsync('SELECT * FROM USUARIO WHERE NOME_US = ?', nome);
        console.log('Usuario encontrado');
        return result;
    } catch (erro) {
        console.log('Erro ao buscar usuario', erro);
    }
}


//----------------------------------------------------------------------------

// Excluir usuario pelo ID
async function deleteUsuario(db: SQLite.SQLiteDatabase, id: number) {
    try {
        await db.runAsync(' DELETE FROM USUARIO WHERE ID_US = ? ', id);
        console.log('Usuario excluido');
    } catch (error) {
        console.log('Erro ao excluir usuario', error);
    }
}
//----------------------------------------------------------------------------

//ALTERAR USUARIO
async function updateUsuario(db: SQLite.SQLiteDatabase, id: number, nome: string, email: string) {
    try {
        await db.runAsync(
            'UPDATE USUARIO SET NOME_US = ?, EMAIL_US = ? WHERE ID_US = ?',
            nome,
            email,
            id
        );
        console.log('Usuario atualizado');
    } catch (error) {
        console.log('Erro ao atualizar usuario', error);
    }
}



export {
    Banco, createTable, insertUsuario, selectUsuarios, selectUsuarioById, selectUsuarioNome
    , deleteUsuario, updateUsuario
};
/*
0- Obter um usuário
1- Obter o número de telefone do usuário a partir de seu Id
2- Obter o endereço do usuário pelo Id
*/

//importando um módulo interno no node.js

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  //quando der algum problema -> reject(erro)
  //quando sucesso -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Izar',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '996418112',
        ddd: '83',
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'rua do almeida',
      numero: 0,
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();
//Para manipular o sucesso usamos a função .then
//Para manipular o erro usamos a o  .catch
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
    Nome: ${resultado.usuario.nome}
    Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone : ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
    `);
  })
  .catch(function (error) {
    console.error('Deu Ruim', error);
  });

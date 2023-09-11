/*
0- Obter um usuário
1- Obter o número de telefone do usuário a partir de seu Id
2- Obter o endereço do usuário pelo Id
*/

function obterUsuario() {
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

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '996418112',
      ddd: '83',
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'rua do almeida',
      numero: 0,
    });
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  if (erro) {
    console.error('Deu erro em usuário', erro);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(erroTelefone, telefone) {
    if (erroTelefone) {
      console.error('Deu erro no telefone', erroTelefone);
      return;
    }
    obterEndereco(
      usuario.id,
      function resolverEndereco(erroEndereco, endereco) {
        if (erroEndereco) {
          console.error('Deu erro no Endereço', erroEndereco);
          return;
        }
        console.log(
          `Nome: ${usuario.nome}, Telefone: ${telefone.ddd} ${telefone.telefone}, Endereço: ${endereco.rua}, ${endereco.numero}`,
        );
      },
    );
  });
}

const usuarioPromise = obterUsuario();
//Para manipular o sucesso usamos a função .then
//Para manipular o erro usamos a o  .catch
usuarioPromise
  .then(function (resultado) {
    console.log('resultado', resultado);
  })
  .catch(function (error) {
    console.error('Deu Ruim', error);
  });

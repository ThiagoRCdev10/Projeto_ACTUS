import "./styles/alterar.css";

      /*Interação do botão de confirmar*/
document.getElementById("btn-confirmar").addEventListener("click", async function () {
  const dados_cadastro = JSON.parse(localStorage.getItem("user_logado"));

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const senha_rep = document.getElementById('senha_rep').value;

  if (email === '' || senha === '' || senha_rep === '') {
    alert('Preencha todos os campos.');
    return;
  }

  if (senha !== senha_rep) {
    alert('Repita a mesma senha, por favor!');
    document.getElementById('senha_rep').focus();
    return;
  }

  try {
    const API_BASE = 'https://projetoactus-production.up.railway.app/api';

    // Monta os dados para atualização
    const dadosAtualizados = {
      dataNascimento: dados_cadastro.usuario.dataNascimento,
      nomeCompleto: dados_cadastro.usuario.nome,
      email,
      cargo: dados_cadastro.usuario.cargo,
      senha
    };

    const resposta = await fetch(`${API_BASE}/usuario/${dados_cadastro.usuario.id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
});

  if (!resposta.ok) {
    throw new Error('Erro ao atualizar usuário');
}

  const usuarioAtualizado = await resposta.json();

    // Atualiza localStorage
    localStorage.setItem("user_logado", JSON.stringify({
      usuario: {
        id: usuarioAtualizado._id,
        nomeCompleto: usuarioAtualizado.nomeCompleto,
        email: usuarioAtualizado.email,
        cargo: usuarioAtualizado.cargo,
        dataNascimento: usuarioAtualizado.dataNascimento
      },
      token: dados_cadastro.token
    }));
    
    alert("Alteração realizada com sucesso")
    window.location.href = "tela_de_Projetos.html";
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    alert("Erro ao atualizar os dados. Verifique o console.");
  }
});

          /*Interação do Menu*/
          var status_menu = false; 

function abrir_opcoes_do_Menu(){

  status_menu = !status_menu;
  if(status_menu==true){
    if (tema['status'] == 'claro') {
      document.getElementById("botao_menu").innerHTML = lua;
    }else{
      document.getElementById("botao_menu").innerHTML = sol;
    }
}else{document.getElementById("botao_menu").innerHTML = `<div></div>`}
  
} 

//Mudar tema do site
var tema = JSON.parse(localStorage.getItem('Tema'));
      var link = document.getElementById('folha_de_estilos');
      var imagem_tema = document.getElementById('imagem_tema');
      var img_tema_claro = 'imagens/menu_sanduiche-semfundo.png'; 
      var img_tema_escuro = 'imagens/menu_sanduiche_mod_escuro-semfundo.png'; 
      var sol =   `
  <div class="container_opcoes_menu">
      <ul>
          <li><button onclick="mudar_tema()" class="botao_mudar_tema_menu">Tema Claro<img  src="imagens/sol_semFundo.png" alt="img_sol" width="40px" height="40px" style="border-radius: 100%; margin-left: 10px;"></button></li>
          <li><a href="tela_de_Projetos.html">Meus Projetos</a></li>
          <li><a href="editar_Perfil.html">Editar Perfil</a></li>
          <li><a href="index.html">Sair</a></li>
      </ul>
  </div> 
  `;

  var lua =   `
  <div class="container_opcoes_menu">
      <ul>
          <li><button onclick="mudar_tema()" class="botao_mudar_tema_menu">Tema Escuro<img  src="imagens/lua.png" alt="img_lua" width="40px" height="40px" style="border-radius: 100%; margin-left: 10px;"></button></li>
          <li><a href="tela_de_Projetos.html">Meus Projetos</a></li>
          <li><a href="alterar_Login.html">Alterar Login</a></li>
          <li><a href="index.html">Sair</a></li>
      </ul>
  </div> 
  `;

import "./styles/editar.css"; 

window.addEventListener("DOMContentLoaded", () => {
  const dados = JSON.parse(localStorage.getItem("user_logado"));
  if (!dados) return;

  document.getElementById("nome").value = dados.usuario.nomeCompleto || "";
  document.getElementById("cargo").value = dados.usuario.cargo || "";
  document.getElementById("dataNascimento").value = dados.usuario.dataNascimento
    ? dados.usuario.dataNascimento.slice(0, 10)
    : "";
});

document.getElementById("btn-confirmar").addEventListener("click", async function () {
  console.log("Botão de confirmar clicado!");

  const dados_cadastro = JSON.parse(localStorage.getItem("user_logado"));
  const nomeCompleto = document.getElementById('nome').value;
  const cargo = document.getElementById('cargo').value;
  const dataNascimento = document.getElementById('dataNascimento').value;

  if (nomeCompleto !== '' && cargo !== '' && dataNascimento !== '') {
    try {
      const API_BASE = 'http://localhost:3000/api';
      const dadosAtualizados = {
        nomeCompleto,
        cargo,
        dataNascimento
      };

      const resposta = await fetch(`${API_BASE}/usuario/infoBasica/${dados_cadastro.usuario.id}`, {
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

      alert("Perfil alterado com sucesso")
      window.location.href = "tela_de_Projetos.html";

    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
      alert("Erro ao atualizar os dados. Verifique o console.");
    }
  } else {
    alert('Preencha todos os campos.');
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
}else{
  document.getElementById("botao_menu").innerHTML = `<div></div>`
}
  
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
          <li><a href="alterar_Login.html">Alterar Login</a></li>
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

      if(!tema){
            tema = {};
            tema['status'] = 'claro';
            imagem_tema.src = img_tema_claro; 
          }
          

      function mudar_tema(){
        if (tema['status'] == 'claro') {
          tema['status'] = 'escuro';
          link.href = "stylesEscuro.css";
          imagem_tema.src = img_tema_escuro;
          document.getElementById("botao_menu").innerHTML = sol;



        } else {
          tema['status'] = 'claro';
          link.href = "styles.css";
          imagem_tema.src = img_tema_claro;
          document.getElementById("botao_menu").innerHTML = lua;

        }
        localStorage.setItem('Tema', JSON.stringify(tema)); 
      }

      //Roda quando o DOM inicializa para ver o tema do site
      document.addEventListener('DOMContentLoaded', function () { 
         
        if(!tema){
            tema = {};
            tema['status'] = 'claro';
            imagem_tema.src = img_tema_claro;
            //botao_mudar_tema.innerHTML = botao_mudar_para_escuro;
          }else{
            if (tema['status'] == 'claro') {
              tema['status'] = 'claro';
              link.href = "styles.css";
              imagem_tema.src = img_tema_claro;
              //botao_mudar_tema.innerHTML = botao_mudar_para_escuro;
            } else {
              tema['status'] = 'escuro';
              link.href = "stylesEscuro.css";
              imagem_tema.src = img_tema_escuro;
              //botao_mudar_tema.innerHTML = botao_mudar_para_claro;
            }
          }
        });
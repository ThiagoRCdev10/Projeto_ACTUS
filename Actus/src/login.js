import "./styles/login.css";

document.addEventListener("DOMContentLoaded", function () {
  const btnEntrar = document.querySelector(".botao");

  btnEntrar.addEventListener("click", logar);

  const toggleSenha = document.getElementById("toggleSenha");
  const inputSenha = document.getElementById("senha");

  toggleSenha.addEventListener("click", function () {
    const tipo =
      inputSenha.getAttribute("type") === "password" ? "text" : "password";
    inputSenha.setAttribute("type", tipo);

    this.innerHTML =
      tipo === "password"
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
  });
});

async function logar() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  const API_BASE = 'https://projetoactus-production.up.railway.app/';
  if (email == "") {
    alert("Digite seu Email");
  } else if (senha == "") {
    alert("Digite sua Senha.");
  } 
  try {
    const resposta = await fetch(`${API_BASE}/usuario/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (!resposta.ok) {
      alert("O Email ou a Senha estão incorretos.");
      return;
    }

    const dados = await resposta.json();
    console.log("Usuário logado:", dados.usuario);

    localStorage.setItem("user_logado", JSON.stringify({
      usuario: dados.usuario,
      token: dados.token
    }));
    window.location.href = "tela_de_Projetos.html";

  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao tentar fazer login. Verifique o console.");
  }
}

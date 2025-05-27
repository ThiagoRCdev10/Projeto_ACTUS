import "./styles/cadastro.css";
document.addEventListener("DOMContentLoaded", function () {
  const formCadastro = document.getElementById("formCadastro");
  const senha = document.getElementById("senha");
  const confirmar = document.getElementById("confirmarSenha");
  const olhosSenha = document.querySelectorAll(".btn-toggle-senha");

  const API_BASE = 'https://projetoactus-production.up.railway.app/api';

  // Toggle senha
  olhosSenha.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
      }
    });
  });

  formCadastro.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (senha.value !== confirmar.value) {
      senha.classList.add("is-invalid");
      confirmar.classList.add("is-invalid");

      olhosSenha.forEach(btn => btn.style.display = "none");

      senha.addEventListener("focus", () => {
        senha.classList.remove("is-invalid");
        confirmar.classList.remove("is-invalid");
        olhosSenha.forEach(btn => btn.style.display = "inline");
      }, { once: true });

      confirmar.addEventListener("focus", () => {
        senha.classList.remove("is-invalid");
        confirmar.classList.remove("is-invalid");
        olhosSenha.forEach(btn => btn.style.display = "inline");
      }, { once: true });

      return;
    }

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const nascimento = document.getElementById("nascimento").value;
    const cargo = document.getElementById("cargo").value;
    const senhaValor = senha.value;

    const usuario = {
      nomeCompleto: nome,
      email,
      dataNascimento: nascimento,
      cargo,
      senha: senhaValor
    };

    try {
      const resposta = await fetch(`${API_BASE}/usuario/createUs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (!resposta.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      const resultado = await resposta.json();
      console.log('Usuário cadastrado com sucesso:', resultado);
      alert('Usuário cadastrado com sucesso!');
      formCadastro.reset();

    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      alert('Erro ao cadastrar usuário.');
    }
  });
});
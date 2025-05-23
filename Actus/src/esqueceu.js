import "./styles/esqueceu.css";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formSenha");
  const email = document.getElementById("inputEmail");
  const novaSenha = document.getElementById("novaSenha");
  const confirmaSenha = document.getElementById("confirmaSenha");
  const olhosSenha = document.querySelectorAll(".btn-toggle-senha");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Fase 1: email
    if (!document.getElementById("faseEmail").classList.contains("d-none")) {
      if (!email.value.trim()) {
        alert("Digite seu email.");
        return;
      }
      document.getElementById("faseEmail").classList.add("d-none");
      document.getElementById("faseCodigo").classList.remove("d-none");
      document.querySelector(".codigo-input").focus();
      return;
    }

    // Fase 2: código
    if (!document.getElementById("faseCodigo").classList.contains("d-none")) {
      const codigoInputs = document.querySelectorAll(".codigo-input");
      const codigo = Array.from(codigoInputs).map(input => input.value).join("");

      if (codigo.length !== 6) {
        alert("Digite todos os 6 dígitos.");
        return;
      }
      document.getElementById("faseCodigo").classList.add("d-none");
      document.getElementById("faseNovaSenha").classList.remove("d-none");
      novaSenha.focus();
      return;
    }

    // Fase 3: senha
    if (novaSenha.value !== confirmaSenha.value) {
      novaSenha.classList.add("is-invalid");
      confirmaSenha.classList.add("is-invalid");
      olhosSenha.forEach(olho => olho.style.display = "none");

      confirmaSenha.addEventListener("focus", () => {
        novaSenha.classList.remove("is-invalid");
        confirmaSenha.classList.remove("is-invalid");
        olhosSenha.forEach(olho => olho.style.display = "inline");
      }, { once: true });

      novaSenha.addEventListener("focus", () => {
        novaSenha.classList.remove("is-invalid");
        confirmaSenha.classList.remove("is-invalid");
        olhosSenha.forEach(olho => olho.style.display = "inline");
      }, { once: true });

      return;
    }

    // Atualiza senha no localStorage
    let usuarioEncontrado = false;
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave.startsWith("usuario")) {
        const usuario = JSON.parse(localStorage.getItem(chave));
        if (usuario[1] === email.value) { // Email encontrado
          usuario[4] = novaSenha.value; // Atualiza a senha
          localStorage.setItem(chave, JSON.stringify(usuario));
          usuarioEncontrado = true;
          break;
        }
      }
    }

    if (usuarioEncontrado) {
      alert("Senha alterada com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Email não encontrado.");
    }
  });

  // Código inteligente
  const codigoInputs = document.querySelectorAll(".codigo-input");
  codigoInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (input.value.length === 1 && index < codigoInputs.length - 1) {
        codigoInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        codigoInputs[index - 1].focus();
      }
    });
  });
});

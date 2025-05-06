import "./styles/individual.css";

document.addEventListener("DOMContentLoaded", () => {
  const osSelecionada = JSON.parse(localStorage.getItem("os_selecionada"));

  if (osSelecionada) {
    document.getElementById("titulo").value = osSelecionada.titulo || "";
    document.getElementById("descricao").value = osSelecionada.descricao || "";
    document.getElementById("estado").value = osSelecionada.estado || "";
    document.getElementById("cidade").value = osSelecionada.cidade || "";
    document.getElementById("endereço").value = osSelecionada.endereco || "";
    document.getElementById("data").value = osSelecionada.data || "";
    document.getElementById("dataFinal").value= osSelecionada.dataFinal || "";

    if (osSelecionada.dataFinal) {
      document.getElementById("dataFinal").value = osSelecionada.dataFinal;
    }
    localStorage.removeItem("os_selecionada");
  }
  
  const form = document.getElementById("osForm");
  const API_BASE = "http://localhost:3000/api";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user_logado"));
    if (!user || !user._id) {
      alert("Usuário não logado. Faça login novamente.");
      return;
    }

    // Coleta dos dados do formulário
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const endereco = document.getElementById("endereço").value.trim();
    const data = document.getElementById("data").value;
    const dataFinal = document.getElementById("dataFinal").value;
    const arquivoInput = document.getElementById("ficheiro");

    // Verificação básica
    if (!titulo || !descricao || !estado || !cidade || !endereco || !data || !dataFinal) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const projeto = {
      data,  
      dataFinal, 
      endereco, 
      cidade, 
      estado,
      descricao,
      titulo,
      usuarioId: user._id,
      status: "A fazer",
      tag: "aberta" // Padrão inicial
    };

    // Se quiser enviar o nome do arquivo (não o conteúdo)
    if (arquivoInput.files.length > 0) {
      projeto.arquivoUrl = arquivoInput.files[0].name;
    }

    try {
      const resposta = await fetch(`${API_BASE}/projeto/createPj`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projeto),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar projeto");
      }

      const resultado = await resposta.json();
      console.log("Projeto criado com sucesso:", resultado);
      alert("Projeto criado com sucesso!");
      form.reset();
    } catch (erro) {
      console.error("Erro ao enviar dados:", erro);
      alert("Erro ao criar projeto.");
    }
  });
    // Preview de arquivo
    const fileInput = document.getElementById("ficheiro");
    const preview = document.getElementById("preview");
  
    fileInput.addEventListener("change", function () {
      preview.innerHTML = "";
      const file = this.files[0];
      if (!file) return;
  
      const url = URL.createObjectURL(file);
      if (file.type === "application/pdf") {
        const iframe = document.createElement("iframe");
        iframe.src = url;
        preview.appendChild(iframe);
      } else if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = url;
        preview.appendChild(img);
      }
    });
  
    // Simula botão exportar (você pode conectar com lib como jsPDF depois)
    document.getElementById("exportarBtn").addEventListener("click", () => {
      alert("Exportar funcionalidade ainda não implementada.");
    });
});

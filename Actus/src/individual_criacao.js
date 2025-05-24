import "./styles/individual.css";
document.addEventListener("DOMContentLoaded", () => {
    
    console.log("individual_criacao")
    const form = document.getElementById("osForm");
    if (form) {
    const API_BASE = "https://projetoactus-production.up.railway.app/";


    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("user_logado"));
      if (!user || !user.usuario.id) {
        alert("Usuário não logado. Faça login novamente.");
        return;
      }

      const titulo = document.getElementById("titulo").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const estado = document.getElementById("estado").value;
      const cidade = document.getElementById("cidade").value;
      const endereco = document.getElementById("endereco").value.trim();
      const data = document.getElementById("data").value;
      const dataFinal = document.getElementById("dataFinal").value;

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
        usuarioId: user.usuario.id,
        status: "afazer",
        tag: "aberta"
      };

      console.log("Projeto a ser enviado:", projeto);
      try {
        const resposta = await fetch(`${API_BASE}/projeto/createPj`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projeto),
        });

        if (!resposta.ok) throw new Error("Erro ao criar projeto");
        
        const resultado = await resposta.json();
        alert("Projeto criado com sucesso!");
        form.reset();
        window.location.href = "tela_de_Projetos.html";
      } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
        alert("Erro ao criar projeto.");
      }
       return false;
    });
  }
})

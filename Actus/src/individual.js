
import "./styles/individual.css";
import * as bootstrap from 'bootstrap';

document.addEventListener("DOMContentLoaded", () => {

  const osSelecionada = JSON.parse(localStorage.getItem("os_selecionada"));
  const form = document.getElementById("osForm");
  const fileInput = document.getElementById("ficheiro");
  const preview = document.getElementById("preview");
  const exportarBtn = document.getElementById("exportarBtn");
  const projetoId = osSelecionada.id
  let etapaCount = 0; 
  let etapaIdAtual = null;
  const etapasNovas = document.getElementById('etapasNovas');
  
  if (osSelecionada) {
    document.getElementById("titulo").value = osSelecionada.titulo || "";
    document.getElementById("descricao").value = osSelecionada.descricao || "";
    document.getElementById("estado").value = osSelecionada.estado || "";
    document.getElementById("cidade").value = osSelecionada.cidade || "";
    document.getElementById("endereco").value = osSelecionada.endereco || "";
    document.getElementById("data").value = osSelecionada.dataCriacao ? osSelecionada.dataCriacao.slice(0, 10)
    : "";
    document.getElementById("dataFinal").value = osSelecionada.dataFinal ? osSelecionada.dataFinal.slice(0, 10)
    : "";
    
  //  localStorage.removeItem("os_selecionada");

  } 
  // Preview de arquivo
  if (fileInput && preview) {
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
  }

  // Botão exportar
  if (exportarBtn) {
    exportarBtn.addEventListener("click", () => {
      alert("Exportar funcionalidade ainda não implementada.");
    });
  }

  // ======================
  // Lógica de Etapas Modal
  // ======================

  const btnAdicionarItem = document.getElementById("btnAdicionarItem");
  const listaItens = document.getElementById("listaItens");
  const salvarEtapaBtn = document.getElementById("salvarEtapa");
  

  function calcularValorTotal() {
    const valores = document.querySelectorAll(".item-valor");
    let total = 0;
    valores.forEach(input => {
      total += parseFloat(input.value) || 0;
    });
    const totalInput = document.getElementById("valorTotalEtapa");
    if (totalInput) totalInput.value = `R$ ${total.toFixed(2)}`;
  }

  if (btnAdicionarItem && listaItens) {
    btnAdicionarItem.addEventListener("click", () => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("d-flex", "mb-2", "item-row", "gap-2");
      itemDiv.innerHTML = `
        <input type="text" class="form-control item-desc" placeholder="Descrição" required />
        <input type="number" class="form-control item-valor" placeholder="Valor (R$)" required />
        <button type="button" class="btn btn-danger btn-sm btn-remove">&times;</button>
      `;
      listaItens.appendChild(itemDiv);
    });

    listaItens.addEventListener("input", (e) => {
      if (e.target.classList.contains("item-valor")) calcularValorTotal();
    });

    listaItens.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove")) {
        e.target.closest(".item-row").remove();
        calcularValorTotal();
      }
    });
  }
  
      document.getElementById("salvarEtapa").addEventListener("click", () => {
    document.getElementById("salvarEtapa").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  const etapasContainer = document.getElementById("etapasContainer");
  if (salvarEtapaBtn && etapasContainer) {
    salvarEtapaBtn.addEventListener("click", async () => {
      const titulo = document.getElementById("tituloEtapa").value;
      const descricao = document.getElementById("descricaoEtapa").value;
      const valorTotal = document.getElementById("valorTotalEtapa").value;
      const itens = [];
      const descricoes = document.querySelectorAll(".item-desc");
      const valores = document.querySelectorAll(".item-valor");

      descricoes.forEach((input, index) => {
        const descricaoItem = input.value;
        const valorItem = parseFloat(valores[index].value);
      
        if (descricaoItem && !isNaN(valorItem)) {
        itens.push({ descricao: descricaoItem, valor: valorItem });
        }
      });

      if (!titulo || !descricao) {
        alert("Preencha todos os campos!");
        return;
      }
       const API_BASE = "https://projetoactus-production.up.railway.app/api";
    try {
      let resposta;
      if (etapaIdAtual) {
          
          resposta = await fetch(`${API_BASE}/etapa/${etapaIdAtual}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: titulo,
              descricao: descricao,
              valor: valorTotal,
              projetoId: projetoId,
              itens: itens
            })
          });
        } else {
          
          resposta = await fetch(`${API_BASE}/etapa/createEt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: titulo,
              descricao: descricao,
              valor: valorTotal,
              projetoId: projetoId,
              itens: itens
            })
          });
        }

        if (!resposta.ok) throw new Error("Erro ao salvar etapa");

        
        etapaIdAtual = null;

        document.getElementById("tituloEtapa").value = '';
        document.getElementById("descricaoEtapa").value = '';
        document.getElementById("valorTotalEtapa").value = '';
        listaItens.innerHTML = "";
        calcularValorTotal();

        
        await carregarEtapas(projetoId);

        const modalElement = document.getElementById("modalEtapa");
        let bootstrapModal = bootstrap.Modal.getInstance(modalElement);
        if (!bootstrapModal) bootstrapModal = new bootstrap.Modal(modalElement);
        bootstrapModal.hide();

      } catch (erro) {
        console.error("Erro ao salvar etapa:", erro);
        alert("Erro ao salvar etapa.");
      }
    });
  }
 

 const modalElement = document.getElementById("modalEtapa");
  if (modalElement) {
    modalElement.addEventListener('shown.bs.modal', function () {
      modalElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  }
    
  if (form) {
    const API_BASE = "https://projetoactus-production.up.railway.app/api";


    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Formulário submetido!");
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
        titulo
      };

      console.log("Projeto a ser atualizado:", projeto);
      try {
        const resposta = await fetch(`${API_BASE}/projeto/atualizarPj/${projetoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projeto),
        });

        if (!resposta.ok) throw new Error("Erro ao atualizar projeto");

        alert("Projeto atualizado com sucesso!");
      } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
        alert("Erro ao atualizar projeto.");
      }
    });
  }
  if (etapasNovas) {
    etapasNovas.addEventListener("click", async (e) => {
      if (e.target.closest(".excluir")) {
        const botao = e.target.closest(".excluir");
        const etapaId = botao.dataset.id;

        if (!etapaId) {
          console.warn("ID da etapa não encontrado.");
          return;
        }

        const confirmDelete = confirm("Tem certeza que deseja excluir esta etapa?");
        if (!confirmDelete) return;

        try {
          const API_BASE = "https://projetoactus-production.up.railway.app/api";
          const resposta = await fetch(`${API_BASE}/etapa/deleteEt/${etapaId}`, {
            method: "DELETE"
          });

          if (!resposta.ok) throw new Error("Erro ao excluir etapa");

          const etapaBox = botao.closest(".etapa-box");
          if (etapaBox) etapaBox.remove();
          carregarEtapas(projetoId);

          alert("Etapa excluída com sucesso!");

        } catch (erro) {
          console.error("Erro ao excluir etapa:", erro);
          alert("Erro ao excluir etapa.");
        }
      }
    });
  }

  document.getElementById("etapasNovas").addEventListener("click", async (e) => {
  const etapaBox = e.target.closest(".etapa-box");

  
  if (!etapaBox || e.target.closest(".excluir") || e.target.closest("input[type='checkbox']")) return;

  const etapaId = etapaBox.dataset.id;
  if (!etapaId) return;

  try {
    const API_BASE = "https://projetoactus-production.up.railway.app/api";
    const resposta = await fetch(`${API_BASE}/etapa/obterIdEt/${etapaId}`);
    if (!resposta.ok) throw new Error("Erro ao buscar etapa");

    const etapa = await resposta.json();
    etapaIdAtual = etapa._id;  

    document.getElementById("tituloEtapa").value = etapa.nome || "";
    document.getElementById("descricaoEtapa").value = etapa.descricao || "";
    document.getElementById("valorTotalEtapa").value = etapa.valor || "R$ 0,00";

    const listaItens = document.getElementById("listaItens");
    listaItens.innerHTML = "";

    if (Array.isArray(etapa.itens)) {
      etapa.itens.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("d-flex", "mb-2", "item-row", "gap-2");
        itemDiv.innerHTML = `
          <input type="text" class="form-control item-desc" placeholder="Descrição" value="${item.descricao}" required />
          <input type="number" class="form-control item-valor" placeholder="Valor (R$)" value="${item.valor}" required />
          <button type="button" class="btn btn-danger btn-sm btn-remove">&times;</button>
        `;
        listaItens.appendChild(itemDiv);
      });
    }


    calcularValorTotal();


    const modal = new bootstrap.Modal(document.getElementById("modalEtapa"));
    modal.show();

  } catch (erro) {
    console.error("Erro ao carregar dados da etapa:", erro);
    alert("Erro ao abrir etapa para edição.");
  }
});
    async function carregarEtapas(projetoId) {
  const API_BASE = "https://projetoactus-production.up.railway.app/api";

  try {
    const resposta = await fetch(`${API_BASE}/etapa/listarEt/${projetoId}`);
    if (!resposta.ok) throw new Error("Erro ao buscar etapas");

    const etapas = await resposta.json();
    etapasNovas.innerHTML = ""; // Limpa antes de carregar
    etapaCount = etapas.length;
    etapas.forEach((etapa, index) => {
      const etapaHTML = `
        <div class="etapa-box mb-3" data-id="${etapa._id}">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <strong>${index + 1}. ${etapa.nome}</strong>
            <span class="badge etapa-valor">${etapa.valor}</span>
          </div>
          <p>${etapa.descricao}</p>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="etapa${etapa._id}" />
            <label class="form-check-label" for="etapa${etapa._id}">Concluído</label>
            <button type="button" class="btn btn-sm btn-outline-danger excluir" data-id="${etapa._id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;
      etapasNovas.insertAdjacentHTML("beforeend", etapaHTML);
    });

  } catch (erro) {
    console.error("Erro ao carregar etapas:", erro);
  }
  }
  carregarEtapas(projetoId);
 
});

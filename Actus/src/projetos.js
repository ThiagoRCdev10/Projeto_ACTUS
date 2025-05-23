import "./styles/projetos.css";

document.addEventListener("DOMContentLoaded", async () => {
  const drawerMenu = document.getElementById("drawerMenu");
  const drawerFiltro = document.getElementById("drawerFiltro");
  const overlay = document.getElementById("overlayDrawer");

  const btnDrawer = document.getElementById("btnToggleDrawer");
  const btnFiltro = document.getElementById("btnFiltro");
  const btnTema = document.getElementById("btnTema");
  const btnModoLista = document.getElementById("btnModoLista");

  const containerProjetos = document.querySelector(".container_todos_Projetos");
  const listaOS = document.getElementById("modoLista");
  const listaBody = document.getElementById("listaOsBody");

  const filtrosSelecionados = new Set([
    "aberta",
    "em processo",
    "em verificação",
    "rejeitado",
    "cancelado",
    "concluído",
  ]);

  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("escuro");
  }

  function toggleDrawer(drawer) {
    [drawerMenu, drawerFiltro].forEach((d) => d.classList.remove("aberto"));
    drawer.classList.toggle("aberto");
    overlay.classList.toggle("ativo", drawer.classList.contains("aberto"));
  }

  btnDrawer.addEventListener("click", () => toggleDrawer(drawerMenu));
  btnFiltro.addEventListener("click", () => toggleDrawer(drawerFiltro));
  overlay.addEventListener("click", () => {
    drawerMenu.classList.remove("aberto");
    drawerFiltro.classList.remove("aberto");
    overlay.classList.remove("ativo");
  });

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const isEscuro = document.body.classList.toggle("escuro");
      localStorage.setItem("tema", isEscuro ? "escuro" : "claro");
    });
  }

  const userLogado = JSON.parse(localStorage.getItem("user_logado"));
  if (userLogado) {
    document.getElementById("nomeUsuarioDrawer").innerHTML = `
      <span>${userLogado.usuario.nomeCompleto}</span><br/><small>${userLogado.usuario.email}</small>
    `;
  }

  
 let osExemplos = []; 
  async function buscarProjetosDoUsuario() {
    const API_BASE = 'http://localhost:3000/api';
    const dadosUsuario = JSON.parse(localStorage.getItem("user_logado"));
    const usuarioId = dadosUsuario.usuario.id;

    try {
      const resposta = await fetch(`${API_BASE}/projeto/listarPj/${usuarioId}`);
      if (!resposta.ok) throw new Error("Erro ao buscar projetos");

      const projetos = await resposta.json();
      osExemplos = projetos.map(projeto => ({ ...projeto })); // atualiza a variável global

      console.log("Projetos disponíveis:", osExemplos);
      const resultadoInicial = aplicarFiltros(
        osExemplos.sort((a, b) => b.id - a.id)
      );
      renderizarCards(resultadoInicial);
    } catch (erro) {
    console.error("Erro:", erro);
  }
}
  await buscarProjetosDoUsuario();
  
  console.log(osExemplos);
 
  const tagPorStatus = {
    afazer: ["aberta", "em espera"],
    emdev: ["em processo", "em verificação"],
    finalizado: ["concluído","rejeitado"],
  };

  function criarCard(os) {
    const card = document.createElement("div");
    card.className = "card_os";
    card.setAttribute("draggable", true);
    card.dataset.id = os.id;
    card.dataset.tag = os.tag;
    card.innerHTML = `
      <span class="tag_os tag-${os.tag.replace(/\s+/g, "-")}">${os.tag}</span>
      <h3>OS-${os.titulo}</h3>
      <p class="descricao_os">${os.descricao}</p>
      <div class="botoes">
        <button class="verDetalhes"><i class="bi bi-eye"></i></button>
        <button class="excluir"><i class="bi bi-trash"></i></button>
      </div>
    `;
  
    card.querySelector(".verDetalhes").addEventListener("click", () => {
      localStorage.setItem("os_selecionada", JSON.stringify(os));
      window.location.href = "tela_projeto_individual.html"; 
    });
    const btnExcluir = card.querySelector(".excluir");
    btnExcluir.addEventListener("click", async () => {
      if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      await fetch(`http://localhost:3000/api/projeto/deletePj/${os.id}`, {
        method: "DELETE",
      });
      card.remove();
      osExemplos = osExemplos.filter(p => p.id !== os.id);
    } catch (erro) {
      console.error("Erro ao excluir projeto:", erro);
      alert("Erro ao excluir projeto.");
    }
  });
    adicionarDragEvents(card);
    return card;

  }

  function adicionarDragEvents(card) {
    card.addEventListener("dragstart", () => {
      dragged = card;
      setTimeout(() => (card.style.display = "none"), 0);
    });
    card.addEventListener("dragend", () => {
      card.style.display = "block";
      dragged = null;
    });
  }

  function renderizarCards(lista) {
    console.log("Renderizando cards", lista);
    document
      .querySelectorAll(".area_cartoes")
      .forEach((area) => (area.innerHTML = ""));
    lista.forEach((os) => {
      const area = document.querySelector(
        `.area_cartoes[data-status="${os.status}"]`
      );
      if (area) area.appendChild(criarCard(os));
    });
  }

  function aplicarFiltros(osList) {
    const filtroDescricao = document
      .getElementById("filtroDescricao")
      .value.toLowerCase();
    const filtroId = document.getElementById("filtroId").value;
    const filtroResponsavel = document
      .getElementById("filtroResponsavel")
      .value.toLowerCase();
    const filtroCidade = document
      .getElementById("filtroCidade")
      .value.toLowerCase();
    const filtroEstado = document
      .getElementById("filtroEstado")
      .value.toLowerCase();
    const filtroDataEvento = document.getElementById("filtroDataEvento").value;
    const filtroDataCriacao =
      document.getElementById("filtroDataCriacao").value;

    return osList.filter(
      (os) =>
        filtrosSelecionados.has(os.tag) &&
        (!filtroDescricao ||
          os.descricao.toLowerCase().includes(filtroDescricao)) &&
        (!filtroId || os.id.toString() === filtroId) &&
        (!filtroResponsavel ||
          os.responsavel.toLowerCase().includes(filtroResponsavel)) &&
        (!filtroCidade || os.cidade.toLowerCase().includes(filtroCidade)) &&
        (!filtroEstado || os.estado.toLowerCase().includes(filtroEstado)) &&
        (!filtroDataEvento || os.data === filtroDataEvento) &&
        (!filtroDataCriacao || os.dataCriacao === filtroDataCriacao)
    );
  }

  function renderizarTabela(lista) {
    listaBody.innerHTML = "";
    lista.forEach((os) => {
      const tr = document.createElement("tr");
      const tagClass = `tag_os tag-${os.tag.replace(/\s+/g, "-")}`;
      tr.innerHTML = `
        <td>${os.id}</td>
        <td>${os.titulo}</td>
        <td>${os.descricao}</td>
        <td>${os.status}</td>
        <td><span class="${tagClass}"></span></td>
        <td>${os.data}</td>
        <td>${os.cidade}</td>
        <td>${os.estado}</td>
        <td>${os.responsavel}</td>
      `;
      listaBody.appendChild(tr);
    });
  }


  document.getElementById("aplicarFiltro").addEventListener("click", () => {
    const resultado = aplicarFiltros(osExemplos.sort((a, b) => b.id - a.id));
    if (containerProjetos.classList.contains("modo-lista")) {
      renderizarTabela(resultado);
    } else {
      renderizarCards(resultado);
    }
  });

  btnModoLista.addEventListener("click", () => {
    containerProjetos.classList.toggle("modo-lista");
    listaOS.classList.toggle("d-none");
    document
      .querySelectorAll(".quadro")
      .forEach((q) => q.classList.toggle("d-none"));
    const resultado = aplicarFiltros(osExemplos.sort((a, b) => b.id - a.id));
    if (containerProjetos.classList.contains("modo-lista")) {
      renderizarTabela(resultado);
    } else {
      renderizarCards(resultado);
    }
  });

  let dragged = null;
  document.querySelectorAll(".area_cartoes").forEach((area) => {
    area.addEventListener("dragover", (e) => e.preventDefault());
    area.addEventListener("drop", async () => {
      const API_BASE = 'http://localhost:3000/api';
    if (!dragged) return;

    const targetStatus = area.dataset.status;
    const currentStatus = dragged.closest(".area_cartoes").dataset.status;

    if (
      currentStatus === "finalizado" ||
      (targetStatus === "finalizado" && currentStatus === "finalizado")
    )
      return;

    if (
      targetStatus === "finalizado" ||
      (targetStatus === "emdev" && currentStatus === "afazer") ||
      (targetStatus === "afazer" && currentStatus === "emdev")
    ) {
      const novaTag = tagPorStatus[targetStatus][0];

      // Atualiza visualmente o card
      dragged.querySelector(".tag_os").textContent = novaTag;
      dragged.querySelector(
        ".tag_os"
      ).className = `tag_os tag-${novaTag.replace(/\s+/g, "-")}`;
      area.insertBefore(dragged, area.firstChild);

      const osId = dragged.dataset.id; // certifique-se de ter isso no card!
      try {
        await fetch(`${API_BASE}/projeto/${osId}`, {
          method: "PUT", // ou PATCH, conforme sua API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: targetStatus,
            tag: novaTag,
          }),
        });
        console.log("Mudou");
      } catch (err) {
        console.error("Erro ao atualizar status no backend:", err);
        alert("Erro ao salvar alteração no banco.");
      }
    }
    });
  });

  // Inicialização padrão
  const resultadoInicial = aplicarFiltros(
    osExemplos.sort((a, b) => b.id - a.id)
  );
});

import "./styles/projetos.css";

document.addEventListener("DOMContentLoaded", () => {
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
      <span>${userLogado.nomeCompleto}</span><br/><small>${userLogado.email}</small>
    `;
  }

  /*
  {"_id":{"$oid":"681922643ae8e52f6d462138"},
  "data":{"$date":{"$numberLong":"1746885600000"}},
  "endereco":"Av. Washington Soares, 1321",
  "cidade":"Fortaleza",
  "estado":"CE",
  "descricao":"Workshop de desenvolvimento de carreira",
  "titulo":"Teste",
  "usuarioId":"661f2e4cf08a5b5f6c3428a7",
  "status":"Pendente",
  "__v":{"$numberInt":"0"}}
  */ 
  const Banco_de_dados = [

    {
      "id": "1",
     "titulo": "Pintura Externa",
      "descricao": "Pintura fachada.",
      "data": "2025-05-12",
      "dataFinal": "2025-06-12",
      "endereco": "perto da Unifor",
      "status": "afazer",
      "tag": "aberta",
      "cidade": "São Paulo",
     "estado": "SP",
      "responsavel": "Carlos",
    },
    {
      "id": "2",
     "titulo": "Pintura Externa",
      "descricao": "Pintura fachada.",
      "data": "2025-05-12",
      "dataFinal": "2025-06-12",
      "endereco": "perto da Unifor",
      "status": "emdev",
      "tag": "em processo",
      "cidade": "São Paulo",
     "estado": "SP",
      "responsavel": "Carlos",
    },
    {
      "id": "3",
      "titulo": "Verificação Final",
      "descricao": "Revisar acabamento.",
      "data": "2025-05-25",
      "status": "finalizado",
      "tag": "concluído",
      "cidade": "Belo Horizonte",
      "estado": "MG",
      "responsavel": "Joana",
    },
    {
      "id": "4",
     "titulo": "Pintura Externa",
      "descricao": "Pintura fachada.",
      "data": "2025-05-12",
      "status": "emdev",
      "tag": "em processo",
      "cidade": "São Paulo",
     "estado": "SP",
      "responsavel": "Carlos",
    },
    {
      "id": "5",
     "titulo": "Pintura Externa",
      "descricao": "Pintura fachada.",
      "data": "2025-05-12",
      "status": "emdev",
      "tag": "em processo",
      "cidade": "São Paulo",
     "estado": "SP",
      "responsavel": "Carlos",
    },
    {
      "id": "6",
      "titulo": "Verificação Final",
      "descricao": "Revisar acabamento.",
      "data": "2025-05-25",
      "status": "finalizado",
      "tag": "concluído",
      "cidade": "Belo Horizonte",
      "estado": "MG",
      "responsavel": "Joana",
    }
  ];
  
  const osExemplos = [];
  
  Banco_de_dados.forEach(objeto => {
    const projeto = {}; // Criar um novo objeto para cada item
  
    Object.entries(objeto).forEach(([chave, valor]) => {
      projeto[chave] = valor;
    });
    if(projeto['id'] == '1' || projeto['id'] == '2' || projeto['id'] == '3'){
      osExemplos.push(projeto); // Adiciona cada novo objeto ao array

    }
  });
  
  console.log(osExemplos);
 
  const tagPorStatus = {
    afazer: ["aberta", "em espera"],
    emdev: ["em processo", "em verificação"],
    finalizado: ["rejeitado", "concluído"],
  };

  function criarCard(os) {
    const card = document.createElement("div");
    card.className = "card_os";
    card.setAttribute("draggable", true);
    card.dataset.id = os.id;
    card.dataset.tag = os.tag;
    card.innerHTML = `
      <span class="tag_os tag-${os.tag.replace(/\s+/g, "-")}">${os.tag}</span>
      <h3>OS-${os.id}: ${os.titulo}</h3>
      <p class="descricao_os">${os.descricao}</p>
      <div class="botoes">
        <button class="verDetalhes"><i class="bi bi-eye"></i></button>
        <button><i class="bi bi-person-plus"></i></button>
      </div>
    `;
  
    card.querySelector(".verDetalhes").addEventListener("click", () => {
      localStorage.setItem("os_selecionada", JSON.stringify(os));
      window.location.href = "tela_projeto_individual.html"; 
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
    area.addEventListener("drop", () => {
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
        dragged.querySelector(".tag_os").textContent = novaTag;
        dragged.querySelector(
          ".tag_os"
        ).className = `tag_os tag-${novaTag.replace(/\s+/g, "-")}`;
        area.insertBefore(dragged, area.firstChild);
      }
    });
  });

  // Inicialização padrão
  const resultadoInicial = aplicarFiltros(
    osExemplos.sort((a, b) => b.id - a.id)
  );
  renderizarCards(resultadoInicial);
});

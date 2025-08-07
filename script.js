// ==== METAS POR CONSULTOR ====
const metasConsultores = {
  Leticia: { contas: 7, receita: 5500 },
  Marcelo: { contas: 7, receita: 5500 },
  Gabriel: { contas: 7, receita: 5500 },
  Glaucia: { contas: 7, receita: 5500 }
};

// ==== METAS GERAIS ====
const metasGerais = {
  contas: 28,
  receita: 22000,
  vendas: 1500000,
  rentabilidade: 870000
};

// ==== DADOS DOS CONSULTORES ====
const consultores = [
  { nome: "Leticia", contas: 4, receita: 3700, vendas: 29552, rentabilidade: 0 },
  { nome: "Marcelo", contas: 3, receita: 1500, vendas: 9678, rentabilidade: 0 },
  { nome: "Gabriel", contas: 1, receita: 455, vendas: 23973, rentabilidade: 0 },
  { nome: "Glaucia", contas: 1, receita: 500, vendas: 13555, rentabilidade: 0 }
];

// ==== NOVAS LOJAS (RANKING) ====
const novasLojas = [
  { consultor: "Leticia", loja: "ReUs", cidade: "São Paulo", vendas: 120000 },
  { consultor: "Gabriel", loja: "Loja B", cidade: "Curitiba", vendas: 450000 },
  { consultor: "Marcelo", loja: "Loja C", cidade: "Rio de Janeiro", vendas: 300000 }
];

// ==== LOGIN ====
window.login = function () {
  const user = document.getElementById("userSelect").value;
  const pass = document.getElementById("password").value;

  if (!user || pass !== user + "1234") {
    alert("Login inválido");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("mainApp").style.display = "block";

  gerarDashboard();
  gerarRanking();
};

// ==== VERIFICA LOGIN SALVO ====
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    gerarDashboard();
    gerarRanking();
  }
};

// ==== DASHBOARD ====
function gerarDashboard() {
  const implantacaoContainer = document.getElementById("cardsImplantacao");
  const faturamentoContainer = document.getElementById("cardsFaturamento");
  const novasLojasContainer = document.getElementById("novasLojasRanking");

  implantacaoContainer.innerHTML = "";
  faturamentoContainer.innerHTML = "";
  novasLojasContainer.innerHTML = "";

  const totalContas = consultores.reduce((sum, c) => sum + c.contas, 0);
  const totalReceita = consultores.reduce((sum, c) => sum + c.receita, 0);
  const totalVendas = consultores.reduce((sum, c) => sum + c.vendas, 0);
  const totalRentabilidade = consultores.reduce((sum, c) => sum + c.rentabilidade, 0);

  // Implantação
  implantacaoContainer.innerHTML += criarCard("Contas Realizadas", `${totalContas} / ${metasGerais.contas}`, totalContas / metasGerais.contas);
  implantacaoContainer.innerHTML += criarCard("Receita Realizada", `R$ ${totalReceita.toLocaleString()} / R$ ${metasGerais.receita.toLocaleString()}`, totalReceita / metasGerais.receita);

  // Faturamento
  faturamentoContainer.innerHTML += criarCard("Vendas", `R$ ${totalVendas.toLocaleString()} / R$ ${metasGerais.vendas.toLocaleString()}`, totalVendas / metasGerais.vendas);
  faturamentoContainer.innerHTML += criarCard("Rentabilidade", `R$ ${totalRentabilidade.toLocaleString()} / R$ ${metasGerais.rentabilidade.toLocaleString()}`, totalRentabilidade / metasGerais.rentabilidade);

  // Novas Lojas Ranking
  const ranking = [...novasLojas].sort((a, b) => b.vendas - a.vendas);
  ranking.forEach((loja, index) => {
    novasLojasContainer.innerHTML += `
      <div class="nova-loja-entry">
        <strong>${index + 1}. ${loja.consultor}</strong> - ${loja.loja} (${loja.cidade})<br/>
        <span>Vendas: R$ ${loja.vendas.toLocaleString()}</span>
      </div>
    `;
  });
}

function criarCard(titulo, valor, progresso) {
  progresso = Math.min(progresso * 100, 100);
  return `
    <div class="card">
      <h3>${titulo}</h3>
      <p>${valor}</p>
      <div class="progress-bar">
        <div class="progress" style="width: ${progresso}%;"></div>
      </div>
    </div>
  `;
}

// ==== GERAR RANKING DE CONSULTOR ====
function gerarRanking() {
  const containerContas = document.getElementById("rankingContas");
  const containerReceita = document.getElementById("rankingReceita");

  containerContas.innerHTML = "";
  containerReceita.innerHTML = "";

  const rankingContas = [...consultores].sort((a, b) => b.contas - a.contas);
  const rankingReceita = [...consultores].sort((a, b) => b.receita - a.receita);

  rankingContas.forEach((c, i) => {
    const progresso = Math.min((c.contas / metasConsultores[c.nome].contas) * 100, 100);
    containerContas.innerHTML += criarCardConsultor(c.nome, c.contas + " contas", progresso, i + 1);
  });

  rankingReceita.forEach((c, i) => {
    const progresso = Math.min((c.receita / metasConsultores[c.nome].receita) * 100, 100);
    containerReceita.innerHTML += criarCardConsultor(c.nome, "R$ " + c.receita.toLocaleString(), progresso, i + 1);
  });
}

function criarCardConsultor(nome, valor, progresso, posicao) {
  const emoji = posicao === 1 ? "🏆" : posicao === 2 ? "🥈" : posicao === 3 ? "🥉" : "🔹";
  return `
    <div class="consultor-card">
      <h4>${emoji} ${nome}</h4>
      <p><strong>${valor}</strong></p>
      <div class="progress-bar">
        <div class="progress" style="width: ${progresso}%;"></div>
      </div>
    </div>
  `;
}

// ==== BLOQUEIO DO GIF ====
function pedirSenha(event) {
  event.preventDefault();
  const senha = prompt("Digite a senha para acessar esta imagem:");
  if (senha !== "felipe23") {
    alert("Senha incorreta. Ação bloqueada.");
  } else {
    alert("Acesso autorizado.");
  }
}

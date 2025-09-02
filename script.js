document.addEventListener("DOMContentLoaded", () => {
    const btnAntes = document.getElementById("btn-antes");
    const btnDepois = document.getElementById("btn-depois");
    const btnSimulacao = document.getElementById("btn-simulacao");
    const btnDetalhes = document.getElementById("btn-detalhes");
    const btnSimular = document.getElementById("btn-simular");

    const cenarioAntes = document.getElementById("cenario-antes");
    const novaProposta = document.getElementById("nova-proposta");
    const simulacao = document.getElementById("simulacao");
    const detalhesCompletos = document.getElementById("detalhes-completos");

    const valorCompraInput = document.getElementById("valor-compra");
    const numParcelasInput = document.getElementById("num-parcelas");
    const numVendasInput = document.getElementById("num-vendas");

    const clienteAntesSpan = document.getElementById("cliente-antes");
    const lojistaAntesSpan = document.getElementById("lojista-antes");
    const soufacilAntesSpan = document.getElementById("soufacil-antes");

    const clienteDepoisSpan = document.getElementById("cliente-depois");
    const lojistaDepoisSpan = document.getElementById("lojista-depois");
    const soufacilDepoisSpan = document.getElementById("soufacil-depois");

    function showSection(sectionToShow) {
        cenarioAntes.classList.add("hidden");
        novaProposta.classList.add("hidden");
        simulacao.classList.add("hidden");
        detalhesCompletos.classList.add("hidden");

        sectionToShow.classList.remove("hidden");
    }

    btnAntes.addEventListener("click", () => showSection(cenarioAntes));
    btnDepois.addEventListener("click", () => showSection(novaProposta));
    btnSimulacao.addEventListener("click", () => showSection(simulacao));
    btnDetalhes.addEventListener("click", () => showSection(detalhesCompletos));

    btnSimular.addEventListener("click", () => {
        const valorCompra = parseFloat(valorCompraInput.value);
        const numParcelas = parseInt(numParcelasInput.value);
        const numVendas = parseInt(numVendasInput.value);

        // Cenário Anterior
        const taxaJurosAntes = 0.065;
        const taxaUtilizacaoClienteAntes = 14.90;
        const mensalidadeLojistaAntes = 150;

        const jurosClienteAntes = valorCompra * taxaJurosAntes;
        const totalTaxaUtilizacaoClienteAntes = numParcelas * taxaUtilizacaoClienteAntes;
        const totalClienteAntes = valorCompra + jurosClienteAntes + totalTaxaUtilizacaoClienteAntes;

        const recebimentoLojistaAntes = numVendas * valorCompra;
        const custoMensalLojistaAntes = mensalidadeLojistaAntes;
        const lucroLojistaAntes = recebimentoLojistaAntes - custoMensalLojistaAntes;

        const receitaSoufacilAntes = jurosClienteAntes + totalTaxaUtilizacaoClienteAntes + mensalidadeLojistaAntes;

        clienteAntesSpan.textContent = `R$ ${totalClienteAntes.toFixed(2)} (Compra: R$${valorCompra.toFixed(2)}, Juros: R$${jurosClienteAntes.toFixed(2)}, Taxa Utilização: R$${totalTaxaUtilizacaoClienteAntes.toFixed(2)})`;
        lojistaAntesSpan.textContent = `R$ ${lucroLojistaAntes.toFixed(2)} (Recebimento: R$${recebimentoLojistaAntes.toFixed(2)}, Custo Mensal: R$${custoMensalLojistaAntes.toFixed(2)})`;
        soufacilAntesSpan.textContent = `R$ ${receitaSoufacilAntes.toFixed(2)} (Juros: R$${jurosClienteAntes.toFixed(2)}, Taxa Utilização: R$${totalTaxaUtilizacaoClienteAntes.toFixed(2)}, Mensalidade Lojista: R$${mensalidadeLojistaAntes.toFixed(2)})`;

        // Nova Proposta
        const taxaUtilizacaoClienteDepois = 10.00;
        const custoClubeLojista = 4.99;

        const totalTaxaUtilizacaoClienteDepois = numParcelas * taxaUtilizacaoClienteDepois;
        const totalClienteDepois = valorCompra + jurosClienteAntes + totalTaxaUtilizacaoClienteDepois;

        const custoClubeLojistaTotal = numVendas * numParcelas * custoClubeLojista;
        const lucroLojistaDepois = recebimentoLojistaAntes - custoMensalLojistaAntes - custoClubeLojistaTotal;

        const receitaSoufacilDepois = jurosClienteAntes + totalTaxaUtilizacaoClienteDepois + mensalidadeLojistaAntes + custoClubeLojistaTotal;

        clienteDepoisSpan.textContent = `R$ ${totalClienteDepois.toFixed(2)} (Compra: R$${valorCompra.toFixed(2)}, Juros: R$${jurosClienteAntes.toFixed(2)}, Taxa Utilização: R$${totalTaxaUtilizacaoClienteDepois.toFixed(2)})`;
        lojistaDepoisSpan.textContent = `R$ ${lucroLojistaDepois.toFixed(2)} (Recebimento: R$${recebimentoLojistaAntes.toFixed(2)}, Custo Mensal: R$${custoMensalLojistaAntes.toFixed(2)}, Custo Clube: R$${custoClubeLojistaTotal.toFixed(2)})`;
        soufacilDepoisSpan.textContent = `R$ ${receitaSoufacilDepois.toFixed(2)} (Juros: R$${jurosClienteAntes.toFixed(2)}, Taxa Utilização: R$${totalTaxaUtilizacaoClienteDepois.toFixed(2)}, Mensalidade Lojista: R$${mensalidadeLojistaAntes.toFixed(2)}, Custo Clube Lojista: R$${custoClubeLojistaTotal.toFixed(2)})`;
    });

    // Exibir a seção inicial (Cenário Anterior)
    showSection(cenarioAntes);
});



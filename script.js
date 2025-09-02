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

    const allButtons = [btnAntes, btnDepois, btnSimulacao, btnDetalhes];
    const allSections = [cenarioAntes, novaProposta, simulacao, detalhesCompletos];

    function setActiveButton(activeButton) {
        allButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }

    function showSection(sectionToShow, activeButton) {
        // Adicionar efeito de fade out
        allSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.classList.add("hidden");
            }, 150);
        });

        // Mostrar nova seção com efeito de fade in
        setTimeout(() => {
            sectionToShow.classList.remove("hidden");
            setTimeout(() => {
                sectionToShow.style.opacity = '1';
                sectionToShow.style.transform = 'translateY(0)';
            }, 50);
        }, 200);

        setActiveButton(activeButton);
    }

    // Adicionar estilos de transição
    allSections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    btnAntes.addEventListener("click", () => showSection(cenarioAntes, btnAntes));
    btnDepois.addEventListener("click", () => showSection(novaProposta, btnDepois));
    btnSimulacao.addEventListener("click", () => showSection(simulacao, btnSimulacao));
    btnDetalhes.addEventListener("click", () => showSection(detalhesCompletos, btnDetalhes));

    btnSimular.addEventListener("click", () => {
        const valorCompra = parseFloat(valorCompraInput.value);
        const numParcelas = parseInt(numParcelasInput.value);
        const numVendas = parseInt(numVendasInput.value);

        // Validação de entrada
        if (!valorCompra || valorCompra <= 0 || !numParcelas || numParcelas <= 0 || !numVendas || numVendas <= 0) {
            alert('Por favor, preencha todos os campos com valores válidos.');
            return;
        }

        // Adicionar efeito de loading
        btnSimular.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
        btnSimular.disabled = true;

        setTimeout(() => {
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

            // Nova Proposta
            const taxaUtilizacaoClienteDepois = 10.00;
            const custoClubeLojista = 4.99;

            const totalTaxaUtilizacaoClienteDepois = numParcelas * taxaUtilizacaoClienteDepois;
            const totalClienteDepois = valorCompra + jurosClienteAntes + totalTaxaUtilizacaoClienteDepois;

            const custoClubeLojistaTotal = numVendas * numParcelas * custoClubeLojista;
            const lucroLojistaDepois = recebimentoLojistaAntes - custoMensalLojistaAntes - custoClubeLojistaTotal;

            const receitaSoufacilDepois = jurosClienteAntes + totalTaxaUtilizacaoClienteDepois + mensalidadeLojistaAntes + custoClubeLojistaTotal;

            // Formatação dos resultados
            clienteAntesSpan.innerHTML = `
                <strong>R$ ${totalClienteAntes.toFixed(2)}</strong><br>
                <small>Compra: R$${valorCompra.toFixed(2)} | Juros: R$${jurosClienteAntes.toFixed(2)} | Taxa: R$${totalTaxaUtilizacaoClienteAntes.toFixed(2)}</small>
            `;
            
            lojistaAntesSpan.innerHTML = `
                <strong>R$ ${lucroLojistaAntes.toFixed(2)}</strong><br>
                <small>Recebimento: R$${recebimentoLojistaAntes.toFixed(2)} | Custo: R$${custoMensalLojistaAntes.toFixed(2)}</small>
            `;
            
            soufacilAntesSpan.innerHTML = `
                <strong>R$ ${receitaSoufacilAntes.toFixed(2)}</strong><br>
                <small>Juros: R$${jurosClienteAntes.toFixed(2)} | Taxa: R$${totalTaxaUtilizacaoClienteAntes.toFixed(2)} | Mensalidade: R$${mensalidadeLojistaAntes.toFixed(2)}</small>
            `;

            clienteDepoisSpan.innerHTML = `
                <strong>R$ ${totalClienteDepois.toFixed(2)}</strong><br>
                <small>Compra: R$${valorCompra.toFixed(2)} | Juros: R$${jurosClienteAntes.toFixed(2)} | Taxa: R$${totalTaxaUtilizacaoClienteDepois.toFixed(2)}</small>
            `;
            
            lojistaDepoisSpan.innerHTML = `
                <strong>R$ ${lucroLojistaDepois.toFixed(2)}</strong><br>
                <small>Recebimento: R$${recebimentoLojistaAntes.toFixed(2)} | Custo: R$${custoMensalLojistaAntes.toFixed(2)} | Clube: R$${custoClubeLojistaTotal.toFixed(2)}</small>
            `;
            
            soufacilDepoisSpan.innerHTML = `
                <strong>R$ ${receitaSoufacilDepois.toFixed(2)}</strong><br>
                <small>Juros: R$${jurosClienteAntes.toFixed(2)} | Taxa: R$${totalTaxaUtilizacaoClienteDepois.toFixed(2)} | Mensalidade: R$${mensalidadeLojistaAntes.toFixed(2)} | Clube: R$${custoClubeLojistaTotal.toFixed(2)}</small>
            `;

            // Adicionar animação aos resultados
            const resultBlocks = document.querySelectorAll('.result-block');
            resultBlocks.forEach((block, index) => {
                setTimeout(() => {
                    block.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        block.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });

            // Restaurar botão
            btnSimular.innerHTML = '<i class="fas fa-calculator"></i> Calcular Simulação';
            btnSimular.disabled = false;
        }, 1000);
    });

    // Adicionar efeito hover nos cards
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Adicionar transições suaves aos result blocks
    const resultBlocks = document.querySelectorAll('.result-block');
    resultBlocks.forEach(block => {
        block.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Inicializar com a primeira seção visível
    showSection(cenarioAntes, btnAntes);
});


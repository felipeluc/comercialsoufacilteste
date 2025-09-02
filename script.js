class SimuladorSouFacil {
    constructor() {
        this.initEventListeners();
        this.calcular(); // Calcular com valores iniciais
    }

    initEventListeners() {
        const calcularBtn = document.getElementById('calcular');
        const inputs = document.querySelectorAll('input, select');
        
        calcularBtn.addEventListener('click', () => this.calcular());
        
        // Calcular automaticamente quando os valores mudarem
        inputs.forEach(input => {
            input.addEventListener('input', () => this.calcular());
            input.addEventListener('change', () => this.calcular());
        });
    }

    calcular() {
        const valorVenda = parseFloat(document.getElementById('valorVenda').value) || 0;
        const quantidadeVendas = parseInt(document.getElementById('quantidadeVendas').value) || 0;
        const mesesVenda = parseInt(document.getElementById('mesesVenda').value) || 1;

        // Cálculos base
        const vendaTotal = valorVenda * quantidadeVendas * mesesVenda;
        const taxaParcelamento = 0.065; // 6,5%
        const mensalidadeBase = 150;
        const clubeBeneficioTaxa = 196;
        
        // COM CLUBE DE BENEFÍCIOS
        const comBeneficio = this.calcularComBeneficio(vendaTotal, mensalidadeBase, clubeBeneficioTaxa, taxaParcelamento, mesesVenda);
        
        // SEM CLUBE DE BENEFÍCIOS  
        const semBeneficio = this.calcularSemBeneficio(vendaTotal, mensalidadeBase, taxaParcelamento, mesesVenda);
        
        // Atualizar interface
        this.atualizarInterface(comBeneficio, semBeneficio, quantidadeVendas * mesesVenda);
    }

    calcularComBeneficio(vendaTotal, mensalidadeBase, clubeBeneficioTaxa, taxaParcelamento, meses) {
        // Baseado no PDF: Com clube de benefícios
        const vendaBruta = vendaTotal + (vendaTotal * taxaParcelamento) + (400 * meses); // + utilização
        const vendaLiquida = vendaTotal;
        const mensalidade = mensalidadeBase * meses;
        const clubeBeneficio = clubeBeneficioTaxa * meses;
        const aReceber = vendaLiquida - mensalidade - clubeBeneficio;
        
        // Renda garantida
        const rendaGarantidaClube = clubeBeneficio;
        const rendaGarantidaMensalidade = mensalidade;
        const totalGarantido = rendaGarantidaClube + rendaGarantidaMensalidade;
        
        // Renda variável
        const rendaVariavelTaxa = vendaTotal * taxaParcelamento;
        
        return {
            vendaBruta,
            vendaLiquida,
            mensalidade,
            clubeBeneficio,
            aReceber,
            rendaGarantidaClube,
            rendaGarantidaMensalidade,
            totalGarantido,
            rendaVariavelTaxa
        };
    }

    calcularSemBeneficio(vendaTotal, mensalidadeBase, taxaParcelamento, meses) {
        // Baseado no PDF: Sem clube de benefícios
        const taxaUtilizacao = 596 * meses; // Taxa de utilização do cliente
        const vendaBruta = vendaTotal + (vendaTotal * taxaParcelamento) + taxaUtilizacao;
        const vendaLiquida = vendaTotal;
        const mensalidade = mensalidadeBase * meses;
        const aReceber = vendaLiquida - mensalidade;
        
        // Renda variável
        const rendaVariavelTaxa = vendaTotal * taxaParcelamento;
        const rendaVariavelUtilizacao = taxaUtilizacao;
        const totalVariavel = rendaVariavelTaxa + rendaVariavelUtilizacao;
        
        return {
            vendaBruta,
            vendaLiquida,
            mensalidade,
            aReceber,
            rendaVariavelTaxa,
            rendaVariavelUtilizacao,
            totalVariavel
        };
    }

    atualizarInterface(comBeneficio, semBeneficio, totalVendas) {
        // COM BENEFÍCIO
        document.getElementById('vendaBrutaCom').textContent = this.formatarMoeda(comBeneficio.vendaBruta);
        document.getElementById('vendaLiquidaCom').textContent = this.formatarMoeda(comBeneficio.vendaLiquida);
        document.getElementById('mensalidadeCom').textContent = `-${this.formatarMoeda(comBeneficio.mensalidade)}`;
        document.getElementById('clubeBeneficioCom').textContent = `-${this.formatarMoeda(comBeneficio.clubeBeneficio)}`;
        document.getElementById('totalReceberCom').textContent = this.formatarMoeda(comBeneficio.aReceber);
        
        // Renda garantida
        document.getElementById('rendaGarantidaClube').textContent = this.formatarMoeda(comBeneficio.rendaGarantidaClube);
        document.getElementById('rendaGarantidaMensalidade').textContent = this.formatarMoeda(comBeneficio.rendaGarantidaMensalidade);
        document.getElementById('totalGarantido').textContent = this.formatarMoeda(comBeneficio.totalGarantido);
        
        // Renda variável com benefício
        document.getElementById('rendaVariavelTaxa').textContent = this.formatarMoeda(comBeneficio.rendaVariavelTaxa);
        
        // SEM BENEFÍCIO
        document.getElementById('vendaBrutaSem').textContent = this.formatarMoeda(semBeneficio.vendaBruta);
        document.getElementById('vendaLiquidaSem').textContent = this.formatarMoeda(semBeneficio.vendaLiquida);
        document.getElementById('mensalidadeSem').textContent = `-${this.formatarMoeda(semBeneficio.mensalidade)}`;
        document.getElementById('totalReceberSem').textContent = this.formatarMoeda(semBeneficio.aReceber);
        
        // Renda variável sem benefício
        document.getElementById('rendaVariavelTaxaSem').textContent = this.formatarMoeda(semBeneficio.rendaVariavelTaxa);
        document.getElementById('rendaVariavelUtilizacao').textContent = this.formatarMoeda(semBeneficio.rendaVariavelUtilizacao);
        document.getElementById('totalVariavelSem').textContent = this.formatarMoeda(semBeneficio.totalVariavel);
        
        // RESUMO
        const diferenca = comBeneficio.aReceber - semBeneficio.aReceber;
        document.getElementById('diferencaTotal').textContent = this.formatarMoeda(Math.abs(diferenca));
        document.getElementById('diferencaTotal').style.color = diferenca >= 0 ? '#28a745' : '#dc3545';
        
        document.getElementById('resumoGarantida').textContent = this.formatarMoeda(comBeneficio.totalGarantido);
        document.getElementById('vendasExtras').textContent = totalVendas.toLocaleString('pt-BR');
        
        // Adicionar indicador se há diferença
        const diferencaElement = document.getElementById('diferencaTotal');
        if (diferenca > 0) {
            diferencaElement.textContent = `+${this.formatarMoeda(diferenca)} (a mais)`;
        } else if (diferenca < 0) {
            diferencaElement.textContent = `${this.formatarMoeda(diferenca)} (a menos)`;
        } else {
            diferencaElement.textContent = this.formatarMoeda(0) + ' (igual)';
        }
    }

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
}

// Inicializar o simulador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new SimuladorSouFacil();
});


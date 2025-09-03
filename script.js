class SimuladorSouFacilV4 {
    constructor() {
        this.receitasChart = null;
        this.rendaChart = null;
        this.initEventListeners();
        this.calcular(); // Calcular com valores iniciais
    }

    initEventListeners() {
        const calcularBtn = document.getElementById('calcular');
        const inputs = document.querySelectorAll('input, select');
        const tabButtons = document.querySelectorAll('.tab-button');
        
        calcularBtn.addEventListener('click', () => this.calcular());
        
        // Calcular automaticamente quando os valores mudarem
        inputs.forEach(input => {
            input.addEventListener('input', () => this.calcular());
            input.addEventListener('change', () => this.calcular());
        });

        // Gerenciar tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const scenario = e.target.dataset.scenario;
                this.switchTab(scenario);
            });
        });
    }

    switchTab(scenario) {
        // Atualizar botões
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-scenario="${scenario}"]`).classList.add('active');

        // Atualizar conteúdo
        document.querySelectorAll('.scenario-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(scenario).classList.remove('hidden');
    }

    calcular() {
        const valorVenda = parseFloat(document.getElementById('valorVenda').value) || 0;
        const quantidadeVendas = parseInt(document.getElementById('quantidadeVendas').value) || 0;
        const mesesVenda = parseInt(document.getElementById('mesesVenda').value) || 1;

        // Baseado na planilha Excel fornecida
        const vendaTotal = valorVenda * quantidadeVendas * mesesVenda;
        const taxaParcelamento = 0.065; // 6,5%
        const mensalidadeBase = 150;
        const clubeBeneficioBase = 196;
        const utilizacaoClienteBase = 400; // COM benefício
        const utilizacaoClienteSemBeneficioBase = 596; // SEM benefício
        
        // COM CLUBE DE BENEFÍCIOS
        const comBeneficio = this.calcularComBeneficio(
            valorVenda,
            vendaTotal, 
            mensalidadeBase, 
            clubeBeneficioBase, 
            taxaParcelamento, 
            utilizacaoClienteBase,
            mesesVenda,
            quantidadeVendas
        );
        
        // SEM CLUBE DE BENEFÍCIOS  
        const semBeneficio = this.calcularSemBeneficio(
            valorVenda,
            vendaTotal, 
            mensalidadeBase, 
            taxaParcelamento, 
            utilizacaoClienteSemBeneficioBase,
            mesesVenda,
            quantidadeVendas
        );
        
        // Atualizar interface
        this.atualizarInterface(comBeneficio, semBeneficio, quantidadeVendas * mesesVenda);
        
        // Atualizar gráficos
        this.atualizarGraficos(comBeneficio, semBeneficio);
    }

    calcularComBeneficio(valorVenda, vendaTotal, mensalidadeBase, clubeBeneficioBase, taxaParcelamento, utilizacaoClienteBase, meses, quantidadeVendas) {
        // LOJISTA COM BENEFÍCIO
        const vendaLiquidaLojista = vendaTotal;
        const mensalidadeLojista = mensalidadeBase * meses;
        const clubeBeneficioLojista = clubeBeneficioBase * meses;
        const aReceberLojista = vendaLiquidaLojista - mensalidadeLojista - clubeBeneficioLojista;
        
        // CLIENTE COM BENEFÍCIO
        const valorCompraCliente = valorVenda * quantidadeVendas; // Por mês
        const taxaParcelamentoCliente = valorCompraCliente * taxaParcelamento;
        const taxaCartaoCliente = valorCompraCliente * 0.149 * 4; // 14,9% x 4 (taxa do cartão 10x4)
        const totalPagarCliente = valorCompraCliente + taxaParcelamentoCliente + taxaCartaoCliente;
        const parcelaCliente = totalPagarCliente / 4; // Em 4x
        
        // SOUFACIL COM BENEFÍCIO
        const utilizacaoCliente = utilizacaoClienteBase * meses;
        const vendaBrutaSouFacil = vendaTotal + (vendaTotal * taxaParcelamento) + utilizacaoCliente;
        const vendaLiquidaSouFacil = vendaTotal; // Negativo na planilha (saída)
        const mensalidadeSouFacil = mensalidadeBase * meses;
        const clubeBeneficioSouFacil = clubeBeneficioBase * meses;
        const valorLiquidoSouFacil = 2696 * meses; // Valor fixo da planilha
        
        // Renda garantida
        const rendaGarantidaClube = clubeBeneficioSouFacil;
        const rendaGarantidaMensalidade = mensalidadeSouFacil;
        const totalGarantido = rendaGarantidaClube + rendaGarantidaMensalidade;
        
        // Renda variável
        const rendaVariavelTaxa = vendaTotal * taxaParcelamento;
        const rendaVariavelUtilizacao = utilizacaoCliente;
        
        return {
            // Lojista
            vendaLiquidaLojista,
            mensalidadeLojista,
            clubeBeneficioLojista,
            aReceberLojista,
            
            // Cliente
            valorCompraCliente,
            taxaParcelamentoCliente,
            taxaCartaoCliente,
            totalPagarCliente,
            parcelaCliente,
            
            // SouFacil
            vendaBrutaSouFacil,
            vendaLiquidaSouFacil,
            mensalidadeSouFacil,
            clubeBeneficioSouFacil,
            valorLiquidoSouFacil,
            
            // Renda garantida
            rendaGarantidaClube,
            rendaGarantidaMensalidade,
            totalGarantido,
            
            // Renda variável
            rendaVariavelTaxa,
            rendaVariavelUtilizacao
        };
    }

    calcularSemBeneficio(valorVenda, vendaTotal, mensalidadeBase, taxaParcelamento, utilizacaoClienteSemBeneficioBase, meses, quantidadeVendas) {
        // LOJISTA SEM BENEFÍCIO
        const vendaLiquidaLojista = vendaTotal;
        const mensalidadeLojista = mensalidadeBase * meses;
        const aReceberLojista = vendaLiquidaLojista - mensalidadeLojista;
        
        // CLIENTE SEM BENEFÍCIO
        const valorCompraCliente = valorVenda * quantidadeVendas; // Por mês
        const taxaParcelamentoCliente = valorCompraCliente * taxaParcelamento;
        const taxaCartaoCliente = valorCompraCliente * 0.149 * 4; // 14,9% x 4 (taxa do cartão 14,9x4)
        const totalPagarCliente = valorCompraCliente + taxaParcelamentoCliente + taxaCartaoCliente;
        const parcelaCliente = totalPagarCliente / 4; // Em 4x
        
        // SOUFACIL SEM BENEFÍCIO
        const utilizacaoCliente = utilizacaoClienteSemBeneficioBase * meses;
        const vendaBrutaSouFacil = vendaTotal + (vendaTotal * taxaParcelamento) + utilizacaoCliente;
        const vendaLiquidaSouFacil = vendaTotal; // Negativo na planilha (saída)
        const mensalidadeSouFacil = mensalidadeBase * meses;
        const valorLiquidoSouFacil = 2696 * meses; // Valor fixo da planilha (mesmo valor)
        
        // Renda variável (todo o lucro fica com o cliente)
        const rendaVariavelTaxa = vendaTotal * taxaParcelamento;
        const rendaVariavelUtilizacao = utilizacaoCliente;
        const totalVariavel = rendaVariavelTaxa + rendaVariavelUtilizacao;
        
        return {
            // Lojista
            vendaLiquidaLojista,
            mensalidadeLojista,
            aReceberLojista,
            
            // Cliente
            valorCompraCliente,
            taxaParcelamentoCliente,
            taxaCartaoCliente,
            totalPagarCliente,
            parcelaCliente,
            
            // SouFacil
            vendaBrutaSouFacil,
            vendaLiquidaSouFacil,
            mensalidadeSouFacil,
            valorLiquidoSouFacil,
            
            // Renda variável
            rendaVariavelTaxa,
            rendaVariavelUtilizacao,
            totalVariavel
        };
    }

    atualizarInterface(comBeneficio, semBeneficio, totalVendas) {
        // COM BENEFÍCIO - LOJISTA
        document.getElementById('vendaLiquidaLojistaComBeneficio').textContent = this.formatarMoeda(comBeneficio.vendaLiquidaLojista);
        document.getElementById('mensalidadeLojistaComBeneficio').textContent = `-${this.formatarMoeda(comBeneficio.mensalidadeLojista)}`;
        document.getElementById('clubeBeneficioLojistaComBeneficio').textContent = `-${this.formatarMoeda(comBeneficio.clubeBeneficioLojista)}`;
        document.getElementById('totalReceberLojistaComBeneficio').textContent = this.formatarMoeda(comBeneficio.aReceberLojista);
        
        // COM BENEFÍCIO - CLIENTE
        document.getElementById('valorCompraClienteComBeneficio').textContent = this.formatarMoeda(comBeneficio.valorCompraCliente);
        document.getElementById('taxaParcelamentoClienteComBeneficio').textContent = this.formatarMoeda(comBeneficio.taxaParcelamentoCliente);
        document.getElementById('taxaCartaoClienteComBeneficio').textContent = this.formatarMoeda(comBeneficio.taxaCartaoCliente);
        document.getElementById('totalPagarClienteComBeneficio').textContent = this.formatarMoeda(comBeneficio.totalPagarCliente);
        document.getElementById('parcelaClienteComBeneficio').textContent = this.formatarMoeda(comBeneficio.parcelaCliente);
        
        // COM BENEFÍCIO - SOUFACIL
        document.getElementById('vendaBrutaSouFacilComBeneficio').textContent = this.formatarMoeda(comBeneficio.vendaBrutaSouFacil);
        document.getElementById('vendaLiquidaSouFacilComBeneficio').textContent = `-${this.formatarMoeda(comBeneficio.vendaLiquidaSouFacil)}`;
        document.getElementById('mensalidadeSouFacilComBeneficio').textContent = this.formatarMoeda(comBeneficio.mensalidadeSouFacil);
        document.getElementById('clubeBeneficioSouFacilComBeneficio').textContent = this.formatarMoeda(comBeneficio.clubeBeneficioSouFacil);
        document.getElementById('valorLiquidoSouFacilComBeneficio').textContent = this.formatarMoeda(comBeneficio.valorLiquidoSouFacil);
        
        // Renda garantida
        document.getElementById('rendaGarantidaClubeBeneficio').textContent = this.formatarMoeda(comBeneficio.rendaGarantidaClube);
        document.getElementById('rendaGarantidaMensalidadeBeneficio').textContent = this.formatarMoeda(comBeneficio.rendaGarantidaMensalidade);
        document.getElementById('totalGarantidoBeneficio').textContent = this.formatarMoeda(comBeneficio.totalGarantido);
        
        // Renda variável com benefício
        document.getElementById('rendaVariavelTaxaBeneficio').textContent = this.formatarMoeda(comBeneficio.rendaVariavelTaxa);
        document.getElementById('rendaVariavelUtilizacaoBeneficio').textContent = this.formatarMoeda(comBeneficio.rendaVariavelUtilizacao);
        
        // SEM BENEFÍCIO - LOJISTA
        document.getElementById('vendaLiquidaLojistaSemBeneficio').textContent = this.formatarMoeda(semBeneficio.vendaLiquidaLojista);
        document.getElementById('mensalidadeLojistaSemBeneficio').textContent = `-${this.formatarMoeda(semBeneficio.mensalidadeLojista)}`;
        document.getElementById('totalReceberLojistaSemBeneficio').textContent = this.formatarMoeda(semBeneficio.aReceberLojista);
        
        // SEM BENEFÍCIO - CLIENTE
        document.getElementById('valorCompraClienteSemBeneficio').textContent = this.formatarMoeda(semBeneficio.valorCompraCliente);
        document.getElementById('taxaParcelamentoClienteSemBeneficio').textContent = this.formatarMoeda(semBeneficio.taxaParcelamentoCliente);
        document.getElementById('taxaCartaoClienteSemBeneficio').textContent = this.formatarMoeda(semBeneficio.taxaCartaoCliente);
        document.getElementById('totalPagarClienteSemBeneficio').textContent = this.formatarMoeda(semBeneficio.totalPagarCliente);
        document.getElementById('parcelaClienteSemBeneficio').textContent = this.formatarMoeda(semBeneficio.parcelaCliente);
        
        // SEM BENEFÍCIO - SOUFACIL
        document.getElementById('vendaBrutaSouFacilSemBeneficio').textContent = this.formatarMoeda(semBeneficio.vendaBrutaSouFacil);
        document.getElementById('vendaLiquidaSouFacilSemBeneficio').textContent = `-${this.formatarMoeda(semBeneficio.vendaLiquidaSouFacil)}`;
        document.getElementById('mensalidadeSouFacilSemBeneficio').textContent = this.formatarMoeda(semBeneficio.mensalidadeSouFacil);
        document.getElementById('valorLiquidoSouFacilSemBeneficio').textContent = this.formatarMoeda(semBeneficio.valorLiquidoSouFacil);
        
        // Renda variável sem benefício
        document.getElementById('rendaVariavelTaxaSemBeneficio').textContent = this.formatarMoeda(semBeneficio.rendaVariavelTaxa);
        document.getElementById('rendaVariavelUtilizacaoSemBeneficio').textContent = this.formatarMoeda(semBeneficio.rendaVariavelUtilizacao);
        document.getElementById('totalVariavelSemBeneficio').textContent = this.formatarMoeda(semBeneficio.totalVariavel);
        
        // RESUMO
        const diferencaLojista = comBeneficio.aReceberLojista - semBeneficio.aReceberLojista;
        const diferencaCliente = comBeneficio.totalPagarCliente - semBeneficio.totalPagarCliente;
        
        document.getElementById('diferencaTotalLojista').textContent = this.formatarMoeda(Math.abs(diferencaLojista));
        document.getElementById('diferencaTotalLojista').style.color = diferencaLojista >= 0 ? 'var(--color-green)' : 'var(--color-red)';
        
        document.getElementById('diferencaTotalCliente').textContent = this.formatarMoeda(Math.abs(diferencaCliente));
        document.getElementById('diferencaTotalCliente').style.color = diferencaCliente <= 0 ? 'var(--color-green)' : 'var(--color-red)';
        
        document.getElementById('resumoGarantida').textContent = this.formatarMoeda(comBeneficio.totalGarantido);
        document.getElementById('vendasExtras').textContent = totalVendas.toLocaleString('pt-BR');
        
        // Adicionar indicador se há diferença no lojista
        const diferencaLojistaElement = document.getElementById('diferencaTotalLojista');
        if (diferencaLojista > 0) {
            diferencaLojistaElement.textContent = `+${this.formatarMoeda(diferencaLojista)} (a mais)`;
        } else if (diferencaLojista < 0) {
            diferencaLojistaElement.textContent = `${this.formatarMoeda(diferencaLojista)} (a menos)`;
        } else {
            diferencaLojistaElement.textContent = this.formatarMoeda(0) + ' (igual)';
        }
        
        // Adicionar indicador se há diferença no cliente
        const diferencaClienteElement = document.getElementById('diferencaTotalCliente');
        if (diferencaCliente > 0) {
            diferencaClienteElement.textContent = `+${this.formatarMoeda(diferencaCliente)} (paga mais)`;
        } else if (diferencaCliente < 0) {
            diferencaClienteElement.textContent = `${this.formatarMoeda(Math.abs(diferencaCliente))} (paga menos)`;
        } else {
            diferencaClienteElement.textContent = this.formatarMoeda(0) + ' (igual)';
        }
        
        // Destacar a vantagem principal
        const vantagemElement = document.getElementById('vantagemClube');
        if (comBeneficio.valorLiquidoSouFacil === semBeneficio.valorLiquidoSouFacil) {
            vantagemElement.textContent = 'Mesmo lucro, mas com renda garantida de ' + this.formatarMoeda(comBeneficio.totalGarantido);
        } else {
            vantagemElement.textContent = 'Renda garantida de ' + this.formatarMoeda(comBeneficio.totalGarantido) + ' por período';
        }
    }

    atualizarGraficos(comBeneficio, semBeneficio) {
        this.criarGraficoReceitas(comBeneficio, semBeneficio);
        this.criarGraficoRenda(comBeneficio, semBeneficio);
    }

    criarGraficoReceitas(comBeneficio, semBeneficio) {
        const ctx = document.getElementById('receitasChart').getContext('2d');
        
        if (this.receitasChart) {
            this.receitasChart.destroy();
        }

        this.receitasChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lojista', 'Cliente', 'SouFacil'],
                datasets: [{
                    label: 'Com Clube de Benefícios',
                    data: [
                        comBeneficio.aReceberLojista,
                        comBeneficio.totalPagarCliente,
                        comBeneficio.valorLiquidoSouFacil
                    ],
                    backgroundColor: '#34c759',
                    borderColor: '#30a14e',
                    borderWidth: 1
                }, {
                    label: 'Sem Clube de Benefícios',
                    data: [
                        semBeneficio.aReceberLojista,
                        semBeneficio.totalPagarCliente,
                        semBeneficio.valorLiquidoSouFacil
                    ],
                    backgroundColor: '#ff9500',
                    borderColor: '#e8890b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    }

    criarGraficoRenda(comBeneficio, semBeneficio) {
        const ctx = document.getElementById('rendaChart').getContext('2d');
        
        if (this.rendaChart) {
            this.rendaChart.destroy();
        }

        this.rendaChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Renda Garantida', 'Renda Variável (Com Benefício)', 'Renda Variável (Sem Benefício)'],
                datasets: [{
                    data: [
                        comBeneficio.totalGarantido,
                        comBeneficio.rendaVariavelTaxa + comBeneficio.rendaVariavelUtilizacao,
                        semBeneficio.totalVariavel
                    ],
                    backgroundColor: [
                        '#34c759',
                        '#007aff',
                        '#ff9500'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': R$ ' + context.parsed.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
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
    new SimuladorSouFacilV4();
});


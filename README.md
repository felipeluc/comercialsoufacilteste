# Clube de Benefícios SouFácil Card

Sistema web interativo para apresentar a nova proposta do Clube de Benefícios SouFácil Card, com simulações comparativas entre o modelo atual e o novo modelo.

## 📋 Sobre o Projeto

Este sistema foi desenvolvido para apresentar uma solução inovadora que resolve os principais problemas do modelo atual do SouFácil Card:

- **Clientes** reclamam das altas taxas de utilização
- **Lojistas** enfrentam baixas vendas devido à resistência dos clientes
- **SouFácil** depende de receitas variáveis sujeitas à inadimplência

## 🎯 Solução Proposta

O **Clube de Benefícios SouFácil Card** oferece:

### Para o Cliente:
- ✅ Redução da taxa de utilização de R$ 14,90 para R$ 10,00 por parcela
- ✅ Participação em sorteios mensais de vale-compras
- ✅ Cashback automático em compras acima de R$ 30,00
- ✅ Percepção de valor nos custos pagos

### Para o Lojista:
- ✅ Cartão com diferencial competitivo
- ✅ Aumento esperado de 15% nas vendas
- ✅ Maior satisfação dos clientes
- ✅ Investimento controlado de R$ 4,99 por parcela

### Para a SouFácil:
- ✅ Nova fonte de receita garantida (R$ 4,99 por parcela)
- ✅ Redução do risco de inadimplência
- ✅ Fluxo de caixa mais previsível
- ✅ Diferenciação no mercado

## 🚀 Funcionalidades

- **Simulação Interativa**: Ajuste valores e veja o impacto em tempo real
- **Comparação Lado a Lado**: Cenário atual vs. novo modelo
- **Análise Detalhada**: Visão completa para Cliente, Lojista e SouFácil
- **Interface Responsiva**: Funciona em desktop e mobile
- **Design Clean**: Interface moderna e profissional

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **TypeScript** - Tipagem estática

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd soufacil-card-system

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
pnpm dev

# Acesse http://localhost:5173
```

### Build para Produção
```bash
# Gere o build otimizado
npm run build
# ou
pnpm build

# Os arquivos estarão na pasta 'dist'
```

## 🌐 Deploy

### GitHub Pages / Netlify
1. Faça o build do projeto: `npm run build`
2. Faça upload da pasta `dist` para o serviço de hospedagem
3. Configure o domínio (opcional)

### Netlify (Recomendado)
1. Conecte seu repositório GitHub ao Netlify
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático a cada push

## 📊 Exemplo de Simulação

**Cenário Padrão:**
- Valor da compra: R$ 300,00
- Parcelas: 4x
- Vendas do lojista: 10/mês

**Resultados:**
- Cliente economiza: R$ 19,60 por compra + benefícios
- Lojista investe: R$ 199,60 para diferenciar seu cartão
- SouFácil ganha: +R$ 199,60 de receita garantida adicional

## 🎨 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   └── ui/             # Componentes shadcn/ui
├── assets/             # Arquivos estáticos
├── App.jsx             # Componente principal
├── App.css             # Estilos globais
└── main.jsx            # Ponto de entrada
```

## 📝 Licença

Este projeto foi desenvolvido para apresentação da proposta do Clube de Benefícios SouFácil Card.

## 🤝 Contribuição

Para sugestões e melhorias, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para revolucionar o mercado de cartões private label**


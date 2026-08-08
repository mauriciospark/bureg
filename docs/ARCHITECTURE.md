# Arquitetura do Sistema

## 🏗️ Design Arquitetural

O Burég adota uma arquitetura **Local-First** com design **Vanilla JS** e **HTML Templates**, priorizando simplicidade, performance, privacidade dos dados e separação completa de responsabilidades. A aplicação funciona inteiramente no lado do cliente (client-side), sem dependência de servidores externos para operação.

### Princípios Arquiteturais

1. **Local-First Priority**: Todos os dados residem no dispositivo do usuário
2. **Zero Dependencies**: Sem frameworks ou bibliotecas externas para máxima performance
3. **Single Page Application (SPA)**: Interface reativa sem recarregamento de página
4. **Template-Based Architecture**: Separação completa entre estrutura HTML e lógica JavaScript
5. **Progressive Enhancement**: Funcionalidade básica garantida, recursos avançados adicionais
6. **Privacy by Design**: Arquitetura construída em torno da privacidade dos dados

## 📊 Estrutura de Camadas

```
┌─────────────────────────────────────────────────────┐
│                   Camada de Apresentação            │
│                   (HTML Templates/CSS/DOM)            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Templates  │  │     CSS      │  │   DOM      │ │
│  │   HTML       │  │   Styling    │  │  Manipulation│ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
├─────────────────────────────────────────────────────┤
│                   Camada de Lógica                   │
│            (JavaScript - script.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Validação   │  │  Cálculos    │  │  Controle  │ │
│  │  de Formulário│ │ Financeiros  │  │  de Estado │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
├─────────────────────────────────────────────────────┤
│                   Camada de Persistência             │
│                 (LocalStorage + JSON Memory)          │
└─────────────────────────────────────────────────────┘
```

### Camada de Apresentação (UI)

**Responsabilidades:**
- Renderização da interface através de HTML semântico e templates
- Estilização via CSS3 com Flexbox e gradientes
- Manipulação do DOM para atualizações reativas usando clonagem de templates
- Feedback visual para ações do usuário
- **Zero HTML strings no JavaScript**
- **Zero estilos inline no HTML**

**Componentes Principais:**
- **Formulário de Cadastro**: Interface para entrada de dados de cargas
- **Lista de Cargas**: Visualização compacta das cargas cadastradas (template-based)
- **Resumo Financeiro**: Painel com totais e indicadores
- **Sistema de Filtros**: Componente para filtragem por tipo de produto
- **Modal de Edição**: Interface para modificação de cargas existentes
- **Sistema de Templates**: Templates HTML reutilizáveis para componentes dinâmicos

### Sistema de Templates HTML

O Burég utiliza uma arquitetura moderna de templates HTML para separar completamente estrutura de lógica:

**Princípios:**
- **Zero HTML no JavaScript**: Todo HTML estático fica em templates
- **Clonagem de Templates**: Uso de `template.content.cloneNode(true)`
- **Manipulação de Dados**: JavaScript manipula apenas dados, não estrutura
- **Templates Centralizados**: Todos os templates no arquivo HTML principal

**Templates Implementados:**

1. **`#rulesTemplate`** - Template para regras de transporte
2. **`#transportItemTemplate`** - Template para itens da lista de transportes
3. **`#messageTemplate`** - Template para mensagens (erro/aviso/sucesso)
4. **`#certificateTemplate`** - Template para comprovantes
5. **`#emptyCertificateTemplate`** - Template para estado vazio

**Exemplo de Implementação:**

```html
<!-- Template no HTML -->
<template id="transportItemTemplate">
    <div class="transport-item-compact">
        <div class="compact-header">
            <div class="compact-title">
                <span class="compact-icon"></span>
                <span class="compact-name"></span>
            </div>
            <div class="compact-date"></div>
        </div>
        <div class="compact-details">
            <div class="compact-detail"><span>📦 Quantidade:</span><span></span></div>
            <!-- ... -->
        </div>
    </div>
</template>
```

```javascript
// JavaScript clona e preenche dados
function renderTransporte(transporte) {
    const template = document.getElementById('transportItemTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.compact-icon').textContent = transporte.icon;
    clone.querySelector('.compact-name').textContent = transporte.nomeProduto;
    clone.querySelector('.compact-date').textContent = new Date(transporte.dataCadastro).toLocaleDateString('pt-BR');
    
    const details = clone.querySelectorAll('.compact-detail span:last-child');
    details[0].textContent = `${transporte.quantidade} un`;
    // ... mais manipulação de dados
    
    return clone;
}
```

### Camada de Lógica (Business Logic)

**Responsabilidades:**
- Validação de formulários e dados de entrada
- Cálculos financeiros em tempo real
- Gerenciamento de estado da aplicação
- Controle de regras específicas por produto
- **Acesso direto ao DOM quando necessário**
- **Zero variáveis DOM intermediárias**

**Módulos Principais:**

#### Product Rules Module
```javascript
const productRules = {
    banana: { name, icon, rules, subtypes },
    farinha: { name, icon, rules },
    farinhaBanana: { name, icon, rules },
    acai: { name, icon, rules },
    cara: { name, icon, rules }
};
```
- Define regras específicas de transporte para cada produto
- Gerencia subtipos (ex: variedades de banana)
- Fornece ícones e metadados para UI

#### State Management Module
```javascript
let transportes = [];
let currentFilter = 'all';
let currentSort = 'date-desc';
let currentSearch = '';
```
- Mantém o estado centralizado da aplicação
- Gerencia lista de transportes e filtros ativos
- Fornece funções para manipulação de estado

#### Validation Module
```javascript
function validateForm(formData) {
    // Valida campos obrigatórios
    // Verifica consistência de dados
    // Retorna erros específicos
}
```
- Validação de campos de formulário
- Verificação de tipos e ranges de valores
- Feedback de erros para o usuário

#### Financial Calculations Module
```javascript
function updateFinancialPreview() {
    // Cálculo de investimento
    // Cálculo de retorno previsto
    // Cálculo de lucro líquido
}
```
- Cálculos em tempo real de valores financeiros
- Atualização de preview durante digitação
- Cálculo de totais e resumos

#### Template Rendering Module
```javascript
function showMessage(type, message) {
    const template = document.getElementById('messageTemplate');
    const clone = template.content.cloneNode(true);
    // Preenche dados e adiciona ao DOM
}
```
- Clonagem de templates HTML
- Preenchimento de dados dinâmicos
- Manipulação eficiente do DOM

### Camada de Persistência (Data Layer)

**Responsabilidades:**
- Armazenamento local de dados
- Recuperação de dados persistentes
- Sincronização entre sessões
- Backup e exportação de dados

### Camada de PWA (Progressive Web App)

**Responsabilidades:**
- Configuração de aplicação instalável
- Gerenciamento de ícones para diferentes plataformas
- Definição de comportamento de app nativo
- Configuração de cores e tema visual

**Configuração PWA:**
- **Manifest JSON**: Configuração em `favicon/manifest.json`
- **Ícones Android**: 6 tamanhos (36x36 até 192x192)
- **Ícones Apple**: 10 tamanhos (57x57 até 180x180)
- **Ícones Windows**: 4 tamanhos (70x70 até 310x310)
- **Favicons**: 3 tamanhos (16x16, 32x32, 96x96)
- **Browser Config**: XML para Windows Tiles

**Propriedades do Manifest:**
```json
{
  "name": "Burég",
  "short_name": "Burég",
  "start_url": "../index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [...] // Ícones configurados com caminhos relativos
}
```

**Implementação:**
```javascript
// Persistência híbrida
function saveToMemory() {
    memoryData.dados.transportes = transportes;
    memoryData.configuracao.precos = priceConfig;
    localStorage.setItem('buregMemory', JSON.stringify(memoryData));
}

// Recuperação
async function loadFromMemory() {
    try {
        const response = await fetch('json/memory.json');
        if (response.ok) {
            memoryData = await response.json();
            // Carrega dados
        }
    } catch (error) {
        loadFromStorage(); // Fallback
    }
}
```

**Estrutura de Memória JSON:**
```json
{
  "meta": {
    "versao": "1.4.4",
    "nome": "Burég",
    "proprietario": "Mauricio Spark",
    "responsavelPersonalizado": "",
    "linhagem": "SPARK"
  },
  "configuracao": {
    "precos": { /* preços configurados */ },
    "regrasProdutos": {}
  },
  "dados": {
    "transportes": [ /* lista de transportes */ ],
    "estatisticas": { /* totais e métricas */ }
  },
  "historico": {
    "operacoes": [],
    "configuracoes": []
  },
  "sistema": {
    "versao": "1.4.4",
    "locale": "pt-BR",
    "moeda": "BRL"
  }
}
```

## 🔄 Fluxo de Dados

### 1. Cadastro de Nova Carga

```
Usuário preenche formulário
    ↓
Validação de campos (validateForm)
    ↓
Cálculo financeiro preliminar
    ↓
Criação do objeto de transporte
    ↓
Adição ao array de transportes
    ↓
Persistência híbrida (saveToMemory + localStorage)
    ↓
Atualização da UI via template clonagem (renderTransportes)
    ↓
Atualização do resumo financeiro (updateSummary)
```

### 2. Cálculo em Tempo Real

```
Usuário digita quantidade/preço
    ↓
Event listener captura input (com debounce)
    ↓
Função updateFinancialPreview()
    ↓
Cálculo: investimento = quantidade × preçoCompra
    ↓
Cálculo: retorno = quantidade × preçoVenda
    ↓
Cálculo: lucro = retorno - investimento
    ↓
Atualização do DOM com resultados (acesso direto)
```

### 3. Filtragem de Cargas

```
Usuário seleciona filtro
    ↓
Atualização de currentFilter
    ↓
Função renderTransportes()
    ↓
Filtragem do array transportes
    ↓
Clonagem de template para cada item filtrado
    ↓
Preenchimento de dados nos templates clonados
    ↓
Renderização apenas dos itens correspondentes
```

### 4. Renderização com Templates

```
Função precisa renderizar elemento
    ↓
Seleção do template apropriado
    ↓
Clonagem: template.content.cloneNode(true)
    ↓
Seleção de elementos no clone
    ↓
Preenchimento de dados (textContent, etc)
    ↓
Adição ao DOM via fragmento
    ↓
Limpinho: zero strings HTML no JavaScript
```

## 🛡️ Escolhas Técnicas e Justificativas

### Arquitetura de Templates HTML

**Justificativa:**
- **Separação Total**: HTML 100% separado de JavaScript
- **Segurança**: Menor risco de XSS com templates estáticos
- **Performance**: Clonagem de templates mais eficiente que geração de strings
- **Manutenibilidade**: Templates centralizados facilitam manutenção
- **Padrão Moderno**: Segue melhores práticas de desenvolvimento web

**Implementação:**
- Uso de elemento `<template>` do HTML5
- Clonagem via `template.content.cloneNode(true)`
- Manipulação apenas de dados, não estrutura
- DocumentFragment para manipulação em massa

### Arquitetura Local-First

**Justificativa:**
- **Privacidade**: Dados sensíveis ficam no dispositivo do usuário
- **Offline-first**: Funciona sem conexão à internet após carregamento inicial
- **Performance**: Sem latência de rede para operações CRUD
- **Custo-zero**: Sem necessidade de infraestrutura de servidores

**Implementação:**
- Uso de LocalStorage API para persistência
- Arquivo JSON memory.json como estrutura de dados
- Carregamento automático de dados na inicialização
- Fallback automático para localStorage em caso de erro

### Vanilla JavaScript (Sem Frameworks)

**Justificativa:**
- **Performance máxima**: Sem overhead de abstrações de framework
- **Bundle size zero**: Arquivos pequenos e rápidos de carregar
- **Simplicidade de manutenção**: Código direto e fácil de entender
- **Longevidade**: Sem dependências que possam tornar-se obsoletas

**Trade-offs:**
- Menos estrutura automática (mitigado por organização consistente do código)
- Manual DOM manipulation (aceitável para o escopo da aplicação)
- **Benefício**: Código mais limpo e eficiente com arquitetura de templates

### Acesso Direto ao DOM

**Justificativa:**
- **Simplicidade**: Menos código sem variáveis intermediárias
- **Performance**: Redução de uso de memória
- **Legibilidade**: Código mais direto e fácil de entender
- **Manutenibilidade**: Menos estado a gerenciar

**Implementação:**
- `document.getElementById()` quando necessário
- Sem variáveis que armazenam elementos DOM
- Acesso direto em vez de cache de elementos
- Clonagem de templates em vez de geração de HTML

### Estrutura de Dados Simples

**Modelo de Dados:**
```javascript
{
    id: timestamp,
    produto: string,
    subtipo: string (opcional),
    quantidade: number,
    precoCompra: number,
    precoVenda: number,
    paradas: number,
    observacoes: string,
    investimento: number,
    retorno: number,
    lucro: number,
    dataCadastro: string,
    nomeProduto: string,
    icon: string
}
```

**Justificativa:**
- **Simplicidade**: Estrutura plana fácil de serializar
- **Flexibilidade**: Permite adicionar campos sem quebrar compatibilidade
- **Performance**: Operações rápidas de array para listas pequenas/médias

### Sistema de Eventos

**Implementação:**
- Event listeners diretos no DOM (addEventListener)
- Event delegation para listas dinâmicas
- Reactive updates para cálculos em tempo real
- Debounce/throttle para performance

**Exemplo:**
```javascript
// Event listener com debounce
document.getElementById('quantidade').addEventListener('input', 
    debounce(updateFinancialPreview, 150)
);

// Event delegation para lista dinâmica
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
        editTransporte(parseInt(this.dataset.id));
    });
});
```

## 📁 Estrutura de Arquivos

```
burég/
├── index.html              # HTML principal com templates (433 linhas)
├── css/
│   └── style.css          # Estilos (1034 linhas)
├── javascript/
│   └── script.js          # Lógica JavaScript (826 linhas)
├── favicon/
│   ├── manifest.json      # Configuração PWA
│   ├── logo.jpg           # Logo da aplicação
│   ├── android-icon-*.png # Ícones Android (6 tamanhos)
│   ├── apple-icon-*.png   # Ícones Apple (10 tamanhos)
│   ├── ms-icon-*.png      # Ícones Windows (4 tamanhos)
│   ├── favicon-*.png      # Favicon variados (3 tamanhos)
│   └── browserconfig.xml  # Configuração Windows
├── json/
│   ├── memory.json        # Estrutura de dados/backup
│   └── editor.html        # Editor JSON para edição manual
├── docs/
│   ├── ARCHITECTURE.md    # Este arquivo
│   ├── CONTRIBUTING.md    # Guia de contribuição
│   ├── CHANGELOG.md       # Histórico de versões
│   └── ABOUT.md           # Sobre o projeto
├── README.md              # Documentação principal
└── LICENSE                # Licença MIT
```

## 🎯 Padrões de Código

### HTML Templates

**✅ Bom:**
```html
<template id="itemTemplate">
    <div class="item">
        <span class="icon"></span>
        <span class="name"></span>
    </div>
</template>
```

**❌ Ruim:**
```javascript
const html = `<div class="item"><span>${icon}</span><span>${name}</span></div>`;
element.innerHTML = html;
```

### JavaScript DOM Access

**✅ Bom:**
```javascript
// Acesso direto quando necessário
document.getElementById('precoCompra').value = compra || '';

// Clonagem de templates
const template = document.getElementById('itemTemplate');
const clone = template.content.cloneNode(true);
clone.querySelector('.name').textContent = data.name;
```

**❌ Ruim:**
```javascript
// Variáveis DOM intermediárias
const form = document.getElementById('transportForm');
const input = document.getElementById('quantidade');
const button = document.getElementById('submitBtn');
```

### Manipulação de DOM

**✅ Bom:**
```javascript
// DocumentFragment para performance
const fragment = document.createDocumentFragment();
items.forEach(item => {
    const clone = template.content.cloneNode(true);
    // Preenche dados
    fragment.appendChild(clone);
});
container.appendChild(fragment);
```

**❌ Ruim:**
```javascript
// Múltiplas operações DOM individuais
items.forEach(item => {
    container.innerHTML += itemHTML; // Re-renderiza toda a lista
});
```

## 🔒 Segurança

### Proteção XSS

- **Templates HTML estáticos**: Não há injeção de HTML dinâmico
- **Sanitização de dados**: Apenas `textContent` para inserção de dados
- **Zero innerHTML com dados**: Evita injeção de código malicioso
- **Validação de inputs**: Validação rigorosa de todos os formulários

### Privacidade de Dados

- **Local-First**: Dados nunca saem do dispositivo
- **Sem tracking**: Zero telemetria ou analytics
- **Sem cookies**: Uso apenas de LocalStorage
- **Cifragem não necessária**: Dados não são transmitidos

## 🚀 Performance

### Otimizações Implementadas

1. **Template Cloning**: Mais eficiente que geração de strings HTML
2. **DocumentFragment**: Operações DOM em massa minimizam reflows
3. **Debounce/Throttle**: Reduz chamadas excessivas em eventos frequentes
4. **Acesso Direto ao DOM**: Reduz uso de memória
5. **LocalStorage Rápido**: Acesso síncrono para operações rápidas
6. **Zero Frameworks**: Sem overhead de abstrações

### Métricas de Performance

- **Tamanho Total**: ~150KB (HTML + CSS + JS)
- **Tempo de Carregamento**: <1s em conexões 3G
- **First Contentful Paint**: <500ms
- **Time to Interactive**: <1s
- **JavaScript Parsing**: <100ms

## 📈 Escalabilidade

### Capacidade Atual

- **Cargas**: Suporta 1000+ cargas sem degradação de performance
- **Produtos**: Fácil adicionar novos tipos via configuração
- **Subtipos**: Sistema flexível para variedades de produtos
- **Armazenamento**: ~5-10MB em LocalStorage (depende do navegador)

### Limitações Conhecidas

- **LocalStorage**: Limitado a ~5-10MB por domínio
- **Browser Compatibility**: Requer navegador moderno (ES6+)
- **Offline**: Funciona após carregamento inicial, mas requer internet para primeiro acesso

## 🔄 Futuras Melhorias Planejadas

### Curto Prazo
- [ ] PWA (Progressive Web App) para uso offline completo
- [ ] IndexedDB para maior capacidade de armazenamento
- [ ] Exportação em múltiplos formatos (PDF, Excel, CSV)
- [ ] Gráficos de desempenho financeiro

### Médio Prazo
- [ ] Sincronização entre dispositivos (opcional)
- [ ] Backup automático em nuvem (opcional, encrypted)
- [ ] Cálculo de rotas e custos de transporte
- [ ] Integração com APIs externas (câmbio, clima)

### Longo Prazo
- [ ] Aplicativo nativo (React Native/Electron)
- [ ] Sistema multi-usuário com controle de acesso
- [ ] Dashboard analítico avançado
- [ ] Sistema de notificações push

---

**Última Atualização**: v1.4.4 (2026-08-08)
**Arquitetura Atual**: Local-First + Vanilla JS + HTML Templates + PWA
**Princípio Principal**: Separação completa entre estrutura, estilo e comportamento

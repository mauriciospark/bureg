# Arquitetura do Sistema

## 🏗️ Design Arquitetural

O Burég adota uma arquitetura **Local-First** com design **Vanilla JS**, priorizando simplicidade, performance e privacidade dos dados. A aplicação funciona inteiramente no lado do cliente (client-side), sem dependência de servidores externos para operação.

### Princípios Arquiteturais

1. **Local-First Priority**: Todos os dados residem no dispositivo do usuário
2. **Zero Dependencies**: Sem frameworks ou bibliotecas externas para máxima performance
3. **Single Page Application (SPA)**: Interface reativa sem recarregamento de página
4. **Progressive Enhancement**: Funcionalidade básica garantida, recursos avançados adicionais
5. **Privacy by Design**: Arquitetura construída em torno da privacidade dos dados

## 📊 Estrutura de Camadas

```
┌─────────────────────────────────────────────────────┐
│                   Camada de Apresentação            │
│                   (HTML/CSS/DOM)                     │
├─────────────────────────────────────────────────────┤
│                   Camada de Lógica                   │
│            (JavaScript - script.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Validação   │  │  Cálculos    │  │  Controle  │ │
│  │  de Formulário│ │ Financeiros  │  │  de Estado │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
├─────────────────────────────────────────────────────┤
│                   Camada de Persistência             │
│                 (LocalStorage API)                   │
└─────────────────────────────────────────────────────┘
```

### Camada de Apresentação (UI)

**Responsabilidades:**
- Renderização da interface através de HTML semântico
- Estilização via CSS3 com Flexbox e gradientes
- Manipulação do DOM para atualizações reativas
- Feedback visual para ações do usuário

**Componentes Principais:**
- **Formulário de Cadastro**: Interface para entrada de dados de cargas
- **Lista de Cargas**: Visualização compacta das cargas cadastradas
- **Resumo Financeiro**: Painel com totais e indicadores
- **Sistema de Filtros**: Componente para filtragem por tipo de produto
- **Modal de Edição**: Interface para modificação de cargas existentes

### Camada de Lógica (Business Logic)

**Responsabilidades:**
- Validação de formulários e dados de entrada
- Cálculos financeiros em tempo real
- Gerenciamento de estado da aplicação
- Controle de regras específicas por produto

**Módulos Principais:**

#### Product Rules Module
```javascript
const productRules = {
    banana: { name, icon, rules, subtypes },
    farinha: { name, icon, rules },
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

### Camada de Persistência (Data Layer)

**Responsabilidades:**
- Armazenamento local de dados
- Recuperação de dados persistentes
- Sincronização entre sessões

**Implementação:**
```javascript
// Persistência
function saveToStorage() {
    localStorage.setItem('transportes', JSON.stringify(transportes));
}

// Recuperação
function loadFromStorage() {
    const storedTransportes = localStorage.getItem('transportes');
    if (storedTransportes) transportes = JSON.parse(storedTransportes);
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
Persistência no LocalStorage (saveToStorage)
    ↓
Atualização da UI (renderTransportList)
    ↓
Atualização do resumo financeiro (updateFinancialSummary)
```

### 2. Cálculo em Tempo Real

```
Usuário digita quantidade/preço
    ↓
Event listener captura input
    ↓
Função updateFinancialPreview()
    ↓
Cálculo: investimento = quantidade × preçoCompra
    ↓
Cálculo: retorno = quantidade × preçoVenda
    ↓
Cálculo: lucro = retorno - investimento
    ↓
Atualização do DOM com resultados
```

### 3. Filtragem de Cargas

```
Usuário seleciona filtro
    ↓
Atualização de currentFilter
    ↓
Função renderTransportList()
    ↓
Filtragem do array transportes
    ↓
Renderização apenas dos itens correspondentes
    ↓
Atualização da UI
```

### 4. Edição de Carga

```
Usuário clica em editar
    ↓
Abertura do modal de edição
    ↓
Preenchimento do formulário com dados existentes
    ↓
Usuário modifica campos
    ↓
Validação dos novos dados
    ↓
Atualização do objeto no array transportes
    ↓
Persistência no LocalStorage
    ↓
Re-renderização da lista
```

## 🛡️ Escolhas Técnicas e Justificativas

### Arquitetura Local-First

**Justificativa:**
- **Privacidade**: Dados sensíveis ficam no dispositivo do usuário
- **Offline-first**: Funciona sem conexão à internet após carregamento inicial
- **Performance**: Sem latência de rede para operações CRUD
- **Custo-zero**: Sem necessidade de infraestrutura de servidores

**Implementação:**
- Uso de LocalStorage API para persistência
- Estrutura de dados serializável em JSON
- Carregamento automático de dados na inicialização

### Vanilla JavaScript (Sem Frameworks)

**Justificativa:**
- **Performance máxima**: Sem overhead de abstrações de framework
- **Bundle size zero**: Arquivos pequenos e rápidos de carregar
- **Simplicidade de manutenção**: Código direto e fácil de entender
- **Longevidade**: Sem dependências que possam tornar-se obsoletas

**Trade-offs:**
- Menos estrutura automática (mitigado por organização consistente do código)
- Manual DOM manipulation (aceitável para o escopo da aplicação)

### Estrutura de Dados Simples

**Modelo de Dados:**
```javascript
{
    id: timestamp,
    produto: string,
    quantidade: number,
    precoCompra: number,
    precoVenda: number,
    paradas: number,
    observacoes: string,
    bananaSubtype: string (opcional),
    timestamp: string
}
```

**Justificativa:**
- **Simplicidade**: Estrutura plana fácil de serializar
- **Flexibilidade**: Permite adicionar campos sem quebrar compatibilidade
- **Performance**: Operações rápidas de array para listas pequenas/médias

### Sistema de Eventos

**Implementação:**
- Event listeners diretos no DOM
- Event delegation para listas dinâmicas
- Reactive updates para cálculos em tempo real

**Justificativa:**
- **Simplicidade**: API nativa do browser
- **Performance**: Sem overhead de sistemas de eventos complexos
- **Previsibilidade**: Fluxo de eventos claro e debugável

## 🔒 Segurança e Privacidade

### Proteção de Dados

1. **Local-only Storage**: Dados nunca deixam o dispositivo do usuário
2. **Sem Telemetria**: Nenhuma coleta de estatísticas de uso
3. **Sem Cookies de Rastreamento**: Ausência de tecnologias de tracking
4. **HTTPS Ready**: Suporte a conexão segura quando hospedado

### Validação de Entrada

- Sanitização de inputs do usuário
- Validação de tipos e ranges
- Proteção contra injeção de código (XSS)
- Tratamento de erros robusto

## 🚀 Performance

### Otimizações Implementadas

1. **Carregamento Inicial**: Arquivos HTML/CSS/JS minificados (futuro)
2. **DOM Updates**: Atualizações seletivas do DOM (não re-renderização completa)
3. **Event Delegation**: Redução de event listeners
4. **LocalStorage Cache**: Dados carregados uma única vez por sessão

### Métricas Alvo

- **Time to Interactive**: < 1 segundo
- **First Contentful Paint**: < 500ms
- **Bundle Size**: < 50KB total (gzip)
- **Memory Usage**: < 10MB para operações típicas

## 🧪 Testabilidade

### Pontos de Extensão

- Funções puras para cálculos financeiros (fáceis de testar)
- Módulos de validação isolados
- Persistência abstraída em funções específicas
- Componentes de UI com responsabilidades claras

### Estrutura para Testes Futuros

```javascript
// Exemplo de função testável
function calculateFinancials(quantidade, precoCompra, precoVenda) {
    const investimento = quantidade * precoCompra;
    const retorno = quantidade * precoVenda;
    const lucro = retorno - investimento;
    return { investimento, retorno, lucro };
}
```

## 📈 Escalabilidade

### Limitações Atuais

- LocalStorage limitado a ~5-10MB (suficiente para o caso de uso)
- Performance degradada com milhares de registros (não é o caso de uso)
- Single-user (sem colaboração multi-usuário)

### Caminhos de Escala

1. **IndexedDB**: Para volumes maiores de dados
2. **Service Workers**: Para cache mais robusto e offline
3. **Web Workers**: Para processamento pesado em background
4. **Backend opcional**: Para sincronização multi-dispositivo (opt-in)

Esta arquitetura foi desenhada para o caso de uso específico do Burég, priorizando simplicidade, privacidade e performance para operações de transporte fluvial na Amazônia.
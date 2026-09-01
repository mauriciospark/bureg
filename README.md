# Burég — (Linhagem SPARK)

Sistema de gerenciamento de transporte fluvial para produtos agrícolas da região amazônica, otimizando o controle de cargas, cálculos financeiros e regras específicas de transporte para cada tipo de produto.

## 🚀 Descrição

O Burég é uma aplicação web Local-First projetada para gerenciar o transporte fluvial de produtos agrícolas, oferecendo controle total sobre cargas, cálculos financeiros em tempo real e regras específicas de transporte para produtos como banana, farinha, açaí e cará. O sistema resolve o problema da falta de organização e controle no transporte fluvial, proporcionando eficiência e confiabilidade para produtores e transportadores da região amazônica.

### Versão Atual

**v1.4.5** (2026-08-10) - Funcionalidades Avançadas e Correções

## 🛠 Stack

### Frontend

- **HTML5** - Estrutura semântica e acessível com Templates HTML
- **CSS3** - Estilização com gradientes, flexbox e design responsivo
- **JavaScript (ES6+)** - Lógica de negócios, manipulação de DOM e persistência de dados

### Arquitetura

- **HTML Templates** - Sistema de templates para separação completa HTML/JavaScript
- **Vanilla JS** - Sem dependências externas para máxima performance e simplicidade
- **Local-First** - Persistência de dados no dispositivo do usuário
- **Template Cloning** - Uso de `template.content.cloneNode(true)` para performance

### Armazenamento

- **LocalStorage** - Persistência de dados local (Local-First)
- **JSON Memory** - Estrutura de dados serializável para backup/exportação

### Ferramentas

- **Zero Dependencies** - Sem frameworks ou bibliotecas externas
- **PWA Ready** - Suporte completo a Progressive Web App com manifest configurado e ícones
- **Editor JSON** - Interface para edição manual da memória do sistema

## ✨ Funcionalidades

### Gerenciamento de Cargas

- **📝 Cadastro de Cargas** - Registro detalhado de produtos agrícolas com quantidade, preços e observações
- **🍌 Tipos de Produtos** - Suporte a banana (com subtipos: pinguelo, filer, ferrão, média), farinha, farinha de banana, açaí e cará
- **📋 Regras de Transporte** - Orientações específicas para cada produto (temperatura, embalagem, cuidados especiais)
- **✏️ Edição e Exclusão** - Modificação e remoção de cargas cadastradas
- **🔍 Filtros Avançados** - Filtragem por tipo de produto, período (hoje, semana, mês, ano), lucro (positivo/negativo) e quantidade
- **🔎 Busca Otimizada** - Busca por nome/subtipo com debounce para melhor performance
- **📊 Ordenação** - Ordenação por data, lucro, quantidade ou nome (ascendente/descendente)

### Financeiro

- **💰 Cálculos Financeiros** - Preview em tempo real de investimento, retorno previsto e lucro líquido
- **📊 Resumo Financeiro** - Painel com totais de investimento, retorno, lucro e quantidade de cargas
- **⚙️ Configuração de Preços** - Definição de preços padrão por produto e subtipo
- **👤 Personalização** - Nome do responsável personalizado para comprovantes
- **🧾 Comprovante de Venda** - Sistema completo com dados do cliente, métodos de pagamento e descontos
- **📈 Dashboard de Estatísticas** - Gráficos de distribuição de produtos e análise de lucro por categoria

### Persistência e Exportação

- **💾 Persistência Local** - Dados salvos automaticamente no navegador (LocalStorage)
- **📤 Exportação JSON** - Exportação de dados em formato JSON para backup completo
- **📥 Importação JSON** - Importação de dados de backup JSON
- **📋 Exportação CSV** - Exportação de dados em formato CSV para Excel/planilhas
- **🧾 Comprovantes** - Geração de comprovantes detalhados em formato A4 para impressão
- **💾 Backup Automático** - Backups diários automáticos com retenção de 7 dias
- **🔄 Gerenciamento de Backups** - Interface para restaurar e excluir backups

### Interface e UX

- **📱 Design Responsivo** - Interface adaptada para todos os tamanhos de tela com layout mobile otimizado
- **🎨 Interface Intuitiva** - Design moderno com gradientes animados e cores para identificação visual
- **⚡ Performance Otimizada** - Sistema com memoização, event delegation e lazy loading de modals
- **🎯 Validações Avançadas** - Validação de formulários com feedback visual detalhado e avisos de margem baixa
- **♿ Acessibilidade** - Suporte completo a leitores de tela, navegação por teclado, alto contraste e movimento reduzido
- **🖨️ Impressão Otimizada** - Estilos específicos para impressão com logo e formatação profissional

## 🏗️ Arquitetura

O Burég utiliza uma arquitetura moderna de **HTML Templates** para separação completa entre estrutura e lógica:

### Princípios Arquiteturais

- **Zero HTML no JavaScript** - Todo HTML estático fica em templates
- **Template Cloning** - Uso de `template.content.cloneNode(true)` para performance
- **Acesso Direto ao DOM** - Sem variáveis DOM intermediárias
- **Local-First** - Dados persistem no dispositivo do usuário
- **Vanilla JS** - Sem dependências externas

### Estrutura de Arquivos

```
burég/
├── index.html              # HTML principal com templates (600+ linhas)
├── css/
│   └── style.css          # Estilos (1900+ linhas)
├── javascript/
│   └── script.js          # Lógica JavaScript (1474 linhas)
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
│   ├── ARCHITECTURE.md    # Documentação arquitetural
│   ├── CONTRIBUTING.md    # Guia de contribuição
│   ├── CHANGELOG.md       # Histórico de versões
│   └── ABOUT.md           # Sobre o projeto
├── README.md              # Este arquivo
└── LICENSE                # Licença MIT
```

### Sistema de Templates

- **`#rulesTemplate`** - Template para regras de transporte
- **`#transportItemTemplate`** - Template para itens da lista de transportes
- **`#messageTemplate`** - Template para mensagens (erro/aviso/sucesso)
- **`#certificateTemplate`** - Template para comprovantes de cargas
- **`#emptyCertificateTemplate`** - Template para estado vazio de comprovantes
- **`#salesReceiptTemplate`** - Template para comprovantes de venda
- **`#emptySalesReceiptTemplate`** - Template para estado vazio de comprovantes de venda
- **`#statsTemplate`** - Template para dashboard de estatísticas
- **`#emptyStatsTemplate`** - Template para estado vazio de estatísticas
- **`#backupTemplate`** - Template para gerenciamento de backups
- **`#emptyBackupTemplate`** - Template para estado vazio de backups

## 🚀 Como Rodar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional, para desenvolvimento)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/mauriciospark/bureg.git
   cd bureg
   ```

2. **Abra o projeto**
   - Opção 1: Abra o arquivo `index.html` diretamente no navegador
   - Opção 2: Use um servidor local para melhor experiência:
     ```bash
      # Com Python 3
      python -m http.server 8000

      # Com Node.js (http-server)
      npx http-server
     ```
   - Acesse `http://localhost:8000` no navegador

3. **Use a aplicação**
   - Cadastre novas cargas no painel esquerdo
   - Acompanhe as cargas carregadas no painel direito
   - Visualize o resumo financeiro em tempo real
   - Configure preços padrão via ⚙️ Configurar Preços
   - Filtre e busque cargas conforme necessário
   - Gere comprovantes de cargas via 📋 Comprovante de Cargas
   - Gere comprovantes de venda via 🧾 Comprovante de Venda
   - Visualize estatísticas via 📊 Estatísticas
   - Gerencie backups via 💾 Gerenciar Backups
   - Exporte dados via 📤 Exportar CSV

### Desenvolvimento

Para modificações no código:

- **HTML**: `index.html` - Estrutura da interface e templates
- **CSS**: `css/style.css` - Estilização e design
- **JavaScript**: `javascript/script.js` - Lógica da aplicação
- **Dados**: `json/memory.json` - Estrutura de dados e configuração

## 📋 Produtos Suportados

### 🍌 Banana (com subtipos)

- **Pinguelo** - Variedade específica com preços configuráveis
- **Filer** - Variedade específica com preços configuráveis
- **Ferrão** - Variedade específica com preços configuráveis
- **Média** - Variedade específica com preços configuráveis

### 🌾 Farinha

- Transporte em saco de fibra plastificado
- Manter em ambiente quente
- Proteger da umidade excessiva

### 🌾 Farinha de Banana

- Transporte em saco de fibra plastificado
- Manter em ambiente seco e ventilado
- Não pode ser comprimido

### 🫐 Açaí

- Transporte em saco de fibra normal
- Manter dentro do gelo durante todo o transporte
- Prioridade no transporte devido à perecibilidade

### 🥕 Cará

- Transporte dentro de sapos
- Manter ventilado durante o transporte
- Proteger de excesso de umidade

## 🎯 Características Técnicas

### Performance

- **Carregamento**: <1s em conexões 3G
- **Bundle Size**: ~250KB total (HTML + CSS + JS)
- **First Contentful Paint**: <500ms
- **Time to Interactive**: <1s
- **Memoização**: Cache de resultados para operações caras
- **Event Delegation**: Single event listener para múltiplos elementos
- **Lazy Loading**: Modals carregados sob demanda

### Segurança

- **Local-First**: Dados nunca saem do dispositivo
- **Zero Tracking**: Sem telemetria ou analytics
- **XSS Protection**: Templates HTML estáticos previnem injeção
- **Input Validation**: Validação rigorosa de todos os formulários
- **Backup Automático**: Backups diários com retenção de 7 dias

### Acessibilidade

- **Skip Links**: Links para pular navegação
- **ARIA Labels**: Rótulos descritivos para elementos interativos
- **Navegação por Teclado**: Suporte completo a tabulação e atalhos
- **Leitores de Tela**: Estrutura semântica compatível
- **Alto Contraste**: Suporte a temas de alto contraste
- **Movimento Reduzido**: Respeita preferências de movimento reduzido
- **Focus States**: Estados de foco visíveis e claros

### Compatibilidade

- **Browsers**: Chrome, Firefox, Edge, Safari (versões modernas)
- **Dispositivos**: Desktop, tablet e mobile
- **Offline**: Funciona após carregamento inicial
- **PWA**: Configurado como Progressive Web App com manifesto e ícones

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Mauricio Spark** - [SparkMauricio](https://github.com/mauriciospark)

## 🙏 Agradecimentos

Desenvolvido como parte da Linhagem SPARK, trazendo soluções tecnológicas para comunidades amazônicas.

## 📚 Documentação Adicional

- [Arquitetura do Sistema](docs/ARCHITECTURE.md) - Detalhes técnicos e arquiteturais
- [Guia de Contribuição](docs/CONTRIBUTING.md) - Como contribuir para o projeto
- [Histórico de Versões](docs/CHANGELOG.md) - Log de mudanças por versão
- [Sobre o Projeto](docs/ABOUT.md) - Informações adicionais sobre o Burég

## 🔮 Roadmap

### Planejado

- [ ] PWA completo para uso offline
- [ ] IndexedDB para maior capacidade de armazenamento
- [ ] Exportação em múltiplos formatos (PDF, Excel, CSV)
- [ ] Gráficos de desempenho financeiro
- [ ] Sincronização entre dispositivos (opcional)

### Futuro

- [ ] Aplicativo nativo (React Native/Electron)
- [ ] Sistema multi-usuário com controle de acesso
- [ ] Dashboard analítico avançado
- [ ] Sistema de notificações push

---

**Versão**: v1.4.5  
**Status**: ✅ Ativo e em desenvolvimento  
**Linhagem**: SPARK  
**Licença**: MIT

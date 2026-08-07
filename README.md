# Burég — (Linhagem SPARK)

Sistema de gerenciamento de transporte fluvial para produtos agrícolas da região amazônica, otimizando o controle de cargas, cálculos financeiros e regras específicas de transporte para cada tipo de produto.

## 🚀 Descrição

O Burég é uma aplicação web Local-First projetada para gerenciar o transporte fluvial de produtos agrícolas, oferecendo controle total sobre cargas, cálculos financeiros em tempo real e regras específicas de transporte para produtos como banana, farinha, açaí e cará. O sistema resolve o problema da falta de organização e controle no transporte fluvial, proporcionando eficiência e confiabilidade para produtores e transportadores da região amazônica.

### Versão Atual
**v1.4.2** (2026-08-07) - Arquitetura de Templates HTML

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
- **PWA Ready** - Suporte a Progressive Web App com manifest e ícones
- **Editor JSON** - Interface para edição manual da memória do sistema

## ✨ Funcionalidades

### Gerenciamento de Cargas
- **📝 Cadastro de Cargas** - Registro detalhado de produtos agrícolas com quantidade, preços e observações
- **🍌 Tipos de Produtos** - Suporte a banana (com subtipos: pinguelo, filer, ferrão, média), farinha, farinha de banana, açaí e cará
- **📋 Regras de Transporte** - Orientações específicas para cada produto (temperatura, embalagem, cuidados especiais)
- **✏️ Edição e Exclusão** - Modificação e remoção de cargas cadastradas
- **🔍 Filtros e Busca** - Filtragem por tipo de produto e busca por nome/subtipo
- **📊 Ordenação** - Ordenação por data, lucro ou nome (ascendente/descendente)

### Financeiro
- **💰 Cálculos Financeiros** - Preview em tempo real de investimento, retorno previsto e lucro líquido
- **📊 Resumo Financeiro** - Painel com totais de investimento, retorno, lucro e quantidade de cargas
- **⚙️ Configuração de Preços** - Definição de preços padrão por produto e subtipo
- **👤 Personalização** - Nome do responsável personalizado para comprovantes

### Persistência e Exportação
- **💾 Persistência Local** - Dados salvos automaticamente no navegador (LocalStorage)
- **📤 Exportação** - Exportação de dados em formato JSON para backup
- **📥 Importação** - Importação de dados de backup JSON
- **📋 Comprovantes** - Geração de comprovantes detalhados em formato A4 para impressão

### Interface e UX
- **📱 Design Responsivo** - Interface adaptada para diferentes tamanhos de tela
- **🎨 Interface Intuitiva** - Design moderno com gradientes e cores que facilitam a identificação visual
- **⚡ Performance** - Sistema otimizado com arquitetura de templates e acesso direto ao DOM
- **🎯 Validações** - Validação de formulários com feedback visual de erros e avisos
- **♿ Acessibilidade** - Suporte a navegação por teclado e leitores de tela

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
├── index.html              # HTML principal com templates (413 linhas)
├── css/
│   └── style.css          # Estilos (1034 linhas)
├── javascript/
│   └── script.js          # Lógica JavaScript (826 linhas)
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
- **`#certificateTemplate`** - Template para comprovantes
- **`#emptyCertificateTemplate`** - Template para estado vazio

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
   - Gere comprovantes via 📋 Comprovante

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
- **Bundle Size**: ~150KB total (HTML + CSS + JS)
- **First Contentful Paint**: <500ms
- **Time to Interactive**: <1s

### Segurança
- **Local-First**: Dados nunca saem do dispositivo
- **Zero Tracking**: Sem telemetria ou analytics
- **XSS Protection**: Templates HTML estáticos previnem injeção
- **Input Validation**: Validação rigorosa de todos os formulários

### Compatibilidade
- **Browsers**: Chrome, Firefox, Edge, Safari (versões modernas)
- **Dispositivos**: Desktop, tablet e mobile
- **Offline**: Funciona após carregamento inicial

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

**Versão**: v1.4.2  
**Status**: ✅ Ativo e em desenvolvimento  
**Linhagem**: SPARK  
**Licença**: MIT

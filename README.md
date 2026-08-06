# Burég — (Linhagem SPARK)

Sistema de gerenciamento de transporte fluvial para produtos agrícolas da região amazônica, otimizando o controle de cargas, cálculos financeiros e regras específicas de transporte para cada tipo de produto.

## 🚀 Descrição

O Burég é uma aplicação web Local-First projetada para gerenciar o transporte fluvial de produtos agrícolas, oferecendo controle total sobre cargas, cálculos financeiros em tempo real e regras específicas de transporte para produtos como banana, farinha, açaí e cará. O sistema resolve o problema da falta de organização e controle no transporte fluvial, proporcionando eficiência e confiabilidade para produtores e transportadores da região amazônica.

## 🛠 Stack

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização com gradientes, flexbox e design responsivo
- **JavaScript (ES6+)** - Lógica de negócios, manipulação de DOM e persistência de dados

### Armazenamento
- **LocalStorage** - Persistência de dados local (Local-First)

### Ferramentas
- **Vanilla JS** - Sem dependências externas para máxima performance e simplicidade
- **PWA Ready** - Suporte a Progressive Web App com manifest e ícones

## ✨ Funcionalidades

- **📝 Cadastro de Cargas** - Registro detalhado de produtos agrícolas com quantidade, preços e observações
- **🍌 Tipos de Produtos** - Suporte a banana (com subtipos: pinguelo, filer, ferrão, média), farinha, açaí e cará
- **📋 Regras de Transporte** - Orientações específicas para cada produto (temperatura, embalagem, cuidados especiais)
- **💰 Cálculos Financeiros** - Preview em tempo real de investimento, retorno previsto e lucro líquido
- **📊 Resumo Financeiro** - Painel com totais de investimento, retorno, lucro e quantidade de cargas
- **🔍 Filtros** - Filtragem de cargas por tipo de produto para fácil visualização
- **✏️ Edição e Exclusão** - Modificação e remoção de cargas cadastradas
- **💾 Persistência Local** - Dados salvos automaticamente no navegador (LocalStorage)
- **📱 Design Responsivo** - Interface adaptada para diferentes tamanhos de tela
- **🎨 Interface Intuitiva** - Design moderno com gradientes e cores que facilitam a identificação visual

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
   - Filtre por tipo de produto conforme necessário

### Desenvolvimento

Para modificações no código:
- **HTML**: `index.html` - Estrutura da interface
- **CSS**: `css/style.css` - Estilização e design
- **JavaScript**: `javascript/script.js` - Lógica da aplicação

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Mauricio Spark** - [SparkMauricio](https://github.com/mauriciospark)

## 🙏 Agradecimentos

Desenvolvido como parte da Linhagem SPARK, trazendo soluções tecnológicas para comunidades amazônicas.
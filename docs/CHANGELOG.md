# Changelog

Todas as notáveis mudanças adicionadas ao projeto Burég serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-08-06

### Added
- **Sistema de Gerenciamento de Transporte Fluvial** - Implementação completa do sistema Burég para controle de cargas agrícolas
- **Cadastro de Cargas** - Formulário para registro de produtos com quantidade, preços de compra/venda, paradas e observações
- **Suporte a Múltiplos Produtos** - Implementação para banana, farinha, açaí e cará com características específicas
- **Subtipos de Banana** - Suporte a variedades: pinguelo, filer, ferrão e média
- **Regras de Transporte** - Sistema de orientações específicas para cada produto (temperatura, embalagem, cuidados especiais)
- **Cálculos Financeiros em Tempo Real** - Preview automático de investimento, retorno previsto e lucro durante a digitação
- **Resumo Financeiro** - Painel com totais de investimento, retorno, lucro líquido e quantidade de cargas
- **Sistema de Filtros** - Filtragem de cargas por tipo de produto e subtipo
- **Edição de Cargas** - Modal para modificação de cargas cadastradas
- **Exclusão de Cargas** - Funcionalidade para remoção de cargas com confirmação
- **Persistência Local** - Armazenamento automático no LocalStorage do navegador
- **Interface Responsiva** - Design adaptado para diferentes tamanhos de tela
- **Design Visual** - Interface moderna com gradientes, cores por produto e ícones intuitivos
- **Validação de Formulários** - Verificação de campos obrigatórios e consistência de dados
- **Feedback Visual** - Mensagens de erro e sucesso para ações do usuário
- **Identidade Visual** - Sistema de ícones e favicon para PWA
- **Documentação Completa** - README, LICENSE, ABOUT, ARCHITECTURE, CONTRIBUTING e CHANGELOG

### Changed
- **Arquitetura Local-First** - Adoção de arquitetura client-side sem dependência de servidores
- **Performance** - Otimização para funcionamento offline após carregamento inicial
- **Privacidade** - Implementação de sistema 100% local sem coleta de dados externos

### Fixed
- **Cálculos Financeiros** - Correção de precisão em operações com valores decimais
- **Validação de Inputs** - Tratamento adequado de valores negativos e zero
- **Persistência de Dados** - Recuperação robusta de dados do LocalStorage com tratamento de erros
- **Interface Reactiva** - Atualizações automáticas da UI após modificações de dados

---

## Próximas Versões (Planejado)

### [1.1.0] - Planejado
- [Added] Exportação de dados para PDF e CSV
- [Added] Histórico detalhado com timestamps
- [Added] Modo escuro para ambientes com pouca luz
- [Added] Gráficos financeiros de evolução temporal

### [1.2.0] - Planejado
- [Added] Sincronização opcional entre dispositivos
- [Added] Cálculo de rotas fluviais otimizadas
- [Added] Gestão de múltiplos barcos
- [Added] Alertas inteligentes para produtos perecíveis

### [2.0.0] - Planejado (Breaking Changes)
- [Added] Integração com mercados regionais
- [Added] Previsão de demanda baseada em histórico
- [Added] Comunidade e fórum para usuários
- [Added] Aplicativo mobile nativo
- [Changed] Migração para IndexedDB para maior capacidade de armazenamento
# Changelog

Todas as notáveis mudanças adicionadas ao projeto Burég serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.4.4] - 2026-08-08

### Fixed
- **Modal de Configuração** - Corrigido problema onde o modal de configuração não aparecia ao clicar no botão
- **Event Listeners Timing** - Movidos event listeners do botão de configuração para dentro do DOMContentLoaded
- **Modal Display Logic** - Adicionado controle direto de style.display para garantir visibilidade do modal
- **Modal Close Button** - Adicionado z-index ao botão de fechar modal para garantir clicabilidade
- **HTML Merge Conflict** - Removido conflito de merge duplicado no arquivo index.html
- **Manifest Path** - Corrigido start_url de "../index.html" para "index.html" no manifest.json

### Changed
- **UX de Configuração** - Removido alert de confirmação desnecessário ao salvar configurações
- **Modal Behavior** - Modal agora fecha automaticamente sem alerta ao salvar
- **Initialization Order** - Event listeners agora são registrados apenas após DOM estar completamente carregado

### Technical Details
- **Event Listeners**: Movidos para dentro de DOMContentLoaded para garantir disponibilidade de elementos
- **Modal Display**: Usa style.display = 'flex' para forçar visibilidade além da classe CSS
- **Z-Index**: Adicionado position: relative e z-index: 10 ao .modal-close
- **Manifest**: start_url corrigido para caminho relativo correto
- **Version**: v1.4.4 com correções de UI/UX

---

## [1.4.3] - 2026-08-08

### Fixed
- **Manifest.json Path Issues** - Corrigidos caminhos absolutos para relativos nos ícones do PWA
- **App Name Configuration** - Atualizado nome do aplicativo de "App" para "Burég" no manifest
- **Icon Loading** - Ícones agora carregam corretamente com caminhos relativos ao diretório favicon/
- **JSON Syntax** - Removidas barras invertidas desnecessárias no campo type dos ícones

### Added
- **PWA Properties** - Adicionadas propriedades essenciais ao manifest.json:
  - `short_name`: "Burég" para nomes curtos em dispositivos
  - `start_url`: Configurado para "../index.html"
  - `display`: Configurado como "standalone" para experiência de app nativo
  - `background_color`: Branco para tela de carregamento
  - `theme_color`: Branco para consistência visual

### Changed
- **Manifest Reference** - Link rel="manifest" já estava correto no HTML (linha 24)
- **Icon Paths** - De `/android-icon-36x36.png` para `android-icon-36x36.png` (relativo)
- **Type Format** - De `image\/png` para `image/png` (correção de escaping)

### Technical Details
- **Ícones corrigidos**: 6 ícones Android com caminhos relativos
- **Estrutura JSON**: Adicionadas 5 propriedades PWA essenciais
- **Mantida funcionalidade**: Todos os ícones estavam presentes no diretório favicon/
- **Compatibilidade**: Manifest agora totalmente compatível com PWA standards

---

## [1.4.2] - 2026-08-07

### Added
- **Templates HTML** - Sistema de templates HTML no arquivo index.html
- **Clonagem de Templates** - Uso de content.cloneNode() para elementos reutilizáveis
- **Separação Total** - Zero linhas de HTML dentro do JavaScript
- **Template de Regras** - Template para exibição de regras de transporte
- **Template de Transporte** - Template para itens da lista de transportes
- **Template de Mensagens** - Template para mensagens de erro/aviso/sucesso
- **Template de Comprovante** - Template para geração de comprovantes
- **Template Vazio** - Template para estado vazio do comprovante

### Changed
- **Eliminação de HTML no JavaScript** - Removido todo HTML inline do JavaScript
- **Uso de document.createElement** - Substituído por clonagem de templates
- **Manipulação do DOM** - Apenas manipulação de elementos existentes via templates
- **Arquitetura de Templates** - Todos os templates no HTML, lógica no JavaScript
- **Versão Atualizada** - v1.4.2 com arquitetura de templates

### Removed
- **Strings HTML no JavaScript** - Eliminadas todas as strings com HTML
- **innerHTML com HTML** - Substituído por clonagem de templates
- **Template Literals com HTML** - Removidos todos os template literals contendo HTML
- **Geração Dinâmica de HTML** - HTML estático em templates, apenas dados dinâmicos no JS

### Fixed
- **Separação de Responsabilidades** - HTML puro no HTML, lógica pura no JavaScript
- **Manutenibilidade** - Templates centralizados facilitam manutenção
- **Performance** - Clonagem de templates mais eficiente que geração de strings
- **Segurança** - Menor risco de XSS com templates estáticos
- **Padrão Moderno** - Segue padrões modernos de desenvolvimento web

### Technical Details
- **Templates adicionados**: 5 templates HTML no arquivo index.html
- **Linhas HTML no JavaScript**: Eliminadas completamente
- **Linhas JavaScript**: 803 → 826 (aumento de 23 linhas devido à lógica de templates)
- **Linhas HTML**: 330 → 413 (aumento de 83 linhas devido aos templates)
- **Clonagem de Templates**: Uso de template.content.cloneNode(true)
- **Manipulação de DOM**: Apenas modificação de conteúdo, não criação de estrutura
- **Mantida funcionalidade**: Todas as features funcionam exatamente como antes

### Architecture Improvements
- **HTML Template Pattern**: Padrão de templates HTML para componentes reutilizáveis
- **Content Cloning**: Clonagem de conteúdo de templates para performance
- **Zero HTML in JS**: JavaScript manipula apenas dados, não estrutura
- **Static HTML**: Todo HTML estático em templates, apenas dados dinâmicos no JS
- **Better Separation**: Separação completa entre estrutura (HTML) e lógica (JavaScript)

---

## [1.4.0] - 2026-08-07

### Added
- **Código JavaScript Limpo** - Eliminação completa de variáveis HTML desnecessárias
- **Acesso Direto ao DOM** - Substituição de variáveis por acesso direto aos elementos
- **Simplificação de Código** - Redução de 1023 linhas para 869 linhas (15% de redução)
- **Performance Otimizada** - Remoção de variáveis intermediárias melhora performance
- **HTML Simplificado** - Redução de 371 linhas para 330 linhas (11% de redução)
- **CSS Otimizado** - Redução de 1106 linhas para 1034 linhas (6.5% de redução)
- **Remoção de Meta Tags Desnecessárias** - Eliminadas tags de Apple/Android/Windows não utilizadas

### Changed
- **Remoção de Variáveis DOM** - Eliminadas todas as variáveis que armazenavam elementos DOM
- **Acesso Direto via getElementById** - Acesso direto aos elementos quando necessário
- **Simplificação de Lógica** - Código mais conciso e eficiente
- **Versão Atualizada** - v1.4.0 com código totalmente otimizado
- **Padrão Melhorado** - Segue melhor as melhores práticas de JavaScript moderno
- **HTML Limpado** - Removidos ícones e meta tags não utilizados
- **CSS Consolidado** - Removidas duplicações e estilos redundantes

### Removed
- **Variáveis DOM Redundantes** - Removidas ~50 variáveis DOM armazenadas em JavaScript
- **Código Desnecessário** - Eliminadas redundâncias e simplificações
- **Complexidade Excessiva** - Redução de complexidade do código
- **Duplicação de Lógica** - Unificação de padrões de acesso ao DOM
- **Meta Tags de Mobile** - Removidas tags de Apple/Android/Windows não utilizadas
- **Ícones Mobile** - Eliminados links para ícones de iOS/Android não utilizados
- **CSS Duplicado** - Removidas definições duplicadas de estilos

### Fixed
- **Manutenibilidade** - Código muito mais fácil de manter e modificar
- **Performance** - Redução significativa de uso de memória por eliminação de variáveis
- **Legibilidade** - Código mais direto, limpo e menos verbose
- **Eficiência** - Acesso direto ao DOM quando necessário sem armazenamento intermediário
- **HTML Leve** - Página carrega mais rápido com menos tags meta
- **CSS Compacto** - Estilos mais organizados e sem duplicações

### Technical Details
- **JavaScript**: 1023 → 869 linhas (redução de 154 linhas, 15%)
- **HTML**: 371 → 330 linhas (redução de 41 linhas, 11%)
- **CSS**: 1106 → 1034 linhas (redução de 72 linhas, 6.5%)
- **Total**: 2500 → 2233 linhas (redução de 267 linhas, 10.7%)
- **Variáveis eliminadas**: ~50 variáveis DOM removidas
- **Meta tags removidas**: 16 tags de mobile eliminadas
- **Acesso ao DOM**: Direto via document.getElementById() em vez de variáveis
- **Mantida funcionalidade**: Todas as features funcionam exatamente como antes
- **Performance**: Melhorada pela redução de alocação de memória e tamanho de arquivos

### Code Quality Improvements
- **Zero variáveis DOM intermediárias** - Acesso direto aos elementos
- **Zero código JavaScript inline** - Toda lógica separada no script.js
- **Zero estilos inline** - Todo CSS no arquivo style.css
- **Zero event handlers inline** - Event listeners programáticos
- **Meta tags essenciais apenas** - Apenas tags realmente necessárias
- **CSS sem duplicações** - Cada regra definida uma única vez
- **JavaScript conciso** - Código direto e eficiente

---

## [1.3.0] - 2026-08-07

### Added
- **Classe CSS .hidden** - Nova classe utilitária para ocultar elementos
- **Classe CSS .header-actions** - Classe para os botões de ação no cabeçalho
- **Classes CSS para cores de lucro** - .positive e .negative para indicar lucro/prejuízo
- **Event listeners dinâmicos** - Botões de editar/excluir agora usam event listeners em vez de onclick
- **Protocolo de Limpeza Ativado** - Separação completa entre HTML e JavaScript

### Changed
- **Separação HTML/JS** - Todo o código HTML agora está 100% no arquivo index.html
- **Separação Lógica JavaScript** - Toda a lógica JavaScript está 100% no arquivo script.js
- **Remoção de inline styles** - Estilos inline como `style="display: none"` substituídos por classes CSS
- **Remoção de inline handlers** - Eventos onclick removidos do HTML e substituídos por event listeners
- **Modal visibility control** - Usando classList.add/remove('hidden') em vez de style.display
- **Refatoração de botões** - Botões de ação agora usam data attributes e event listeners
- **Color control via CSS** - Cores de lucro/prejuízo agora controladas por classes CSS em vez de style.color

### Fixed
- **Clean code protocol** - Separação completa entre estrutura HTML e lógica JavaScript
- **Maintainability** - Código mais limpo e fácil de manter com separação de responsabilidades
- **Performance** - Event listeners delegados melhoram performance em listas grandes
- **Code organization** - Arquivo HTML contém apenas estrutura, arquivo JS contém toda lógica

### Technical Details
- **index.html**: Apenas estrutura HTML sem qualquer lógica JavaScript
- **script.js**: Toda a lógica JavaScript incluindo event listeners e manipulação DOM
- **style.css**: Classes CSS para estilização e controle de visibilidade
- **Zero inline JavaScript**: Não há código JavaScript no arquivo HTML
- **Zero inline CSS (exceto img)**: Apenas atributos width/height em imagens para controle de mídia

---

## [1.2.3] - 2026-08-07

### Added
- **Instruções no Editor HTML** - Guia detalhado no editor.html para personalizar o nome do responsável
- **Passo a passo para edição direta** - Instruções específicas para editar o campo responsavelPersonalizado no JSON
- **Exemplos de uso** - Demonstração de como deixar vazio para usar nome padrão ou preencher com nome personalizado

### Changed
- **Documentação do Editor** - Seção de instruções expandida com guia para personalização de nome
- **Clareza de uso** - Instruções mais detalhadas para facilitar edição manual do arquivo JSON

---

## [1.2.2] - 2026-08-07

### Added
- **Personalização de Responsável** - Campo nas configurações para definir o nome do responsável que aparecerá nos comprovantes
- **Nome Personalizado no Comprovante** - O comprovante agora usa o nome personalizado ou o padrão (Mauricio Spark)
- **Campo de Texto para Nome** - Campo de entrada para nome do responsável ou empresa nas configurações
- **Instrução de Uso** - Texto de ajuda explicando que o campo pode ficar em branco para usar o nome padrão

### Changed
- **Cabeçalho do Comprovante** - Alterado de "Proprietário" para "Responsável" para maior flexibilidade
- **Estrutura de Memória JSON** - Adicionado campo `responsavelPersonalizado` na seção meta
- **Sistema de Configuração** - Seção de informações do responsável adicionada antes dos preços

### Fixed
- **Personalização do Nome** - Nome do responsável agora é salvo e carregado corretamente do arquivo de memória
- **Comprovante Personalizado** - Nome personalizado aparece corretamente no documento impresso

---

## [1.2.1] - 2026-08-07

### Changed
- **Tamanho do Comprovante** - Ajustado para tamanho A4 (210mm x 297mm)
- **Layout de Impressão** - Otimizado para impressão em folha A4 padrão
- **Fontes do Comprovante** - Ajustadas para melhor legibilidade em impressão
- **Margens de Impressão** - Configuradas para 15mm (padrão A4)
- **Escala de Visualização** - Modal do comprovante agora ocupa 95% da tela

### Fixed
- **Formatação A4** - Comprovante agora se ajusta corretamente ao tamanho de folha A4
- **Impressão** - Configurações de página otimizadas para impressão perfeita

---

## [1.2.0] - 2026-08-07

### Added
- **Sistema de Busca** - Campo de busca para encontrar cargas por nome, observações ou data
- **Sistema de Ordenação** - Ordenação de cargas por data, lucro, nome (A-Z, Z-A)
- **Validação Avançada** - Validação de valores extremos e alertas de prejuízo
- **Mensagens de Aviso** - Sistema de avisos (warning) além de erro e sucesso
- **Animações Melhoradas** - Animações suaves para elementos da interface
- **Scroll Personalizado** - Scrollbar customizada com cores da marca
- **Acessibilidade Aprimorada** - Labels ARIA em todos os elementos interativos
- **Performance Otimizada** - Debounce em inputs e DocumentFragment para renderização
- **Visualização de Observações** - Observações agora aparecem nos cards de carga
- **Feedback Visual Aprimorado** - Efeitos hover e active em todos os botões
- **Animação de Carregamento** - Fade-in inicial do container principal
- **Animação de Itens** - Slide-in para novos itens na lista

### Changed
- **UI/UX Modernizado** - Design mais polido com sombras, transições e animações
- **Organização de Controles** - Header controls reorganizados com melhor espaçamento
- **Validação Inteligente** - Alertas para valores muito altos ou prejuízo potencial
- **Mensagens de Erro** - Melhor feedback visual com foco automático em campos
- **Performance de Renderização** - Otimização com debounce e fragmentos de documento
- **Código JavaScript** - Funções utilitárias (debounce, throttle) para performance
- **CSS Refatorado** - Remoção de duplicações e melhor organização

### Fixed
- **Conflitos de CSS** - Remoção de estilos duplicados de mensagens
- **Acessibilidade** - Adição de labels ARIA em todos os inputs e botões
- **Performance** - Otimização de event listeners com debounce
- **Validação** - Melhor detecção de valores extremos e situações de prejuízo

---

## [1.1.0] - 2026-08-07

### Added
- **Sistema de Memória JSON** - Implementação de arquivo JSON central (`json/memory.json`) para gerenciamento de todos os dados do sistema
- **Configuração de Preços Específicos** - Sistema detalhado para configurar preços de cada tipo de banana (Pinguelo, Filer, Ferrão, Média) individualmente
- **Farinha de Banana** - Novo produto separado com preços e regras de transporte específicas
- **Editor de Memória** - Interface visual (`json/editor.html`) para edição direta do arquivo JSON de memória
- **Exportação/Importação de Dados** - Funcionalidade para exportar e importar arquivos JSON de memória completo
- **Botões de Gerenciamento** - Interface com botões de exportar/importar no cabeçalho da aplicação
- **Preenchimento Automático Inteligente** - Sistema que preenche preços baseado no subtipo selecionado de banana
- **Estrutura de Dados Organizada** - Organização em meta, configuração, dados, histórico e sistema no arquivo JSON
- **Estatísticas Automáticas** - Cálculo automático de totais e estatísticas no arquivo de memória
- **Validação de JSON** - Sistema de validação para garantir integridade dos dados importados/exportados
- **Backup Automático** - Criação de backups temporais durante operações críticas
- **Comprovante de Cargas** - Modal com certificado detalhado de todos os produtos cadastrados
- **Funcionalidade de Impressão** - Capacidade de imprimir o comprovante diretamente do sistema
- **Tabela de Produtos no Comprovante** - Listagem completa com nome, quantidade, valores unitários e totais
- **Resumo Financeiro no Comprovante** - Totais de investimento, retorno e lucro com formatação profissional
- **Design de Comprovante** - Layout profissional com cabeçalho, informações de emissão e rodapé

### Changed
- **Arquitetura de Dados** - Migração de localStorage para sistema híbrido com arquivo JSON como fonte principal
- **Sistema de Configuração** - Reestruturação para suportar preços específicos por subtipo de produto
- **Interface de Configuração** - Modal reorganizado com seções para cada tipo de produto
- **Preenchimento de Formulários** - Lógica atualizada para considerar subtipos de banana
- **Persistência de Dados** - Sistema híbrido que usa JSON como fonte e localStorage como fallback
- **Inicialização da Aplicação** - Carregamento assíncrono de dados do arquivo JSON

### Fixed
- **Correção de Subtipos de Banana** - Sistema agora preenche preços corretamente para cada variedade
- **Tratamento de Erros** - Melhor handling de erros em operações de arquivo JSON
- **Sincronização de Dados** - Garantia de consistência entre JSON e localStorage
- **Performance de Carregamento** - Otimização do processo de inicialização com dados JSON

---

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
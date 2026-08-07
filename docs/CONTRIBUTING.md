# Contribuindo para o Burég

Obrigado pelo interesse em contribuir com o projeto Burég! Este guia estabelece as boas práticas e padrões para garantir que a qualidade e a consistência do projeto sejam mantidas.

## 📋 Pré-requisitos

- Conhecimento básico de HTML5, CSS3 e JavaScript (ES6+)
- Compreensão da filosofia Local-First e privacidade de dados
- Familiaridade com o contexto de transporte fluvial amazônico (desejável)
- Ambiente de desenvolvimento com editor de código e navegador moderno
- Conhecimento de HTML Templates e clonagem de DOM (recomendado)

## 🤝 Como Contribuir

### 1. Escolha uma Issue

Antes de começar, verifique as [issues abertas](https://github.com/mauriciospark/bureg/issues) para encontrar tarefas que precisam de atenção. Se tiver uma nova ideia, crie uma issue descrevendo:

- **Problema**: O que precisa ser resolvido
- **Solução proposta**: Como você pretende resolver
- **Impacto**: Quem será beneficiado com essa mudança

### 2. Faça um Fork

1. Faça um fork do repositório
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/SEU_USUARIO/bureg.git
   cd bureg
   ```

### 3. Crie uma Branch

Siga o padrão de nomenclatura de branches:

```
feature/nome-da-feature
bugfix/descricao-do-bug
hotfix/correcao-urgente
docs/atualizacao-documentacao
refactor/melhoria-codigo
```

**Exemplos:**
- `feature/exportacao-pdf`
- `bugfix/calculo-lucro-negativo`
- `docs/atualizacao-readme`

### 4. Desenvolva e Teste

- Faça suas modificações nos arquivos apropriados
- Teste manualmente a funcionalidade em diferentes navegadores
- Verifique se não há regressões em funcionalidades existentes
- Mantenha o código consistente com o estilo existente

### 5. Commit suas Mudanças

Siga o padrão de mensagens de commit:

```
tipo: descrição curta

detalhes opcionais sobre a mudança
```

**Tipos permitidos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alteração em documentação
- `style`: Formatação, ponto e vírgula, etc (sem mudança de código)
- `refactor`: Refatoração de código
- `test`: Adição de testes
- `chore`: Atualização de build, configs, etc

**Exemplos:**
```
feat: adicionar funcionalidade de exportação CSV

Implementa exportação de dados para formato CSV
com opção de selecionar período específico.
```

```
fix: corrigir cálculo de lucro com valores negativos

O cálculo não estava tratando corretamente casos
onde o preço de venda era menor que o preço de compra.
```

### 6. Push e Pull Request

1. Push da sua branch:
   ```bash
   git push origin feature/nome-da-feature
   ```

2. Abra um Pull Request no repositório original
3. Preencha o template de PR descrevendo:
   - **O que foi alterado**: Resumo das mudanças
   - **Por que foi alterado**: Motivação da mudança
   - **Como testar**: Instruções para validação
   - **Screenshots**: Se aplicável (mudanças visuais)

## 📐 Padrões de Código

### HTML

- Use HTML5 semântico
- Mantenha indentação consistente (4 espaços)
- Use aspas duplas para atributos
- Inclua comentários para seções complexas
- Mantenha estrutura hierárquica clara
- **Use `<template>` para elementos reutilizáveis**
- **Zero código JavaScript inline no HTML**
- **Zero estilos inline no HTML**

```html
<!-- ✅ Bom -->
<section class="form-section">
    <h2>📝 Nova Carga</h2>
    <form id="transportForm" novalidate>
        <!-- campos do formulário -->
    </form>
</section>

<!-- Template para elementos reutilizáveis -->
<template id="transportItemTemplate">
    <div class="transport-item-compact">
        <div class="compact-header">
            <span class="compact-icon"></span>
            <span class="compact-name"></span>
        </div>
    </div>
</template>

<!-- ❌ Ruim -->
<div class="form-section">
    <div class="title">Nova Carga</div>
    <div id="transportForm">
        <!-- campos do formulário -->
    </div>
</div>

<!-- ❌ Ruim - HTML inline no JavaScript -->
const html = `<div class="item"><span>${data}</span></div>`;
```

### CSS

- Use BEM (Block Element Modifier) ou naming consistente
- Agrupe regras relacionadas
- Use unidades relativas quando apropriado
- Mantenha ordem lógica de propriedades
- Comente seções complexas
- **Elimine duplicações de CSS**
- **Use classes utilitárias quando apropriado**

```css
/* ✅ Bom */
.form-section {
    background: #f7fafc;
    border-radius: 8px;
    padding: 15px;
}

.form-section__title {
    color: #2d3748;
    font-size: 1.2em;
}

.form-section--highlight {
    border: 2px solid #4299e1;
}

/* Classes utilitárias */
.hidden {
    display: none !important;
}

.positive {
    color: #28a745;
}

.negative {
    color: #dc3545;
}

/* ❌ Ruim */
.fs {
    background: #f7fafc;
    border-radius: 8px;
    padding: 15px;
}
```

### JavaScript

- Use `const` e `let`, evite `var`
- Use arrow functions para callbacks
- Mantenha funções pequenas e focadas
- Use nomes descritivos em português ou inglês (consistente)
- Adicione JSDoc para funções complexas
- **Zero variáveis DOM intermediárias** - use acesso direto quando necessário
- **Zero strings HTML no JavaScript** - use templates HTML
- **Use `template.content.cloneNode(true)` para elementos reutilizáveis**

```javascript
// ✅ Bom - Uso de templates HTML
function renderTransporte(transporte) {
    const template = document.getElementById('transportItemTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.compact-icon').textContent = transporte.icon;
    clone.querySelector('.compact-name').textContent = transporte.nomeProduto;
    
    return clone;
}

// ✅ Bom - Acesso direto ao DOM quando necessário
function updatePreco(produto, subtype) {
    const { compra, venda } = getPrecoByProduct(produto, subtype);
    document.getElementById('precoCompra').value = compra || '';
    document.getElementById('precoVenda').value = venda || '';
}

// ❌ Ruim - Variáveis DOM intermediárias
const form = document.getElementById('transportForm');
const input = document.getElementById('quantidade');
// ...

// ❌ Ruim - Strings HTML no JavaScript
const html = `<div class="item"><span>${data}</span></div>`;
element.innerHTML = html;
```

## 🧪 Validações Obrigatórias

Antes de submeter sua contribuição, certifique-se de:

### 1. Validação Funcional
- [ ] A funcionalidade funciona conforme esperado
- [ ] Não há regressões em funcionalidades existentes
- [ ] Testado em Chrome, Firefox, Edge e Safari
- [ ] Interface responsiva em diferentes tamanhos de tela
- [ ] Templates HTML funcionam corretamente

### 2. Validação de Código
- [ ] Código segue os padrões estabelecidos
- [ ] Sem `console.log` deixados no código (use debug adequado)
- [ ] Comentários em código complexo
- [ ] Sem código duplicado (DRY principle)
- [ ] Zero strings HTML no JavaScript
- [ ] Zero variáveis DOM desnecessárias
- [ ] Uso de templates HTML para elementos reutilizáveis

### 3. Validação de Dados
- [ ] Validação de formulários funciona corretamente
- [ ] Tratamento de erros implementado
- [ ] Dados são persistidos corretamente no LocalStorage
- [ ] Não há vazamento de dados sensíveis
- [ ] Templates HTML funcionam corretamente

### 4. Validação de Documentação
- [ ] README atualizado se necessário
- [ ] CHANGELOG atualizado com mudanças
- [ ] Comentários em código explicam lógica complexa
- [ ] Novas funcionalidades documentadas
- [ ] Arquitetura de templates documentada se aplicável

## 🎯 Diretrizes Específicas

### Arquitetura de Templates HTML

O Burég usa uma arquitetura moderna de templates HTML para separar completamente estrutura de lógica:

**Princípios:**
- **Zero HTML no JavaScript**: Todo HTML estático fica em templates
- **Clonagem de Templates**: Use `template.content.cloneNode(true)`
- **Manipulação de Dados**: JavaScript manipula apenas dados, não estrutura
- **Templates Centralizados**: Todos os templates no arquivo HTML principal

**Exemplo:**
```html
<!-- Template no HTML -->
<template id="messageTemplate">
    <div class="message" role="alert">
        <span></span>
        <span></span>
    </div>
</template>
```

```javascript
// JavaScript clona e preenche dados
function showMessage(type, message) {
    const template = document.getElementById('messageTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.message').className = `message ${type}`;
    clone.querySelector('.message span:first-child').textContent = icons[type];
    clone.querySelector('.message span:last-child').textContent = message;
    
    document.getElementById('transportForm').prepend(clone);
}
```

### Privacidade e Dados

- **NUNCA** adicione código que envie dados para servidores externos
- **NUNCA** implemente telemetria ou tracking
- **SEMPRE** mantenha a filosofia Local-First
- **SEMPRE** valide inputs do usuário para evitar XSS
- **SEMPRE** use templates HTML estáticos para evitar injeção de HTML

### Performance

- Evite operações pesadas no thread principal
- Use event delegation para listas dinâmicas
- Minimize reflows e repaints do DOM
- Otimize seletores CSS
- **Use clonagem de templates em vez de geração de strings HTML**
- **Acesso direto ao DOM quando necessário sem armazenamento intermediário**

### Acessibilidade

- Use elementos semânticos HTML
- Inclua labels para todos os inputs
- Mantenha contraste adequado de cores
- Suporte navegação por teclado quando possível
- Inclua ARIA labels quando apropriado

### Internacionalização (i18n)

- Mantenha textos em português do Brasil
- Use formatação brasileira para moeda (R$)
- Considere expansão para outros idiomas no futuro

## 📝 Processo de Review

### O que esperar

1. **Review Inicial**: Manutenção verificará conformidade com padrões
2. **Feedback**: Sugestões de melhorias ou correções necessárias
3. **Iteração**: Faça ajustes conforme feedback
4. **Aprovação**: Quando tudo estiver conforme os padrões

### Timeline

- Resposta inicial em até 3 dias úteis
- Review completo em até 7 dias úteis
- Merge após aprovação e validação

## 🚨 Situações Especiais

### Bugs Críticos

Para bugs críticos que afetam produção:
- Use branch `hotfix/`
- Descrição detalhada do impacto
- Solução o mais simples possível
- Teste exaustivo antes do PR

### Breaking Changes

Mudanças que quebram compatibilidade:
- Discutir em issue antes de implementar
- Documentar migração necessária
- Considerar versão maior (major version bump)
- Avisar usuários com antecedência

### Features Grandes

Funcionalidades complexas:
- Dividir em múltiplos PRs menores
- Implementar progressivamente
- Manter funcionalidade existente intacta
- Testar cada componente separadamente

## 📚 Recursos

### Documentação Útil
- [HTML5 MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [HTML Templates MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/template)
- [CSS3 MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [LocalStorage MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)
- [Document.cloneNode() MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/cloneNode)

### Ferramentas Recomendadas
- VS Code com extensões HTML/CSS/JavaScript
- Browser DevTools para debugging
- Prettier para formatação de código
- ESLint para linting de JavaScript

## � Dicas Adicionais

### Debugging
- Use console.log apenas para debugging, remova antes do commit
- Use browser DevTools para inspectar elementos e performance
- Teste templates HTML usando DevTools Elements panel

### Performance
- Use debounce/throttle para eventos frequentes
- Otimize loops e operações em arrays grandes
- Use DocumentFragment para manipulação de DOM em massa
- Prefira clonagem de templates a geração de strings HTML

### Manutenibilidade
- Mantenha funções pequenas e focadas
- Use nomes descritivos para variáveis e funções
- Comente lógica complexa, não código óbvio
- Mantenha consistência no estilo de código

## 🎓 Aprendizado

Para novos contribuidores, recomendamos:

1. Leia toda a documentação do projeto
2. Explore o código existente para entender os padrões
3. Comece com issues marcadas como "good first issue"
4. Peça feedback nas primeiras contribuições
5. Aprenda com o review do seu código

## 📞 Suporte

Se tiver dúvidas sobre como contribuir:
- Abra uma issue com a tag "question"
- Entre em contato através dos canais oficiais do projeto
- Consulte a documentação existente antes de perguntar

---

**Lembre-se**: Contribuições de alta qualidade são mais importantes que quantidade. Um pequeno PR bem feito é mais valioso que um grande PR mal planejado.

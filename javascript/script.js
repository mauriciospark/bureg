/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA:        SparkMauricio
  PROJETO:      Burég
  VERSÃO:       v1.0.0
  LINHAGEM:     SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/
// Regras específicas para cada produto
const productRules = {
    banana: {
        name: 'Banana',
        icon: '🍌',
        rules: [
            'Temperatura ambiente durante o transporte',
            'Transportar em saco de fibra',
            'A cada parada, acrescentar mais bananas',
            'Não pode ser amassada ou comprimida'
        ],
        subtypes: {
            pinguelo: { name: 'Pinguelo', icon: '🍌' },
            filer: { name: 'Filer', icon: '🍌' },
            ferrao: { name: 'Ferrão', icon: '🍌' },
            media: { name: 'Média', icon: '🍌' }
        }
    },
    farinha: {
        name: 'Farinha',
        icon: '🌾',
        rules: [
            'Transportar em saco de fibra plastificado',
            'Manter em ambiente quente',
            'Não pode esfoliar - estraga o produto',
            'Proteger da umidade excessiva'
        ]
    },
    acai: {
        name: 'Açaí',
        icon: '🫐',
        rules: [
            'Transportar em saco de fibra normal',
            'Manter dentro do gelo durante todo o transporte',
            'Não pode esquentar - perde toda a mercadoria',
            'Prioridade no transporte devido à perecibilidade'
        ]
    },
    cara: {
        name: 'Cara',
        icon: '🥕',
        rules: [
            'Transportar dentro de sapos',
            'Manter ventilado durante o transporte',
            'Não pode ser comprimido ou amassado',
            'Proteger de excesso de umidade'
        ]
    }
};

// Armazenamento de dados
let transportes = [];
let currentFilter = 'all';

// Carregar dados do localStorage
function loadFromStorage() {
    try {
        const storedTransportes = localStorage.getItem('transportes');
        if (storedTransportes) transportes = JSON.parse(storedTransportes);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Salvar dados no localStorage
function saveToStorage() {
    try {
        localStorage.setItem('transportes', JSON.stringify(transportes));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

// Elementos do DOM
const form = document.getElementById('transportForm');
const produtoSelect = document.getElementById('produto');
const productInfo = document.getElementById('productInfo');
const rulesContent = document.getElementById('rulesContent');
const transportList = document.getElementById('transportList');
const totalInvestimentoEl = document.getElementById('totalInvestimento');
const totalRetornoEl = document.getElementById('totalRetorno');
const totalLucroEl = document.getElementById('totalLucro');
const totalCargasEl = document.getElementById('totalCargas');
const filterProduct = document.getElementById('filterProduct');
const clearBtn = document.getElementById('clearBtn');
const financialPreview = document.getElementById('financialPreview');
const previewInvestimento = document.getElementById('previewInvestimento');
const previewRetorno = document.getElementById('previewRetorno');
const previewLucro = document.getElementById('previewLucro');

// Campos para cálculo em tempo real
const quantidadeInput = document.getElementById('quantidade');
const precoCompraInput = document.getElementById('precoCompra');
const precoVendaInput = document.getElementById('precoVenda');

// Modal de edição
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');

// Mostrar regras quando o produto é selecionado
produtoSelect.addEventListener('change', function () {
    const produto = this.value;
    const bananaSubtypeGroup = document.getElementById('bananaSubtypeGroup');

    // Mostrar/esconder campo de subtipo de banana
    if (produto === 'banana') {
        bananaSubtypeGroup.style.display = 'block';
    } else {
        bananaSubtypeGroup.style.display = 'none';
    }

    if (produto && productRules[produto]) {
        const rules = productRules[produto];

        rulesContent.innerHTML = `
            <h4>📋 Regras de Transporte:</h4>
            <ul>
                ${rules.rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        `;
        productInfo.style.display = 'block';
        updateFinancialPreview();
    } else {
        productInfo.style.display = 'none';
        financialPreview.style.display = 'none';
    }
});

// Cálculo em tempo real do preview financeiro
function updateFinancialPreview() {
    const quantidade = parseInt(quantidadeInput.value) || 0;
    const precoCompra = parseFloat(precoCompraInput.value) || 0;
    const precoVenda = parseFloat(precoVendaInput.value) || 0;

    if (quantidade > 0 && (precoCompra > 0 || precoVenda > 0)) {
        const investimento = quantidade * precoCompra;
        const retorno = quantidade * precoVenda;
        const lucro = retorno - investimento;

        previewInvestimento.textContent = `R$ ${investimento.toFixed(2)}`;
        previewRetorno.textContent = `R$ ${retorno.toFixed(2)}`;
        previewLucro.textContent = `R$ ${lucro.toFixed(2)}`;
        previewLucro.style.color = lucro >= 0 ? '#28a745' : '#dc3545';

        financialPreview.style.display = 'block';
    } else {
        financialPreview.style.display = 'none';
    }
}

// Event listeners para cálculo em tempo real
quantidadeInput.addEventListener('input', updateFinancialPreview);
precoCompraInput.addEventListener('input', updateFinancialPreview);
precoVendaInput.addEventListener('input', updateFinancialPreview);

// Limpar formulário
clearBtn.addEventListener('click', function () {
    form.reset();
    document.getElementById('bananaSubtypeGroup').style.display = 'none';
    productInfo.style.display = 'none';
    financialPreview.style.display = 'none';
});

// Validação de formulário
function validateForm(formData) {
    const errors = [];

    if (!formData.produto) errors.push('Selecione um produto');
    if (!formData.quantidade || formData.quantidade < 1) errors.push('Quantidade deve ser maior que zero');
    if (!formData.precoCompra || formData.precoCompra < 0.01) errors.push('Preço de compra deve ser maior que zero');
    if (!formData.precoVenda || formData.precoVenda < 0.01) errors.push('Preço de venda deve ser maior que zero');
    if (formData.paradas < 0) errors.push('Número de paradas não pode ser negativo');

    return errors;
}

// Mostrar erro
function showError(message) {
    removeMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<span>❌</span> ${message}`;
    form.insertBefore(errorDiv, form.firstChild);
}

// Mostrar sucesso
function showSuccess(message) {
    removeMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<span>✅</span> ${message}`;
    form.insertBefore(successDiv, form.firstChild);

    setTimeout(() => successDiv.remove(), 3000);
}

// Remover mensagens
function removeMessages() {
    const messages = form.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
}

// Formulário submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        produto: document.getElementById('produto').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        precoCompra: parseFloat(document.getElementById('precoCompra').value),
        precoVenda: parseFloat(document.getElementById('precoVenda').value),
        paradas: parseInt(document.getElementById('paradas').value),
        observacoes: document.getElementById('observacoes').value
    };

    // Adicionar subtipo se for banana
    if (formData.produto === 'banana') {
        formData.subtipo = document.getElementById('bananaSubtype').value;
    }

    const errors = validateForm(formData);
    if (errors.length > 0) {
        showError(errors.join('<br>'));
        return;
    }

    const rules = productRules[formData.produto];
    const investimento = formData.quantidade * formData.precoCompra;
    const retorno = formData.quantidade * formData.precoVenda;
    const lucro = retorno - investimento;

    // Nome do produto com subtipo se aplicável
    let nomeProduto = rules.name;
    if (formData.produto === 'banana' && formData.subtipo && rules.subtypes[formData.subtipo]) {
        nomeProduto = `${rules.name} ${rules.subtypes[formData.subtipo].name}`;
    }

    const transporte = {
        id: Date.now(),
        produto: formData.produto,
        subtipo: formData.subtipo || null,
        nomeProduto: nomeProduto,
        icon: rules.icon,
        quantidade: formData.quantidade,
        precoCompra: formData.precoCompra,
        precoVenda: formData.precoVenda,
        paradas: formData.paradas,
        investimento: investimento,
        retorno: retorno,
        lucro: lucro,
        rules: rules.rules,
        observacoes: formData.observacoes,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    transportes.push(transporte);
    saveToStorage();
    renderTransportes();
    updateSummary();
    form.reset();
    document.getElementById('bananaSubtypeGroup').style.display = 'none';
    productInfo.style.display = 'none';
    financialPreview.style.display = 'none';

    showSuccess('Carga adicionada com sucesso!');
});

// Filtrar por produto
filterProduct.addEventListener('change', function () {
    currentFilter = this.value;
    renderTransportes();
});

// Renderizar lista de transportes
function renderTransportes() {
    let filteredTransportes = transportes;

    if (currentFilter !== 'all') {
        if (currentFilter.startsWith('banana-')) {
            const subtipo = currentFilter.split('-')[1];
            filteredTransportes = transportes.filter(t => t.produto === 'banana' && t.subtipo === subtipo);
        } else {
            filteredTransportes = transportes.filter(t => t.produto === currentFilter);
        }
    }

    if (filteredTransportes.length === 0) {
        transportList.innerHTML = '<p class="empty-message">Nenhuma carga carregada.</p>';
        return;
    }

    transportList.innerHTML = filteredTransportes.map(transporte => `
        <div class="transport-item-compact ${transporte.produto}">
            <div class="compact-header">
                <span class="compact-title">${transporte.icon} ${transporte.nomeProduto}</span>
                <span class="compact-qty">${transporte.quantidade} un</span>
            </div>
            <div class="compact-financial">
                <div class="financial-item">
                    <span>Compra:</span>
                    <span>R$ ${transporte.precoCompra.toFixed(2)}</span>
                </div>
                <div class="financial-item">
                    <span>Venda:</span>
                    <span>R$ ${transporte.precoVenda.toFixed(2)}</span>
                </div>
                <div class="financial-item profit">
                    <span>Lucro:</span>
                    <span style="color: ${transporte.lucro >= 0 ? '#28a745' : '#dc3545'}">
                        R$ ${transporte.lucro.toFixed(2)}
                    </span>
                </div>
            </div>
            ${transporte.subtipo ? `<div class="compact-subtype">Tipo: ${transporte.subtipo}</div>` : ''}
            <div class="compact-actions">
                <button class="btn-compact" onclick="editTransporte(${transporte.id})">✏️</button>
                <button class="btn-compact btn-delete" onclick="deleteTransporte(${transporte.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Atualizar resumo financeiro
function updateSummary() {
    const totalCargas = transportes.length;
    const totalInvestimento = transportes.reduce((sum, t) => sum + t.investimento, 0);
    const totalRetorno = transportes.reduce((sum, t) => sum + t.retorno, 0);
    const totalLucro = totalRetorno - totalInvestimento;

    totalCargasEl.textContent = totalCargas;
    totalInvestimentoEl.textContent = `R$ ${totalInvestimento.toFixed(2)}`;
    totalRetornoEl.textContent = `R$ ${totalRetorno.toFixed(2)}`;
    totalLucroEl.textContent = `R$ ${totalLucro.toFixed(2)}`;
    totalLucroEl.style.color = totalLucro >= 0 ? '#28a745' : '#dc3545';
}

// Deletar transporte
function deleteTransporte(id) {
    if (confirm('Excluir esta carga?')) {
        transportes = transportes.filter(t => t.id !== id);
        saveToStorage();
        renderTransportes();
        updateSummary();
    }
}

// Editar transporte
function editTransporte(id) {
    const transporte = transportes.find(t => t.id === id);
    if (!transporte) return;

    document.getElementById('editId').value = transporte.id;
    document.getElementById('editQuantidade').value = transporte.quantidade;
    document.getElementById('editPrecoCompra').value = transporte.precoCompra;
    document.getElementById('editPrecoVenda').value = transporte.precoVenda;
    document.getElementById('editParadas').value = transporte.paradas;
    document.getElementById('editObservacoes').value = transporte.observacoes || '';

    document.getElementById('editModal').style.display = 'flex';
}

// Modal de edição
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');

closeModal.addEventListener('click', () => editModal.style.display = 'none');
cancelEdit.addEventListener('click', () => editModal.style.display = 'none');

editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const index = transportes.findIndex(t => t.id === id);
    if (index === -1) return;

    const quantidade = parseInt(document.getElementById('editQuantidade').value);
    const precoCompra = parseFloat(document.getElementById('editPrecoCompra').value);
    const precoVenda = parseFloat(document.getElementById('editPrecoVenda').value);
    const paradas = parseInt(document.getElementById('editParadas').value);
    const observacoes = document.getElementById('editObservacoes').value;

    const investimento = quantidade * precoCompra;
    const retorno = quantidade * precoVenda;
    const lucro = retorno - investimento;

    transportes[index] = {
        ...transportes[index],
        quantidade,
        precoCompra,
        precoVenda,
        paradas,
        investimento,
        retorno,
        lucro,
        observacoes
    };

    saveToStorage();
    renderTransportes();
    updateSummary();
    editModal.style.display = 'none';
});

// Funções globais
window.deleteTransporte = deleteTransporte;
window.editTransporte = editTransporte;

// Inicialização
loadFromStorage();
renderTransportes();
updateSummary();
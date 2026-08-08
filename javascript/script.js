/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA:        SparkMauricio
  PROJETO:      Burég
  VERSÃO:       v1.4.4
  LINHAGEM:     SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/

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
    farinhaBanana: {
        name: 'Farinha de Banana',
        icon: '🌾',
        rules: [
            'Transportar em saco de fibra plastificado',
            'Manter em ambiente seco e ventilado',
            'Proteger da umidade excessiva',
            'Não pode ser comprimido'
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

let transportes = [];
let currentFilter = 'all';
let currentSort = 'date-desc';
let currentSearch = '';
let memoryData = null;
let responsavelPersonalizado = '';

let priceConfig = {
    banana: {
        pinguelo: { compra: 0, venda: 0 },
        filer: { compra: 0, venda: 0 },
        ferrao: { compra: 0, venda: 0 },
        media: { compra: 0, venda: 0 }
    },
    farinhaBanana: { compra: 0, venda: 0 },
    sacoAcai: { compra: 0, venda: 0 },
    sacoCara: { compra: 0, venda: 0 },
    sacoFarinha: { compra: 0, venda: 0 }
};

async function loadFromMemory() {
    try {
        const response = await fetch('json/memory.json');
        if (response.ok) {
            memoryData = await response.json();

            if (memoryData.dados.transportes) {
                transportes = memoryData.dados.transportes;
            }

            if (memoryData.configuracao.precos) {
                const precos = memoryData.configuracao.precos;
                priceConfig.banana = precos.banana || priceConfig.banana;
                priceConfig.farinhaBanana = precos.farinhaBanana || priceConfig.farinhaBanana;
                priceConfig.sacoAcai = precos.sacoAcai || priceConfig.sacoAcai;
                priceConfig.sacoCara = precos.sacoCara || priceConfig.sacoCara;
                priceConfig.sacoFarinha = precos.sacoFarinha || priceConfig.sacoFarinha;
            }

            if (memoryData.meta.responsavelPersonalizado) {
                responsavelPersonalizado = memoryData.meta.responsavelPersonalizado;
            }

            console.log('Dados carregados do JSON memory:', memoryData);
            return true;
        }
    } catch (error) {
        console.error('Erro ao carregar JSON memory:', error);
        loadFromStorage();
        loadPriceConfig();
        return false;
    }
}

function saveToMemory() {
    try {
        if (!memoryData) {
            memoryData = {
                meta: {
                    versao: "1.4.4",
                    nome: "Burég",
                    descricao: "Sistema de gerenciamento de transporte fluvial para produtos agrícolas",
                    proprietario: "Mauricio Spark",
                    responsavelPersonalizado: responsavelPersonalizado,
                    linhagem: "SPARK",
                    ultimaAtualizacao: new Date().toISOString(),
                    dataCriacao: "2026-08-07"
                },
                configuracao: {
                    precos: priceConfig,
                    regrasProdutos: {}
                },
                dados: {
                    transportes: transportes,
                    estatisticas: {
                        totalCargas: transportes.length,
                        totalInvestimento: transportes.reduce((sum, t) => sum + t.investimento, 0),
                        totalRetorno: transportes.reduce((sum, t) => sum + t.retorno, 0),
                        totalLucro: transportes.reduce((sum, t) => sum + t.lucro, 0),
                        ultimoRegistro: transportes.length > 0 ? transportes[transportes.length - 1].dataCadastro : null
                    }
                },
                historico: {
                    operacoes: [],
                    configuracoes: []
                },
                sistema: {
                    versao: "1.4.4",
                    locale: "pt-BR",
                    moeda: "BRL",
                    formatoData: "DD/MM/YYYY HH:mm:ss",
                    timezone: "America/Manaus"
                }
            };
        } else {
            memoryData.dados.transportes = transportes;
            memoryData.configuracao.precos = priceConfig;
            memoryData.meta.responsavelPersonalizado = responsavelPersonalizado;
            memoryData.meta.ultimaAtualizacao = new Date().toISOString();
            memoryData.dados.estatisticas = {
                totalCargas: transportes.length,
                totalInvestimento: transportes.reduce((sum, t) => sum + t.investimento, 0),
                totalRetorno: transportes.reduce((sum, t) => sum + t.retorno, 0),
                totalLucro: transportes.reduce((sum, t) => sum + t.lucro, 0),
                ultimoRegistro: transportes.length > 0 ? transportes[transportes.length - 1].dataCadastro : null
            };
        }

        localStorage.setItem('buregMemory', JSON.stringify(memoryData));
        localStorage.setItem('transportes', JSON.stringify(transportes));
        localStorage.setItem('priceConfig', JSON.stringify(priceConfig));

        console.log('Dados salvos na memory:', memoryData);
        return true;
    } catch (error) {
        console.error('Erro ao salvar na memory:', error);
        return false;
    }
}

function loadFromStorage() {
    try {
        const storedMemory = localStorage.getItem('buregMemory');
        if (storedMemory) {
            memoryData = JSON.parse(storedMemory);
            if (memoryData.dados.transportes) {
                transportes = memoryData.dados.transportes;
            }
            if (memoryData.configuracao.precos) {
                priceConfig = memoryData.configuracao.precos;
            }
        } else {
            const storedTransportes = localStorage.getItem('transportes');
            if (storedTransportes) transportes = JSON.parse(storedTransportes);
        }
    } catch (error) {
        console.error('Erro ao carregar dados do storage:', error);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('transportes', JSON.stringify(transportes));
        localStorage.setItem('priceConfig', JSON.stringify(priceConfig));
    } catch (error) {
        console.error('Erro ao salvar no storage:', error);
    }
}

function savePriceConfig() {
    try {
        localStorage.setItem('priceConfig', JSON.stringify(priceConfig));
    } catch (error) {
        console.error('Erro ao salvar configuração de preços:', error);
    }
}

function loadPriceConfig() {
    try {
        const storedConfig = localStorage.getItem('priceConfig');
        if (storedConfig) {
            priceConfig = JSON.parse(storedConfig);
        }
    } catch (error) {
        console.error('Erro ao carregar configuração de preços:', error);
    }
}

function showMessage(type, message, duration = 5000) {
    const icons = { error: '❌', warning: '⚠️', success: '✅' };
    const template = document.getElementById('messageTemplate');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.message').className = `message ${type}`;
    clone.querySelector('.message').setAttribute('role', 'alert');
    clone.querySelector('.message span:first-child').textContent = icons[type];
    clone.querySelector('.message span:last-child').textContent = message;

    document.getElementById('transportForm').prepend(clone);

    setTimeout(() => {
        const message = document.getElementById('transportForm').querySelector('.message');
        if (message) message.remove();
    }, duration);
}

function removeMessages() {
    document.querySelectorAll('.message').forEach(msg => msg.remove());
}

function updateProductRules(produto) {
    const template = document.getElementById('rulesTemplate');
    const clone = template.content.cloneNode(true);
    const rules = productRules[produto];

    const ul = clone.querySelector('ul');
    rules.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        ul.appendChild(li);
    });

    document.getElementById('rulesContent').innerHTML = '';
    document.getElementById('rulesContent').appendChild(clone);
    document.getElementById('productInfo').classList.remove('hidden');
}

function getPrecoByProduct(produto, subtype = null) {
    if (produto === 'banana' && subtype && priceConfig.banana[subtype]) {
        return { compra: priceConfig.banana[subtype].compra, venda: priceConfig.banana[subtype].venda };
    }
    if (produto === 'farinhaBanana') return { compra: priceConfig.farinhaBanana.compra, venda: priceConfig.farinhaBanana.venda };
    if (produto === 'acai') return { compra: priceConfig.sacoAcai.compra, venda: priceConfig.sacoAcai.venda };
    if (produto === 'cara') return { compra: priceConfig.sacoCara.compra, venda: priceConfig.sacoCara.venda };
    if (produto === 'farinha') return { compra: priceConfig.sacoFarinha.compra, venda: priceConfig.sacoFarinha.venda };
    return { compra: 0, venda: 0 };
}

function updatePrecoFields(produto, subtype = null) {
    const { compra, venda } = getPrecoByProduct(produto, subtype);
    document.getElementById('precoCompra').value = compra || '';
    document.getElementById('precoVenda').value = venda || '';
}

document.getElementById('configForm').addEventListener('submit', function (e) {
    e.preventDefault();

    responsavelPersonalizado = document.getElementById('configResponsavel').value.trim();

    priceConfig.banana.pinguelo = {
        compra: parseFloat(document.getElementById('configPingueloCompra').value) || 0,
        venda: parseFloat(document.getElementById('configPingueloVenda').value) || 0
    };
    priceConfig.banana.filer = {
        compra: parseFloat(document.getElementById('configFilerCompra').value) || 0,
        venda: parseFloat(document.getElementById('configFilerVenda').value) || 0
    };
    priceConfig.banana.ferrao = {
        compra: parseFloat(document.getElementById('configFerraoCompra').value) || 0,
        venda: parseFloat(document.getElementById('configFerraoVenda').value) || 0
    };
    priceConfig.banana.media = {
        compra: parseFloat(document.getElementById('configMediaCompra').value) || 0,
        venda: parseFloat(document.getElementById('configMediaVenda').value) || 0
    };
    priceConfig.farinhaBanana = {
        compra: parseFloat(document.getElementById('configFarinhaBananaCompra').value) || 0,
        venda: parseFloat(document.getElementById('configFarinhaBananaVenda').value) || 0
    };
    priceConfig.sacoAcai = {
        compra: parseFloat(document.getElementById('configSacoAciaCompra').value) || 0,
        venda: parseFloat(document.getElementById('configSacoAciaVenda').value) || 0
    };
    priceConfig.sacoCara = {
        compra: parseFloat(document.getElementById('configSacoCaraCompra').value) || 0,
        venda: parseFloat(document.getElementById('configSacoCaraVenda').value) || 0
    };
    priceConfig.sacoFarinha = {
        compra: parseFloat(document.getElementById('configSacoFarinhaCompra').value) || 0,
        venda: parseFloat(document.getElementById('configSacoFarinhaVenda').value) || 0
    };

    saveToMemory();
    const modal = document.getElementById('configModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
});

document.getElementById('produto').addEventListener('change', function () {
    const produto = this.value;
    const bananaSubtypeGroup = document.getElementById('bananaSubtypeGroup');

    if (produto === 'banana') {
        bananaSubtypeGroup.classList.remove('hidden');
    } else {
        bananaSubtypeGroup.classList.add('hidden');
    }

    if (produto && productRules[produto]) {
        updateProductRules(produto);
        updatePrecoFields(produto);
    } else {
        document.getElementById('productInfo').classList.add('hidden');
    }
});

document.getElementById('bananaSubtype').addEventListener('change', function () {
    const produto = document.getElementById('produto').value;
    if (produto === 'banana' && this.value) {
        updatePrecoFields(produto, this.value);
    }
});

function updateFinancialPreview() {
    const quantidade = parseFloat(document.getElementById('quantidade').value) || 0;
    const precoCompra = parseFloat(document.getElementById('precoCompra').value) || 0;
    const precoVenda = parseFloat(document.getElementById('precoVenda').value) || 0;

    if (quantidade > 0 && precoCompra > 0 && precoVenda > 0) {
        const investimento = quantidade * precoCompra;
        const retorno = quantidade * precoVenda;
        const lucro = retorno - investimento;

        const fields = [
            ['previewCompraUnitario', precoCompra],
            ['previewVendaUnitario', precoVenda],
            ['previewInvestimento', investimento],
            ['previewRetorno', retorno],
            ['previewLucro', lucro]
        ];

        fields.forEach(([id, value]) => document.getElementById(id).textContent = `R$ ${value.toFixed(2)}`);
        document.getElementById('previewLucro').className = lucro >= 0 ? 'positive' : 'negative';
        document.getElementById('financialPreview').classList.remove('hidden');
    } else {
        document.getElementById('financialPreview').classList.add('hidden');
    }
}

document.getElementById('quantidade').addEventListener('input', debounce(updateFinancialPreview, 150));
document.getElementById('precoCompra').addEventListener('input', debounce(updateFinancialPreview, 150));
document.getElementById('precoVenda').addEventListener('input', debounce(updateFinancialPreview, 150));

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('transportForm').reset();
    document.getElementById('bananaSubtypeGroup').classList.add('hidden');
    document.getElementById('productInfo').classList.add('hidden');
    document.getElementById('financialPreview').classList.add('hidden');
});

function validateForm(formData) {
    if (!formData.produto) {
        showMessage('error', 'Selecione um produto');
        return false;
    }
    if (!formData.quantidade || formData.quantidade <= 0) {
        showMessage('error', 'Digite uma quantidade válida');
        return false;
    }
    if (!formData.precoCompra || formData.precoCompra <= 0) {
        showMessage('error', 'Digite um preço de compra válido');
        return false;
    }
    if (!formData.precoVenda || formData.precoVenda <= 0) {
        showMessage('error', 'Digite um preço de venda válido');
        return false;
    }
    if (formData.precoVenda < formData.precoCompra) {
        showMessage('warning', 'Preço de venda menor que preço de compra (prejuízo)');
    }
    if (formData.quantidade > 1000) {
        showMessage('warning', 'Quantidade muito alta - verifique os valores');
    }
    if (formData.precoCompra > 1000 || formData.precoVenda > 1000) {
        showMessage('warning', 'Preços muito altos - verifique os valores');
    }
    return true;
}

document.getElementById('transportForm').addEventListener('submit', function (e) {
    e.preventDefault();
    removeMessages();

    const formData = {
        produto: document.getElementById('produto').value,
        subtipo: document.getElementById('bananaSubtype').value || null,
        quantidade: parseFloat(document.getElementById('quantidade').value),
        paradas: parseFloat(document.getElementById('paradas').value),
        precoCompra: parseFloat(document.getElementById('precoCompra').value),
        precoVenda: parseFloat(document.getElementById('precoVenda').value),
        observacoes: document.getElementById('observacoes').value
    };

    if (!validateForm(formData)) return;

    const rules = productRules[formData.produto];
    const investimento = formData.quantidade * formData.precoCompra;
    const retorno = formData.quantidade * formData.precoVenda;
    const lucro = retorno - investimento;

    const transporte = {
        id: Date.now(),
        dataCadastro: new Date().toISOString(),
        nomeProduto: rules.name,
        icon: rules.icon,
        produto: formData.produto,
        subtipo: formData.subtipo,
        quantidade: formData.quantidade,
        paradas: formData.paradas,
        precoCompra: formData.precoCompra,
        precoVenda: formData.precoVenda,
        investimento: investimento,
        retorno: retorno,
        lucro: lucro,
        observacoes: formData.observacoes
    };

    transportes.push(transporte);
    saveToMemory();
    renderTransportes();
    updateSummary();
    document.getElementById('transportForm').reset();
    document.getElementById('bananaSubtypeGroup').classList.add('hidden');
    document.getElementById('productInfo').classList.add('hidden');
    document.getElementById('financialPreview').classList.add('hidden');

    showMessage('success', 'Carga adicionada com sucesso!', 3000);
});

document.getElementById('filterProduct').addEventListener('change', function () {
    currentFilter = this.value;
    renderTransportes();
});

document.getElementById('searchTransport').addEventListener('input', debounce(function () {
    currentSearch = this.value.toLowerCase();
    renderTransportes();
}, 300));

document.getElementById('sortTransport').addEventListener('change', function () {
    currentSort = this.value;
    renderTransportes();
});

function renderTransportes() {
    const transportList = document.getElementById('transportList');

    let filtered = transportes.filter(t => {
        if (currentFilter !== 'all' && t.produto !== currentFilter) return false;
        if (currentSearch && !t.nomeProduto.toLowerCase().includes(currentSearch) &&
            !t.subtipo?.toLowerCase().includes(currentSearch)) return false;
        return true;
    });

    const sortFunctions = {
        'date-desc': (a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro),
        'date-asc': (a, b) => new Date(a.dataCadastro) - new Date(b.dataCadastro),
        'profit-desc': (a, b) => b.lucro - a.lucro,
        'profit-asc': (a, b) => a.lucro - b.lucro,
        'name-asc': (a, b) => a.nomeProduto.localeCompare(b.nomeProduto),
        'name-desc': (a, b) => b.nomeProduto.localeCompare(a.nomeProduto)
    };

    if (sortFunctions[currentSort]) {
        filtered.sort(sortFunctions[currentSort]);
    }

    if (filtered.length === 0) {
        transportList.innerHTML = '<p class="empty-message">Nenhuma carga encontrada.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    const template = document.getElementById('transportItemTemplate');

    filtered.forEach(transporte => {
        const clone = template.content.cloneNode(true);
        const item = clone.querySelector('.transport-item-compact');
        item.classList.add(transporte.produto);

        clone.querySelector('.compact-icon').textContent = transporte.icon;
        clone.querySelector('.compact-name').textContent = transporte.nomeProduto;
        clone.querySelector('.compact-date').textContent = new Date(transporte.dataCadastro).toLocaleDateString('pt-BR');

        const details = clone.querySelectorAll('.compact-detail span:last-child');
        details[0].textContent = `${transporte.quantidade} un`;
        details[1].textContent = transporte.paradas;
        details[2].textContent = `R$ ${transporte.precoCompra.toFixed(2)}`;
        details[3].textContent = `R$ ${transporte.precoVenda.toFixed(2)}`;
        details[4].textContent = `R$ ${transporte.investimento.toFixed(2)}`;
        details[5].textContent = `R$ ${transporte.retorno.toFixed(2)}`;

        const lucroEl = clone.querySelector('.financial-item.profit span:last-child');
        lucroEl.textContent = `R$ ${transporte.lucro.toFixed(2)}`;
        lucroEl.className = transporte.lucro >= 0 ? 'positive' : 'negative';

        if (transporte.subtipo) {
            const subtypeEl = clone.querySelector('.compact-subtype');
            subtypeEl.textContent = `Tipo: ${transporte.subtipo}`;
            subtypeEl.style.display = 'block';
        } else {
            clone.querySelector('.compact-subtype').style.display = 'none';
        }

        if (transporte.observacoes) {
            const obsEl = clone.querySelector('.compact-observacoes');
            obsEl.textContent = `📝 ${transporte.observacoes}`;
            obsEl.style.display = 'block';
        } else {
            clone.querySelector('.compact-observacoes').style.display = 'none';
        }

        const editBtn = clone.querySelector('.btn-edit');
        editBtn.dataset.id = transporte.id;

        const deleteBtn = clone.querySelector('.btn-delete');
        deleteBtn.dataset.id = transporte.id;

        fragment.appendChild(clone);
    });

    transportList.innerHTML = '';
    transportList.appendChild(fragment);

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function () {
            editTransporte(parseInt(this.dataset.id));
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function () {
            deleteTransporte(parseInt(this.dataset.id));
        });
    });
}

function updateSummary() {
    const totalCargas = transportes.length;
    const totalInvestimento = transportes.reduce((sum, t) => sum + t.investimento, 0);
    const totalRetorno = transportes.reduce((sum, t) => sum + t.retorno, 0);
    const totalLucro = totalRetorno - totalInvestimento;

    document.getElementById('totalCargas').textContent = totalCargas;
    document.getElementById('totalInvestimento').textContent = `R$ ${totalInvestimento.toFixed(2)}`;
    document.getElementById('totalRetorno').textContent = `R$ ${totalRetorno.toFixed(2)}`;
    document.getElementById('totalLucro').textContent = `R$ ${totalLucro.toFixed(2)}`;
    document.getElementById('totalLucro').className = totalLucro >= 0 ? 'positive' : 'negative';
}

function deleteTransporte(id) {
    if (confirm('Tem certeza que deseja excluir esta carga?')) {
        transportes = transportes.filter(t => t.id !== id);
        saveToMemory();
        renderTransportes();
        updateSummary();
        showMessage('success', 'Carga excluída com sucesso!', 3000);
    }
}

function editTransporte(id) {
    const transporte = transportes.find(t => t.id === id);
    if (!transporte) return;

    const fields = [
        ['editId', transporte.id],
        ['editProduto', transporte.produto],
        ['editQuantidade', transporte.quantidade],
        ['editParadas', transporte.paradas],
        ['editPrecoCompra', transporte.precoCompra],
        ['editPrecoVenda', transporte.precoVenda],
        ['editObservacoes', transporte.observacoes || '']
    ];

    fields.forEach(([id, value]) => document.getElementById(id).value = value);
    document.getElementById('editModal').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', () => document.getElementById('editModal').classList.add('hidden'));
document.getElementById('cancelEdit').addEventListener('click', () => document.getElementById('editModal').classList.add('hidden'));

document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const index = transportes.findIndex(t => t.id === id);

    if (index === -1) return;

    const quantidade = parseFloat(document.getElementById('editQuantidade').value);
    const precoCompra = parseFloat(document.getElementById('editPrecoCompra').value);
    const precoVenda = parseFloat(document.getElementById('editPrecoVenda').value);

    transportes[index].quantidade = quantidade;
    transportes[index].paradas = parseFloat(document.getElementById('editParadas').value);
    transportes[index].precoCompra = precoCompra;
    transportes[index].precoVenda = precoVenda;
    transportes[index].investimento = quantidade * precoCompra;
    transportes[index].retorno = quantidade * precoVenda;
    transportes[index].lucro = transportes[index].retorno - transportes[index].investimento;
    transportes[index].observacoes = document.getElementById('editObservacoes').value;

    saveToMemory();
    renderTransportes();
    updateSummary();
    document.getElementById('editModal').classList.add('hidden');
    showMessage('success', 'Carga atualizada com sucesso!', 3000);
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.getElementById('certificateBtn').addEventListener('click', function () {
    generateCertificate();
    document.getElementById('certificateModal').classList.remove('hidden');
});

document.getElementById('closeCertificateModal').addEventListener('click', () => document.getElementById('certificateModal').classList.add('hidden'));
document.getElementById('closeCertificateBtn').addEventListener('click', () => document.getElementById('certificateModal').classList.add('hidden'));

document.getElementById('printCertificate').addEventListener('click', function () {
    window.print();
});

function generateCertificate() {
    const content = document.getElementById('certificateContent');

    if (transportes.length === 0) {
        const template = document.getElementById('emptyCertificateTemplate');
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        return;
    }

    const today = new Date().toLocaleString('pt-BR');
    const totalInvestimento = transportes.reduce((sum, t) => sum + t.investimento, 0);
    const totalRetorno = transportes.reduce((sum, t) => sum + t.retorno, 0);
    const totalLucro = totalRetorno - totalInvestimento;
    const nomeResponsavel = responsavelPersonalizado || 'Mauricio Spark';

    const template = document.getElementById('certificateTemplate');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.certificate-header p:last-child span').textContent = nomeResponsavel;

    const infoItems = clone.querySelectorAll('.certificate-info-item span:last-child');
    infoItems[0].textContent = today;
    infoItems[1].textContent = `${transportes.length} unidades`;

    const firstDate = transportes.length > 0 ? new Date(transportes[0].dataCadastro).toLocaleDateString('pt-BR') : 'N/A';
    const lastDate = transportes.length > 0 ? new Date(transportes[transportes.length - 1].dataCadastro).toLocaleDateString('pt-BR') : 'N/A';
    infoItems[2].textContent = `${firstDate} - ${lastDate}`;

    const tbody = clone.querySelector('tbody');
    transportes.forEach((t, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${t.icon} ${t.nomeProduto}</td>
            <td>${t.quantidade} un</td>
            <td class="money">R$ ${t.precoCompra.toFixed(2)}</td>
            <td class="money">R$ ${t.investimento.toFixed(2)}</td>
            <td class="money">R$ ${t.precoVenda.toFixed(2)}</td>
            <td class="money">R$ ${t.retorno.toFixed(2)}</td>
            <td class="money ${t.lucro >= 0 ? 'positive' : 'negative'}">R$ ${t.lucro.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    const summarySpans = clone.querySelectorAll('.summary-item .money');
    summarySpans[0].textContent = `R$ ${totalInvestimento.toFixed(2)}`;
    summarySpans[1].textContent = `R$ ${totalRetorno.toFixed(2)}`;
    summarySpans[2].textContent = `R$ ${totalLucro.toFixed(2)}`;
    summarySpans[2].className = `money ${totalLucro >= 0 ? 'positive' : 'negative'}`;

    const footerSpans = clone.querySelectorAll('.certificate-footer span');
    footerSpans[0].textContent = today;

    content.innerHTML = '';
    content.appendChild(clone);
}

document.getElementById('exportBtn').addEventListener('click', function () {
    const dataStr = JSON.stringify(memoryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'bureg-backup.json';
    link.click();

    URL.revokeObjectURL(url);
    alert('Memória exportada com sucesso!');
});

document.getElementById('importBtn').addEventListener('click', function () {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (importedData.dados && importedData.dados.transportes) {
                transportes = importedData.dados.transportes;
            }
            if (importedData.configuracao && importedData.configuracao.precos) {
                priceConfig = importedData.configuracao.precos;
            }
            if (importedData.meta && importedData.meta.responsavelPersonalizado) {
                responsavelPersonalizado = importedData.meta.responsavelPersonalizado;
            }

            memoryData = importedData;
            saveToMemory();
            renderTransportes();
            updateSummary();

            alert('Memória importada com sucesso!');
        } catch (error) {
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };

    reader.readAsText(file);
});

document.addEventListener('DOMContentLoaded', async function () {
    await loadFromMemory();
    renderTransportes();
    updateSummary();

    // Configurar botão de configuração
    document.getElementById('configBtn').addEventListener('click', function () {
        alert('Botão de configuração clicado!');
        const fields = [
            ['configResponsavel', responsavelPersonalizado],
            ['configPingueloCompra', priceConfig.banana.pinguelo.compra],
            ['configPingueloVenda', priceConfig.banana.pinguelo.venda],
            ['configFilerCompra', priceConfig.banana.filer.compra],
            ['configFilerVenda', priceConfig.banana.filer.venda],
            ['configFerraoCompra', priceConfig.banana.ferrao.compra],
            ['configFerraoVenda', priceConfig.banana.ferrao.venda],
            ['configMediaCompra', priceConfig.banana.media.compra],
            ['configMediaVenda', priceConfig.banana.media.venda],
            ['configFarinhaBananaCompra', priceConfig.farinhaBanana.compra],
            ['configFarinhaBananaVenda', priceConfig.farinhaBanana.venda],
            ['configSacoAciaCompra', priceConfig.sacoAcai.compra],
            ['configSacoAciaVenda', priceConfig.sacoAcai.venda],
            ['configSacoCaraCompra', priceConfig.sacoCara.compra],
            ['configSacoCaraVenda', priceConfig.sacoCara.venda],
            ['configSacoFarinhaCompra', priceConfig.sacoFarinha.compra],
            ['configSacoFarinhaVenda', priceConfig.sacoFarinha.venda]
        ];

        fields.forEach(([id, value]) => document.getElementById(id).value = value || '');
        const modal = document.getElementById('configModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    });

    document.getElementById('closeConfigModal').addEventListener('click', () => {
        const modal = document.getElementById('configModal');
        modal.classList.add('hidden');
        modal.style.display = 'none';
    });
    document.getElementById('cancelConfig').addEventListener('click', () => {
        const modal = document.getElementById('configModal');
        modal.classList.add('hidden');
        modal.style.display = 'none';
    });
});

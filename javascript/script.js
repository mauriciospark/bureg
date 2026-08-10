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
let currentDateFilter = 'all';
let currentProfitFilter = 'all';
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

        // Auto-backup functionality
        createAutoBackup();

        console.log('Dados salvos na memory:', memoryData);
        return true;
    } catch (error) {
        console.error('Erro ao salvar na memory:', error);
        return false;
    }
}

function createAutoBackup() {
    try {
        const backupKey = `bureg_backup_${new Date().toISOString().split('T')[0]}`;
        const backupData = {
            timestamp: new Date().toISOString(),
            data: memoryData
        };
        localStorage.setItem(backupKey, JSON.stringify(backupData));

        // Keep only last 7 days of backups
        const keys = Object.keys(localStorage).filter(key => key.startsWith('bureg_backup_'));
        if (keys.length > 7) {
            keys.sort().reverse().slice(7).forEach(key => localStorage.removeItem(key));
        }
    } catch (error) {
        console.error('Erro ao criar backup automático:', error);
    }
}

function restoreFromBackup(backupDate) {
    try {
        const backupKey = `bureg_backup_${backupDate}`;
        const backupData = localStorage.getItem(backupKey);

        if (backupData) {
            const parsed = JSON.parse(backupData);
            if (parsed.data && confirm(`Deseja restaurar o backup de ${backupDate}? Esta ação não pode ser desfeita.`)) {
                memoryData = parsed.data;
                transportes = memoryData.dados.transportes || [];
                priceConfig = memoryData.configuracao.precos || priceConfig;
                responsavelPersonalizado = memoryData.meta.responsavelPersonalizado || '';

                saveToMemory();
                renderTransportes();
                updateSummary();
                showMessage('success', 'Backup restaurado com sucesso!', 3000);
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Erro ao restaurar backup:', error);
        showMessage('error', 'Erro ao restaurar backup: ' + error.message);
        return false;
    }
}

function getAvailableBackups() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('bureg_backup_'));
    return keys.map(key => {
        const backupData = JSON.parse(localStorage.getItem(key));
        return {
            date: key.replace('bureg_backup_', ''),
            timestamp: backupData.timestamp,
            itemCount: backupData.data?.dados?.transportes?.length || 0
        };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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
    const errors = [];

    if (!formData.produto) {
        errors.push('Selecione um produto');
    }

    if (!formData.quantidade || formData.quantidade <= 0) {
        errors.push('Digite uma quantidade válida maior que zero');
    }

    if (formData.paradas < 0) {
        errors.push('Número de paradas não pode ser negativo');
    }

    if (!formData.precoCompra || formData.precoCompra <= 0) {
        errors.push('Digite um preço de compra válido maior que zero');
    }

    if (!formData.precoVenda || formData.precoVenda <= 0) {
        errors.push('Digite um preço de venda válido maior que zero');
    }

    if (formData.precoVenda < formData.precoCompra) {
        errors.push('Preço de venda não pode ser menor que preço de compra');
    }

    if (formData.quantidade > 10000) {
        errors.push('Quantidade não pode exceder 10.000 unidades');
    }

    if (formData.precoCompra > 10000) {
        errors.push('Preço de compra muito alto - verifique o valor');
    }

    if (formData.precoVenda > 10000) {
        errors.push('Preço de venda muito alto - verifique o valor');
    }

    if (errors.length > 0) {
        showMessage('error', errors.join('\n'), 10000);
        return false;
    }

    // Warnings (don't block submission)
    if (formData.precoVenda < formData.precoCompra * 1.1) {
        showMessage('warning', 'Margem de lucro muito baixa (menos de 10%)');
    }

    if (formData.quantidade > 1000) {
        showMessage('warning', 'Quantidade muito alta - verifique os valores');
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

document.getElementById('filterDateRange').addEventListener('change', function () {
    currentDateFilter = this.value;
    renderTransportes();
});

document.getElementById('filterProfit').addEventListener('change', function () {
    currentProfitFilter = this.value;
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

document.getElementById('clearFilters').addEventListener('click', function () {
    currentFilter = 'all';
    currentDateFilter = 'all';
    currentProfitFilter = 'all';
    currentSearch = '';
    currentSort = 'date-desc';

    document.getElementById('filterProduct').value = 'all';
    document.getElementById('filterDateRange').value = 'all';
    document.getElementById('filterProfit').value = 'all';
    document.getElementById('searchTransport').value = '';
    document.getElementById('sortTransport').value = 'date-desc';

    renderTransportes();
    showMessage('success', 'Filtros limpos com sucesso!', 3000);
});

function renderTransportes() {
    const transportList = document.getElementById('transportList');

    let filtered = transportes.filter(t => {
        // Product filter
        if (currentFilter !== 'all' && t.produto !== currentFilter) return false;

        // Search filter
        if (currentSearch && !t.nomeProduto.toLowerCase().includes(currentSearch) &&
            !t.subtipo?.toLowerCase().includes(currentSearch)) return false;

        // Date range filter
        if (currentDateFilter !== 'all') {
            const today = new Date();
            const transportDate = new Date(t.dataCadastro);

            switch (currentDateFilter) {
                case 'today':
                    if (transportDate.toDateString() !== today.toDateString()) return false;
                    break;
                case 'week':
                    const weekAgo = new Date(today);
                    weekAgo.setDate(today.getDate() - 7);
                    if (transportDate < weekAgo) return false;
                    break;
                case 'month':
                    if (transportDate.getMonth() !== today.getMonth() ||
                        transportDate.getFullYear() !== today.getFullYear()) return false;
                    break;
                case 'year':
                    if (transportDate.getFullYear() !== today.getFullYear()) return false;
                    break;
            }
        }

        // Profit filter
        if (currentProfitFilter !== 'all') {
            if (currentProfitFilter === 'positive' && t.lucro < 0) return false;
            if (currentProfitFilter === 'negative' && t.lucro >= 0) return false;
        }

        return true;
    });

    const sortFunctions = {
        'date-desc': (a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro),
        'date-asc': (a, b) => new Date(a.dataCadastro) - new Date(b.dataCadastro),
        'profit-desc': (a, b) => b.lucro - a.lucro,
        'profit-asc': (a, b) => a.lucro - b.lucro,
        'quantity-desc': (a, b) => b.quantidade - a.quantidade,
        'quantity-asc': (a, b) => a.quantidade - b.quantidade,
        'name-asc': (a, b) => a.nomeProduto.localeCompare(b.nomeProduto),
        'name-desc': (a, b) => b.nomeProduto.localeCompare(a.nomeProduto)
    };

    if (sortFunctions[currentSort]) {
        filtered.sort(sortFunctions[currentSort]);
    }

    if (filtered.length === 0) {
        transportList.innerHTML = '<p class="empty-message">Nenhuma carga encontrada com os filtros atuais.</p>';
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

        const receiptBtn = clone.querySelector('.btn-receipt');
        receiptBtn.dataset.id = transporte.id;

        fragment.appendChild(clone);
    });

    transportList.innerHTML = '';
    transportList.appendChild(fragment);

    // Event delegation is now handled by setupEventDelegation()
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

// Performance optimization: Memoization for expensive calculations
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// Memoized expensive functions
const memoizedRenderTransportes = memoize((filter, sort, search, dateFilter, profitFilter) => {
    // This will be used for caching filter combinations
    return { filter, sort, search, dateFilter, profitFilter };
});

// Lazy loading for modals
const lazyLoadModal = (modalId) => {
    return new Promise((resolve) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            resolve(modal);
        } else {
            console.error(`Modal ${modalId} não encontrado`);
            resolve(null);
        }
    });
};

// Optimized event delegation
const setupEventDelegation = () => {
    document.addEventListener('click', (e) => {
        // Handle dynamic buttons with event delegation
        if (e.target.closest('.btn-edit')) {
            const btn = e.target.closest('.btn-edit');
            console.log('Botão editar clicado, ID:', btn.dataset.id);
            editTransporte(parseInt(btn.dataset.id));
        }
        if (e.target.closest('.btn-delete')) {
            const btn = e.target.closest('.btn-delete');
            console.log('Botão excluir clicado, ID:', btn.dataset.id);
            deleteTransporte(parseInt(btn.dataset.id));
        }
        if (e.target.closest('.btn-receipt')) {
            const btn = e.target.closest('.btn-receipt');
            console.log('Botão comprovante clicado, ID:', btn.dataset.id);
            e.preventDefault();
            e.stopPropagation();
            openSalesReceiptForm(parseInt(btn.dataset.id));
        }
    });
};

let currentTransporteId = null;

function openSalesReceiptForm(transporteId) {
    console.log('Abrindo formulário de comprovante para transporte ID:', transporteId);

    currentTransporteId = transporteId;

    // Verificar se o transporte existe
    const transporte = transportes.find(t => t.id === transporteId);
    if (!transporte) {
        console.error('Transporte não encontrado:', transporteId);
        showMessage('error', 'Transporte não encontrado!');
        return;
    }

    // Reset form
    const customerNameInput = document.getElementById('receiptCustomerName');
    const customerDocInput = document.getElementById('receiptCustomerDoc');
    const customerPhoneInput = document.getElementById('receiptCustomerPhone');
    const paymentMethodInput = document.getElementById('receiptPaymentMethod');
    const discountInput = document.getElementById('receiptDiscount');

    if (customerNameInput) customerNameInput.value = '';
    if (customerDocInput) customerDocInput.value = '';
    if (customerPhoneInput) customerPhoneInput.value = '';
    if (paymentMethodInput) paymentMethodInput.value = 'dinheiro';
    if (discountInput) discountInput.value = '0';

    // Show form, hide content and actions
    const salesReceiptForm = document.getElementById('salesReceiptForm');
    const salesReceiptContent = document.getElementById('salesReceiptContent');
    const salesReceiptActions = document.getElementById('salesReceiptActions');
    const salesReceiptModal = document.getElementById('salesReceiptModal');

    if (salesReceiptForm) salesReceiptForm.classList.remove('hidden');
    if (salesReceiptContent) salesReceiptContent.classList.add('hidden');
    if (salesReceiptActions) salesReceiptActions.classList.add('hidden');

    // Show modal
    if (salesReceiptModal) {
        salesReceiptModal.classList.remove('hidden');
        salesReceiptModal.style.display = 'flex';
    }

    console.log('Formulário de comprovante aberto com sucesso');
}

function generateBackupList() {
    const content = document.getElementById('backupContent');

    if (!content) {
        console.error('Elemento backupContent não encontrado');
        return;
    }

    const backups = getAvailableBackups();

    if (backups.length === 0) {
        const template = document.getElementById('emptyBackupTemplate');
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        return;
    }

    const template = document.getElementById('backupTemplate');
    const clone = template.content.cloneNode(true);

    const backupList = clone.querySelector('#backupList');
    backups.forEach(backup => {
        const item = document.createElement('div');
        item.className = 'backup-item';
        item.innerHTML = `
            <div class="backup-item-info">
                <div class="backup-item-date">${new Date(backup.timestamp).toLocaleString('pt-BR')}</div>
                <div class="backup-item-details">${backup.itemCount} cargas • ${backup.date}</div>
            </div>
            <div class="backup-item-actions">
                <button class="btn btn-compact btn-restore" data-date="${backup.date}" aria-label="Restaurar backup">🔄 Restaurar</button>
                <button class="btn btn-compact btn-delete-backup" data-date="${backup.date}" aria-label="Excluir backup">🗑️</button>
            </div>
        `;
        backupList.appendChild(item);
    });

    content.innerHTML = '';
    content.appendChild(clone);

    // Add event listeners for restore and delete buttons
    document.querySelectorAll('.btn-restore').forEach(btn => {
        btn.addEventListener('click', function () {
            restoreFromBackup(this.dataset.date);
            generateBackupList(); // Refresh the list
        });
    });

    document.querySelectorAll('.btn-delete-backup').forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Tem certeza que deseja excluir este backup?')) {
                localStorage.removeItem(`bureg_backup_${this.dataset.date}`);
                generateBackupList(); // Refresh the list
                showMessage('success', 'Backup excluído com sucesso!', 3000);
            }
        });
    });
}

function generateStatistics() {
    const content = document.getElementById('statsContent');

    if (!content) {
        console.error('Elemento statsContent não encontrado');
        return;
    }

    if (transportes.length === 0) {
        const template = document.getElementById('emptyStatsTemplate');
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        return;
    }

    // Calculate overview statistics
    const totalCargas = transportes.length;
    const totalInvestimento = transportes.reduce((sum, t) => sum + t.investimento, 0);
    const totalRetorno = transportes.reduce((sum, t) => sum + t.retorno, 0);
    const totalLucro = totalRetorno - totalInvestimento;

    // Calculate product statistics
    const productStats = {};
    transportes.forEach(t => {
        if (!productStats[t.produto]) {
            productStats[t.produto] = {
                name: t.nomeProduto,
                icon: t.icon,
                quantidade: 0,
                investimento: 0,
                retorno: 0,
                lucro: 0
            };
        }
        productStats[t.produto].quantidade += t.quantidade;
        productStats[t.produto].investimento += t.investimento;
        productStats[t.produto].retorno += t.retorno;
        productStats[t.produto].lucro += t.lucro;
    });

    const template = document.getElementById('statsTemplate');
    const clone = template.content.cloneNode(true);

    // Overview statistics
    clone.querySelector('#statTotalCargas').textContent = totalCargas;
    clone.querySelector('#statTotalInvestimento').textContent = `R$ ${totalInvestimento.toFixed(2)}`;
    clone.querySelector('#statTotalRetorno').textContent = `R$ ${totalRetorno.toFixed(2)}`;

    const lucroElement = clone.querySelector('#statTotalLucro');
    lucroElement.textContent = `R$ ${totalLucro.toFixed(2)}`;
    lucroElement.className = totalLucro >= 0 ? 'stat-value positive' : 'stat-value negative';

    // Product distribution chart
    const productChart = clone.querySelector('#productChart');
    const maxQuantity = Math.max(...Object.values(productStats).map(p => p.quantidade));

    Object.entries(productStats).forEach(([key, stats]) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = (stats.quantidade / maxQuantity) * 100;
        bar.style.height = `${Math.max(height, 5)}%`;
        bar.setAttribute('data-label', stats.icon);
        bar.setAttribute('data-value', stats.quantidade);
        productChart.appendChild(bar);
    });

    // Profit chart
    const profitChart = clone.querySelector('#profitChart');
    const maxProfit = Math.max(...Object.values(productStats).map(p => Math.abs(p.lucro)));

    Object.entries(productStats).forEach(([key, stats]) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = (Math.abs(stats.lucro) / maxProfit) * 100;
        bar.style.height = `${Math.max(height, 5)}%`;
        bar.style.background = stats.lucro >= 0
            ? 'linear-gradient(180deg, #48bb78 0%, #38a169 100%)'
            : 'linear-gradient(180deg, #f56565 0%, #e53e3e 100%)';
        bar.setAttribute('data-label', stats.icon);
        bar.setAttribute('data-value', `R$ ${stats.lucro.toFixed(2)}`);
        profitChart.appendChild(bar);
    });

    // Detailed table
    const tableBody = clone.querySelector('#statsTableBody');
    Object.entries(productStats).forEach(([key, stats]) => {
        const row = document.createElement('tr');
        const margem = stats.investimento > 0 ? (stats.lucro / stats.investimento * 100) : 0;

        row.innerHTML = `
            <td>${stats.icon} ${stats.name}</td>
            <td>${stats.quantidade}</td>
            <td>R$ ${stats.investimento.toFixed(2)}</td>
            <td>R$ ${stats.retorno.toFixed(2)}</td>
            <td class="${stats.lucro >= 0 ? 'positive' : 'negative'}">R$ ${stats.lucro.toFixed(2)}</td>
            <td class="${margem >= 0 ? 'positive' : 'negative'}">${margem.toFixed(1)}%</td>
        `;
        tableBody.appendChild(row);
    });

    content.innerHTML = '';
    content.appendChild(clone);
}

function generateSalesReceipt(transporteId = null, customerData = null) {
    const content = document.getElementById('salesReceiptContent');

    if (!content) {
        console.error('Elemento salesReceiptContent não encontrado');
        return;
    }

    if (!transporteId) {
        const template = document.getElementById('emptySalesReceiptTemplate');
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        return;
    }

    const transporte = transportes.find(t => t.id === transporteId);
    if (!transporte) {
        const template = document.getElementById('emptySalesReceiptTemplate');
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        return;
    }

    const today = new Date().toLocaleString('pt-BR');
    const cargaDate = new Date(transporte.dataCadastro).toLocaleString('pt-BR');
    const nomeResponsavel = responsavelPersonalizado || 'Mauricio Spark';
    const receiptNumber = `VENDA-${Date.now()}-${transporte.id}`;

    // Process customer data and discount
    const discount = customerData?.discount ? parseFloat(customerData.discount) : 0;
    const totalComDesconto = transporte.retorno - discount;
    const lucroComDesconto = totalComDesconto - transporte.investimento;

    const paymentMethods = {
        'dinheiro': '💵 Dinheiro',
        'pix': '📱 PIX',
        'cartao_credito': '💳 Cartão de Crédito',
        'cartao_debito': '💳 Cartão de Débito',
        'transferencia': '🏦 Transferência Bancária',
        'boleto': '📄 Boleto'
    };

    const template = document.getElementById('salesReceiptTemplate');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.receipt-responsavel').textContent = nomeResponsavel;
    clone.querySelector('.receipt-number').textContent = receiptNumber;
    clone.querySelector('.receipt-date').textContent = today;
    clone.querySelector('.receipt-carga-date').textContent = cargaDate;

    // Customer information
    clone.querySelector('.receipt-customer-name').textContent = customerData?.name || 'Não informado';
    clone.querySelector('.receipt-customer-doc').textContent = customerData?.doc || 'Não informado';
    clone.querySelector('.receipt-customer-phone').textContent = customerData?.phone || 'Não informado';

    clone.querySelector('.receipt-product-name').textContent = `${transporte.icon} ${transporte.nomeProduto}`;
    clone.querySelector('.receipt-quantity').textContent = `${transporte.quantidade} un`;
    clone.querySelector('.receipt-paradas').textContent = transporte.paradas;

    clone.querySelector('.receipt-preco-compra').textContent = `R$ ${transporte.precoCompra.toFixed(2)}`;
    clone.querySelector('.receipt-preco-venda').textContent = `R$ ${transporte.precoVenda.toFixed(2)}`;
    clone.querySelector('.receipt-discount').textContent = discount > 0 ? `- R$ ${discount.toFixed(2)}` : 'R$ 0,00';
    clone.querySelector('.receipt-total-compra').textContent = `R$ ${transporte.investimento.toFixed(2)}`;
    clone.querySelector('.receipt-total-venda').textContent = `R$ ${totalComDesconto.toFixed(2)}`;
    clone.querySelector('.receipt-payment-method').textContent = paymentMethods[customerData?.paymentMethod] || 'Não informado';

    const lucroElement = clone.querySelector('.receipt-lucro');
    lucroElement.textContent = `R$ ${lucroComDesconto.toFixed(2)}`;
    lucroElement.className = lucroComDesconto >= 0 ? 'receipt-lucro positive' : 'receipt-lucro negative';

    clone.querySelector('.receipt-observacoes').textContent = transporte.observacoes || 'Sem observações';
    clone.querySelector('.receipt-generation-date').textContent = today;

    content.innerHTML = '';
    content.appendChild(clone);
}

function generateCertificate() {
    const content = document.getElementById('certificateContent');

    if (!content) {
        console.error('Elemento certificateContent não encontrado');
        return;
    }

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
    showMessage('success', 'Memória exportada com sucesso!', 3000);
});

document.getElementById('exportCsvBtn').addEventListener('click', function () {
    if (transportes.length === 0) {
        showMessage('error', 'Não há dados para exportar!');
        return;
    }

    // Create CSV header
    const headers = ['ID', 'Data', 'Produto', 'Tipo', 'Quantidade', 'Paradas', 'Preço Compra', 'Preço Venda', 'Investimento', 'Retorno', 'Lucro', 'Observações'];

    // Create CSV rows
    const rows = transportes.map(t => [
        t.id,
        new Date(t.dataCadastro).toLocaleString('pt-BR'),
        t.nomeProduto,
        t.subtipo || 'N/A',
        t.quantidade,
        t.paradas,
        t.precoCompra.toFixed(2),
        t.precoVenda.toFixed(2),
        t.investimento.toFixed(2),
        t.retorno.toFixed(2),
        t.lucro.toFixed(2),
        t.observacoes || 'N/A'
    ]);

    // Combine header and rows
    const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bureg-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showMessage('success', 'Arquivo CSV exportado com sucesso!', 3000);
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

            showMessage('success', 'Memória importada com sucesso!');
        } catch (error) {
            showMessage('error', 'Erro ao importar arquivo: ' + error.message);
        }
    };

    reader.readAsText(file);
});

document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOM carregado, inicializando sistema...');
    await loadFromMemory();
    renderTransportes();
    updateSummary();

    // Setup event delegation for performance
    setupEventDelegation();

    // Configurar botões de comprovante
    document.getElementById('certificateBtn').addEventListener('click', function () {
        generateCertificate();
        document.getElementById('certificateModal').classList.remove('hidden');
    });

    document.getElementById('closeCertificateModal').addEventListener('click', () => document.getElementById('certificateModal').classList.add('hidden'));
    document.getElementById('closeCertificateBtn').addEventListener('click', () => document.getElementById('certificateModal').classList.add('hidden'));

    document.getElementById('printCertificate').addEventListener('click', function () {
        window.print();
    });

    document.getElementById('salesReceiptBtn').addEventListener('click', function () {
        if (transportes.length === 0) {
            showMessage('error', 'Não há cargas cadastradas para gerar comprovante!');
            return;
        }
        const lastTransporte = transportes[transportes.length - 1];
        openSalesReceiptForm(lastTransporte.id);
    });

    document.getElementById('closeSalesReceiptModal').addEventListener('click', () => document.getElementById('salesReceiptModal').classList.add('hidden'));
    document.getElementById('closeSalesReceiptBtn').addEventListener('click', () => document.getElementById('salesReceiptModal').classList.add('hidden'));

    // Generate receipt button
    document.getElementById('generateReceiptBtn').addEventListener('click', function () {
        console.log('Botão gerar comprovante clicado');

        const customerData = {
            name: document.getElementById('receiptCustomerName').value.trim(),
            doc: document.getElementById('receiptCustomerDoc').value.trim(),
            phone: document.getElementById('receiptCustomerPhone').value.trim(),
            paymentMethod: document.getElementById('receiptPaymentMethod').value,
            discount: document.getElementById('receiptDiscount').value
        };

        console.log('Dados do cliente:', customerData);
        console.log('ID do transporte atual:', currentTransporteId);

        generateSalesReceipt(currentTransporteId, customerData);

        // Hide form, show content and actions
        document.getElementById('salesReceiptForm').classList.add('hidden');
        document.getElementById('salesReceiptContent').classList.remove('hidden');
        document.getElementById('salesReceiptActions').classList.remove('hidden');
    });

    // Cancel receipt button
    document.getElementById('cancelReceiptBtn').addEventListener('click', function () {
        document.getElementById('salesReceiptModal').classList.add('hidden');
    });

    // New receipt button
    document.getElementById('newReceiptBtn').addEventListener('click', function () {
        openSalesReceiptForm(currentTransporteId);
    });

    // Statistics modal
    document.getElementById('statsBtn').addEventListener('click', function () {
        generateStatistics();
        document.getElementById('statsModal').classList.remove('hidden');
    });

    document.getElementById('closeStatsModal').addEventListener('click', () => document.getElementById('statsModal').classList.add('hidden'));
    document.getElementById('closeStatsBtn').addEventListener('click', () => document.getElementById('statsModal').classList.add('hidden'));

    // Backup modal
    document.getElementById('backupBtn').addEventListener('click', function () {
        generateBackupList();
        document.getElementById('backupModal').classList.remove('hidden');
    });

    document.getElementById('closeBackupModal').addEventListener('click', () => document.getElementById('backupModal').classList.add('hidden'));
    document.getElementById('closeBackupBtn').addEventListener('click', () => document.getElementById('backupModal').classList.add('hidden'));

    // Export PDF button
    document.getElementById('exportPdfBtn').addEventListener('click', function () {
        const receiptContent = document.getElementById('salesReceiptContent').cloneNode(true);

        // Ensure logo is visible
        const logoImages = receiptContent.querySelectorAll('img[src="favicon/logo.jpg"]');
        logoImages.forEach(img => {
            img.src = 'favicon/logo.jpg';
            img.style.display = 'block';
        });

        // Create HTML using existing CSS file
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Comprovante de Venda - Burég</title>
                <link rel="stylesheet" href="css/style.css">
            </head>
            <body>${receiptContent.innerHTML}</body>
            </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `comprovante-venda-${Date.now()}.html`;
        link.click();
        URL.revokeObjectURL(url);

        showMessage('success', 'Arquivo HTML exportado! Abra o arquivo e use "Salvar como PDF" no navegador.', 6000);
    });

    document.getElementById('printSalesReceipt').addEventListener('click', function () {
        window.print();
    });

    // Configurar botão de configuração
    document.getElementById('configBtn').addEventListener('click', function () {
        document.getElementById('configResponsavel').value = responsavelPersonalizado || '';

        document.getElementById('configPingueloCompra').value = priceConfig.banana.pinguelo.compra || '';
        document.getElementById('configPingueloVenda').value = priceConfig.banana.pinguelo.venda || '';
        document.getElementById('configFilerCompra').value = priceConfig.banana.filer.compra || '';
        document.getElementById('configFilerVenda').value = priceConfig.banana.filer.venda || '';
        document.getElementById('configFerraoCompra').value = priceConfig.banana.ferrao.compra || '';
        document.getElementById('configFerraoVenda').value = priceConfig.banana.ferrao.venda || '';
        document.getElementById('configMediaCompra').value = priceConfig.banana.media.compra || '';
        document.getElementById('configMediaVenda').value = priceConfig.banana.media.venda || '';
        document.getElementById('configFarinhaBananaCompra').value = priceConfig.farinhaBanana.compra || '';
        document.getElementById('configFarinhaBananaVenda').value = priceConfig.farinhaBanana.venda || '';
        document.getElementById('configSacoAciaCompra').value = priceConfig.sacoAcai.compra || '';
        document.getElementById('configSacoAciaVenda').value = priceConfig.sacoAcai.venda || '';
        document.getElementById('configSacoCaraCompra').value = priceConfig.sacoCara.compra || '';
        document.getElementById('configSacoCaraVenda').value = priceConfig.sacoCara.venda || '';
        document.getElementById('configSacoFarinhaCompra').value = priceConfig.sacoFarinha.compra || '';
        document.getElementById('configSacoFarinhaVenda').value = priceConfig.sacoFarinha.venda || '';

        const modal = document.getElementById('configModal');
        modal.classList.remove('hidden');
        modal.style.display = 'block';
    });

    document.getElementById('closeConfigModal').addEventListener('click', () => {
        document.getElementById('configModal').classList.add('hidden');
        document.getElementById('configModal').style.display = 'none';
    });
});

import { store } from '../store/Store.js';

export function createExpensesScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';

    function render() {
        container.innerHTML = `
            <div class="expenses-screen">
                <h1 class="screen-title">GASTOS</h1>
                
                <div class="expenses-card">
                    <div class="expenses-inputs-row">
                        <div class="expenses-input-container">
                            <input type="text" class="expenses-field" placeholder="Dinero" id="expense-amount">
                        </div>
                        <div class="expenses-input-container">
                            <input type="text" class="expenses-field" placeholder="Descripción" id="expense-desc" maxlength="30">
                            <div class="char-counter" id="char-count">0/30</div>
                        </div>
                        <div class="expenses-input-container">
                            <select class="expenses-field expenses-select" id="expense-fund">
                                <option value="" disabled selected>fondo</option>
                                ${store.getFunds().map(f => `<option value="${f.id}">${f.title}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <button class="btn-save" id="btn-save-expense">GUARDAR</button>
                </div>

                <div class="history-section">
                    <h2 class="history-title">Historial de Gastos</h2>
                    <div class="history-card" id="history-list">
                        <!-- History items will be rendered here -->
                    </div>
                </div>
            </div>
        `;

        setupEventListeners();
        renderHistory();
    }

    function setupEventListeners() {
        const amountInput = container.querySelector('#expense-amount');
        const descInput = container.querySelector('#expense-desc');
        const charCount = container.querySelector('#char-count');
        const fundSelect = container.querySelector('#expense-fund');
        const saveBtn = container.querySelector('#btn-save-expense');

        // Money formatting
        amountInput.addEventListener('input', (e) => {
            let rawValue = e.target.value.replace(/\D/g, '');
            if (rawValue) {
                e.target.value = `$${parseInt(rawValue).toLocaleString()}`;
            } else {
                e.target.value = '';
            }
        });

        // Char counter
        descInput.addEventListener('input', (e) => {
            charCount.textContent = `${e.target.value.length}/30`;
        });

        // Save logic
        saveBtn.addEventListener('click', () => {
            const amountRaw = amountInput.value.replace(/\D/g, '');
            const amount = parseFloat(amountRaw);
            const description = descInput.value.trim();
            const fundId = fundSelect.value;

            if (!amount || amount <= 0) {
                alert('Por favor, ingresa un monto válido.');
                return;
            }
            if (!description) {
                alert('Por favor, ingresa una descripción.');
                return;
            }
            if (!fundId) {
                alert('Por favor, selecciona un fondo.');
                return;
            }

            store.addHistoryEntry({
                fundId,
                amount,
                description,
                type: 'out'
            });

            // Reset inputs
            amountInput.value = '';
            descInput.value = '';
            charCount.textContent = '0/30';
            fundSelect.selectedIndex = 0;
        });
    }

    function renderHistory() {
        const historyList = container.querySelector('#history-list');
        const allHistory = store.state.history.filter(h => h.type === 'out');
        const funds = store.getFunds();

        if (allHistory.length === 0) {
            historyList.innerHTML = '<p class="empty-history">Sin movimientos registrados</p>';
            return;
        }

        historyList.innerHTML = allHistory.map(h => {
            const fund = funds.find(f => f.id === h.fundId);
            const fundName = fund ? fund.title : 'Desconocido';
            return `
                <div class="history-item" data-id="${h.id}" style="position: relative; overflow: hidden; cursor: default;">
                    <div class="history-item-content" style="width: 100%; transition: transform 0.2s;">
                        <div class="history-item-top">
                            <span class="history-item-desc">${h.description}</span>
                            <span class="history-item-amount">-$${h.amount.toLocaleString()}</span>
                        </div>
                        <span class="history-item-fund">${fundName}</span>
                    </div>
                    <div class="delete-hint">BORRAR</div>
                </div>
            `;
        }).join('');

        // Add long-press listeners
        historyList.querySelectorAll('.history-item').forEach(item => {
            let pressTimer;
            const startPress = () => {
                item.classList.add('pressing');
                pressTimer = setTimeout(() => {
                    item.querySelector('.delete-hint').classList.add('visible');
                    item.querySelector('.history-item-content').style.transform = 'translateX(-80px)';

                    // Enable delete click
                    item.onclick = (e) => {
                        e.stopPropagation();
                        store.removeHistoryEntry(item.dataset.id);
                        renderHistory();
                    };
                }, 800);
            };

            const cancelPress = () => {
                clearTimeout(pressTimer);
                item.classList.remove('pressing');
            };

            item.addEventListener('mousedown', startPress);
            item.addEventListener('touchstart', startPress);
            item.addEventListener('mouseup', cancelPress);
            item.addEventListener('mouseleave', cancelPress);
            item.addEventListener('touchend', cancelPress);
        });
    }

    render();
    document.addEventListener('stateChanged', () => {
        // Re-render history and update dropdown if funds changed
        const fundSelect = container.querySelector('#expense-fund');
        const currentFundId = fundSelect.value;

        // Update dropdown options
        fundSelect.innerHTML = `
            <option value="" disabled ${!currentFundId ? 'selected' : ''}>fondo</option>
            ${store.getFunds().map(f => `<option value="${f.id}" ${f.id === currentFundId ? 'selected' : ''}>${f.title}</option>`).join('')}
        `;

        renderHistory();
    });

    return container;
}


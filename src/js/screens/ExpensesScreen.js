import { store } from '../store/Store.js';

// ── Inject expenses styles once ──────────────────────────────────────────────
(function injectExpensesStyles() {
    if (document.getElementById('expenses-styles')) return;
    const style = document.createElement('style');
    style.id = 'expenses-styles';
    style.textContent = `
        .expenses-screen {
            padding: var(--spacing-md);
            padding-bottom: 120px;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        .expenses-card {
            background: linear-gradient(145deg, rgba(30,30,35,0.9), rgba(20,20,25,0.9));
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            padding: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .expenses-inputs-row {
            display: flex;
            gap: 12px;
            justify-content: space-between;
        }
        .expenses-input-container {
            flex: 1;
            min-width: 0;
        }
        .expenses-field {
            width: 100%;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px 10px;
            color: white;
            font-size: 14px;
            font-family: var(--font-family-base);
            transition: all 0.2s;
        }
        .expenses-field:focus {
            outline: none;
            background: rgba(255,255,255,0.15);
            border-color: var(--color-primary);
        }
        .expenses-field::placeholder { color: rgba(255,255,255,0.5); }
        .expenses-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            padding-right: 30px;
        }
        .btn-save {
            background: linear-gradient(135deg,#b194d9,#7c5cb7);
            border: none;
            border-radius: 50px;
            padding: 12px 30px;
            color: white;
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            align-self: center;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(124,92,183,0.4);
            letter-spacing: 1px;
        }
        .btn-save:active { transform: scale(0.95); opacity: 0.9; }
        .history-section { display: flex; flex-direction: column; gap: var(--spacing-md); }
        .history-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--color-text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding-left: 10px;
        }
        .history-card {
            background: linear-gradient(145deg, rgba(30,30,35,0.9), rgba(20,20,25,0.9));
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            min-height: 120px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            padding: var(--spacing-md);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .char-counter {
            font-size: 10px;
            color: var(--color-text-secondary);
            text-align: right;
            margin-top: 4px;
        }
        .history-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            position: relative;
            overflow: hidden;
            cursor: default;
        }
        .history-item:last-child { border-bottom: none; padding-bottom: 0; }
        .history-item.pressing { background: rgba(255,255,255,0.05); }
        .history-item-top { display: flex; justify-content: space-between; align-items: center; }
        .history-item-desc { color: white; font-size: 14px; font-weight: 500; }
        .history-item-amount { color: #ff4d4d; font-weight: 900; font-size: 14px; }
        .history-item-fund { color: rgba(236,236,236,0.4); font-size: 11px; }
        .history-item-content { position: relative; z-index: 1; pointer-events: none; }
        .empty-history { text-align: center; color: var(--color-text-secondary); font-size: 13px; margin: auto; }
        .delete-hint {
            position: absolute;
            right: 0; top: 0;
            height: 100%;
            background: #ff4d4d;
            color: white;
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 10px;
            font-weight: 900;
            transform: translateX(100%);
            transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
            z-index: 2;
            cursor: pointer;
        }
        .delete-hint.visible { transform: translateX(0); }
    `;
    document.head.appendChild(style);
})();

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
                                <option value="" disabled selected>Fondo</option>
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
            <option value="" disabled ${!currentFundId ? 'selected' : ''}>Fondo</option>
            ${store.getFunds().map(f => `<option value="${f.id}" ${f.id === currentFundId ? 'selected' : ''}>${f.title}</option>`).join('')}
        `;

        renderHistory();
    });

    return container;
}


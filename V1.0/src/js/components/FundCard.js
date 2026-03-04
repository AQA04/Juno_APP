import { createDoughnutChart } from './DoughnutChart.js';
import { createTooltip } from './Tooltip.js';
import { createModal } from './Modal.js';
import { store } from '../store/Store.js';

export function createFundCard(fund) {
    const { id, title, percentage = 0, isMandatory, description, tip, spent = 0, color = '#4fd1ed' } = fund;
    const mode = store.getFundsMode();
    const netIncome = store.getNetIncome();

    const item = document.createElement('div');
    item.className = 'fund-item';

    // Use raw percentage for money calculation
    const limitAmount = parseFloat((netIncome * (percentage / 100)).toFixed(2));
    const roundedPercentage = parseFloat(percentage.toFixed(1));
    const availableAmount = parseFloat((limitAmount - spent).toFixed(2));

    const displayValue = mode === 'percent'
        ? `${roundedPercentage}%`
        : `$${Math.round(limitAmount).toLocaleString()}`;

    const labelText = mode === 'percent'
        ? `Disponible: <b>$${availableAmount.toLocaleString()}</b>`
        : `Ingreso: <b>${roundedPercentage}%</b>`;

    const cardContent = `
        <div class="fund-chart-container" style="pointer-events: none;">
            ${createDoughnutChart(roundedPercentage, spent, limitAmount, color)}
        </div>
        <div class="fund-available" style="pointer-events: none;">${labelText}</div>
        <div class="input-wrapper" style="position: relative; z-index: 5;">
            <input type="text" class="fund-input-percentage" value="${displayValue}" data-id="${id}">
        </div>
    `;

    item.innerHTML = `
        <div class="fund-title">${title}</div>
        <div class="fund-card" id="card-${id}" style="cursor: pointer;">
            ${cardContent}
        </div>
    `;

    const cardElement = item.querySelector('.fund-card');

    const stopProp = (e) => e.stopPropagation();
    const input = item.querySelector('input');
    if (input) input.onclick = stopProp;

    // Add Tooltip (Inside Card)
    if (isMandatory) {
        const tooltip = createTooltip(title, description, tip, true);
        tooltip.onclick = stopProp;
        cardElement.appendChild(tooltip);
    }

    // History Modal Trigger
    cardElement.onclick = () => {
        const renderHistory = (modal) => {
            const history = store.getHistory(id);
            const historyList = modal.querySelector('.history-list');
            historyList.innerHTML = `
                ${history.length === 0 ? '<p style="text-align:center; color: var(--color-text-secondary); font-size: 13px;">Sin movimientos registrados</p>' : ''}
                ${history.map(h => `
                    <div class="history-item" data-id="${h.id}" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; cursor: default; transition: background 0.2s; position: relative; overflow: hidden;">
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <span style="font-size: 13px; color: white; font-weight: 600;">${h.description}</span>
                            <span style="font-size: 10px; color: var(--color-text-secondary);">${h.date}</span>
                        </div>
                        <span style="font-size: 14px; font-weight: 900; color: ${h.type === 'in' ? '#50c878' : '#ff4d4d'};">
                            ${h.type === 'in' ? '+' : '-'} $${parseInt(h.amount).toLocaleString()}
                        </span>
                        <div class="delete-hint" style="position:absolute; right:0; top:0; height:100%; background: #ff4d4d; color: white; display: flex; align-items:center; padding: 0 15px; font-size: 10px; font-weight:bold; transform: translateX(100%); transition: transform 0.2s;">BORRAR</div>
                    </div>
                `).join('')}
            `;

            historyList.querySelectorAll('.history-item').forEach(item => {
                let hTimer;
                const startHPress = () => {
                    item.style.background = 'rgba(255,255,255,0.1)';
                    hTimer = setTimeout(() => {
                        item.querySelector('.delete-hint').style.transform = 'translateX(0)';
                        item.onclick = (e) => {
                            e.stopPropagation();
                            store.removeHistoryEntry(item.dataset.id);
                            renderHistory(modal);
                        };
                    }, 800);
                };
                const cancelHPress = () => {
                    clearTimeout(hTimer);
                    item.style.background = 'rgba(255,255,255,0.03)';
                };
                item.addEventListener('mousedown', startHPress);
                item.addEventListener('touchstart', startHPress);
                item.addEventListener('mouseup', cancelHPress);
                item.addEventListener('mouseleave', cancelHPress);
                item.addEventListener('touchend', cancelHPress);
            });
        };

        const modal = createModal({
            title: `Historial: ${title}`,
            confirmText: 'Cerrar',
            content: `
                <p style="text-align:center; font-size: 10px; color: var(--color-text-secondary); margin-bottom: 10px;">Mantén presionado para borrar</p>
                <div class="history-list" style="max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; width: 100%;">
                </div>
            `,
            onConfirm: () => true
        });
        document.body.appendChild(modal);
        renderHistory(modal);
    };

    // Card Level Long Press
    let pressTimer;
    const startPress = (e) => {
        if (isMandatory) return;
        cardElement.classList.add('pressing');
        pressTimer = setTimeout(() => showDeleteOverlay(), 800);
    };
    const cancelPress = () => {
        clearTimeout(pressTimer);
        cardElement.classList.remove('pressing');
    };

    const showDeleteOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'delete-overlay';
        overlay.innerHTML = `
            <div style="font-size: 20px; margin-bottom: 12px;">🗑️</div>
            <button class="btn-confirm-delete" style="background: white; color: #ff4d4d; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 900; font-size: 13px; cursor: pointer;">Borrar Fondo</button>
            <button class="btn-cancel-delete" style="background: transparent; border: none; color: white; margin-top: 12px; font-size: 11px; cursor: pointer; text-decoration: underline;">Cancelar</button>
        `;
        overlay.onclick = stopProp;
        cardElement.appendChild(overlay);

        overlay.querySelector('.btn-confirm-delete').onclick = (e) => { e.stopPropagation(); store.removeFund(id); };
        overlay.querySelector('.btn-cancel-delete').onclick = (e) => { e.stopPropagation(); overlay.remove(); };
    };

    cardElement.addEventListener('mousedown', startPress);
    cardElement.addEventListener('touchstart', startPress);
    cardElement.addEventListener('mouseup', cancelPress);
    cardElement.addEventListener('mouseleave', cancelPress);
    cardElement.addEventListener('touchend', cancelPress);

    if (input) {
        input.addEventListener('input', (e) => {
            if (mode === 'currency') {
                let rawValue = e.target.value.replace(/\D/g, '');
                if (rawValue) {
                    e.target.value = `$${parseInt(rawValue).toLocaleString()}`;
                } else {
                    e.target.value = '';
                }
            }
        });

        input.addEventListener('focus', () => {
            const raw = input.value.replace(/\D/g, '');
            input.value = (raw === '0') ? '' : raw;
        });

        input.addEventListener('blur', () => {
            const raw = input.value.replace(/\D/g, '');
            let p = percentage;
            if (raw !== '') {
                const val = parseFloat(raw);
                if (mode === 'percent') {
                    p = Math.min(100, val || 0);
                } else {
                    p = Math.min(100, (val / netIncome) * 100 || 0);
                }
                store.updateFund(id, { percentage: p });
            } else {
                // Restore formatted value
                const limitAmount = parseFloat((netIncome * (percentage / 100)).toFixed(2));
                const roundedPercentage = parseFloat(percentage.toFixed(1));
                input.value = mode === 'percent'
                    ? `${roundedPercentage}%`
                    : `$${Math.round(limitAmount).toLocaleString()}`;
            }
        });
    }

    return item;
}

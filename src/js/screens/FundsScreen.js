import { createFundCard } from '../components/FundCard.js';
import { createModal } from '../components/Modal.js';
import { store } from '../store/Store.js';

export function createFundsScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.style.cssText = `
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;

    function renderContent() {
        container.innerHTML = '';
        const mode = store.getFundsMode();
        const funds = store.getFunds();
        const netIncome = store.getNetIncome();

        // Header
        const header = document.createElement('div');
        header.className = 'funds-header';
        header.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            width: 100%;
            flex-shrink: 0;
            background: transparent;
        `;

        header.innerHTML = `
            <div class="mode-switch-wrapper" style="width: 60px; display: flex; justify-content: flex-start;">
                <div class="switch ${mode === 'percent' ? 'on' : 'off'}">
                    <div class="handle" data-label="${mode === 'percent' ? '%' : '$'}"></div>
                </div>
            </div>
            
            <h1 class="screen-title" style="flex: 1; margin: 0; text-align: center;">FONDOS</h1>
            
            <div class="fab-wrapper" style="width: 60px; display: flex; justify-content: flex-end;">
                <button class="btn-fab-create" id="btn-add-fund" style="position: static; transform: none;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        `;
        container.appendChild(header);

        header.querySelector('.switch').onclick = () => {
            store.setFundsMode(mode === 'percent' ? 'currency' : 'percent');
        };

        header.querySelector('#btn-add-fund').onclick = () => {
            const colors = ['#4fd1ed', '#ffb347', '#b194d9', '#50c878', '#ff69b4'];
            const isPercent = mode === 'percent';

            const m = createModal({
                title: 'Nuevo Fondo',
                content: `
                    <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
                        <input type="text" id="m-f-name" placeholder="Nombre" class="fund-input-percentage" style="width: 100%; max-width: none; text-align: left; background: rgba(255,255,255,0.05); padding: 12px 15px;">
                        
                        <input type="text" id="m-f-val" 
                            placeholder="${isPercent ? 'Porcentaje (%)' : 'Monto ($)'}" 
                            class="fund-input-percentage ${isPercent ? '' : 'money-input'}" 
                            style="width: 100%; max-width: none; text-align: left; background: rgba(255,255,255,0.05); padding: 12px 15px;">
                        
                        <p style="color: var(--color-text-secondary); font-size: 11px; margin-top: 10px; margin-bottom: 5px; text-align: center;">Elige un color:</p>
                        <div style="display:flex; justify-content:center; gap:12px;">
                            ${colors.map(c => `<div class="color-opt" data-color="${c}" style="width:32px; height:32px; border-radius:50%; background:${c}; cursor:pointer; border:2px solid transparent; transition: transform 0.2s;"></div>`).join('')}
                        </div>
                    </div>
                    <input type="hidden" id="m-f-color" value="${colors[0]}">
                `,
                onConfirm: (modal) => {
                    const n = modal.querySelector('#m-f-name').value;
                    const vRaw = modal.querySelector('#m-f-val').value.replace(/\D/g, '');
                    const v = parseFloat(vRaw);
                    const c = modal.querySelector('#m-f-color').value;

                    if (n && !isNaN(v)) {
                        let p = v;
                        if (!isPercent) {
                            p = (v / netIncome) * 100;
                        }
                        store.addFund({ title: n, percentage: Math.min(100, p), color: c });
                        return true;
                    }
                    return false;
                }
            });
            document.body.appendChild(m);

            const valInp = m.querySelector('#m-f-val');

            valInp.oninput = (e) => {
                if (!isPercent) {
                    let rawValue = e.target.value.replace(/\D/g, '');
                    if (rawValue) {
                        e.target.value = `$${parseInt(rawValue).toLocaleString()}`;
                    } else {
                        e.target.value = '';
                    }
                }
            };

            valInp.onblur = () => {
                const val = valInp.value.replace(/\D/g, '');
                if (val && parseFloat(val) !== 0) {
                    if (isPercent) {
                        valInp.value = `${Math.min(100, parseFloat(val))}%`;
                    } else {
                        valInp.value = `$${parseFloat(val).toLocaleString()}`;
                    }
                } else {
                    valInp.value = '';
                }
            };
            valInp.onfocus = () => {
                const val = valInp.value.replace(/\D/g, '');
                valInp.value = (val === '0') ? '' : val;
            };

            m.querySelectorAll('.color-opt').forEach(opt => {
                opt.onclick = () => {
                    m.querySelectorAll('.color-opt').forEach(o => {
                        o.style.borderColor = 'transparent';
                        o.style.transform = 'scale(1)';
                    });
                    opt.style.borderColor = 'white';
                    opt.style.transform = 'scale(1.2)';
                    m.querySelector('#m-f-color').value = opt.dataset.color;
                };
            });
            const firstOpt = m.querySelector('.color-opt');
            if (firstOpt) {
                firstOpt.style.borderColor = 'white';
                firstOpt.style.transform = 'scale(1.2)';
            }
        };

        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'funds-scroll-container';

        const grid = document.createElement('div');
        grid.className = 'funds-grid';

        funds.forEach(fund => grid.appendChild(createFundCard(fund)));

        scrollContainer.appendChild(grid);
        container.appendChild(scrollContainer);
    }

    renderContent();
    document.addEventListener('stateChanged', renderContent);
    return container;
}

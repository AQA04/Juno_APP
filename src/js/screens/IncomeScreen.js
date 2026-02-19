import { createInput } from '../components/Input.js';
import { createSelect } from '../components/Select.js';
import { createButton } from '../components/Button.js';
import { store } from '../store/Store.js';

export function createIncomeScreen() {
    const savedData = store.getIncomeData();
    const container = document.createElement('div');
    container.className = 'screen-container';

    const content = document.createElement('div');
    content.className = 'screen-content';
    container.appendChild(content);

    // Title modified to be tighter
    const title = document.createElement('h1');
    title.innerText = 'INGRESOS';
    title.className = 'text-center';
    title.style.cssText = `
        font-size: 1.5rem; /* Smaller title */
        font-weight: 900;
        letter-spacing: 1px;
        margin-bottom: var(--spacing-md);
        text-transform: uppercase;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        flex-shrink: 0;
    `;

    // Form Container (Card-like)
    const form = document.createElement('div');
    form.className = 'card';
    // Use flex properties to make the card take available space but NOT overflow
    form.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: var(--spacing-md);
    `;

    // 1. Ingreso Neto Input
    const salaryInput = createInput({
        label: 'Ingreso neto',
        type: 'money',
        value: savedData.net || '',
        placeholder: "1'000'000",
        id: 'salary',
        onInput: (e) => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value) {
                e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
            }
        }
    });

    // Row for Hours and Days
    const timesRow = document.createElement('div');
    timesRow.className = 'flex gap-md';
    timesRow.style.width = '100%';

    const hoursInput = createInput({
        label: 'Horas', // Shortened label
        type: 'number',
        value: savedData.hours || '',
        placeholder: '8',
        id: 'hours',
        onInput: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });
    hoursInput.style.flex = '1';
    hoursInput.querySelector('input').style.width = '100%';

    const daysInput = createInput({
        label: 'Días', // Shortened label
        type: 'number',
        value: savedData.days || '',
        placeholder: '5',
        id: 'days',
        onInput: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });
    daysInput.style.flex = '1';
    daysInput.querySelector('input').style.width = '100%';

    timesRow.appendChild(hoursInput);
    timesRow.appendChild(daysInput);

    // Selector
    const frequencySelect = createSelect({
        label: 'Frecuencia', // Shortened label
        id: 'frequency',
        value: savedData.frequency || 'quincenal',
        options: [
            { value: 'quincenal', label: 'Quincenal' },
            { value: 'mensual', label: 'Mensual' },
            { value: 'trimestral', label: 'Trimestral' }
        ]
    });

    // Button with Icon
    const saveBtn = createButton({
        text: '',
        onClick: () => {
            // Save data to store
            const net = salaryInput.querySelector('input').value;
            const hours = hoursInput.querySelector('input').value;
            const days = daysInput.querySelector('input').value;
            const frequency = frequencySelect.querySelector('select').value;

            store.setIncomeData({ net, hours, days, frequency });

            const btn = document.querySelector('.btn-primary');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Guardado';
            setTimeout(() => btn.innerHTML = originalContent, 2000);
        }
    });

    // Set content with icon
    saveBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <path d="M17 21v-8H7v8" fill="rgba(0,0,0,0.2)"/> 
            <path d="M7 3v5h8V3" fill="rgba(0,0,0,0.2)"/>
        </svg>
        Guardar
    `;
    saveBtn.style.display = 'flex';
    saveBtn.style.justifyContent = 'center';
    saveBtn.style.alignItems = 'center';
    saveBtn.style.marginTop = 'var(--spacing-lg)'; // Fixed margin instead of auto

    form.appendChild(salaryInput);
    form.appendChild(timesRow);
    form.appendChild(frequencySelect);
    form.appendChild(saveBtn);

    content.appendChild(title);
    content.appendChild(form);

    return container;
}

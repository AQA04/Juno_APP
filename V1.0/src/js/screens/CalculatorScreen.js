import { createInput } from '../components/Input.js';
import { store } from '../store/Store.js';

export function createCalculatorScreen() {
    const incomeData = store.getIncomeData();

    // Calculate Hourly Rate
    const netIncome = parseFloat(incomeData.net.replace(/[^0-9]/g, '')) || 0;
    const hoursPerDay = parseFloat(incomeData.hours) || 0;
    const daysPerWeek = parseFloat(incomeData.days) || 0;

    // Weeks per frequency
    const weeksMap = {
        'quincenal': 2,
        'mensual': 4,
        'trimestral': 12
    };
    const weeks = weeksMap[incomeData.frequency] || 4;

    const totalHoursPerPeriod = hoursPerDay * daysPerWeek * weeks;
    const hourlyRate = totalHoursPerPeriod > 0 ? netIncome / totalHoursPerPeriod : 0;

    const container = document.createElement('div');
    container.className = 'screen-container';

    const content = document.createElement('div');
    content.className = 'screen-content';
    container.appendChild(content);

    // Header
    const header = document.createElement('h1');
    header.className = 'screen-title'; // Use standard class
    header.textContent = 'CALCULADORA';
    content.appendChild(header);

    const calcWrapper = document.createElement('div');
    calcWrapper.className = 'calculator-container';
    content.appendChild(calcWrapper);

    // --- Section 1: Dinero-Tiempo ---
    const section1 = document.createElement('div');
    section1.className = 'calculator-section';

    const title1 = document.createElement('div');
    title1.className = 'section-title';
    title1.innerHTML = `<span>$</span> Dinero → Tiempo`;
    section1.appendChild(title1);

    const currencyInput = createInput({
        label: '¿Cuánto cuesta?',
        type: 'text',
        placeholder: '$ 0',
        id: 'money-input'
    });

    const inputEl1 = currencyInput.querySelector('input');

    const resultCard1 = createResultCard('Tiempo de trabajo equivalente', '0 días y 0 horas', 'Eso es lo que tendrías que trabajar para pagarlo ⏰');
    resultCard1.classList.add('hidden');

    // Currency Formatting & Logic
    inputEl1.addEventListener('input', (e) => {
        let rawValue = e.target.value.replace(/\D/g, '');
        if (rawValue) {
            // Format input
            e.target.value = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(rawValue);

            // Calculation
            if (hourlyRate > 0) {
                const totalHoursNeeded = parseFloat(rawValue) / hourlyRate;
                const d = Math.floor(totalHoursNeeded / (hoursPerDay || 8)); // Fallback to 8 if not defined
                const h = Math.round(totalHoursNeeded % (hoursPerDay || 8));

                resultCard1.querySelector('.result-value').textContent = `${d} días y ${h} horas`;
                resultCard1.classList.remove('hidden');
            }
        } else {
            e.target.value = '';
            resultCard1.classList.add('hidden');
        }
    });

    section1.appendChild(currencyInput);
    section1.appendChild(resultCard1);
    calcWrapper.appendChild(section1);

    // --- Arrow Divider ---
    const arrow = document.createElement('div');
    arrow.className = 'arrow-divider';
    arrow.innerHTML = '↓';
    calcWrapper.appendChild(arrow);

    // --- Section 2: Tiempo-Dinero ---
    const section2 = document.createElement('div');
    section2.className = 'calculator-section';

    const title2 = document.createElement('div');
    title2.className = 'section-title';
    title2.innerHTML = `<span>⏱</span> Tiempo → Dinero`;
    section2.appendChild(title2);

    const gridInputs = document.createElement('div');
    gridInputs.className = 'grid-2-col';

    const daysInput = createInput({
        label: 'Días',
        type: 'number',
        placeholder: '0',
        id: 'days-input'
    });

    const hoursInput = createInput({
        label: 'Hora',
        type: 'number',
        placeholder: '0',
        id: 'hours-input'
    });

    gridInputs.appendChild(daysInput);
    gridInputs.appendChild(hoursInput);
    section2.appendChild(gridInputs);

    const resultCard2 = createResultCard('Dinero generado', '$ 0', 'Este es el valor de tu tiempo dedicado');
    resultCard2.classList.add('hidden');

    // Auto-show logic for Section 2
    const calculate2 = () => {
        const d = parseFloat(daysInput.querySelector('input').value) || 0;
        const h = parseFloat(hoursInput.querySelector('input').value) || 0;

        if (d > 0 || h > 0) {
            const totalMoney = ((d * (hoursPerDay || 8)) + h) * hourlyRate;

            resultCard2.querySelector('.result-value').textContent = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(totalMoney);

            resultCard2.classList.remove('hidden');
        } else {
            resultCard2.classList.add('hidden');
        }
    };

    daysInput.querySelector('input').addEventListener('input', calculate2);
    hoursInput.querySelector('input').addEventListener('input', calculate2);

    section2.appendChild(resultCard2);
    calcWrapper.appendChild(section2);

    return container;
}

function createResultCard(label, value, subtext) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <div class="result-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${label}
        </div>
        <div class="result-value">${value}</div>
        <div class="result-subtext">${subtext}</div>
    `;
    return card;
}

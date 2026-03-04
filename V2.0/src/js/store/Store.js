/**
 * Store.js
 * Simple state management using localStorage
 */

const STORAGE_KEY = 'juno_app_data';

class Store {
    constructor() {
        this.state = {
            income: {
                net: '',
                hours: '',
                days: '',
                frequency: 'quincenal'
            },
            funds: [
                { id: 'fixed', title: 'Gastos fijos', percentage: 50, isMandatory: true, color: '#4fd1ed', description: 'Tus gastos necesarios para vivir (arriendo, servicios, etc).', tip: 'Lo ideal es que no superen el 50% de tus ingresos.' },
                { id: 'debts', title: 'Deudas', percentage: 10, isMandatory: true, color: '#ffb347', description: 'Pagos obligatorios a terceros.', tip: 'Las deudas no deben sobrepasar el 30% de tus ingresos.' },
                { id: 'emergency', title: 'Fondo de emergencia', percentage: 10, isMandatory: true, color: '#b194d9', description: 'Dinero reservado para imprevistos.', tip: 'Deberían ser tus gastos fijos de 3 meses como mínimo.' }
            ],
            history: [], // [{ id, fundId, amount, date, description, type: 'in'|'out' }]
            fundsMode: 'percent' // 'percent' or 'currency'
        };
        this.load();
    }

    load() {
        try {
            const serialized = localStorage.getItem(STORAGE_KEY);
            if (serialized) {
                const loaded = JSON.parse(serialized);
                // Ensure bonuses is removed if it existed in previous storage
                if (loaded.bonuses) delete loaded.bonuses;

                this.state = { ...this.state, ...loaded };
                if (!this.state.history) this.state.history = [];
            }
        } catch (e) {
            console.error('Failed to load data from localStorage', e);
        }
    }

    save() {
        try {
            const serialized = JSON.stringify(this.state);
            localStorage.setItem(STORAGE_KEY, serialized);
        } catch (e) {
            console.error('Failed to save data to localStorage', e);
        }
    }

    // Income
    getIncomeData() { return this.state.income; }
    getNetIncome() {
        const net = (this.state.income.net || '0').toString().replace(/[^0-9]/g, '');
        return parseFloat(net) || 0;
    }
    setIncomeData(data) {
        this.state.income = { ...this.state.income, ...data };
        this.save();
        document.dispatchEvent(new CustomEvent('stateChanged'));
    }

    // Funds
    getFunds() { return this.state.funds; }
    getFundsMode() { return this.state.fundsMode; }
    setFundsMode(mode) {
        this.state.fundsMode = mode;
        this.save();
        document.dispatchEvent(new CustomEvent('stateChanged'));
    }

    addFund(fund) {
        const newFund = { id: Date.now().toString(), isMandatory: false, spent: 0, color: '#4fd1ed', ...fund };
        this.state.funds.push(newFund);
        this.save();
        document.dispatchEvent(new CustomEvent('stateChanged'));
    }

    updateFund(id, updates) {
        const index = this.state.funds.findIndex(f => f.id === id);
        if (index !== -1) {
            this.state.funds[index] = { ...this.state.funds[index], ...updates };
            this.save();
            document.dispatchEvent(new CustomEvent('stateChanged'));
        }
    }

    removeFund(id) {
        this.state.funds = this.state.funds.filter(f => f.id !== id || f.isMandatory);
        this.save();
        document.dispatchEvent(new CustomEvent('stateChanged'));
    }

    // History
    addHistoryEntry({ fundId, amount, description, type, date }) {
        const entry = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            fundId,
            amount: parseFloat(amount) || 0,
            description: description || 'Sin descripción',
            type: type || 'out',
            date: date || new Date().toISOString().split('T')[0]
        };
        this.state.history.unshift(entry);

        if (type === 'out') {
            const fund = this.state.funds.find(f => f.id === fundId);
            if (fund) {
                fund.spent = (fund.spent || 0) + entry.amount;
            }
        }

        this.save();
        document.dispatchEvent(new CustomEvent('stateChanged'));
    }

    getHistory(fundId) {
        return this.state.history.filter(h => h.fundId === fundId);
    }

    removeHistoryEntry(entryId) {
        const idx = this.state.history.findIndex(h => h.id === entryId);
        if (idx !== -1) {
            const entry = this.state.history[idx];

            if (entry.type === 'out') {
                const fund = this.state.funds.find(f => f.id === entry.fundId);
                if (fund) {
                    fund.spent = Math.max(0, (fund.spent || 0) - entry.amount);
                }
            }

            this.state.history.splice(idx, 1);
            this.save();
            document.dispatchEvent(new CustomEvent('stateChanged'));
        }
    }
}

export const store = new Store();

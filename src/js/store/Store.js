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
            }
        };
        this.load();
    }

    // Load state from localStorage
    load() {
        try {
            const serialized = localStorage.getItem(STORAGE_KEY);
            if (serialized) {
                const loaded = JSON.parse(serialized);
                // Merge loaded data with initial state structure to ensure compatibility
                this.state = { ...this.state, ...loaded };

                // Ensure deep merge for income object if it exists in loaded data
                if (loaded.income) {
                    this.state.income = { ...this.state.income, ...loaded.income };
                }
            }
        } catch (e) {
            console.error('Failed to load data from localStorage', e);
        }
    }

    // Save state to localStorage
    save() {
        try {
            const serialized = JSON.stringify(this.state);
            localStorage.setItem(STORAGE_KEY, serialized);
            console.log('Data saved:', this.state);
        } catch (e) {
            console.error('Failed to save data to localStorage', e);
        }
    }

    // Getters and Setters for Income Data
    getIncomeData() {
        return this.state.income;
    }

    setIncomeData(data) {
        this.state.income = { ...this.state.income, ...data };
        this.save();
    }
}

// Export as singleton
export const store = new Store();

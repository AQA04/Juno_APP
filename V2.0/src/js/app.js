import { createIncomeScreen } from './screens/IncomeScreen.js';
import { createExpensesScreen } from './screens/ExpensesScreen.js';
import { createFundsScreen } from './screens/FundsScreen.js';
import { createCalculatorScreen } from './screens/CalculatorScreen.js';
import { createWrappedScreen } from './screens/WrappedScreen.js';
import { createNavbar } from './components/Navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // State
    let currentScreen = 'income'; // Default screen changed to income

    // Screen Map
    const screens = {
        'expenses': createExpensesScreen,
        'funds': createFundsScreen,
        'calculator': createCalculatorScreen,
        'wrapped': createWrappedScreen,
        'income': createIncomeScreen // Changed key from salary
    };

    function render() {
        // Clear app
        app.innerHTML = '';

        // Render content
        const screenFn = screens[currentScreen] || screens['income']; // Fallback to income
        const screenComponent = screenFn();
        app.appendChild(screenComponent);

        // Render Navbar (Fixed position, so appending it to app or body works, 
        // but putting it in app makes it easier to clear/manage if we wanted to)
        // However, navbar uses fixed positioning relative to viewport usually.
        // Let's append to app to keep it self-contained.
        const navbar = createNavbar(currentScreen);
        app.appendChild(navbar);

        // Manage body scroll based on screen
        if (currentScreen === 'calculator') {
            document.body.style.overflowY = 'auto';
        } else {
            document.body.style.overflowY = 'hidden';
            window.scrollTo(0, 0); // Reset scroll when leaving calculator
        }

        // Update Scroll position? Usually reset to top
        window.scrollTo(0, 0);
    }

    // Initial Render
    render();

    // Event Listener for Navigation
    document.addEventListener('navigate', (e) => {
        const nextScreen = e.detail.screen;
        if (nextScreen && screens[nextScreen] && nextScreen !== currentScreen) {
            currentScreen = nextScreen;
            render();
        }
    });
});

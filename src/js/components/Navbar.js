export function createNavbar(activeSection = 'income') {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  // Map section names to themes
  const themeMap = {
    'expenses': 'theme-expenses',
    'funds': 'theme-funds',
    'calculator': 'theme-calculator',
    'wrapped': 'theme-wrapped',
    'income': 'theme-income' // Changed from salary
  };

  // Apply initial theme
  if (themeMap[activeSection]) {
    navbar.classList.add(themeMap[activeSection]);
  }

  const items = [
    {
      id: 'expenses',
      label: 'Gastos',
      icon: `<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />` // Dollar Sign / Money
    },
    {
      id: 'funds',
      label: 'Fondos',
      icon: `<rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />` // Credit Card
    },
    {
      id: 'calculator',
      label: 'Calculadora',
      icon: `<rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="14" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="8" y1="14" x2="8" y2="14" /><line x1="16" y1="18" x2="16" y2="18" /><line x1="12" y1="18" x2="12" y2="18" /><line x1="8" y1="18" x2="8" y2="18" />` // Calculator
    },
    {
      id: 'wrapped',
      label: 'Wrapped',
      icon: `<path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />` // Pie Chart
    },
    {
      id: 'income',
      label: 'Ingresos',
      icon: `<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.07.9 2 2 2h4v-4h-4z" />` // Wallet
    }
  ];

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = `nav-item ${item.id === activeSection ? 'active' : ''}`;
    btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                ${item.icon}
            </svg>
            <span class="nav-label">${item.label}</span>
        `;

    btn.onclick = () => {
      // Dispatch custom event for navigation
      const event = new CustomEvent('navigate', { detail: { screen: item.id } });
      document.dispatchEvent(event);
    };

    navbar.appendChild(btn);
  });

  return navbar;
}

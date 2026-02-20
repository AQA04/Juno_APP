export function createExpensesScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.innerHTML = `
        <h1 class="screen-title">GASTOS</h1>
        <div class="card">
            <p class="text-center">Próximamente: Gestión de Gastos</p>
        </div>
    `;
    return container;
}

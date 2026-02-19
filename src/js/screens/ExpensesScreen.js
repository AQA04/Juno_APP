export function createExpensesScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.innerHTML = `
        <h1 class="text-center mb-lg" style="color:white;">GASTOS</h1>
        <div class="card">
            <p class="text-center">Próximamente: Gestión de Gastos</p>
        </div>
    `;
    return container;
}

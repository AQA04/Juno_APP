export function createFundsScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.innerHTML = `
        <h1 class="text-center mb-lg" style="color:white;">FONDOS</h1>
        <div class="card">
            <p class="text-center">Próximamente: Gestión de Fondos</p>
        </div>
    `;
    return container;
}

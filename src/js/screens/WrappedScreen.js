export function createWrappedScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.innerHTML = `
        <h1 class="text-center mb-lg" style="color:white;">WRAPPED</h1>
        <div class="card">
            <p class="text-center">Próximamente: Resumen Financiero</p>
        </div>
    `;
    return container;
}

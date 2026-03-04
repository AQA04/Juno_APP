export function createWrappedScreen() {
    const container = document.createElement('div');
    container.className = 'screen-container';
    container.innerHTML = `
        <div class="screen-content">
            <h1 class="screen-title">WRAPPED</h1>
            <div class="card">
                <p style="text-align: center; color: var(--color-text-secondary);">Próximamente: Resumen Financiero</p>
            </div>
        </div>
    `;
    return container;
}

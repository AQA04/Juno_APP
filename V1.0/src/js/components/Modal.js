export function createModal({ title, content, onConfirm, confirmText = 'Guardar' }) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
        display: flex; justify-content: center; align-items: center;
        z-index: 1000; padding: var(--spacing-md);
    `;

    const modal = document.createElement('div');
    modal.className = 'modal-content card';
    modal.style.cssText = `
        width: 100%; max-width: 340px; background: #1a1a1e;
        border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px;
        padding: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md);
    `;

    modal.innerHTML = `
        <h2 style="color: white; font-size: 1.3rem; margin-bottom: var(--spacing-sm); text-align: center; font-weight: 900;">${title}</h2>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            ${content}
        </div>
        <div class="modal-actions" style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
            <button class="btn-cancel" style="flex: 1; background: rgba(255,255,255,0.08); border: none; padding: 12px; border-radius: 12px; color: white; cursor: pointer;">Cancelar</button>
            <button class="btn-confirm" style="flex: 1; background: linear-gradient(135deg, #b194d9, #7c5cb7); border: none; padding: 12px; border-radius: 12px; color: white; font-weight: 900; cursor: pointer;">${confirmText}</button>
        </div>
    `;

    modalOverlay.appendChild(modal);

    const close = () => modalOverlay.remove();
    modal.querySelector('.btn-cancel').onclick = close;
    modal.querySelector('.btn-confirm').onclick = () => {
        if (onConfirm(modal)) close();
    };

    modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

    return modalOverlay;
}

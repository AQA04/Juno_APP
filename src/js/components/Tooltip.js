export function createTooltip(text, description, tip, isMandatory = false) {
    const container = document.createElement('div');
    container.className = 'info-tooltip-container';
    container.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    `;

    container.innerHTML = `
        <button class="info-btn" style="background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 22px; height: 22px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 200; font-family: serif;">i</button>
        <div class="tooltip-box" style="display: none; position: absolute; top: 28px; right: 0; width: 220px; background: #1a1a1e; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 15px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); pointer-events: none;">
            ${isMandatory ? `<div style="color: #ff4d4d; font-size: 16px; margin-bottom: 5px;">🔒</div>` : ''}
            <p style="font-size: 13px; margin-bottom: 10px; color: #ececec; line-height: 1.4;">${description}</p>
            <div style="font-size: 12px; color: #b194d9; font-style: italic; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                <b style="color: white; font-style: normal;">💡 Proceso:</b> ${tip}
            </div>
        </div>
    `;

    const btn = container.querySelector('.info-btn');
    const box = container.querySelector('.tooltip-box');

    btn.onclick = (e) => {
        e.stopPropagation();
        const isOpen = box.style.display === 'block';
        document.querySelectorAll('.tooltip-box').forEach(b => b.style.display = 'none');
        box.style.display = isOpen ? 'none' : 'block';
    };

    return container;
}

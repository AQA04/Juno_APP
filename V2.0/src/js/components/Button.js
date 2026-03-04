/**
 * Creates a Button component.
 * @param {Object} props
 * @param {string} props.text - Button text
 * @param {Function} props.onClick - Click handler
 * @returns {HTMLElement}
 */
export function createButton({ text, onClick }) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn-primary';

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    const style = document.createElement('style');
    style.textContent = `
    .btn-primary {
      background: linear-gradient(90deg, #9C27B0, #673AB7); /* Purple gradient closer to image */
      border: none;
      border-radius: var(--border-radius-pill);
      padding: 14px 32px;
      color: white;
      font-weight: 600;
      font-size: var(--font-size-base);
      cursor: pointer;
      width: 100%; /* Full width on mobile often looks better or centered */
      max-width: 200px;
      margin: 0 auto;
      display: block;
      box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .btn-primary:active {
      transform: scale(0.98);
    }
  `;

    if (!document.getElementById('component-styles-button')) {
        style.id = 'component-styles-button';
        document.head.appendChild(style);
    }

    return button;
}

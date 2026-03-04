/**
 * Creates an Input component.
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} props.type - Input type (text, number)
 * @param {string} props.value - Initial value
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.id - Element ID
 * @param {Function} [props.onInput] - Input event handler
 * @returns {HTMLElement} The container element with label and input
 */
export function createInput({ label, type = 'text', value = '', placeholder = '', id, onInput }) {
    const container = document.createElement('div');
    container.className = 'input-group mb-md';

    const labelEl = document.createElement('label');
    labelEl.className = 'input-label';
    labelEl.textContent = label;
    labelEl.htmlFor = id;

    const inputEl = document.createElement('input');
    inputEl.type = type === 'money' ? 'text' : type; // Handle money as text for formatting
    inputEl.className = 'input-field';
    inputEl.value = value;
    inputEl.placeholder = placeholder;
    inputEl.id = id;

    if (onInput) {
        inputEl.addEventListener('input', (e) => onInput(e));
    }

    // Styles injected here or via class in CSS
    const style = document.createElement('style');
    style.textContent = `
    .input-group {
      display: flex;
      flex-direction: column;
    }
    .input-label {
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: var(--font-size-sm);
      font-weight: 500;
    }
    .input-field {
      background: var(--color-input-bg);
      border: 1px solid var(--color-text-secondary);
      border-radius: var(--border-radius-sm);
      padding: 12px;
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      transition: border-color 0.3s;
    }
    .input-field:focus {
      border-color: var(--color-primary);
    }
  `;

    // Append style only once if not exists (optimization omitted for simplicity in this artifact)
    if (!document.getElementById('component-styles-input')) {
        style.id = 'component-styles-input';
        document.head.appendChild(style);
    }

    container.appendChild(labelEl);
    container.appendChild(inputEl);

    return container;
}

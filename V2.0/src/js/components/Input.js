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
      width: 100%;
    }
    .input-label {
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: var(--font-size-sm);
      font-weight: 500;
    }
    .input-field {
      background: var(--color-input-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--border-radius-md);
      padding: 12px;
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      transition: all 0.3s;
      width: 100%;
      box-sizing: border-box;
    }
    .input-field:focus {
      border-color: var(--color-primary);
      background: rgba(255, 255, 255, 0.1);
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

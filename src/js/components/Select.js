/**
 * Creates a Select component.
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {Array<{value: string, label: string}>} props.options - Options array
 * @param {string} props.id - Element ID
 * @returns {HTMLElement}
 */
export function createSelect({ label, options, id, value, onChange }) {
  const container = document.createElement('div');
  container.className = 'input-group mb-lg';

  const labelEl = document.createElement('label');
  labelEl.className = 'input-label';
  labelEl.textContent = label;
  labelEl.htmlFor = id;

  const selectContainer = document.createElement('div');
  selectContainer.style.position = 'relative';

  const selectEl = document.createElement('select');
  selectEl.className = 'input-field w-full';
  selectEl.id = id;
  selectEl.style.appearance = 'none'; // Remove default arrow
  selectEl.style.cursor = 'pointer';

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    selectEl.appendChild(option);
  });

  // Preselect the value if provided
  if (value !== undefined) {
    selectEl.value = value;
  }

  // Fire onChange when user picks a different option
  if (onChange) {
    selectEl.addEventListener('change', onChange);
  }

  // Custom styling arrow
  const arrow = document.createElement('div');
  arrow.innerHTML = '▼';
  arrow.style.cssText = `
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-primary);
    font-size: 0.8rem;
  `;

  selectContainer.appendChild(selectEl);
  selectContainer.appendChild(arrow);
  container.appendChild(labelEl);
  container.appendChild(selectContainer);

  return container;
}

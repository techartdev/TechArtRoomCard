import { css } from "lit";

export const editorStyles = css`
  .editor-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .section {
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 12px;
  }
  .section-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--primary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }
  .form-row:last-child {
    margin-bottom: 0;
  }
  label {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-weight: 400;
  }
  ha-entity-picker {
    width: 100%;
    display: block;
  }
  input {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    color: var(--primary-text-color);
    width: 100%;
    box-sizing: border-box;
  }
  input:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  .light-entities {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .light-entity-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 6px;
    align-items: center;
  }
  .extra-entity-row {
    display: grid;
    grid-template-columns: 1fr 92px auto;
    gap: 6px;
    align-items: center;
  }
  .precision-input {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 13px;
    color: var(--primary-text-color);
    width: 100%;
    box-sizing: border-box;
  }
  .remove-btn {
    border: 0;
    background: color-mix(in srgb, var(--error-color, #f44336) 15%, transparent);
    color: var(--error-color, #f44336);
    border-radius: 4px;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
  }
  .add-btn {
    border: 1px dashed var(--divider-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    font-size: 13px;
    width: 100%;
    margin-top: 4px;
  }
  .footer-btn-editor {
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .footer-btn-editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .footer-btn-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .footer-btn-grid .form-row {
    margin-bottom: 0;
  }
`;

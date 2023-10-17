import "./checkbox.styles.scss";

export function Checkbox({ checked, onChange }) {
  return (
    <label className="container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="checkmark"></div>
    </label>
  );
}

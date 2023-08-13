export default function InputBar({
  Label,
  Value,
  OnChange,
  Index,
  Name,
  Type,
  ClassName,
}) {
  return (
    <div className="flex flex-col m-2 p-2">
      <label htmlFor={Label}>{Label}</label>
      <input
        onChange={(event) => {
          OnChange(event, Index);
        }}
        value={Value}
        name={Name}
        className={ClassName}
        id={Label}
        type={Type}
      />
    </div>
  );
}

const Input = (props) => {
  return (
    <div className={props.error && "alert"}>
      <input
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        type={props.type}
        placeholder={props.label}
        margin="dense"
        autoComplete="off"
      />
      {props.error && <p> {props.error}</p>}
    </div>
  );
}

export default Input

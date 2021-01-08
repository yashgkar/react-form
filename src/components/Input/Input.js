import styles from './Input.less';

const Input = (props) => {
  return (
    <>
      <label className={styles.formLabel}>{props.label}</label>
      <input
        className={styles.formInput}
        type={props.type}
        value={props.value}
        onBlur={props.onBlur}
        name={props.name}
        onChange={(e) => props.onChange(e, props.type)}
      />
    </>
  );
};

export default Input;

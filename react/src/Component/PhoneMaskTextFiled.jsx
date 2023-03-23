import MyTextField from "../Component/TextField";

const PhoneMaskTextFiled = (props) => {
  return (
<PhoneMaskTextFiled
  mask="+7(999) 999 99 99"
  value={this.state.phone}
  disabled={false}
  maskChar=" "
>
  {() => <MyTextField />}
</PhoneMaskTextFiled>
);
}

export default PhoneMaskTextFiled

import React from 'react';
import {TextField} from "@mui/material";

const MyTextField = (props) => {
  return (
      <TextField
        onChange={ e => props.onChange(e.target.value)}
        value={props.value}
        type={props.type}
        label={props.label}
        autoComplete={props.label}
        fullWidth
        margin="dense"
        error={ props.error?.length > 0}
        helperText={props.error}
        InputProps={props.InputProps}
      />
  );
}

export default MyTextField


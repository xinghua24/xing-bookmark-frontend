import React from "react";
import TextField from "@material-ui/core/TextField";
import { FieldAttributes, useField } from "formik";

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "input",
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      variant="outlined"
      margin="normal"
      type={type}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;

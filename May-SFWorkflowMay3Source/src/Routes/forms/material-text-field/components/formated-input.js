import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs() {
  const [textmask, setTextmask] = useState('(1  )    -    ');
  const [numberformat, setNumberformat] = useState('1320');

  const handleChange = (event, name) => {
    name(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-sm-6 col-md-6 col-xl-4">
        <Input fullWidth value={textmask} inputComponent={TextMaskCustom}
          onChange={(event) => handleChange(event, setTextmask)}
          inputProps={{ 'aria-label': 'Description', }}
        />
      </div>
      <div className="col-sm-6 col-md-6 col-xl-4">
        <Input fullWidth value={numberformat} onChange={(event) => handleChange(event, setNumberformat)}
          inputComponent={NumberFormatCustom}
          inputProps={{ 'aria-label': 'Description', }}
        />
      </div>
    </div>
  )
}

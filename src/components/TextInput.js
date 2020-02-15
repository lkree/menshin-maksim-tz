import React, {useEffect, useState} from "react";
import {Input, GridRow, GridColumn, FormField} from "semantic-ui-react";

const TextInput = ({solo, label, data, index, validate, setState, state, computer, mobile, ...props}) => {
  const {error: stateError} = state[label];
  const [error, setError] = useState({content: false});
  const onInputChange = (_, {value}) => {
    const {onlyNumbers, length: {max, min}} = validate;
    const {required} = props;

    if (required) {
      value.length < min && setError({
        content: 'input value is too short'
      });
      value.length  > max && setError({
        content: 'input value is too long'
      });
      (value.length  > min && value.length < max) && setError({content: false});
    }

    value = onlyNumbers ? value.replace(/\D/gi, '') : value;

    setState(oldState => {
      const newState = [...oldState];
      newState[index]['data'][label].payload = value;

      return [...newState];
    });
  };
  const {payload = ''} = (state && state[label]) || '';

  useEffect(() => setError({content: stateError}), [stateError]);

  return (
    <>
      {solo ?
        <GridRow>
          <GridColumn computer={computer} mobile={mobile}>
            <FormField {...props}>
              <label>{label}</label>
              <Input onChange={onInputChange} value={payload}/>
            </FormField>
          </GridColumn>
        </GridRow>
        :
        <GridColumn computer={computer} mobile={mobile}>
          <FormField {...props}>
            <label>{label}</label>
            <FormField control={Input} onChange={onInputChange} value={payload} error={error.content}/>
          </FormField>
        </GridColumn>
      }
    </>
  )
};

export default TextInput;

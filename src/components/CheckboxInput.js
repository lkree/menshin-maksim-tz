import React from "react";
import {Checkbox, Form, GridRow, Input} from "semantic-ui-react";

const CheckboxInput = ({label, type, setState, state, index, ...props}) => {
  const {error} = state[label];
  const onInputChange = (_, {checked}) => {
    setState(oldState => {
      const newState = [...oldState];
      newState[index]['data'][label].payload = checked;
      newState[index]['data'][label].error = false;

      return [...newState];
    });
  };
  const {payload} = !!(state && state[label]) || false;

  return (
      <GridRow style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        <Form.Field {...props} error={error}>
          <Checkbox label={label} onChange={onInputChange} checked={payload}/>
        </Form.Field>
      </GridRow>
  )
};

export default CheckboxInput;

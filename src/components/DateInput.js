import React, {useState} from "react";
import {Form, FormField, GridColumn, GridRow, Input} from "semantic-ui-react";

const DateInput = ({solo, label, type, data, index, validate, setState, state, computer, mobile, ...props}) => {
  const {error} = state[label];
  const onInputChange = (_, {value}) => {
    setState(oldState => {
      const newState = [...oldState];
      newState[index]['data'][label].payload = value;
      newState[index]['data'][label].error = false;

      return [...newState];
    });
  };
  const {payload = ''} = (state && state[label]) || '';

  return (
    <>
      {solo ?
        <GridRow>
          <GridColumn computer={computer} mobile={mobile}>
            <FormField {...props}>
              <label>{label}</label>
              <Input onChange={onInputChange} value={payload} error={error}/>
            </FormField>
          </GridColumn>
        </GridRow>
        :
        <GridColumn computer={computer} mobile={mobile}>
          <FormField {...props}>
            <label>{label}</label>
            <FormField control={Input} type='date' onChange={onInputChange} value={payload} error={error}/>
          </FormField>
        </GridColumn>
      }
    </>
  )
};

export default DateInput;

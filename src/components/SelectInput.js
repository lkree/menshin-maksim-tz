import React from "react";
import {Form, GridColumn, GridRow, Select} from "semantic-ui-react";

const SelectInput = ({solo, setState, state, index, computer, mobile, ...props}) => {
  const {label} = props;
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
            <Form.Field {...props} control={Select} onChange={onInputChange} value={payload} error={error}/>
          </GridColumn>
        </GridRow>
        :
        <GridColumn computer={computer} mobile={mobile}>
          <Form.Field {...props} control={Select} onChange={onInputChange} value={payload} error={error}/>
        </GridColumn>
      }
    </>
  )
};

export default SelectInput;

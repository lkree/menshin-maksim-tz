import React from "react";
import data from "../data/data";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import {Button, GridRow} from "semantic-ui-react";
import DateInput from "./DateInput";

const Passenger = ({addPassenger, removePassenger, index, state, setState}) => {
  const renderData = () => data.map(({type, ...props}, i) => {
    props = {
      ...props,
      key: i,
      state: state[index].data,
      setState,
      data,
      index
    };
    switch(type) {
      case 'text': return <TextInput {...props}/>;
      case 'select': return <SelectInput {...props}/>;
      case 'checkbox': return <CheckboxInput {...props}/>;
      case 'date': return <DateInput {...props}/>;
      default: return <TextInput {...props}/>;
    }
  });
  const isLastPassenger = index === state.length-1;

  return (
    <>
      <GridRow style={{justifyContent: 'flex-end'}}>
        <Button onClick={removePassenger} color='red'>remove passenger</Button>
      </GridRow>
      {renderData()}
      {isLastPassenger &&
        <GridRow style={{marginBottom: '3rem', justifyContent: 'flex-end'}}>
          <Button onClick={addPassenger} color='green'>add passenger</Button>
        </GridRow>}
    </>
  )
};

export default Passenger;

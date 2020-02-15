import React, {useState} from "react";
import {Form, Button, Grid, GridColumn, GridRow} from "semantic-ui-react";
import data from "../data/data";
import Passenger from "./Passenger";


// const MainForm = () => {
//   const [error, setError] = useState(false);
//   const onInputChange = (_, props) => (
//       setError(() => {
//         return props.value.length < 3 ?
//         {
//           content: 'please length 3+'
//         } : ''
//       })
//   );
//
//
//   return (
//     <Form>
//       <Grid columns={3}>
//         <GridColumn>
//           <Form.Field>
//             <label>First Name</label>
//             <input placeholder='First Name'/>
//           </Form.Field>
//         </GridColumn>
//         <GridColumn>
//           <Form.Field>
//             <label>Last Name</label>
//             <Form.Input placeholder='Last Name'/>
//           </Form.Field>
//         </GridColumn>
//         <GridColumn verticalAlign='center'>
//           <Form.Field>
//             <Select options={[{key: 'asd', value: 'value', text: 'someText'}]}/>
//           </Form.Field>
//         </GridColumn>
//         <GridColumn style={{display: 'flex', alignItems: 'flex-end'}}>
//           <Form.Field required>
//             <Checkbox label='I agree to the Terms and Conditions'/>
//           </Form.Field>
//         </GridColumn>
//         <GridColumn>
//             <Form.Field onChange={onInputChange}
//                         id='form-input-control-error-email'
//                         control={Input}
//                         label='Email'
//                         placeholder='joe@schmoe.com'
//                         error={
//                           error.content
//                         }/>
//         </GridColumn>
//       </Grid>
//
//
//       <Button type='submit'
//               color='teal'>Submit</Button>
//     </Form>
//   )
// };


const MainForm = () => {
  const addPassenger = () => {
    const newPassenger = JSON.parse(JSON.stringify(state[0]));
    newPassenger.id = state.length;
    Object.keys(newPassenger.data).forEach(k => newPassenger.data[k] = {...newPassenger.data[k], payload: '', error: false});
    setState(state => ([...state, {...newPassenger}]))
  };
  const removePassenger = () => {
    setState(state => state.filter(({id}) => id !== state.length -1 || id === 0))
  };
  const onFormSubmit = () => {
    let errorsCount = 0;
    const errorsHandler = () => {
      const obj = JSON.parse(JSON.stringify(state));

      obj.forEach(({data}, i) => {
        Object.keys(data).forEach(k => {
          if (data[k].required && !data[k].payload) {
            ++errorsCount;
            obj[i].data[k].error = !data[k].payload;
          }
        })
      });

      setState(obj);
    };
    errorsHandler();

    console.log(errorsCount);
    if (!errorsCount) {
      const sendData = {};
      state.forEach(({id, data}) => {
        Object.keys(data).forEach(k => sendData[id] = {...sendData[id], [k]: data[k].payload})
      });
      fetch('https://webhook.site/043328dc-1f81-43d6-b5dd-9775d835edf2', {
        method: 'post',
        body: JSON.stringify(sendData)
      })
        .catch(e => console.log(e));
    }
  };
  const fillNewPassengerState = () => () => {
    const state = [{id: 0, data: {}}];
    data.forEach(e => {
      const {label, required} = e;

      state[0].data[label] = {payload: '', required, error: false}
    });
    return [...state];
  };
  const initialState = fillNewPassengerState();
  const [state, setState] = useState(initialState);

  return (
    <Form onSubmit={onFormSubmit}>
      <Grid>
        {state.map((e, i) => <Passenger removePassenger={removePassenger} addPassenger={addPassenger} index={i} key={i} state={state} setState={setState}/>)}
        <GridRow>
          <GridColumn>
            <Button type={'submit'}>Submit</Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Form>
  )
};

export default MainForm;

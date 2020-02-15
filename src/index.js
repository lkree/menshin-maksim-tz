import React from "react";
import ReactDOM from 'react-dom';
import {Container, Header} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import MainForm from "./components/MainForm";

const App = () => (
  <Container style={{marginTop: '3rem', padding: '0 5px'}}>
    <Header>
      <MainForm/>
    </Header>
  </Container>
);

ReactDOM.render(<App/>, document.querySelector('#root'));

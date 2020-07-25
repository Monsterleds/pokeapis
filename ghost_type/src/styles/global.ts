import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, button, input, h5 {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #fefefe;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: 0;
  }
`;

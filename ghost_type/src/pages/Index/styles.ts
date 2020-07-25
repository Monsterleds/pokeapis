import styled, { css } from 'styled-components';

import Insignia from '../../assets/insignia_fantasma.png';

interface ToggleVisibilityProps {
  isOpen: boolean;
}

const primaryColor = '#380085';

export const Container = styled.div`
  background-color: #19181e;
  height: 100%;

  button {
    transition: 0.2s;

    :hover {
      background-color: #220052;
    }
  }

  header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;
    z-index: 10;

    img {
      width: 30px;
      height: auto;
    }

    input {
      flex: 1;
      height: 100%;
      border: 0;
      padding: 24px;
      font-size: 14px;
      background-color: #303136;
      color: #fefefe;

      ::placeholder {
        color: #a4a4a4;
      }
    }

    button {
      width: 56px;
      height: 100%;
      background-color: ${primaryColor};
      border: 0;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  background-image: url(${Insignia});
  background-repeat: no-repeat;
  background-position: 40% center;
  background-attachment: fixed;
`;

export const PokemonList = styled.div`
  display: grid;
  transition: 0.2s;
  width: calc(100% - 310px);
  margin-top: 60px;
  padding: 24px 24px 64px 24px;
  /** Vai preencher o máximo que caber na tela com o espaçamento de 250px */
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-gap: 40px;

  @media only screen and (max-width: 780px) {
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 730px) {
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260px;
  width: 192px;
  background-color: #2a292e;
  border-radius: 8px;

  @media only screen and (max-width: 780px) {
    & + div {
      margin-top: 62px;
    }
  }

  img {
    height: 100%;
    width: auto;
  }

  div {
    display: flex;
    flex-direction: column;

    span {
      margin-top: 14px;
      margin-left: 16px;
      color: #c4c4c4;
      font-size: 14px;

      :last-of-type {
        margin-top: 10px;
        color: #f2f2f2;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  button {
    width: 100%;
    height: 40px;
    color: #ffffff;
    background-color: ${primaryColor};
    font-weight: bold;
    border-radius: 0px 0px 8px 8px;
    font-size: 14px;
  }
`;

export const PokemonImageContainer = styled.div`
  max-height: 100px;
  min-height: 87px;
  height: auto;
  display: flex;
  margin-top: 30px;
  align-items: center;
  align-self: center;
`;

export const CartContainer = styled.div<ToggleVisibilityProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 56px;
  right: 0;
  width: 310px;
  height: calc(100vh - 56px);
  background-color: #2a292e;
  z-index: 50;

  hr {
    border-color: #535156;
    width: 266px;
  }

  h5 {
    color: #f2f2f2;
    font-size: 20px;
    margin: 28px 0;
  }

  @media only screen and (max-width: 730px) {
    transition: 0.5s;
    top: 0;
    height: 100vh;
    right: -740px;
    margin: 0 0 0 18px;

    ${(props) =>
    props.isOpen &&
      css`
        right: 0;
      `}
  }

  @media only screen and (max-width: 430px) {
    width: 300px;

    hr {
      width: 251px;
    }
  }
`;

export const PokemonCart = styled.div`
  display: flex;
  align-items: center;
  background-color: #444148;
  height: 56px;
  width: 100%;
  padding-left: 28px;

  div:last-of-type {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-right: 28px;

    img {
      position: absolute;
      top: 0;
      right: 0;
      height: 12px;
      width: auto;
      cursor: pointer;
    }
  }

  span {
    color: #cfcfcf;
    font-size: 14px;

    :first-of-type {
      margin-left: 16px;
    }
  }

  & + div {
    margin-top: 4px;
  }
`;

export const PokemonImageCart = styled.div`
  height: 48px;
  width: 48px;

  img {
    height: 100%;
    width: auto;
  }
`;

export const TotalCartDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: #f2f2f2;
  margin: 18px 28px;
  padding: 0 28px;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${primaryColor};
    font-weight: bold;
    padding: 14px 0;
    color: #fff;
    font-size: 18px;
  }
`;

export const CartList = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.44);
  padding: 80px;
  color: #333333;
  z-index: 100;
`;

export const ModalContainer = styled.div<ToggleVisibilityProps>`
  visibility: hidden;

  ${(props) =>
    props.isOpen &&
    css`
      visibility: visible;
    `}
`;

export const ModalContent = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #2a292e;
  left: 5%;
  top: 5%;
  height: 90%;
  width: 90%;
  z-index: 110;

  h1 {
    margin: 20px 0;
  }

  img:first-of-type {
    position: absolute;
    margin: 18px 18px 0 0;
    right: 0;
    top: 0;
    width: 40px;
    height: auto;
    cursor: pointer;
  }

  img:last-of-type {
    height: 50%;
    width: auto;
  }

  @media screen and (max-width: 650px) {
    width: 70%;
    height: 50%;
    left: 15%;
    top: 30%;
    font-size: 10px;
  }
`;

export const FooterMobile = styled.button`
  visibility: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
  bottom: 0;
  padding: 0 31px;
  background-color: ${primaryColor};
  cursor: pointer;
  z-index: 40;
  transition: 0.3s;

  @media screen and (max-width: 730px) {
    visibility: visible;
  }

  span {
    font-weight: bold;
    font-size: 14px;
    color: #f5f5f5;
    margin-left: 16px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 24px;
      height: auto;
    }
  }
`;

export const FooterBackground = styled.div<ToggleVisibilityProps>`
  visibility: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.44);
  padding: 80px;
  color: #333333;
  z-index: 45;

  @media only screen and (max-width: 780px) {
    ${(props) =>
    props.isOpen &&
      css`
        visibility: visible;
      `}
  }
`;

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: 28px;

  h5 {
    margin-left: 9px;
  }

  img:first-child {
    display: none;
  }

  @media screen and (max-width: 780px) {
    img {
      :first-of-type {
        display: block;
        cursor: pointer;
        width: 30px;
        height: auto;
      }

      :last-of-type {
        margin-left: 18px;
      }
    }
  }
`;

import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElement,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Index from '../../pages/Index';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

apiMock.onGet('/type/fire/').reply(200, {
  pokemon: [
    {
      pokemon: {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/16/',
      },
    },
    {
      pokemon: {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/17/',
      },
    },
  ],
});

describe('Index Page', () => {
  it('should be able to search a pokemon', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Index />);

    const searchInputField = await waitForElement(() =>
      getByPlaceholderText('Pesquisar...'),
    );
    fireEvent.change(searchInputField, { target: { value: 'Charizard' } });

    const pokemonCardField = await waitForElement(() =>
      getByTestId('pokemonCardText'),
    );

    const findedPokemon = pokemonCardField.innerHTML;

    expect(findedPokemon.toLowerCase()).toContain(
      searchInputField.innerHTML.toLowerCase(),
    );
  });

  it('should be able to add a pokemon to the cart', async () => {
    const { getAllByText } = render(<Index />);

    const buttonField = await waitForElement(() => getAllByText('Adicionar'));

    if (buttonField) {
      fireEvent.click(buttonField[0]);
    }

    const setPokemon = jest.spyOn(Storage.prototype, 'setItem');
    expect(setPokemon).toBeTruthy();
  });

  it('should be able to load pokemons in the cart', async () => {
    render(<Index />);

    await waitFor(() => {
      const getPokemons = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation((key) => {
          switch (key) {
            case '@b2w/CartStorage':
              return JSON.stringify([
                {
                  pokemon: {
                    name: 'charizard',
                    url: 'https://pokeapi.co/api/v2/pokemon/16/',
                  },
                },
              ]);
            default:
              return null;
          }
        });
      expect(getPokemons).toBeTruthy();
    });
  });

  it('should be able to finish a order', async () => {
    const { getByText } = render(<Index />);
    const submitButtonField = await waitForElement(() =>
      getByText('Finalizar'),
    );

    fireEvent.click(submitButtonField);

    const thanksModelText = await waitForElement(() =>
      getByText('Obrigado!!!'),
    );

    expect(thanksModelText).toBeTruthy();
  });

  it('should be able to remove a pokemon from the cart', async () => {
    // Adicionando pokémon ao carrinho
    const { getAllByText, getAllByAltText } = render(<Index />);

    const buttonField = await waitForElement(() => getAllByText('Adicionar'));

    if (buttonField) {
      fireEvent.click(buttonField[0]);
    }

    const setPokemon = jest.spyOn(Storage.prototype, 'setItem');
    expect(setPokemon).toBeTruthy();
    // Fim adicionando pokémom ao carrinho

    const imageCloseField = getAllByAltText('x_fechar');

    fireEvent.click(imageCloseField[0]);

    expect(setPokemon).toHaveBeenCalledTimes(2);
  });

  it('should be able to close the modal', async () => {
    const { getByTestId, getByAltText, getByText } = render(<Index />);

    const submitButtonField = await waitForElement(() =>
      getByText('Finalizar'),
    );
    const backgroundModalField = await waitForElement(() =>
      getByTestId('modalBackground'),
    );
    const modalCloseIconField = await waitForElement(() =>
      getByAltText('icon_fechar_modal'),
    );

    fireEvent.click(submitButtonField);
    fireEvent.click(backgroundModalField);

    fireEvent.click(submitButtonField);
    fireEvent.click(modalCloseIconField);

    expect(modalCloseIconField).toBeTruthy();
    expect(backgroundModalField).toBeTruthy();
  });

  it('should be able to close the cart', async () => {
    const { getByTestId, getByAltText } = render(<Index />);

    const footerOpenCart = await waitForElement(() =>
      getByTestId('footerOpenCart'),
    );
    const closeCartBackground = await waitForElement(() =>
      getByTestId('cartBackground'),
    );
    const closeCartArrowLeft = await waitForElement(() =>
      getByAltText('flecha_esquerda'),
    );

    fireEvent.click(footerOpenCart);
    fireEvent.click(closeCartBackground);

    fireEvent.click(footerOpenCart);
    fireEvent.click(closeCartArrowLeft);

    expect(closeCartBackground).toBeTruthy();
    expect(closeCartArrowLeft).toBeTruthy();
  });
});

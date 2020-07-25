import React, { useEffect, useState, useCallback, useRef } from 'react';

import Lupa from '../../assets/icons/lupa.png';
import Carrinho from '../../assets/icons/carrinho_cinza.png';
import CarrinhoBranco from '../../assets/icons/carrinho_branco.png';
import FecharModal from '../../assets/icons/fechar_modal.png';
import FlechaEsquerda from '../../assets/icons/flecha_esquerda.png';
import Xfechar from '../../assets/icons/x_fechar.png';

import api from '../../services/api';

import {
  Container,
  Content,
  PokemonCard,
  PokemonImageContainer,
  PokemonList,
  CartContainer,
  PokemonCart,
  PokemonImageCart,
  TotalCartDetails,
  TotalContainer,
  CartList,
  ModalBackground,
  ModalContainer,
  ModalContent,
  FooterMobile,
  FooterBackground,
  CartHeader,
} from './styles';

interface PokemonAttributes {
  pokemon: {
    name: string;
    url: string;
  };
}

interface ResponsePokeAPI {
  pokemon: PokemonAttributes[];
}

const Index: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiPokemons, setApiPokemons] = useState({} as ResponsePokeAPI);
  const [allPokemons, setAllPokemons] = useState([] as PokemonAttributes[]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartPokemons, setCartPokemons] = useState(() => {
    /** Após a aplicação iniciar, irá ser executado uma função verificando se contém algo no storage
     * se houver algo, ele irá setar no carrinho, caso contrário irá retornar um array vazio
     */
    const pokemons = localStorage.getItem('@b2w/CartStorage');

    if (pokemons) {
      return JSON.parse(pokemons) as PokemonAttributes[];
    }

    return [] as PokemonAttributes[];
  });

  useEffect(() => {
    async function ListAllPokemonsAPI(): Promise<void> {
      if (apiPokemons) {
        const { data } = await api.get<ResponsePokeAPI>('/type/ghost/');

        setApiPokemons(data);
      }
    }

    ListAllPokemonsAPI();
  }, []); //eslint-disable-line

  /** A cada modificação no input, irá ativar essa função que irá verificar cada
   *  nome dos pokémons e filtrar aqueles que estão contidos nos nomes */
  const handleSearchPokemon = useCallback(() => {
    if (apiPokemons.pokemon) {
      setAllPokemons(
        apiPokemons.pokemon.filter((indexPokemon) =>
          indexPokemon.pokemon.name
            .toLocaleLowerCase()
            .includes(inputRef.current?.value.toLowerCase() as string),
        ),
      );
    }
  }, [apiPokemons]);

  /** Após a aplicação iniciar, ele irá percorrer cada array e substituir a url
   *  por uma nova contendo a sprite do pokémon e alterar a primeira letra para maíuscula
   *  Também irá setar no hook de state todos os pokémons que foram percorridos por aquele array
   */
  useEffect(() => {
    /** O motivo de ter um if contendo o !allPokemons[0] é justamente para evitar o looping infinito
     *  do uso de um useState dentro de um useEffect, sem precisar criar uma nova função, assim
     *  conseguindo setar todos os pokémons na primeira visita e alterar baseado na pesquisa. */
    if (apiPokemons.pokemon && !allPokemons[0]) {
      const pokemonsFormatted = apiPokemons.pokemon.map((indexPokemon) => {
        indexPokemon.pokemon.url = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${
          indexPokemon.pokemon.url.split('/')[6]
        }.png?raw=true`;
        indexPokemon.pokemon.name =
          indexPokemon.pokemon.name.charAt(0).toUpperCase() +
          indexPokemon.pokemon.name.slice(1);

        return indexPokemon;
      });
      setAllPokemons(pokemonsFormatted);
    }
  }, [apiPokemons]); //eslint-disable-line

  /** Irá adicionar no hook do state o novo pokemon e armazenar no localStorage */
  const handleAddPokemonCart = useCallback(
    (data: PokemonAttributes) => {
      setCartPokemons([...cartPokemons, data]);
      localStorage.setItem(
        '@b2w/CartStorage',
        JSON.stringify([...cartPokemons, data]),
      );
    },
    [cartPokemons],
  );

  /** Ao dar submit, irá limpar o carrinho que está armazenado no localStorage */
  const handleSubmitPokemonCart = useCallback(() => {
    localStorage.clear();
    setCartPokemons([]); // Esvazia o carrinho
    setIsOpenModal(true); // Abre o model de agradecimento
  }, []);

  /** Remover o pokemon do carrinho */
  const handleRemovePokemonCart = useCallback(
    (index: number) => {
      /** Foi usado o spread operator para cortar a referência de arrays não
       *  primitivos na atribuição, pois o splice não pode ser usado em um
       *  hook de state, assim duplicando o mesmo array com outra váriavel,
       *  sem afetar a anterior. */
      const allPokemonsCart = [...cartPokemons]; // Corta a referência
      allPokemonsCart.splice(index, 1); // Deleta o index desejado
      setCartPokemons(allPokemonsCart); // Seta nos hooks o novo array
      localStorage.clear();
      localStorage.setItem('@b2w/CartStorage', JSON.stringify(allPokemonsCart));
    },
    [cartPokemons],
  );

  return (
    <Container>
      <ModalContainer isOpen={isOpenModal}>
        <ModalBackground
          onClick={() => setIsOpenModal(false)}
          data-testid="modalBackground"
        />
        <ModalContent>
          <img
            src={FecharModal}
            alt="icon_fechar_modal"
            onClick={() => setIsOpenModal(false)}
          />
          <h1>Obrigado!!!</h1>
          <img
            src="https://media1.tenor.com/images/ca0b57e2a0ab629ade465ca5563e453b/tenor.gif"
            alt="pikachu_thanks"
          />
        </ModalContent>
      </ModalContainer>

      <header>
        <button type="button" data-testid="submitSearch">
          <img src={Lupa} alt="lupa_icon" />
        </button>
        <input
          ref={inputRef}
          name="finder"
          placeholder="Pesquisar..."
          onChange={handleSearchPokemon}
        />
      </header>

      <Content>
        <PokemonList>
          {allPokemons[0] &&
            allPokemons.map((indexPokemon) => (
              <PokemonCard key={indexPokemon.pokemon.url}>
                <PokemonImageContainer>
                  <img src={indexPokemon.pokemon.url} alt="pokemon_sprite" />
                </PokemonImageContainer>
                <div>
                  <span data-testid="pokemonCardText">
                    {indexPokemon.pokemon.name}
                  </span>
                  <span>R$ 6,00</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddPokemonCart(indexPokemon)}
                  data-testid="addPokemonCart"
                >
                  Adicionar
                </button>
              </PokemonCard>
            ))}
        </PokemonList>

        {/** Se o isOpenCart for True e a tela menor que 730px, irá mover o
         *  container para a esquerda, mostrando o próprio carrinho.   */}
        <CartContainer isOpen={isOpenCart}>
          <CartList>
            <CartHeader>
              <img
                src={FlechaEsquerda}
                alt="flecha_esquerda"
                onClick={() => setIsOpenCart(false)}
              />
              <img src={Carrinho} alt="carrinho_preto" />
              <h5>Carrinho</h5>
            </CartHeader>
            {cartPokemons &&
              cartPokemons.map((indexPokemon, index) => (
                /**
                 * Levando em conta que a url não é uníca pois a pessoa pode
                 * optar por pegar o mesmo pokémon 2 vezes
                 * Sabendo disso, resta a outra opção que é utilizar o index do
                 * array do carrinho, pois ele é único (porém não é recomendado).
                 */
                <PokemonCart key={index}>
                  <PokemonImageCart>
                    <img src={indexPokemon.pokemon.url} alt="pokemon_sprite" />
                  </PokemonImageCart>
                  <div>
                    <span>{indexPokemon.pokemon.name}</span>
                    <span>R$ 6,00</span>
                    <img
                      src={Xfechar}
                      alt="x_fechar"
                      onClick={() => handleRemovePokemonCart(index)}
                    />
                  </div>
                </PokemonCart>
              ))}
          </CartList>

          <TotalContainer>
            <hr />
            <TotalCartDetails>
              <span>Total</span>
              {/** O valor de todos os pokémons são 6, sabendo disso, é irrelevante
               * utilizar reduce para valores státicos
               * (QuantidadeDeItensNoArray * 6)
               */}
              <span>
                R$ {cartPokemons.length * 6}
                ,00
              </span>
            </TotalCartDetails>
            <button type="button" onClick={handleSubmitPokemonCart}>
              Finalizar
            </button>
          </TotalContainer>
        </CartContainer>

        {/** Após clicar no fundo preto, irá setar o isOpenChart como false,
         * assim desaparecendo na tela */}
        <FooterBackground
          isOpen={isOpenCart}
          onClick={() => setIsOpenCart(false)}
          data-testid="cartBackground"
        />

        {/** O footer será visualizado apenas quando tiver em tela de 730px
         * Após clicar no footer, irá setar o isOpenChart como true.
         */}
        <FooterMobile
          onClick={() => setIsOpenCart(true)}
          data-testid="footerOpenCart"
        >
          <div>
            <img src={CarrinhoBranco} alt="cart_icon" />
            <span>Total</span>
          </div>
          <span>
            R$ {cartPokemons.length * 6}
            ,00
          </span>
        </FooterMobile>
      </Content>
    </Container>
  );
};

export default Index;

import { cartas, Carta } from './model';

//Barajamos array duplicado
const barajarCartas = (cartas: Carta[]): Carta[] => {
  const barajadoColeccionDeCartas = cartas.sort(() => Math.random() - 0.5);
  return barajadoColeccionDeCartas;
};
export const cartasBarajadas = barajarCartas(cartas);
console.table(cartasBarajadas);

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
/* const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
} */

export const crearDivsDeCarta = (cartasBarajadas: Carta[]): Carta[] => {
  const gridCartas = document.querySelector('.grid_cards');
  let divsDeCartas: Carta[] = [];
  if (
    gridCartas !== null &&
    gridCartas !== undefined &&
    gridCartas instanceof HTMLDivElement
  ) {
    cartasBarajadas.forEach((carta) => {
      const divCard = document.createElement('div');
      divCard.classList.add('card');
      // Cramos dentro de .card el div.back que contiene la img
      const divBack = document.createElement('div');
      divBack.classList.add('back');
      // Creamos el img dentro de .back
      const imgCard = document.createElement('img');
      // Obtenemos index de cada carta del array
      const index = cartasBarajadas.findIndex(
        (card) => card.idFoto === carta.idFoto
      );
      // Convertimos a string el indice
      const indexParseado: string = index.toString();
      // Asignamos el index string como atributo a cada card
      divCard.setAttribute('data-index', indexParseado);
      // Asignamos el index string como atributo a img dentro de .card
      imgCard.setAttribute('data-index', indexParseado);
      // Creamos estructura de la card
      gridCartas.appendChild(divCard);
      divCard.appendChild(divBack);
      divBack.appendChild(imgCard);

      divCard.addEventListener('click', () => {
        // Añadimos clase .voltear a cada card
        divCard.classList.add('voltear');
        const indexCard = divCard.getAttribute('data-index');
        const indexImgCard = imgCard.getAttribute('data-index');
        imgCard.src = carta.imagen;
        console.log(indexCard);
        console.log(indexImgCard);
        console.log(divCard);
      });
    });
  } else {
    console.warn('No se ha creado la estructura de las cartas');
  }
  return divsDeCartas;
};

// Btn empezar partida
export const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (
    btnEmpezarPartida !== null &&
    btnEmpezarPartida !== undefined &&
    btnEmpezarPartida instanceof HTMLButtonElement
  ) {
    btnEmpezarPartida.addEventListener('click', () => {
      crearDivsDeCarta(cartasBarajadas);
      // Mostramos botón reiniciar partida
      reiniciarPartida();
    });
  } else {
    console.warn('No se iniciado la partida');
  }
};

// Btn reiniciar partida
export const reiniciarPartida = (): void => {
  const button = document.querySelector('.barajar');
  if (
    button !== null &&
    button !== undefined &&
    button instanceof HTMLButtonElement
  ) {
    button.addEventListener('click', () => {
      window.location.reload();
    });
  }
};

// Eventos
export const eventos = (): void => {
  empezarPartida();
};

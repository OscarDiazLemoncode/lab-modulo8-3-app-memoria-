import { cartas, Carta, tablero } from './model';

//Barajamos array duplicado
const barajarCartas = (cartas: Carta[]): Carta[] => {
  const barajadoColeccionDeCartas = cartas.sort(() => Math.random() - 0.5);
  return barajadoColeccionDeCartas;
};
export const cartasBarajadas = barajarCartas(cartas);
console.table(cartasBarajadas);

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
//TODO {...}
//const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {};

// Obtener indice de cada carta
const indiceCarta = (cartasBarajadas: Carta[]): number[] => {
  let indices = cartasBarajadas.map((_carta, index) => {
    console.log(`index${index}`);
    return index;
  });
  console.log(`index${indices}`);
  return indices;
};
const indiceCard = indiceCarta(cartasBarajadas);
console.log(indiceCard);

export const crearDivsDeCarta = (cartasBarajadas: Carta[]): Carta[] => {
  const gridCartas = document.querySelector('.grid_cards');
  let barajaDeCartasInicial: Carta[] = [];
  let indiceCarta: string;
  if (
    gridCartas !== null &&
    gridCartas !== undefined &&
    gridCartas instanceof HTMLDivElement
  ) {
    cartasBarajadas.map((carta, index) => {
      /*  */
      // Obetenemos indice de cada carta y lo convertimos a string
      indiceCarta = index.toString();
      // Creamos un div por cada carta
      const divCard = document.createElement('div');
      divCard.classList.add('card');
      // Creamos dentro de .card el div.back que contiene la img
      const divBack = document.createElement('div');
      divBack.classList.add('back');
      // Creamos el img dentro de .back
      const imgCard = document.createElement('img');
      // Asignamos el index string como atributo a cada card
      divCard.setAttribute('data-index', indiceCarta);
      // Asignamos el index string como atributo a img dentro de .card
      imgCard.setAttribute('data-index', indiceCarta);
      // Creamos estructura de la card
      gridCartas.appendChild(divCard);
      divCard.appendChild(divBack);
      divBack.appendChild(imgCard);
      // Evento click sobre cada card
      divCard.addEventListener('click', () => {
        // Añadimos clase .voltear a cada card
        //divCard.classList.add('voltear');
        const indexCard = divCard.getAttribute('data-index');
        const indexImgCard = imgCard.getAttribute('data-index');
        imgCard.src = carta.imagen;
        console.log(indexCard);
        console.log(indexImgCard);
        console.log(divCard);
      });
      /*  */
    });
  } else {
    console.warn('No se ha creado la estructura de las cartas');
  }
  return barajaDeCartasInicial;
};

// Btn empezar partida
/* export const empezarPartida = (): void => {
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
}; */

// Cambia estado de la partida al iniciar la partida
const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (btnEmpezarPartida && btnEmpezarPartida instanceof HTMLButtonElement) {
    btnEmpezarPartida.addEventListener('click', () => {
      tablero.estadoPartida = 'CeroCartasLevantadas';
      reiniciarPartida();
      console.warn(tablero);
    });
  } else {
    throw new Error('No se ha modificado el estado de la partida');
  }
};

// Btn reiniciar partida
export const reiniciarPartida = (): void => {
  const btnReiniciarPartida = document.querySelector('.reiniciar_partida');
  if (
    btnReiniciarPartida !== null &&
    btnReiniciarPartida !== undefined &&
    btnReiniciarPartida instanceof HTMLButtonElement
  ) {
    btnReiniciarPartida.classList.remove('hidden');
    btnReiniciarPartida.addEventListener('click', () => {
      window.location.reload();
    });
  }
};

// Eventos
export const eventos = (): void => {
  crearDivsDeCarta(cartasBarajadas);
  empezarPartida();
};

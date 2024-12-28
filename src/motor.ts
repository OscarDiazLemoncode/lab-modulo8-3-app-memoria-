import { cartas, Carta, tablero, Tablero } from './model';
//Barajamos array duplicado
const barajarCartas = (cartas: Carta[]): Carta[] => {
  const barajadoColeccionDeCartas = cartas.sort(() => Math.random() - 0.5);
  return barajadoColeccionDeCartas;
};
export const cartasBarajadas = barajarCartas(cartas);
// export const cartasBarajadas = barajarCartas(tablero.cartas);
console.table(cartasBarajadas);

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  const cartaNoEncontradaYNoVolteada = !carta.encontrada && !carta.estaVuelta;
  const noHayDosCartasVolteadas =
    tablero.indiceCartaVolteadaA === undefined ||
    tablero.indiceCartaVolteadaB === undefined;
  return cartaNoEncontradaYNoVolteada && noHayDosCartasVolteadas;
};

const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    const carta = tablero.cartas[indice];
    carta.estaVuelta = true;

    if (tablero.indiceCartaVolteadaA === undefined) {
      tablero.indiceCartaVolteadaA = indice;
      tablero.estadoPartida = 'UnaCartaLevantada';
    } else if (tablero.indiceCartaVolteadaB === undefined) {
      tablero.indiceCartaVolteadaB = indice;
      tablero.estadoPartida = 'DosCartasLevantadas';

      if (
        tablero.indiceCartaVolteadaA !== undefined &&
        tablero.indiceCartaVolteadaB !== undefined
      ) {
        if (
          sonPareja(
            tablero.indiceCartaVolteadaA,
            tablero.indiceCartaVolteadaB,
            tablero
          )
        ) {
          parejaEncontrada(
            tablero,
            tablero.indiceCartaVolteadaA,
            tablero.indiceCartaVolteadaB
          );
        } else {
          setTimeout(() => {
            if (
              tablero.indiceCartaVolteadaA !== undefined &&
              tablero.indiceCartaVolteadaB !== undefined
            ) {
              parejaNoEncontrada(
                tablero,
                tablero.indiceCartaVolteadaA,
                tablero.indiceCartaVolteadaB
              );
            }
          }, 1000);
        }
      }

      /* tablero.indiceCartaVolteadaA = undefined;
      tablero.indiceCartaVolteadaB = undefined;
      tablero.estadoPartida = 'CeroCartasLevantadas'; */
    }
  }
};

const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  console.warn(
    tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
  );
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  // Aquí puedes añadir lógica adicional, como actualizar el estado del juego o mostrar un mensaje
  console.warn('¡Pareja encontrada!');
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  // Aquí puedes añadir lógica adicional, como actualizar el estado del juego o mostrar un mensaje
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const crearTableroInicial = (
  cartasBarajadas: Carta[],
  tablero: Tablero
): Carta[] => {
  const gridCartas = document.querySelector('.grid_cards');
  let barajaDeCartasInicial: Carta[] = [];

  if (
    gridCartas !== null &&
    gridCartas !== undefined &&
    gridCartas instanceof HTMLDivElement
  ) {
    cartasBarajadas.forEach((carta, indice) => {
      const dataIndiceArray = indice.toString();
      const divCard = crearDiv();
      divCard.classList.add('card');
      const divBack = crearDiv();
      divBack.classList.add('back');
      const imgCard = crearImg();

      // Creamos estructura de cada card
      gridCartas.appendChild(divCard);
      divCard.appendChild(divBack);
      divBack.appendChild(imgCard);
      divCard.addEventListener('click', () => {
        if (sePuedeVoltearLaCarta(tablero, indice)) {
          divCard.setAttribute('data-indice', dataIndiceArray);
          imgCard.setAttribute('data-indice-image', dataIndiceArray);
          voltearLaCarta(tablero, indice);
          imgCard.src = carta.imagen;
          divCard.classList.add('voltear');
          console.warn(tablero);
          // Comprobar si la partida está completa
          if (esPartidaCompleta(tablero)) {
            console.log('¡Partida completa!');
          }
        }
      });

      barajaDeCartasInicial.push(carta);
    });
  } else {
    throw new Error('No se ha creado la estructura de las cartas');
  }
  return barajaDeCartasInicial;
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = 'CeroCartasLevantadas';
};

// Obtener indice de cada carta
/* const indiceCarta = (cartasBarajadas: Carta[]): number[] => {
  let indices = cartasBarajadas.map((_carta, index) => {
    //console.log(`index${index}`);
    return index;
  });
  //console.log(`index${indices}`);
  return indices;
};
const indiceCard = indiceCarta(cartasBarajadas);
console.log(indiceCard); */

const crearDiv = (): HTMLDivElement => {
  const div = document.createElement('div');
  return div;
};

const crearImg = (): HTMLImageElement => {
  const img = document.createElement('img');
  return img;
};

// Habilitar click en cartas una vez iniciada la partida
const habilitarCartas = (): void => {
  const gridCartas = document.querySelector('.grid_cards');
  const error = () => {
    throw new Error('No se han habilitado las cartas');
  };
  gridCartas && gridCartas instanceof HTMLDivElement
    ? gridCartas.classList.remove('unstarted')
    : error();
};

// Cambia estado de la partida al iniciar la partida
export const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (btnEmpezarPartida && btnEmpezarPartida instanceof HTMLButtonElement) {
    btnEmpezarPartida.addEventListener('click', () => {
      tablero.estadoPartida = 'CeroCartasLevantadas';
      habilitarCartas();
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

// Mostrar mensaje de iniciar partida
/* const avisoIniciarPartida = (): void => {
  const gridCartas = document.querySelector('.grid_cards');
  if (gridCartas && gridCartas instanceof HTMLDivElement) {
    gridCartas.addEventListener('mouseover', () => {
      console.log('Hay que iniciar partida primero');
    });
  }
};
avisoIniciarPartida(); */
// Eventos
/* export const eventos = (): void => {
  crearTableroInicial(cartasBarajadas);
  tablero.estadoPartida === 'PartidaNoIniciada' ? empezarPartida() : null;
}; */

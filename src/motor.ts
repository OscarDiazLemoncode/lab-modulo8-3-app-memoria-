import { /* cartas, */ Carta, tablero, Tablero } from './model';
//Barajamos array duplicado
const barajarCartas = (cartasTablero: Carta[]): Carta[] => {
  const barajadoColeccionDeCartas = cartasTablero.sort(
    () => Math.random() - 0.5
  );
  return barajadoColeccionDeCartas;
};
// export const cartasBarajadas = barajarCartas(cartas);
export const cartasBarajadas = barajarCartas(tablero.cartas);
console.table(cartasBarajadas);

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
// const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
//   const carta = tablero.cartas[indice];
//   const cartaNoEncontradaYNoVolteada = !carta.encontrada && !carta.estaVuelta;
//   const noHayDosCartasVolteadas =
//     tablero.indiceCartaVolteadaA === undefined ||
//     tablero.indiceCartaVolteadaB === undefined;

//   console.log();
//   return cartaNoEncontradaYNoVolteada && noHayDosCartasVolteadas;
// };

// Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (indice < 0 || indice >= tablero.cartas.length) {
    return false;
  }

  const carta = tablero.cartas[indice];
  const cartaNoEncontradaYNoVolteada = !carta.encontrada && !carta.estaVuelta;
  const noHayDosCartasVolteadas =
    tablero.indiceCartaVolteadaA === undefined ||
    tablero.indiceCartaVolteadaB === undefined;

  return cartaNoEncontradaYNoVolteada && noHayDosCartasVolteadas;
};

// const voltearLaCarta = (tablero: Tablero, indice: number): void => {
//   if (sePuedeVoltearLaCarta(tablero, indice)) {
//     const carta = tablero.cartas[indice];
//     carta.estaVuelta = true;

//     if (tablero.indiceCartaVolteadaA === undefined) {
//       tablero.indiceCartaVolteadaA = indice;
//       tablero.estadoPartida = 'UnaCartaLevantada';
//     } else if (tablero.indiceCartaVolteadaB === undefined) {
//       tablero.indiceCartaVolteadaB = indice;
//       tablero.estadoPartida = 'DosCartasLevantadas';

//       if (
//         tablero.indiceCartaVolteadaA !== undefined &&
//         tablero.indiceCartaVolteadaB !== undefined
//       ) {
//         if (
//           sonPareja(
//             tablero.indiceCartaVolteadaA,
//             tablero.indiceCartaVolteadaB,
//             tablero
//           )
//         ) {
//           parejaEncontrada(
//             tablero,
//             tablero.indiceCartaVolteadaA,
//             tablero.indiceCartaVolteadaB
//           );
//         } else {
//           setTimeout(() => {
//             if (
//               tablero.indiceCartaVolteadaA !== undefined &&
//               tablero.indiceCartaVolteadaB !== undefined
//             ) {
//               parejaNoEncontrada(
//                 tablero,
//                 tablero.indiceCartaVolteadaA,
//                 tablero.indiceCartaVolteadaB
//               );
//             }
//           }, 1000);
//         }
//       }

//       /* tablero.indiceCartaVolteadaA = undefined;
//       tablero.indiceCartaVolteadaB = undefined;
//       tablero.estadoPartida = 'CeroCartasLevantadas'; */
//     }
//   }
// };

const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    const carta = tablero.cartas[indice];
    carta.estaVuelta = true;

    if (tablero.indiceCartaVolteadaA === undefined) {
      tablero.indiceCartaVolteadaA = indice;
      tablero.estadoPartida = 'UnaCartaLevantada';
      console.log('UNA CARTA LEVANTADA');
    } else if (tablero.indiceCartaVolteadaB === undefined) {
      tablero.indiceCartaVolteadaB = indice;
      tablero.estadoPartida = 'DosCartasLevantadas';
      console.log('DOS CARTAS LEVANTADAS');

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
          // Restablecer el estado para permitir seguir jugando
          tablero.indiceCartaVolteadaA = undefined;
          tablero.indiceCartaVolteadaB = undefined;
          // tablero.estadoPartida = 'CeroCartasLevantadas';
          console.warn(tablero.estadoPartida);
        } else {
          setTimeout(() => {
            parejaNoEncontrada(
              tablero,
              tablero.indiceCartaVolteadaA!,
              tablero.indiceCartaVolteadaB!
            );
            document
              .querySelector(`[data-indice="${tablero.indiceCartaVolteadaA}"]`)
              ?.classList.remove('voltear');
            document
              .querySelector(`[data-indice="${tablero.indiceCartaVolteadaB}"]`)
              ?.classList.remove('voltear');
            tablero.indiceCartaVolteadaA = undefined;
            tablero.indiceCartaVolteadaB = undefined;
            tablero.estadoPartida = 'CeroCartasLevantadas';
          }, 1000);
        }
      }
    }
  }
};

const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  console.warn('¡Pareja encontrada!');
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  console.warn('Pareja NO encontrada');
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Tablero con cartas en el DOM
// export const crearTableroInicial = (cartasTablero: Carta[]): Carta[] => {
//   const gridCartas = document.querySelector('.grid_cards');
//   if (
//     gridCartas !== null &&
//     gridCartas !== undefined &&
//     gridCartas instanceof HTMLDivElement
//   ) {
//     return cartasTablero.map((carta, indice) => {
//       const dataIndiceArray = indice.toString();
//       const divCarta = crearDiv();
//       divCarta.classList.add('card');
//       const divCartaPosterior = crearDiv();
//       divCartaPosterior.classList.add('back');
//       const imgCarta = crearImg();
//       // Creamos estructura de cada card
//       gridCartas.appendChild(divCarta);
//       divCarta.appendChild(divCartaPosterior);
//       divCartaPosterior.appendChild(imgCarta);

//       divCarta.addEventListener('click', () => {
//         divCarta.setAttribute('data-indice', dataIndiceArray);
//         imgCarta.setAttribute('data-indice-image', dataIndiceArray);
//         if (
//           sePuedeVoltearLaCarta(tablero, indice) &&
//           tablero.estadoPartida !== 'PartidaNoIniciada'
//         ) {
//           voltearLaCarta(tablero, indice);
//           imgCarta.src = carta.imagen;
//           divCarta.classList.add('voltear');
//           /*  */

//           console.warn(carta);
//           /*  */
//           console.warn(tablero);

//           // Comprobar si la partida está completa
//           if (esPartidaCompleta(tablero)) {
//             console.log('¡Partida completa!');
//           }
//         }
//       });
//       return carta;
//     });
//   } else {
//     throw new Error('No se ha creado la estructura de las cartas');
//   }
// };

export const crearTableroInicial = (cartasTablero: Carta[]): Carta[] => {
  const gridCartas = document.querySelector('.grid_cards');
  if (
    gridCartas !== null &&
    gridCartas !== undefined &&
    gridCartas instanceof HTMLDivElement
  ) {
    return cartasTablero.map((carta, indice) => {
      const dataIndiceArray = indice.toString();
      const divCarta = crearDiv();
      divCarta.classList.add('card');
      divCarta.setAttribute('data-indice', dataIndiceArray);
      const divCartaPosterior = crearDiv();
      divCartaPosterior.classList.add('back');
      const imgCarta = crearImg();
      divCarta.appendChild(divCartaPosterior);
      divCartaPosterior.appendChild(imgCarta);
      gridCartas.appendChild(divCarta);

      divCarta.addEventListener('click', () => {
        if (tablero.estadoPartida !== 'PartidaNoIniciada') {
          if (tablero.estadoPartida === 'PartidaCompleta') {
            return;
          }
          console.warn(tablero.estadoPartida);
          console.warn(carta);
          const indice = parseInt(divCarta.getAttribute('data-indice')!);
          if (sePuedeVoltearLaCarta(tablero, indice)) {
            voltearLaCarta(tablero, indice);
            imgCarta.src = carta.imagen;
            divCarta.classList.add('voltear');

            // Comprobar si la partida está completa
            if (esPartidaCompleta(tablero)) {
              tablero.estadoPartida = 'PartidaCompleta';
              console.log('¡Partida completa!');
            }
          }
        } else {
          divCarta.classList.remove('voltear');
        }
      });
      return carta;
    });
  }
  return [];
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
      console.warn(tablero.estadoPartida);
      habilitarCartas();
      reiniciarPartida();
      iniciaPartida(tablero);
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

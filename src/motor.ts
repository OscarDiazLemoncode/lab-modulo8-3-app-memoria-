import { Carta, tablero, Tablero } from './model';
let intentos: number = 0;

//Barajamos array duplicado
export const barajarCartas = (cartasTablero: Carta[]): Carta[] => {
  const barajadoColeccionDeCartas = cartasTablero.sort(
    () => Math.random() - 0.5
  );
  return barajadoColeccionDeCartas;
};

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
          // Restablecer el estado para permitir seguir jugando
          tablero.indiceCartaVolteadaA = undefined;
          tablero.indiceCartaVolteadaB = undefined;
          tablero.estadoPartida = 'CeroCartasLevantadas';
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
  contadorDeIntentos(tablero);
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Contador de intentos
const contadorDeIntentos = (tablero: Tablero): void => {
  const mostrarContador = document.querySelector('.intentos');
  if (
    mostrarContador &&
    mostrarContador instanceof HTMLParagraphElement &&
    tablero.indiceCartaVolteadaA !== undefined &&
    tablero.indiceCartaVolteadaB !== undefined
  ) {
    intentos++;
    mostrarContador.innerText = `intentos: ${intentos}`;
  }
};

// Mostrar mensaje de partida completa
const mensajePartidaCompleta = (): void => {
  const mensaje = document.querySelector('.partida_completa');
  if (mensaje && mensaje instanceof HTMLHeadingElement) {
    mensaje.textContent = '¡Juego ganado!';
  }
};

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
        tablero.cartas[indice].encontrada
          ? (divCarta.classList.add('warning'),
            setTimeout(() => divCarta.classList.remove('warning'), 1000))
          : null;

        if (tablero.estadoPartida !== 'PartidaNoIniciada') {
          if (tablero.estadoPartida === 'PartidaCompleta') {
            return;
          }
          const indice = Number(divCarta.getAttribute('data-indice'));

          if (sePuedeVoltearLaCarta(tablero, indice)) {
            voltearLaCarta(tablero, indice);
            imgCarta.src = carta.imagen;
            divCarta.classList.add('voltear');
            contadorDeIntentos(tablero);

            // Comprobar si la partida está completa
            if (esPartidaCompleta(tablero)) {
              tablero.estadoPartida = 'PartidaCompleta';
              mensajePartidaCompleta();
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

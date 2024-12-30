import { tablero } from './model';
import {
  /*  cartasBarajadas, */ crearTableroInicial,
  empezarPartida,
} from './motor';

document.addEventListener('DOMContentLoaded', () => {
  // eventos();
  // crearTableroInicial(cartasBarajadas, tablero);
  crearTableroInicial(tablero.cartas);
  // tablero.estadoPartida === 'PartidaNoIniciada' ? empezarPartida() : null;
  empezarPartida();
  console.warn(tablero.estadoPartida);
});

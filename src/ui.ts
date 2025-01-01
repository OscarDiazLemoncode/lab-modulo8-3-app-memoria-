import { tablero } from './model';
import { barajarCartas, crearTableroInicial, empezarPartida } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  barajarCartas(tablero.cartas);
  crearTableroInicial(tablero.cartas);
  empezarPartida();
});

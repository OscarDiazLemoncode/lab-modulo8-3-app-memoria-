import { tablero } from './model';
import { barajarCartas, crearTableroInicial, empezarPartida } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  // eventos();
  barajarCartas(tablero.cartas);
  console.table(tablero.cartas);
  crearTableroInicial(tablero.cartas);
  // tablero.estadoPartida === 'PartidaNoIniciada' ? empezarPartida() : null;
  empezarPartida();
});

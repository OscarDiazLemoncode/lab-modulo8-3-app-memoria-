import { tablero } from './model';
import { cartasBarajadas, crearTableroInicial, empezarPartida } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  // eventos();
  crearTableroInicial(cartasBarajadas, tablero);
  // tablero.estadoPartida === 'PartidaNoIniciada' ? empezarPartida() : null;
  empezarPartida();
});

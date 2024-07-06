import { crearColeccionDeCartasInicial, infoCartas } from './model';
import { barajamosColeccionDeCartas } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  //eventos();
  const coleccionDeCartasInicial = crearColeccionDeCartasInicial(infoCartas);
  barajamosColeccionDeCartas(coleccionDeCartasInicial);
});
console.log('ui');

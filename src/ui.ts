import { crearColeccionDeCartasInicial, infoCartas } from './model';
import { barajamosColeccionDeCartas, eventos } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  eventos();
  const coleccionDeCartasInicial = crearColeccionDeCartasInicial(infoCartas);
  barajamosColeccionDeCartas(coleccionDeCartasInicial);
  console.table(barajamosColeccionDeCartas(coleccionDeCartasInicial));
});

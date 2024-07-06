import { InfoCarta } from './model';

//Barajamos array duplicado
export const barajamosColeccionDeCartas = (
  coleccionDeCartasInicial: InfoCarta[]
): InfoCarta[] => {
  const barajadoColeccionDeCartas = coleccionDeCartasInicial.sort(
    () => Math.random() - 0.5
  );
  console.table(barajadoColeccionDeCartas);
  return barajadoColeccionDeCartas;
};
console.log('motor');

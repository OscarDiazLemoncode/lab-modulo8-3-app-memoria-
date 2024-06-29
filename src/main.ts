import './style.css';

/* interface Carta {
    idFoto: number;
    imagen:string;
    estaVuelta: boolean;
    encontrada:boolean;
} */
/* interface InfoCarta {
    idFoto:number;
    imagen:string;
}
 */

const barajarCartas = () => {
  const ids = [1, 2, 3, 4, 5, 6];
  const idsCartas = [...ids, ...ids];
  console.log(idsCartas);
  const barajados = idsCartas.sort(() => Math.random() - 0.5);
  console.log(barajados);
  return barajados;
};
const cambiarUrlcarta = () => {
  const img = document.querySelector('.url_carta');
  const card = document.querySelector('.card');
  if (
    card !== null &&
    card !== undefined &&
    card instanceof HTMLDivElement &&
    img !== null &&
    img !== undefined &&
    img instanceof HTMLImageElement
  ) {
    card.addEventListener('click', () => {
      img.setAttribute(
        'src',
        'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true'
      );
    });
  }
  console.log(img);
};
cambiarUrlcarta();

const handlerButton = () => {
  const button = document.querySelector('.barajar');
  if (
    button !== null &&
    button !== undefined &&
    button instanceof HTMLButtonElement
  ) {
    button.addEventListener('click', () => {
      barajarCartas();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  handlerButton();
});

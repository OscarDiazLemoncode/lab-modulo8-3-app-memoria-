import { InfoCarta, crearColeccionDeCartasInicial, infoCartas } from './model';

//Barajamos array duplicado
export const barajamosColeccionDeCartas = (
  coleccionDeCartasInicial: InfoCarta[]
): InfoCarta[] => {
  const barajadoColeccionDeCartas = coleccionDeCartasInicial.sort(
    () => Math.random() - 0.5
  );
  return barajadoColeccionDeCartas;
};

/* //////////////////////////////////////////////////////////// */
// Creamos div.card por cada carta del array
export const crearDivCarta = (infoCartasBarajadas: InfoCarta[]) => {
  const gridCartas = document.querySelector('.grid_cards');
  if (
    gridCartas !== null &&
    gridCartas !== undefined &&
    gridCartas instanceof HTMLDivElement
  ) {
    infoCartasBarajadas.forEach((carta) => {
      // Creamos div por cada carta del array
      const divCard = document.createElement('div');
      divCard.classList.add('card');
      // Cramos dentro de .card el div.back que contiene la img
      const divBack = document.createElement('div');
      divBack.classList.add('back');
      // Creamos el img dentro de .back
      const imgCard = document.createElement('img');
      // Creamos estructura de la card
      gridCartas.appendChild(divCard);
      divCard.appendChild(divBack);
      divBack.appendChild(imgCard);
      //imgCard.src = carta.imagen;

      // Obtenemos index de cada carta del array
      const index = infoCartasBarajadas.findIndex(
        (elemento) => elemento.idFoto === carta.idFoto
      );
      // Convertimos a string el indice
      const indexParseado: string = index.toString();

      // Asignamos el index string como atributo a cada card
      divCard.setAttribute('data-index', indexParseado);

      // Asignamos el index string como atributo a img dentro de .card
      imgCard.setAttribute('data-index', indexParseado);

      // Evento click sobre cada card
      divCard.addEventListener('click', () => {
        // Añadimos clase .voltear a cada card
        divCard.classList.add('voltear');
        const indexCard = divCard.getAttribute('data-index');
        const indexImgCard = imgCard.getAttribute('data-index');
        imgCard.src = carta.imagen;
        console.log(indexCard);
        console.log(indexImgCard);
        console.log(divCard);
      });
    });
  }
};
// Btn empezar partida
export const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (
    btnEmpezarPartida !== null &&
    btnEmpezarPartida !== undefined &&
    btnEmpezarPartida instanceof HTMLButtonElement
  ) {
    btnEmpezarPartida.addEventListener('click', () => {
      const coleccionDeCartasInicial =
        crearColeccionDeCartasInicial(infoCartas);
      /* const barajadoColeccionDeCartas = barajamosColeccionDeCartas(
        coleccionDeCartasInicial
      ); */
      crearDivCarta(coleccionDeCartasInicial);
      //console.table(coleccionDeCartasInicial);
      // Mostramos botón reiniciar partida
      reiniciarPartida();
    });
  } else {
    console.warn('No se iniciado la partida');
  }
};

// Btn reiniciar partida
export const reiniciarPartida = (): void => {
  const button = document.querySelector('.barajar');
  if (
    button !== null &&
    button !== undefined &&
    button instanceof HTMLButtonElement
  ) {
    button.addEventListener('click', () => {
      window.location.reload();
    });
  }
};

// Eventos
export const eventos = (): void => {
  empezarPartida();
};

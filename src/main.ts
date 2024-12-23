import './shell';
// Duplicamos el array original de forma inmutable
/* const duplicarInfoCartas = (infoCartas: InfoCarta[]): InfoCarta[] => {
  const infoCartasDuplicado: InfoCarta[] = [...infoCartas, ...infoCartas];
  return infoCartasDuplicado;
}; */

//Barajamos array duplicado
/* const barajamosInfoCartasDuplicadas = (
  infoCartasDuplicadas: InfoCarta[]
): InfoCarta[] => {
  const barajadoInfoCartasDuplicadas = infoCartasDuplicadas.sort(
    () => Math.random() - 0.5
  );
  return barajadoInfoCartasDuplicadas;
}; */

// Creamos div.card por cada carta del array
/* const crearDivCarta = (infoCartasBarajadas: InfoCarta[]) => {
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
}; */
// Btn empezar partida
/* const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (
    btnEmpezarPartida !== null &&
    btnEmpezarPartida !== undefined &&
    btnEmpezarPartida instanceof HTMLButtonElement
  ) {
    btnEmpezarPartida.addEventListener('click', () => {
      const coleccionDeCartasInicial =
        crearColeccionDeCartasInicial(infoCartas);
      //const barajadoColeccionDeCartas = barajamosColeccionDeCartas(coleccionDeCartasInicial);
      //crearDivCarta(coleccionDeCartasInicial);
      //console.table(coleccionDeCartasInicial);
      // Mostramos botón reiniciar partida
      reiniciarPartida();
    });
  } else {
    console.warn('No se iniciado la partida');
  }
}; */

// Btn reiniciar partida
/* const reiniciarPartida = (): void => {
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
}; */

// Eventos
/* const eventos = (): void => {
  empezarPartida();
}; */

/* document.addEventListener('DOMContentLoaded', () => {
  eventos();
}); */

// export const crearTableroConCartas = (cartasBarajadas: Carta[]): Carta[] => {
//   const gridCartas = document.querySelector('.grid_cards');
//   let barajaDeCartasInicial: Carta[] = [];
//   let indiceCarta: string;
//   if (
//     gridCartas !== null &&
//     gridCartas !== undefined &&
//     gridCartas instanceof HTMLDivElement
//   ) {
//     cartasBarajadas.map((carta, index) => {
//       /*  */
//       // Obetenemos indice de cada carta y lo convertimos a string
//       indiceCarta = index.toString();
//       // Creamos un div por cada carta
//       const divCard = crearDiv();
//       divCard.classList.add('card');
//       // Creamos dentro de .card el div.back que contiene la img
//       const divBack = crearDiv();
//       divBack.classList.add('back');
//       // Creamos el img dentro de .back
//       const imgCard = crearImg();
//       // Asignamos el index string como atributo a cada card
//       divCard.setAttribute('data-index', indiceCarta);
//       // Asignamos el index string como atributo a img dentro de .card
//       imgCard.setAttribute('data-index', indiceCarta);
//       // Creamos estructura de la card
//       gridCartas.appendChild(divCard);
//       divCard.appendChild(divBack);
//       divBack.appendChild(imgCard);
//       // Evento click sobre cada card
//       divCard.addEventListener('click', () => {
//         if (
//           sePuedeVoltearLaCarta(tablero, index) &&
//           tablero.estadoPartida === 'CeroCartasLevantadas'
//         ) {
//           // Añadimos clase .voltear a cada card
//           divCard.classList.add('voltear');
//           const indexCard = divCard.getAttribute('data-index');
//           const indexImgCard = imgCard.getAttribute('data-index');
//           imgCard.src = carta.imagen;
//           console.log(indexCard);
//           console.log(indexImgCard);
//           console.log(divCard);
//         }
//       });
//       /*  */
//     });
//   } else {
//     throw new Error('No se ha creado la estructura de las cartas');
//   }
//   return barajaDeCartasInicial;
// };

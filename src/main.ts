/* interface Carta {
    idFoto: number;
    imagen:string;
    estaVuelta: boolean;
    encontrada:boolean;
} */
interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true',
  },
  {
    idFoto: 2,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true',
  },
  {
    idFoto: 3,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true',
  },
  {
    idFoto: 4,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true',
  },
  {
    idFoto: 5,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true',
  },
  {
    idFoto: 6,
    imagen:
      'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true',
  },
];
// Duplicamos el array original de forma inmutable
const duplicarInfoCartas = (infoCartas: InfoCarta[]): InfoCarta[] => {
  const infoCartasDuplicado: InfoCarta[] = [...infoCartas, ...infoCartas];
  return infoCartasDuplicado;
};

//Barajamos array duplicado
const barajamosInfoCartasDuplicadas = (
  infoCartasDuplicadas: InfoCarta[]
): InfoCarta[] => {
  const barajadoInfoCartasDuplicadas = infoCartasDuplicadas.sort(
    () => Math.random() - 0.5
  );
  return barajadoInfoCartasDuplicadas;
};

// Creamos div.card por cada carta del array
const crearDivCarta = (infoCartasBarajadas: InfoCarta[]) => {
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
const empezarPartida = (): void => {
  const btnEmpezarPartida = document.querySelector('.empezar_partida');
  if (
    btnEmpezarPartida !== null &&
    btnEmpezarPartida !== undefined &&
    btnEmpezarPartida instanceof HTMLButtonElement
  ) {
    btnEmpezarPartida.addEventListener('click', () => {
      const infoCartasDuplicadas = duplicarInfoCartas(infoCartas);
      const crearColeccionDeCartasInicial =
        barajamosInfoCartasDuplicadas(infoCartasDuplicadas);
      console.table(crearColeccionDeCartasInicial);
      crearDivCarta(crearColeccionDeCartasInicial);
      // Mostramos botón reiniciar partida
      reiniciarPartida();
    });
  }
};

// Btn reiniciar partida
const reiniciarPartida = (): void => {
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
const eventos = (): void => {
  empezarPartida();
};

document.addEventListener('DOMContentLoaded', () => {
  eventos();
});

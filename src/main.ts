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
/* const eventos = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const elementoClickado = e.target;
      if (elementoClickado instanceof HTMLImageElement) {
        // El elemento clicado es una <img>
        console.log('Elemento <img> clicado:', elementoClickado);
      } else {
        // Si el clic no fue directamente en una <img>, busca dentro del .card
        const imgElement = card.querySelector('img');
        if (imgElement) {
          console.log('Elemento <img> dentro del .card:', imgElement);
        }
      }
    });
  });
}; */
const eventos = () => {
  // Añadimos clase .voltear
  const cards = document.querySelectorAll('.card');
  //const imgCard = document.querySelector('.card img');
  cards.forEach((card, index) => {
    // img del elemento clickado
    const imgElemento = card.querySelector('.card img');
    card.addEventListener('click', () => {
      //const elementoClickado = e.target;
      if (
        card !== null &&
        card !== undefined &&
        card instanceof HTMLDivElement &&
        imgElemento !== null &&
        imgElemento !== undefined &&
        imgElemento instanceof HTMLImageElement
      ) {
        // Añadimos clase .voltear
        card.classList.add('voltear');
        //console.log(elementoClickado);
        console.log(card);
        console.log(imgElemento);
        console.log(index);
        switch (index) {
          case 0:
            console.log('click en el 1º');
            imgElemento.src =
              'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true';

            break;
          case 1:
            console.log('click en el 2º');
            imgElemento.src =
              'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true';
            break;
          default:
            break;
        }
      } else {
        console.warn('No se ha modificado el src de la imagen');
      }
    });
  });
};

/* const cambiarSrcImg = () => {
  const imgs = document.querySelectorAll('.card img');
  let src: string = '';
  imgs.forEach((img) => {
    if (img !== null && img !== undefined && img instanceof HTMLImageElement) {
      src = img.src;
      console.log(src);
    }
  });
  return src;
}; */

/* imgs.forEach((img) => {
      img.setAttribute(
        'src',
        'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true'
      );
    }); */

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
  eventos();
  handlerButton();
});

/* const eventos = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const elementoClickado = e.target;
      if (elementoClickado instanceof HTMLImageElement) {
        // El elemento clicado es una <img>
        console.log('Elemento <img> clicado:', elementoClickado);
      } else {
        // Si el clic no fue directamente en una <img>, busca dentro del .card
        const imgElement = card.querySelector('img');
        if (imgElement) {
          console.log('Elemento <img> dentro del .card:', imgElement);
        }
      }
    });
  });
}; */

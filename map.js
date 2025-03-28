// Récupérer le canvas et son contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Définition des classes
class Boundary {
  static width = 40; 
  static height = 40;

  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
}

class Pellet {
  static width = 30; 
  static height = 30;
  constructor({ position, image }) {
    this.position = position;
    this.image = image
  }
}

// Fonction pour charger une image
function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Liste des éléments du labyrinthe
const boundaries = [];
const pellets = [];

// La carte du jeu
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '.', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', ' ', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];

// Génération des éléments du labyrinthe
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeHorizontal.png')
        }));
        break;
      case '|':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeVertical.png')
        }));
        break;
      case '1':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeCorner1.png')
        }));
        break;
      case '2':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeCorner2.png')
        }));
        break;
      case '3':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeCorner3.png')
        }));
        break;
      case '4':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/pipeCorner4.png')
        }));
        break;
      case 'b':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../img/block.png')
        }));
        break;
      case '[':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/capLeft.png')
        }));
        break;
      case ']':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/capRight.png')
        }));
        break;
      case '_':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/capBottom.png')
        }));
        break;
      case '^':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/capTop.png')
        }));
        break;
      case '+':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/pipeCross.png')
        }));
        break;
      case '5':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../img/pipeConnectorTop.png')
        }));
        break;
      case '.':
        pellets.push(new Pellet({
          position: { x: j * Boundary.width, y: i * Boundary.height},
          image: createImage('../img/pickle.png')
        }));
        break;
    }
  });
});

// Fonction d'affichage
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner les murs
  boundaries.forEach(boundary => {
    if (boundary.image) {
      ctx.drawImage(boundary.image, boundary.position.x, boundary.position.y, Boundary.width, Boundary.height);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillRect(boundary.position.x, boundary.position.y, Boundary.width, Boundary.height);
    }
  });

  pellets.forEach(pellet => {
    if (pellet.image) {
      ctx.drawImage(pellet.image, pellet.position.x, pellet.position.y, Pellet.width, Pellet.height);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillRect(pellet.position.x, pellet.position.y, Pellet.width, Pellet.height);
    }
  });

  requestAnimationFrame(draw);
}

// Lancer l'affichage
draw();

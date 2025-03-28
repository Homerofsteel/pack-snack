// Récupérer le canvas et son contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Définition des classes
class Boundary {
  static width = 47; 
  static height = 47;

  constructor({ position, image, id=null }) {
    this.position = position;
    this.image = image;
    this.id = id;
    this.width = Boundary.width; 
    this.height = Boundary.height;
  }
}

class Pellet {
  static width = 52; 
  static height = 52;
  constructor({ position, image, id }) {
    this.position = position;
    this.image = image
    this.id = id;
    this.width = Pellet.width; 
    this.height = Pellet.height;
  }
}

// Fonction pour charger une image
function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Liste des éléments du labyrinthe
export const boundaries = [];

export const pellets = [];

// La carte du jeu
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '6', ']', '.', 'b', '.', '|'],
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
          image: createImage('../Images/pipeHorizontal.png')
        }));
        break;
      case '|':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/pipeVertical.png')
        }));
        break;
      case '1':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/pipeCorner1.png')
        }));
        break;
      case '2':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/pipeCorner2.png')
        }));
        break;
      case '3':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/pipeCorner3.png')
        }));
        break;
      case '4':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/pipeCorner4.png')
        }));
        break;
      case 'b':
        boundaries.push(new Boundary({
          position: { x: Boundary.width * j, y: Boundary.height * i },
          image: createImage('../Images/block.png')
        }));
        break;
      case '[':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/capLeft.png')
        }));
        break;
      case ']':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/capRight.png')
        }));
        break;
      case '_':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/capBottom.png')
        }));
        break;
      case '^':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/capTop.png')
        }));
        break;
      case '+':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/pipeCross.png')
        }));
        break;
      case '5':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/pipeConnectorTop.png')
        }));
        break;
        case '6':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          image: createImage('../Images/pipeConnectorDownwards.png')
        }));
        break;
      case '.':
        pellets.push(new Pellet({
          position: { x: j * Boundary.width, y: i * Boundary.height},
          image: createImage('../Images/pickle.png'),
          id: "no collision"
        }));
        break;
      case ' ':
        boundaries.push(new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
          id: "no collision"
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


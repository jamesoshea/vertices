const vertices = []

let w
let h

const velocity = 0.1
function setup() {

	w = window.innerWidth
	h = window.innerHeight

	createCanvas(w, h)
	background(51)

	for(let i = 0; i < 20; i++) {
		vertices.push(new Vertex(random(w), random(h)))
	}

	vertices.forEach((vertex) => {
		vertex.neighbours = vertex.getNeighbours()
		console.log(vertex.neighbours)
	})

	console.dir(vertices)
}

function draw() {

	background(51)

	w = window.innerWidth
	h = window.innerHeight

	vertices.forEach((vertex) => {
		vertex.neighbours.forEach((neighbour) => {
			stroke(240)
			strokeWeight(0.1)
			line(vertex.x, vertex.y, neighbour.x, neighbour.y)
		})
		vertex.show()
		// vertex.move()
	})
}

class Vertex {

	constructor(x, y) {
		this.x = x
		this.y = y
	}

	show() {
		fill(240)
		ellipse(this.x, this.y, 5, 5)
	}

	getNeighbours() {
		let n = vertices.sort((firstNeighbour , nextNeighbour) => {
			return sqrt(pow(this.x - firstNeighbour.x, 2) + pow(this.y - firstNeighbour.y, 2)) - sqrt(pow(this.x - nextNeighbour.x, 2) + pow(this.y - nextNeighbour.y, 2))
		}).slice(0, 5)
		console.log(n)
		return(n)
	}

	move() {
		if (this.x > mouseX) {
			this.x -= velocity
		} else {
			this.x += velocity
		}
		if (this.y > mouseY) {
			this.y -= velocity
		} else {
			this.y += velocity
		}
	}
}


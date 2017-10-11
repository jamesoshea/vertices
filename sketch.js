let vertices = []

let w
let h

const velocity = 0.1

function setup() {

	w = window.innerWidth
	h = window.innerHeight

	createCanvas(w, h)
	background(51)


	for(let i = 0; i < 40; i++) {
		vertices.push(new Vertex(random(w), random(h)))
	}

	vertices.forEach((vertex) => {
		vertex.neighbours = vertex.getNeighbours()
	})
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

function Vertex(x, y) {

	this.x = x
	this.y = y
	this.neighbours = []

	this.show = function() {
		fill(240)
		ellipse(this.x, this.y, 5, 5)
	}

	this.getNeighbours = function() {
		let n = vertices.slice().sort((firstNeighbour , nextNeighbour) => {
			d1 = createVector(this.x - firstNeighbour.x, this.y - firstNeighbour.y).mag()
			d2 = createVector(this.x - nextNeighbour.x, this.y - nextNeighbour.y).mag()			
			return d1 - d2
		}).slice(1, 5)
		return n
	}

	this.move = function() {
		random(1) > 0.5 ? this.y += 1 : this.y -= velocity
		random(1) > 0.5 ? this.x += 1 : this.x -= velocity
	}
}


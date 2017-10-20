let vertices = []
let w
let h
const velocity = 10

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
		vertex.move()
		if(frameCount % 120 === 0) {
			vertex.changeDir()
		}
		console.log(vertex.dir)
	})
}

function Vertex(x, y) {

	this.x = x
	this.y = y
	this.neighbours = []
	this.dir = createVector(random(-1, 1), random(-1, 1))

	this.show = function() {
		fill(240)
		ellipse(this.x, this.y, 5, 5)
	}

	this.getNeighbours = function() {
		let n = vertices.slice().sort((firstNeighbour , nextNeighbour) => {
			const d1 = createVector(this.x - firstNeighbour.x, this.y - firstNeighbour.y).mag()
			const d2 = createVector(this.x - nextNeighbour.x, this.y - nextNeighbour.y).mag()			
			return d1 - d2
		}).slice(1, 5)
		return n
	}

	this.move = function() {
		this.x += this.dir.x
		this.y += this.dir.y
	}

	this.changeDir = function() {
		this.dir = createVector(random(-1, 1), random(-1, 1))
	}
}


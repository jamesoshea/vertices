let vertices = []
let w
let h
const velocity = 10

function setup() {

	w = window.innerWidth
	h = window.innerHeight

	createCanvas(w, h)
	background(51)


	for(let i = 0; i < 200; i++) {
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

	//find five nearest nodes using pythagorean theorum
	this.getNeighbours = function() {
		let n = vertices.slice().sort((firstNeighbour , nextNeighbour) => {
			const d1 = createVector(this.x - firstNeighbour.x, this.y - firstNeighbour.y).mag()
			const d2 = createVector(this.x - nextNeighbour.x, this.y - nextNeighbour.y).mag()			
			return d1 - d2
		}).slice(1, 5)
		return n
	}

	this.move = function() {
		//don't go past the edges
		if (this.x <= 0 || this.x >= w) {
			this.dir.x = -this.dir.x
		} else if (this.y <= 0 || this.y >= h) {
			this.dir.y = -this.dir.y
		}
		//add the direction vector to the position
		this.x += this.dir.x / 10
		this.y += this.dir.y / 10
	}
	//chnage direction (roughly) every two seconds
	this.changeDir = function() {
		this.dir = createVector(random(-1, 1), random(-1, 1))
	}
}


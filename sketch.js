let vertices = []
let w
let h

const nodeWidth = 5

function setup() {

	w = window.innerWidth
	h = window.innerHeight

	createCanvas(w, h)
	background(51)


	for(let i = 0; i < 200; i++) {
		vertices.push(new Vertex(random(51 + nodeWidth/2, w  - nodeWidth/2), random(nodeWidth/2, h - nodeWidth/2)))
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
		//change direction (roughly) every two seconds
		if(frameCount % 240 === 0) {
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
		ellipse(this.x, this.y, nodeWidth, nodeWidth)
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
		if (this.x <= 50 + nodeWidth/2 || this.x >= w - nodeWidth/2) {
			this.dir.x = -this.dir.x
		} else if (this.y <= 0 + nodeWidth/2 || this.y >= h - nodeWidth/2) {
			this.dir.y = -this.dir.y
		}
		//add the direction vector to the position
		this.x += this.dir.x / 6
		this.y += this.dir.y / 6
	}
	this.changeDir = function() {
		this.dir = createVector(random(-1, 1), random(-1, 1))
	}
}


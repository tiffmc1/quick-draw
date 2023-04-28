class SketchPad {
	constructor(container, size = 400) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = size;
		this.canvas.height = size;
		this.canvas.style = `background-color: white; box-shadow: 0px 0px 10px 1px black; cursor: crosshair;`;
		container.appendChild(this.canvas);

		this.ctx = this.canvas.getContext("2d");
		this.paths = [];
		this.isDrawing = false;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.onmousedown = (evt) => {
			const mouse = this.#getMouseLocation(evt);
			this.paths.push([mouse]);
			this.isDrawing = true;
			// console.log(rect);
			// console.log(mouse);
		};

		this.canvas.onmousemove = (evt) => {
			if (this.isDrawing) {
				const mouse = this.#getMouseLocation(evt);
				const getLastPath = this.paths[this.paths.length - 1];
				getLastPath.push(mouse);
				this.#redraw();
			}
		};

		this.canvas.onmouseup = () => {
			this.isDrawing = false;
		};

		// "touch" events for mobile
		this.canvas.ontouchstart = (evt) => {
			const loc = evt.touches[0];
			this.canvas.onmousedown(loc);
		};

		this.canvas.ontouchmove = (evt) => {
			const loc = evt.touches[0];
			this.canvas.onmousemove(loc);
		};

		this.canvas.ontouchend = () => {
			this.canvas.onmouseup();
		};
	}

	#redraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		draw.paths(this.ctx, this.paths);
	}

	#getMouseLocation = (evt) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(evt.clientX - rect.left),
			Math.round(evt.clientY - rect.top),
		]; // obtains coords relative to left-side and top-side of sketchpad canvas (ie [0,0])
	};
}

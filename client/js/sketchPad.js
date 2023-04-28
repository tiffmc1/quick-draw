class SketchPad {
	constructor(container, size = 400) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = size;
		this.canvas.height = size;
		this.canvas.style = `background-color: white; box-shadow: 0px 0px 10px 1px black; cursor: crosshair;`;
		container.appendChild(this.canvas);

		this.lineBreak = document.createElement("br");
		container.appendChild(this.lineBreak);

		this.undoBtn = document.createElement("button");
		this.undoBtn.innerHTML = "Undo";
		container.appendChild(this.undoBtn);

		this.ctx = this.canvas.getContext("2d");
		this.paths = [];
		this.isDrawing = false;
		this.#redraw();
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.onmousedown = (evt) => {
			const mouse = this.#getMouseLocation(evt);
			this.paths.push([mouse]);
			this.isDrawing = true;
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

		// undo event
		this.undoBtn.onclick = () => {
			this.paths.pop();
			this.#redraw();
		};
	}

	#redraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		draw.paths(this.ctx, this.paths);
		this.paths.length > 0
			? (this.undoBtn.disabled = false)
			: (this.undoBtn.disabled = true);
	}

	#getMouseLocation = (evt) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(evt.clientX - rect.left),
			Math.round(evt.clientY - rect.top),
		]; // obtains coords relative to left-side and top-side of sketchpad canvas (ie [0,0])
	};
}

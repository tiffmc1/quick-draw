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

		this.restartBtn = document.createElement("button");
		this.restartBtn.innerHTML = "Restart";
		container.appendChild(this.restartBtn);

		this.ctx = this.canvas.getContext("2d");

		this.reset();

		this.#addEventListeners();
	}

	reset() {
		this.paths = [];
		this.isDrawing = false;
		this.#redraw();
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

		document.onmouseup = () => {
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

		document.ontouchend = () => {
			document.onmouseup();
		};

		// undo event
		this.undoBtn.onclick = () => {
			this.paths.pop();
			this.#redraw();
		};

		// restart event
		this.restartBtn.onclick = () => {
			this.reset();
		};
	}

	#redraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		draw.paths(this.ctx, this.paths);
		if (this.paths.length > 0) {
			this.undoBtn.disabled = false;
			this.restartBtn.disabled = false;
		} else {
			this.undoBtn.disabled = true;
			this.restartBtn.disabled = true;
		}
	}

	#getMouseLocation = (evt) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(evt.clientX - rect.left),
			Math.round(evt.clientY - rect.top),
		]; // obtains coords relative to left-side and top-side of sketchpad canvas (ie [0,0])
	};
}

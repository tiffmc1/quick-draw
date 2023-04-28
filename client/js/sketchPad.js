class SketchPad {
	constructor(container, size = 400) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = size;
		this.canvas.height = size;
		this.canvas.style = `background-color: white; box-shadow: 0px 0px 10px 1px black; border-radius: 3px; cursor: crosshair;`;
		container.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");
		this.path = [];
		this.isDrawing = false;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.onmousedown = (evt) => {
			const mouse = this.#getMouseLocation(evt);
			this.path = [mouse];
			this.isDrawing = true;
			// console.log(rect);
			// console.log(mouse);
		};

		this.canvas.onmousemove = (evt) => {
			if (this.isDrawing) {
				const mouse = this.#getMouseLocation(evt);
				this.path.push(mouse);
				//console.log(this.path.length);
			}
		};

		this.canvas.onmouseup = () => {
			this.isDrawing = false;
		};
	}

	#getMouseLocation = (evt) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(evt.clientX - rect.left),
			Math.round(evt.clientY - rect.top),
		]; // obtains coords relative to left-side and top-side of sketchpad canvas (ie [0,0])
	};
}

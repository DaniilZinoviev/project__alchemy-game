// DOM Variables
const panel = document.querySelector(".panel"),
	mixers = document.querySelectorAll(".mixer"),
	combineBtn = document.getElementById("combineBtn"),
	clearBtn = document.getElementById("clearBtn")
	;

// Data for combination
let combines = {
	earth: {
		water: "salt"
	},
	water: {
		earth: "salt"
	},
	fire: {
		air: "sulphur"
	},
	air: {
		fire: "sulphur"
	},
	salt: {
		sulphur: "mercury"
	},
	sulphur: {
		salt: "mercury"
	}
};
let dragDrop = {
	current: null,
	couple: [],
};
let elements = {

}

// Create Element class
class Element {
	constructor(name) {
		this._name = name;
		this.renderCard(panel);
	}

	renderCard(where) {
		this._card = document.createElement("div");

		this._card.className = "btn elementCard";
		this._card.setAttribute("draggable", "true");
		this._card.innerHTML = this._name;
		this._card.addEventListener("dragstart", function () {
			dragDrop.current = this;
		})

		where.appendChild(this._card);
	}

	isCombine(elem2) {
		return combines[this._name][elem2._name];
	}

	combine(elem2) {
		if (this.isCombine(elem2)) {
			return combines[this._name][elem2._name];
		} 
		return false;
	}
}

// Drag`n`Drop Functionality
mixers.forEach((mixer, index) => {
	mixer.addEventListener("dragover", e => e.preventDefault());
	mixer.addEventListener("drop", function (e) {
		this.innerHTML = dragDrop.current.innerHTML;
		dragDrop.couple[index] = dragDrop.current;
	})
})

// Buttons
clearBtn.addEventListener("click", clear);
combineBtn.onclick = function () {
	// get elements from elements obj by id (now - .innerHTML) and combine
	let elem1 = elements[dragDrop.couple[0].innerHTML];
	let elem2 = elements[dragDrop.couple[1].innerHTML];

	let result = elem1.combine(elem2);

	if (elem1.isCombine(elem2)) {
		elements[result] = new Element(result);
		console.log("created")
	}

	clear();
}
function clear() {
	mixers.forEach(mixer => mixer.innerHTML = "");
	dragDrop.couple = [];
}



// Create some Element instances in elements object
elements["earth"] = new Element("earth");
elements["water"] = new Element("water");
elements["fire"] = new Element("fire");
elements["air"] = new Element("air");
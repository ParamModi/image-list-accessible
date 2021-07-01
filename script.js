import listOfImages from "./assets/imageDetails.js";

let mainList = document.querySelector(".imageList");
let mainImage = document.querySelector(".mainImage");
let captionForImage = document.querySelector(".captionForImage");

let displayIndex = 0;

function truncatedString() {
	document.querySelectorAll("li").forEach((item, index) => {
		let paragraph = item.querySelector("p");
		let imageName = listOfImages[index]["title"];
		paragraph.textContent = imageName;

		if (paragraph.scrollWidth <= paragraph.clientWidth) return;

		let low = 0,
			high = imageName.length,
			finalResult = "";

		while (low < high) {
			let mid = Math.floor((low + high) / 2.0);
			let leftPart = Math.floor(mid / 2.0);
			let rightPart = Math.ceil(mid / 2.0);
			paragraph.innerHTML =
				imageName.substr(0, leftPart) +
				"..." +
				imageName.substr(imageName.length - rightPart, rightPart);
			if (item.scrollWidth <= item.clientWidth) {
				finalResult = paragraph.textContent;
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}
		paragraph.innerHTML = finalResult;
	});
}

listOfImages.forEach((image, index) => {
	let listEntry = document.createElement("li");
	let imageEntry = document.createElement("img");
	let imageName = document.createElement("p");

	imageEntry.src = image.source;
	imageEntry.alt = image.alt;

	imageName.innerHTML = image.title;
	imageName.setAttribute("aria-hidden", "true");

	listEntry.append(imageEntry);
	listEntry.append(imageName);

	listEntry.setAttribute("role", "tab");
	listEntry.setAttribute("aria-controls", "mainDisplay");
	listEntry.setAttribute("tabindex", "0");
	listEntry.setAttribute("aria-selected", "false");
	listEntry.setAttribute("id", image.title);

	listEntry.addEventListener("click", () => {
		showImage(index);
	});
	listEntry.addEventListener("focus", () => {
		showImage(index);
	});
	mainList.append(listEntry);
});

truncatedString();
window.addEventListener("resize", truncatedString);
showImage(0);

document.addEventListener("keydown", (event) => {
	if (event.key == "ArrowUp" || event.key == "ArrowLeft") {
		if (displayIndex == 0) showImage(listOfImages.length - 1);
		else showImage(displayIndex - 1);
	} else if (event.key == "ArrowDown" || event.key == "ArrowRight")
		showImage((displayIndex + 1) % listOfImages.length);
});

function showImage(newIndex) {
	mainList.childNodes[displayIndex].classList.remove("active");
	mainList.childNodes[displayIndex].setAttribute("aria-selected", "false");

	mainList.childNodes[newIndex].classList.add("active");
	mainList.childNodes[newIndex].setAttribute("aria-selected", "true");
	mainList.childNodes[newIndex].focus();

	document
		.getElementById("mainDisplay")
		.setAttribute(
			"aria-labelledby",
			mainList.childNodes[newIndex].getAttribute("id")
		);
	mainImage.src = listOfImages[newIndex].source;
	mainImage.alt = listOfImages[newIndex].alt;
	captionForImage.innerHTML = listOfImages[newIndex].title;
	displayIndex = newIndex;
}

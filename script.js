import listOfImages from "./assets/imageDetails.js";

let mainList = document.querySelector(".imageList");
let fullScreen = document.querySelector(".fullScreen");

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

//Create Element for list Entry
function createListElement(image, index) {
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
	listEntry.setAttribute(
		"aria-controls",
		"panel" + image.title.trim().split(" ").join("")
	);
	listEntry.setAttribute("tabindex", "0");
	listEntry.setAttribute("aria-selected", "false");
	listEntry.setAttribute("id", image.title.trim().split(" ").join(""));

	listEntry.addEventListener("click", () => {
		showImage(index);
	});
	return listEntry;
}

//Create Element for main Image
function createPanelElement(image) {
	let displayFigure = document.createElement("figure");
	displayFigure.setAttribute("class", "imageContainer");
	displayFigure.setAttribute("role", "tabpanel");
	displayFigure.setAttribute("tabindex", "0");
	displayFigure.setAttribute(
		"id",
		"panel" + image.title.trim().split(" ").join("")
	);

	let displayImage = document.createElement("img");
	displayImage.setAttribute("class", "mainImage");
	displayImage.src = image.source;
	displayImage.alt = image.alt;
	displayImage.title = image.alt;

	let displayCaption = document.createElement("figcaption");
	displayCaption.setAttribute("class", "captionForImage");
	displayCaption.textContent = image.title;

	displayFigure.append(displayImage);
	displayFigure.append(displayCaption);

	displayFigure.setAttribute("hidden", "true");
	displayFigure.setAttribute(
		"aria-labelledby",
		image.title.trim().split(" ").join("")
	);

	return displayFigure;
}

listOfImages.forEach((image, index) => {
	mainList.append(createListElement(image, index));
	fullScreen.append(createPanelElement(image));
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
	else if (event.key == "Enter") document.activeElement.click();
});

function showImage(newIndex) {
	mainList.childNodes[displayIndex].classList.remove("active");
	mainList.childNodes[displayIndex].setAttribute("aria-selected", "false");

	mainList.childNodes[newIndex].classList.add("active");
	mainList.childNodes[newIndex].setAttribute("aria-selected", "true");
	mainList.childNodes[newIndex].focus();

	document
		.querySelectorAll("figure")
		[displayIndex].setAttribute("hidden", "true");
	document.querySelectorAll("figure")[newIndex].removeAttribute("hidden");
	displayIndex = newIndex;
}

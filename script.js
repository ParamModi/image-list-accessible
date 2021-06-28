import listOfImages from "./assets/imageDetails.js";

let mainList = document.querySelector(".imageList");
let mainImage = document.querySelector(".mainImage");
let captionForImage = document.querySelector(".captionForImage");

let displayIndex = 0;

function truncatedString(titleOfImage) {
	if (titleOfImage.length > 25) {
		let prefix = titleOfImage.slice(0, 26);
		prefix += "....";
		prefix += titleOfImage.slice(titleOfImage.length - 9, titleOfImage.length);
		titleOfImage = prefix;
	}
	return titleOfImage;
}

listOfImages.forEach((image, index) => {
	let listEntry = document.createElement("li");
	let imageEntry = document.createElement("img");
	let imageName = document.createElement("p");

	imageEntry.src = image.source;
	imageEntry.alt = image.alt;

	imageName.innerHTML = truncatedString(image.title);
	imageName.setAttribute("aria-label", image.title);

	listEntry.append(imageEntry);
	listEntry.append(imageName);
	listEntry.setAttribute("tabindex", "0");
	listEntry.addEventListener("click", () => {
		showImage(index);
	});
	listEntry.addEventListener("focus", () => {
		showImage(index);
	});
	mainList.append(listEntry);
});

showImage(0);

document.addEventListener("keydown", (event) => {
	if (event.key == "ArrowUp" && displayIndex > 0) showImage(displayIndex - 1);
	else if (event.key == "ArrowDown" && displayIndex < listOfImages.length - 1)
		showImage(displayIndex + 1);
});

function showImage(newIndex) {
	mainList.childNodes[displayIndex].classList.remove("active");
	mainList.childNodes[newIndex].classList.add("active");
	mainList.childNodes[newIndex].focus();
	mainImage.src = listOfImages[newIndex].source;
	mainImage.alt = listOfImages[newIndex].alt;
	captionForImage.innerHTML = listOfImages[newIndex].title;
	displayIndex = newIndex;
}

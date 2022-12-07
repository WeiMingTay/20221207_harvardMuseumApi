let apiKey = "6ab04982-2aa5-40e6-8b82-d5b03f00343b";
let resource = "object";
let size = 8;
let sortorder = "asc";
let yearmade = 1850;

// Array der Abfrageergebnisse
/* 
array = {} */

// Hauptfunktion

function callApi(classification) {
	let url = `https://api.harvardartmuseums.org/${resource}?sortorder=${sortorder}&period=${classification}&size=${size}&apikey=${apiKey}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.records.length; i++) {
				// Grundgerüst
				let galerie = document.querySelector("#galerie");

				let div = document.createElement("div");
				div.classList.add("artikel");

				// einzelne Elemente
				// Bild
				let divImg = document.createElement("a");
				divImg.classList.add("divImg");
				divImg.href = data.records[i].url;
				divImg.target = "_blank";
				let img = document.createElement("img");
				img.src = data.records[i].primaryimageurl;

				// Bildinformationen
				let divText = document.createElement("div");
				divText.classList.add("divText");
				// Kunsttitel
				let title = document.createElement("p");
				title.classList.add("title");
				title.textContent = data.records[i].title;

				// Artist
				let artist = document.createElement("p");
				artist.classList.add("artist");
				if (typeof data.records[i].people == "object") {
					artist.textContent = data.records[i].people[0].name;
				}

				// appendChild
				galerie.appendChild(div);

				div.appendChild(divImg);
				divImg.appendChild(img);

				div.appendChild(divText);
				divText.appendChild(title);
				divText.appendChild(artist);

				console.log(data.records[i]);
			}
		});
}

// select Abfrage zu den Klassifikationen
let selectClassification = document.querySelector("#classification");

function changeClassification() {
	galerie.innerHTML = "";
	fetch(
		`https://api.harvardartmuseums.org/classification?size=100&apikey=${apiKey}`
	)
		.then((response) => response.json())
		.then((data) => {
			data.records.forEach((e) => {
				let option = document.createElement("option");
				option.text = e.name;
				option.value = e.id;
				selectClassification.appendChild(option);
			});
		});
	callApi(selectClassification.value);
}
changeClassification();

// select Abfrage zu den Period
let selectPeriod = document.querySelector("#period");

function changePeriod() {
	galerie.innerHTML = "";
	fetch(`https://api.harvardartmuseums.org/period?size=100&apikey=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			data.records.forEach((e) => {
				let option = document.createElement("option");
				option.text = e.name;
				option.value = e.id;
				selectPeriod.appendChild(option);
			});
		});
	callApi(selectPeriod.value);
}
changePeriod();

// JavaScript Document

/**
 * Documentation du pouvoir des nombres organisé en 3 modules: {@link module:nombre|nombre}, {@link module:date|date} et {@link module:année|année}
 * @file
 * @author Thibault Brice Tiago Frédéric (les 4 mousquetaires)
 * @version 1.2
 * @requires {@link https://materializecss.com/about.html|Materialize}
 * @requires {@link https://jquerry.com/|JQuery}
 */

/**
 * Variable qui stockera la recherche tapé
 * @var {number}
 */
let search;

/**
 * Variable qui contient un message d'erreur selon l'erreur
 * @var {string}
 */

let msgErreur;

/**
 * @module nombre
 */

/**
 * Variable qui stockera un nombre aléatoire
 * @var {number}
 */
let number;




$("#validerNombre").on("click", numberSearch);
$("#hasardNombre").on("click", randomNumber);
$("#validerDate").on("click", dateSearch);
$("#hasardDate").on("click", randomDate);
$("#validerYear").on("click", yearSearch);
$("#hasardYear").on("click", randomYear);

/**
 * Callback déclenchée au click sur le bouton "validerNombre".
 * <br>Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * <br>Permet la vérification du nombre recherché.
 * <br>Si le nombre recherché contient une erreur, on appelle la fonction {@link module:nombre~erreur|erreur}.
 * <br>Si la barre de recherche est vide, on appelle la fonction {@link module:nombre~vide|vide}.
 * @function
 * @param {number} search Contenu de la barre de recherche de la partie nombre définie {@link search|ici}.
 * @returns {void}
 */
function numberSearch() {
	let url = "http://numbersapi.com/";
    search = $("#search-bar").val(); 
    $("#search").empty();

    if(search == ""){
		vide();
	} else if (isNaN(parseInt(search))){
		erreur();
	} else {
		$.get(url+search).done(NumberText);
	};

}

/**
 * Permet l'affichage du résultat par rapport au nombre recherché si la fonction {@link module:nombre~numberSearch|numberSearch} ne détecte pas d'erreur.
 * @function
 * @param {number} search Contenu de la barre de recherche de la partie nombre définie {@link module:global~search|ici}.
 * @param {*} response Réponse obtenue grâce à {@link http://numbersapi.com/|Number API}
 * @returns {void}
 */

function NumberText(response){
	$("#number-pres").empty();
	$("#number-pres").append(`
		<h3 class="card-title center">${search}</h3>
		<p>${response}</p>
	`);
	//console.log(response);
}

/**
 * Déclenché en cas d'erreur détecté dans la fonction {@link module:nombre~numberSearch|numberSearch}
 * <br>Affiche une erreur de recherche
 * @function
 * @returns {void}
 */

function erreur() {
	$("#number-pres").empty();
	$("#number-pres").append(`
		<h3 class="card-title center">Erreur de recherche</h3>
		<p>Merci d'écrire uniquement un nombre entier</p>
	`);
	//console.log("Erreur");
}

/**
 * Déclenché en cas de vide détecté dans la recherche par la fonction {@link module:nombre~numberSearch|numberSearch}
 * <br>Affiche une erreur de recherche
 * @function
 * @returns {void}
 */

function vide(){
	$("#number-pres").empty();
	$("#number-pres").append(`
		<h3 class="card-title center">Erreur de recherche</h3>
		<p>Merci d'écrire un nombre entier</p>
	`);
}

/**
 * Callback déclenchée au click sur le bouton "hasardNombre".
 * <br> Définie un nombre aléatoire et l'enregistre dans la variable {@link module:nombre~number|number}.
 * <br> Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * @returns {void}
 */

function randomNumber(){
	number= parseInt(Math.random()*5000);
	let url="http://numbersapi.com/" + number;
	$.get(url).done(randomNumberOK);
}

/**
 * Déclenché suite à la réponse obtenue dans la fonction {@link module:nombre~randomNumber|randomNumber}
 * Vérifie si il y a un résultat pour le {@link module:nombre~number|nombre aléatoire} et affiche le résultat.
 * @function
 * @param {number} number Nombre aléatoire qui a été définie dans la fonction {@link module:nombre~randomNumber|randomNumber}.
 * @param {*} response Réponse obtenue grâce à {@link http://numbersapi.com/|Number API}.
 * @returns {void}
 */
function randomNumberOK(response){
	if( response == number+" is a boring number." || response == number+" is an unremarkable number." || response == number+" is an uninteresting number." || response == number+" is a number for which we're missing a fact (submit one to numbersapi at google mail!)."){
		$("#number-pres").empty();
		$("#number-pres").append(`
			<img class="patienter" src="https://www.gif-maniac.com/gifs/51/50648.gif" alt="Animation pour patienter">
		`);
		randomNumber();
	} else{
		$("#number-pres").empty();
		$("#number-pres").append(`
			<h3 class="card-title center">${number}</h3>
			<p>${response}</p>
		`);
	}
}

/**
 * @module date
 */

/**
 * Variable qui stockera le jour recherché
 * @var {number}
 */

 let day;

/**
 * Variable qui stockera le mois recherché
 * @var {number}
 */

let month;

/**
 * Callback déclenchée au click sur le bouton "dateSearch".
 * <br>Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * <br>Permet la vérification de la date recherché grâce à la fonction {@link module:date~dateErreur|dateErreur}.
 * @function
 * @param {number} day Contenu de la barre de recherche du jour définie {@link module:date~day|ici}.
 * @param {number} month Contenu de la barre de recherche du mois définie {@link module:date~month|ici}.
 * @returns {void}
 */
function dateSearch(){
	msgErreur = "";
	month = $("#month").val();
	day = $("#day").val();
	if(!dateErreur()){
	   	$("#date-pres").empty();
		$("#date-pres").append(`
		<h3 class="card-title center">Erreur(s) détecté(es)</h3>
		<p>${msgErreur}</p>
		`);
	} else {
		let url = "http://numbersapi.com/" + month + "/" + day + "/date";
		$("#month").empty();	
		$("#day").empty();
		$.get(url).done(dateText)
	}
}

/**
 * Déclenché directement par la fonction {@link module:date~dateSearch|dateSearch}
 * <br>Permet la vérification de la date recherché.
 * <br>En cas d'erreur, la variable {@link msgErreur|msgErreur} sera définie selon l'erreur
 * @param {number} day Contenu de la barre de recherche du jour définie {@link module:date~day|ici}.
 * @param {number} month Contenu de la barre de recherche du mois définie {@link module:date~month|ici}.
 * @returns {boolean}
 */

function dateErreur(){
	if(day=="" && month==""){
		msgErreur = "Merci de renseigner une date avant de cliquer sur valider.";
		return false
	} else if((day>31 || day<=0) && (month>12 || month<=0)){
		msgErreur = "Un rappel qu'il n'existe que 31 jours et 12 mois.";
		return false;
	} else if((day>31 || day<=0) && month==""){
		msgErreur = "Un rappel qu'il n'existe que 31 jours et merci d'indiquer un mois.";
		return false;
	} else if(day=="" && (month>12 || month<=0)){
		msgErreur = "Un rappel qu'il n'existe que 12 mois et merci d'indiquer un jour.";
		return false;
	} else if((day>31 || day<=0)){
		msgErreur = "Il n'existe que 31 jours maximum par mois.";
		return false;
	} else if(day == ""){
		msgErreur = "Merci de renseigner un jour.";
		return false;
	} else if((month>12 || month<=0)){
		msgErreur = "Il n'existe que 12 mois dans une année.";
		return false;
	} else if(month == ""){
		msgErreur = "Merci de renseigner un mois.";
		return false;
	} else if ((day==30 && month==2) || (day==31 && month==2) || (day==31 && month==4) || (day==31 && month==6) || (day==31 && month==9) || (day==31 && month==11)){
		msgErreur = "La date du "+ day + "/" + month + " n'existe pas.";
		return false
	} else {
		return true;
	}
}

/**
 * Déclenché directement par la fonction {@link module:date~dateSearch|dateSearch} si aucune erreur n'est détecté
 * Permet l'affichage du résultat.
 * @param {number} day Contenu de la barre de recherche du jour définie {@link module:date~day|ici}.
 * @param {number} month Contenu de la barre de recherche du mois définie {@link module:date~month|ici}. 
 * @param {*} response Réponse obtenue grâce à {@link http://numbersapi.com/|Number API}.
 * @returns {void}
 */

function dateText(response){
	$("#date-pres").empty();
	$("#date-pres").append(`
		<h3 class="card-title center">Le ${day}/${month}</h3>
		<p>${response}</p>
	`);
}

/**
 * Callback déclenchée au click sur le bouton "randomDate".
 * <br> Définie une date aléatoire et enregistre le jour dans la variable {@link module:date~day|day} et le mois dans la variable {@link module:date~month|month}.
 * <br> Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * Appel la fonction {@link module:date~dateSearch|dateText} après son exécution.
 * @returns {void}
 */
function randomDate(){
	month = parseInt((Math.random()*12));	
	day = parseInt((Math.random()*31));
	if(!dateErreur()){
	   	$("#date-pres").empty();
		$("#date-pres").append(`
			<img class="patienter" src="https://www.gif-maniac.com/gifs/51/50648.gif" alt="Animation pour patienter">
		`);
		randomDate();
	} else {
		let url = "http://numbersapi.com/" + month + "/" + day + "/date";
		$.get(url).done(dateText);
	}
}

/**
 * @module année
 */

/**
 * Variable qui stockera une année aléatoire
 * @var {number}
 */
 let year;

/**
 * Callback déclenchée au click sur le bouton "yearSearch".
 * <br>Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * <br>Permet la vérification de la date recherché grâce à la fonction {@link module:date~dateErreur|dateErreur}.
 * @function
 * @param {number} search Contenu de la barre de recherche du jour définie {@link search|ici}.
 * @returns {void}
 */
function yearSearch() {
	let url = "http://numbersapi.com/";
	msgErreur = ""
    search = parseInt($("#search-year").val()); 
    $("#search").empty();

    if(!erreurYear()){
		$("#year-pres").empty();
		$("#year-pres").append(`
			<h3 class="card-title center">Erreur(s) détecté(es)</h3>
			<p>${msgErreur}</p>
		`);
	} else {
		$.get(url+search+"/year").done(YearText);
	};

}

/**
 * Déclenché directement par la fonction {@link module:year~yearSearch|yearSearch}
 * <br>Permet la vérification de l'année recherché et change la variable {@link msgErreur|msgErreur} en cas d'erreur.
 * @returns {boolean}
 */
function erreurYear(){
	if(search == ""){
		msgErreur = "Merci d'entrer une année avant de valider."
		return false
	} else if (isNaN(search)){
		msgErreur = "Vous n'avez pas entré une année."
		return false;
	} else if (search<0){
		msgErreur = "C'est trop dans le passée pour moi, je ne peux que aller jusqu'à l'an 1."
		return false;
	} else if (search>2059){
		msgErreur = "Désolé je ne vois pas aussi loin dans le futur, ma boule de cristal ne voit que jusqu'à 2059."
		return false;
	} else {
		return true;
	};
}

/**
 * Déclenché directement par la fonction {@link module:date~dateSearch|dateSearch} si aucune erreur n'est détecté
 * Permet l'affichage du résultat.
 * @param {number} search Contenu de la barre de recherche de l'année définie {@link search|ici}.
 * @param {*} response Réponse obtenue grâce à {@link http://numbersapi.com/|Number API}.
 * @returns {void}
 */
function YearText(response){
	$("#year-pres").empty();
	$("#year-pres").append(`
		<h3 class="card-title center">${search}</h3>
		<p>${response}</p>
	`);
}

/**
 * Callback déclenchée au click sur le bouton "randomYear".
 * <br> Définie une année aléatoire et l'enregistre dans la variable {@link module:year~year|year}.
 * <br> Appel de l'API externe {@link http://numbersapi.com/|Number API}
 * Appel la fonction {@link module:year~randomYearOK|randomYearOK} après son exécution.
 * @returns {void}
 */
function randomYear(){
	year = parseInt((Math.random()*2060))
	let url = "http://numbersapi.com/" + year + "/year";
	$.get(url).done(randomYearOK);
}

/**
 * Déclenché directement par la fonction {@link module:year~randomYear|randomYear}
 * <br> Vérifie que l'année est correct avant l'affichage des résultats
 * @param {number} year variable définie {@link module:year~year|ici} contenant une année aléatoire.
 * @param {*} response Réponse obtenue grâce à {@link http://numbersapi.com/|Number API}.
 */
function randomYearOK(response){
	if( year==0 || year==2060){
		$("#year-pres").empty();
		$("#year-pres").append(`
		<img class="patienter" src="https://www.gif-maniac.com/gifs/51/50648.gif" alt="Animation pour patienter">
		`);
		randomYear();
	} else{
		$("#year-pres").empty();
		$("#year-pres").append(`
			<h3 class="card-title center">${year}</h3>
			<p>${response}</p>
		`);
	}
}

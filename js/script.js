var header = document.querySelector('header');
// On sélectionne le header dans le HTML
var section = document.querySelector('section');
// On sélectionne la section dans le HTML

var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
// On instancie la variable request qui contien désormais l'URL de notre fichier json
var request = new XMLHttpRequest();
// On instance un nouvel objet XMLHttpRequest à partir de son constructeur, pour pouvoir créer une requête
request.open('GET', requestURL);
// Pour ouvrir une nouvelle requête, on utilisera la méthode open(), qui attend au moins deux paramètres
// Ici, GET sera le premier paramètre, et celui-ci va demander une représentation de la ressource spécifiée en deuxième paramètre, qui sera notre variable requestURL, qui contient le lien du json

request.responseType = 'json';
// On indique qu'on va attendre une reponse de type 'json' à notre requête
request.send();
// La méthode send() va nous permettre d'envoyer la requête

request.onload = function() {
// La méthode onload() est appelée lorsque la réponse d'une requête de type XMLHttpRquest est un succès
// La fonction qui suit est donc la fonction qui doit être exécutée lorsque la requête est complétée
    var superHeroes = request.response;
    // On stock la réponse de notre requête dans une variable
    populateHeader(superHeroes);
    // On applique la fonction populateHeader (explication plus bas) à la réponse de notre requête
    showHeroes(superHeroes);
    // On applique la fonction showHeroes (explication plus bas) à la réponse de notre requête
}

function populateHeader(jsonObj) {
// Cette fonction va nous permettre de remplir le header via les réponses de la requêtes que nous avons récupérées précédemment
// On appelle le paramètre jsonObj pour se rappeler que le résultat de la requête provient d'un objet json
    var myH1 = document.createElement('h1');
    // On crée un élément h1 dans notre HTML, via une variable
    myH1.textContent = jsonObj['squadName'];
    // On ajoute le contenu à cette variable (ce que va afficher le h1) : on récupère le 'squadName' de notre requête
    header.appendChild(myH1);
    // On indique que le nouveau h1 sera un enfant du header, via le appendChild

    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown : ' + jsonObj['homeTown'] + " // Formed : " + jsonObj['formed'];
    header.appendChild(myPara);
    // On réalise la même chose avec un paragraphe <p>
}

function showHeroes(jsonObj) {
// Cette fonction va nous permettre de récupérer des informations sur un héros en particulier, et de les afficher selon une certaine structuration
    var heroes = jsonObj['members'];
    // On stocke la propriété members de la requête dans la variable heroes

    for(var i = 0; i < heroes.length; i++){
    // Pour i allant de 0 au nombre de 'members' -1 présents dans le tableau heroes (le premier indice d'un tableau étant toujours 0)
    // On va donc pouvoir parcourir chaque objet du tableau heroes
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');
        // On crée plusiseurs éléments HTML

        myH2.textContent = heroes[i].name;
        // Le contenu du h2 sera le nom du héros à l'indice i du tableau
        myPara1.textContent = "Secret Identity : " + heroes[i].secretIdentity;
        // Le contenu du premier <p> sera l'identité secrète du héros à l'indice i du tableau
        myPara2.textContent = "Age : " + heroes[i].age;
        // Le contenu du deuxième <p> sera l'âge du héros à l'indice i du tableau
        myPara3.textContent = "Superpowers : ";
        // Le contenu du troisième <p> sera le(s) super-pouvoirs(s) du héros à l'indice i du tableau (voir ci-dessous)

        var superPowers = heroes[i].powers;
        // On crée une variable qui va stocker les pouvoirs du super-héros à l'indice i dans un tableau
        for(var j = 0; j < superPowers.length; j++){
        // Pour i allant de 0 à la longueur du tableau des pouvoirs d'un héros
        // Cette boucle va nous permettre de créer chaque <li> que va contenir le <ul> que nous avons créé ci-dessus
            var listItem = document.createElement('li');
            // On crée un <li>
            listItem.textContent = superPowers[j];
            // Le contenu d'un <li> sera le super-pouvoir à l'indice j d'un super-héros
            myList.appendChild(listItem);
            // Le <li> qui vient d'être créé sera un enfant de myList (<ul>)
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);
        // On fait en sorte que tous les éléments entre parenthèses ci-dessus soient des enfants de <article>
        
        section.appendChild(myArticle);
        // le <article> sera un enfant de la section
    }
}
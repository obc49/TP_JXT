
****Auteurs :****

**Roland KOUASSI**

**Oumar BALLO**


# Compte Rendu du TP5 - Authentification

Nous nous sommes inspirés du code déjà réalisé lors du TP4 et d'une spécification d'API REST au format Swagger.

## Objectifs :
L'objectif de cette partie est de  de réaliser un serveur d'authentification afin de l'utiliser dans la seconde partie, les services d'arlete.

## Fonctionnement du code

Nous avons commencé par étendre le code du modèle de données du TP4 afin d'ajouter le notion de mot de passe utilisateur. Pour cela nous avons utilisé le module bcrypt. À chaque mot de passe nous ajoutons un sel avant de calculer son hash.

 # Les méthodes login et verifyaccess

 nous avons implementé les login et verifyaccess dans le fichier Auth-v1.js de notre router et le fichier ipd.js de notre model. Dans le model, nous implementons d'abord une methode Myhash permettant de recuperer le mot de passe d'un utilisateur que nous utilisons ensuite dans notre methode login prend en paramètre le login et le mot de passe saisis. Nous comparons le mot de passe saisi et celui existant. S'ils correspondent alors on génère un jeton. Et la methode verifyaccess qui prend en parametre le jeton; permet de vérifier si le jeton est valide. 
 Dans notre router, lors d'un POST (router.post("/login", (req, res, next)), on recupère le login et le mot de passe saisis et on appelle nos le code metier (login) de notre model, qui renvoie soit un message 'successful' si le login et mot de passe sont OK  soit un message 'Unauthorized' sinon. Pour un GET (router.get("/verifyaccess", (req, res, next)). On vérifie si le jeton est valide. Afin de récupérer un jeton, nous réalisons un premier appel en POST au service /v1/auth/login.


# tests unitaires de l'API

Nous avons écrit des tests unitaires pour l'API d'authentification et nous les lançons avec mocha --watch. Mais les tests ne passent pas car des erreurs de link apparaissent. Nous avons recompilé le module ainsi :
npm rebuild bcrypt --build-from-source
mais cela ne fonctionne toujours pas.

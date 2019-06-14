# Rock Scissor Paper Alexa Skill

Skill créée pour l'article Alexa dans le journal [programmez.com](https://programmez.com)

C'est une Skill de jeu qui propose de jouer à 
[Pierre-Feuille-Ciseaux-Spock-Lézard](https://fr.wikipedia.org/wiki/Pierre-papier-ciseaux) dans un match à cinq manches optimisé pour les écrans (avec APL).

## Définition

Chaque Skill est consistée de deux parties :
* une partie `Front-End` : une interface vocale ou VUI qui correspond à la définition d'un modèle d'interaction.
* une partie `Back-End` : la logique de programmation (code) où la Skill définit son comportement en réponse à l'utilisateur selon un échange de requête-réponse au format JSON entre le service Alexa et votre code.

### Fonctionnalités de l'Alexa Skills Kit (ASK) utilisées

* Invocation Name : nom d'appel d'une Skill Custom
* Built-in Intents : intentions prédefinies mis à disposition par Alexa (annule, arrête, aide, oui, non, suivant, précédent, recommence, ...)
* Custom Intents : intentions crées par le développeur
* Utterances : phrases d'examples associées à une intention pour reconnaître l'intention
* Slots : paramètre pour collecter une valeur depuis une intention
* Custom Slot Types : définition de catalogues de valeurs pour reconnaître un slot.
* Alexa Presentation Language (APL) : Langage de templating pour gérer les écrans.


### Fonctionnalités du SDK utilisées

* Handler : comment gérer différents types de requêtes
* Error handler : comment gérer les exceptions
* Interceptors : comment mutualisez du code
* Attributs de Sessions (AttributesManager) : comment gérer les attributes au sein d'une Session de Skill

### Tests Unitaires avec [Bespoken](https://read.bespoken.io/unit-testing/getting-started/)

c.f description des scénarios de tests dans le fichier [./test/unit/index.test.yml](./test/unit/index.test.yml)


## Ressources
### Communauté
* [Forums développeur Amazon Alexa](https://forums.developer.amazon.com/spaces/23/index.html)
* [Slack](https://amazonalexa.slack.com/) ([page de signup](http://www.alexaslack.com/)) 

### Tuto et Guide
* [Le guide du design vocale](https://developer.amazon.com/designing-for-voice/)

* [Série video pour construire une Skill Alexa](http://alexa.design/videotutorial)

### Documentation
* [Alexa Skills Kit SDK pour Node.js](http://alexa.design/node-sdk-docs)

* [Documentation Alexa Skills Kit](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)

### Liste de liens alexa.design

* [Alexa Design Links](https://github.com/nachawat/alexa-design-links)

// Import SDK Alexa
const Alexa = require('ask-sdk-core');
// Import lib i18n
const i18n = require('i18next');
// Import chaines de caractères pour l10n
const languageStrings = require('./localisation');
// Import fonction pour présigner des URL Amazon S3
const util = require('./util');
// Score max autorisé dans le jeu (fin de partie)
const MAX_SCORE = 5;
// action possible du jeux
const ACTIONS = [
    1/*pierre*/,
    2/*feuille*/,
    3/*ciseaux*/,
    4/*spock*/,
    5/*lézard*/
];
// HANDLERS
/**
 * Handler pour traiter les requêtes d'invocation
 * Request.type === LaunchRequest
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        // Récupération des prompts
        const skillName = handlerInput.t('SKILL_NAME');
        const speechText = handlerInput.t('WELCOME_MSG',
            {
                skillName: skillName,
                rounds: MAX_SCORE,
                question: handlerInput.t('QUESTION_ACTION_MSG')
            });
        const repromptText = handlerInput.t('QUESTION_ACTION_MSG');
        // Gestion de l'écran
        addRulesScreen(handlerInput);
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};
/**
 * Handler pour traiter les requêtes pour recommencer une partie
 * AMAZON.StartOverIntent
 */
const NewGameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent';
    },
    handle(handlerInput) {
        // Nouvelle partie
        const speechText = handlerInput.t('NEW_GAME_MSG',
            { question: handlerInput.t('QUESTION_ACTION_MSG') });
        const repromptText = handlerInput.t('QUESTION_ACTION_MSG');
        // Reset de la Session
        resetGameSession(handlerInput.attributesManager);
        // Gestion de l'écran
        addRulesScreen(handlerInput);
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};
/**
 * Handler pour gérer la réponse du joueur à un round
 * GameAction
 */
const GameActionIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GameAction';
    },
    handle(handlerInput) {
        const { requestEnvelope, attributesManager } = handlerInput;
        // Récupération de l'identifiant du slot
        const actionSlotValue = Alexa.getSlot(requestEnvelope, "action");
        const entityResolution = actionSlotValue.resolutions.resolutionsPerAuthority[0];
        const userAction = parseInt(entityResolution.values[0].value.id, 10);
        // Choix de Alexa
        const alexaAction = ACTIONS[ACTIONS.length * Math.random() | 0];
        // Logique séléction gagnant
        const combination = (userAction * 10) + alexaAction;
        const roundWinner = getRoundWinner(combination);
        // ajout des scores en session
        updateScoresInSession(attributesManager, roundWinner, userAction, alexaAction);
        // Génération du JSON de sortie
        return buildGameActionReponse(handlerInput, roundWinner, combination);
    }
};
/**
 * Handler pour gérer les requêtes d'aide du joeur
 * AMAZON.HelpIntent
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        // Récupération du prompt/reproompt
        const speechText = handlerInput.t('HELP_MSG', { question: handlerInput.t('QUESTION_ACTION_MSG') });
        const reprompText = handlerInput.t('HELP_REPROMPT_MSG', { question: handlerInput.t('QUESTION_ACTION_MSG') });
        // Gestion de l'écran
        addRulesScreen(handlerInput);
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompText)
            .getResponse();
    }
};
/**
 * Handler pour sortir de la skill
 * AMAZON.StopIntent
 * AMAZON.CancelIntent
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        // Récupération du prompt de sortie
        const speechText = handlerInput.t('GOODBYE_MSG');
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/**
 * Handler pour traiter le cas où un joueur ne répond pas à la Skill
 * ou une erreur est levée
 * Request.type === SessionEndedRequest
 */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};
/**
 * Handler pour gérer les requêtes non gérer par un autre handler
 * Request.type === IntentRequest
 */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        // Génération du prompt de sortie
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = handlerInput.t('REFLECTOR_MSG', { intent: intentName });
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
// ERROR HANDLERS
/**
 * Gestionnaire d'erreurs pour catcher les exceptions levées par les handlers
 */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        // Récupération du prompt
        const speechText = handlerInput.t('ERROR_MSG');
        // Gestion de l'écran
        addRulesScreen(handlerInput);
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
// INTERCEPTORS
/**
 * Intercepteur pour logger le JSON de la requête
 * RequestInterceptor
 */
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request envelope: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};
/**
 * Intercepteur pour logger le JSON de la réponse
 * ResponseInterceptor
 */
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
/**
 * Intercepteur pour construire une méthode dynamique sur le handlerInput
 * pour accèder les chaines de caractères du fichier languageStrings
 */
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        const localisationClient = i18n.init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: languageStrings,
            returnObjects: true
        });
        localisationClient.localise = function localise() {
            const args = arguments;
            const value = i18n.t(...args);
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            }
            return value;
        };
        handlerInput.t = function translate(...args) {
            return localisationClient.localise(...args);
        }
    }
};
// SKILL BUILDER
/**
 * Enregistrement des différentes handlers et intercepteurs
 * sur l'instance du SDK
 */
exports.handler = Alexa.SkillBuilders.custom()
    /**
     * Attention ! les handlers sont ordonnés, le premier qui répond 
     * true dans la méthode .canHandler() invoqué
     * les autres seront ignorés
     */
    // 
    .addRequestHandlers(
        LaunchRequestHandler,
        GameActionIntentHandler,
        NewGameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalisationRequestInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .lambda();

// HELPERS
/**
 * Détermines si la device du joueur est mutimodale
 */
function supportsAPL(requestEnvelope) {
    const supportedInterfaces = Alexa.getSupportedInterfaces(requestEnvelope);
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}
/**
 * Ajout de la directive APL de rendu de document à la réponse
 */
function addScreen(builder, document, datasources) {
    builder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: document,
        datasources: datasources
    });
}
/**
 * Ajout du rendu APL pour la home, aide, erreur et nouvelle partie
 */
function addRulesScreen(handlerInput) {
    if (supportsAPL(handlerInput.requestEnvelope)) {
        const document = require('./documents/rules.json');
        const datasources = {
            templateData: {
                image: util.getS3PreSignedUrl('Media/rules.png')
            }
        };
        addScreen(handlerInput.responseBuilder, document, datasources);
    }
}
/**
 * Ajout rendu APL pour une manche
 */
function addGameScreen(handlerInput, roundWinner) {
    if (supportsAPL(handlerInput.requestEnvelope)) {
        let alexaBackground, userBackground;
        // Définition du backgrond
        switch (roundWinner) {
            case 0: // tie round
                alexaBackground = userBackground = "#2ba6ad";
                break;
            case 1: // win round
                alexaBackground = '#903232';
                userBackground = '#7ebd7e';
                break;
            case -1: // loose round
                alexaBackground = "#7ebd7e";
                userBackground = "#903232";
                break;
        }
        // Récupération de la session
        const game = getOrCreateGameSession(handlerInput.attributesManager);
        // Import du template
        const document = require('./documents/gameAction.json');
        // Génération des URL S3 présignés pour accès publique
        const urlImgAlexa = util.getS3PreSignedUrl(`Media/${game.alexa.rounds.slice(-1)[0]}.png`);
        const urlImgUser = util.getS3PreSignedUrl(`Media/${game.user.rounds.slice(-1)[0]}.png`);
        // Génération de la datasource
        const datasources = {
            templateData: {
                header: {
                    title: handlerInput.t('SCREEN_GAME_TITLE'),
                    image: util.getS3PreSignedUrl('Media/rules.png'),
                },
                alexa: {
                    text: handlerInput.t('SCREEN_TEXT_ALEXA'),
                    score: game.alexa.score,
                    image: urlImgAlexa,
                    background: alexaBackground
                },
                user: {
                    text: handlerInput.t('SCREEN_TEXT_YOU'),
                    score: game.user.score,
                    image: urlImgUser,
                    background: userBackground,
                }
            }
        };
        // Ajout écran
        addScreen(handlerInput.responseBuilder, document, datasources);
    }
}
/**
 * Génération du JSON de sortie sur une manche du jeu
 */
function buildGameActionReponse(handlerInput, roundWinner, combination) {
    let speechText, repromptText, scoreKey, connectorKey, speechKey = 'ROUND_CHOICE';
    const game = getOrCreateGameSession(handlerInput.attributesManager);
    // Détermination des clés de trads à utiliser 
    // en fonction du score
    if (game.alexa.score === MAX_SCORE) {
        scoreKey = 'LOSE_MSG'; // Alexa win - end game
    } else if (game.user.score === MAX_SCORE) {
        scoreKey = 'WIN_MSG';// User win - end game
    } else {
        repromptText = handlerInput.t('NEXT_ACTION_MSG');
        if (game.alexa.score === game.user.score) {
            scoreKey = 'TIE_ROUND'; // same score
            repromptText = handlerInput.t('NEXT_ACTION_MSG');
        } else if (game.alexa.score > game.user.score) {
            scoreKey = 'ALEXA_WIN_ROUND'; // alexa leads
        } else if (game.alexa.score < game.user.score) {
            scoreKey = 'USER_WIN_ROUND'; // user leadrs
        }
    }
    // Détermination des clés de trads à utiliser
    // en fonction du gagant du round
    switch (roundWinner) {
        case 0: // tie round
            speechKey = 'ROUND_SAME_CHOICE';
            break;
        case 1: // win round
            connectorKey = 'BUT';
            break;
        case -1: // loose round
            connectorKey = 'AND';
            break;
    }
    // Génération du prompt de sortie
    if (!speechText) {
        const lastAlexaChoice = game.alexa.rounds.slice(-1)[0];
        speechText =
            handlerInput.t(speechKey, {
                action: handlerInput.t(lastAlexaChoice),
                connector: handlerInput.t(connectorKey),
                explanation: handlerInput.t(combination),
                score: handlerInput.t(scoreKey, {
                    userScore: game.user.score,
                    alexaScore: game.alexa.score
                }),
                question: repromptText
            });
    }
    // Ajout du reprompt
    if (repromptText) {
        handlerInput.responseBuilder.reprompt(repromptText);
    } else {
        // Demande de fermeture explicite d'une session
        handlerInput.withShouldEndSession(true);
    }
    // Gestion de l'écran
    addGameScreen(handlerInput, roundWinner);
    // Génération du JSON de sortie
    return handlerInput.responseBuilder.speak(speechText).getResponse();
}
/**
 * Supprime les attributs de session de la partie en cours
 */
function resetGameSession(attributesManager) {
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes.game) {
        delete sessionAttributes.game;
    }
    return getOrCreateGameSession(attributesManager);
}
/**
 * Renvoie les attributs de session de la partie en cours
 * Initialise les attributs de sessions si nécessaire
 */
function getOrCreateGameSession(attributesManager) {
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes.game) {
        return sessionAttributes.game;
    }
    const game = {
        user: {
            score: 0,
            rounds: [],
        },
        alexa: {
            score: 0,
            rounds: []
        }
    };
    sessionAttributes.game = game;
    return game;
}
/**
 * Mise à jour des attributs de session pour la partie en cours
 */
function updateScoresInSession(attributesManager, roundWinner, userAction, alexaAction) {
    const game = getOrCreateGameSession(attributesManager);
    // ajout des choix user et Alexa
    game.user.rounds.push(userAction);
    game.alexa.rounds.push(alexaAction);
    // m.a.j. scores
    switch (roundWinner) {
        case 1: game.user.score++; break; // win
        case -1: game.alexa.score++; break; // loose
    }
    return game;
}
/**
 * Détermination du vainqueur du round
 * -1: Alexa
 *  0: égalité
 *  1: Joueur
 */
function getRoundWinner(combination) {
    let winner;
    switch (combination) {
        case 11: //pierre-pierre
        case 22: //feuille-feuille
        case 33: //ciseaux-ciseaux
        case 44: //spock-spock
        case 55: //lézard-lézard
            winner = 0;
            break;
        case 53: //lézard-ciseaux
        case 51: //lézard-pierre
        case 45: //spock-lézard
        case 42: //spock-feuille
        case 34: //ciseaux-spock
        case 31: //ciseaux-pierre
        case 25: //feuile-lézard
        case 23: //feuille-ciseaux
        case 14: //pierre-spock
        case 12: //pierre-feuille
            winner = -1;
            break;
        case 54: //lézard-spock
        case 52: //lézard-feuille
        case 43: //spock-ciseaux
        case 41: //spock-pierre
        case 35: //ciseaux-lézard
        case 32: //ciseaux-feuille
        case 24: //feuille-spock
        case 21: //feuille-pierre
        case 15: //pierre-lézard
        case 13: //pierre-ciseaux
            winner = 1;
            break;
    }
    return winner;
}

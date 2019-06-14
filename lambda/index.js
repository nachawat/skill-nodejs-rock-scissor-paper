// Import SDK Alexa
const Alexa = require('ask-sdk-core');
// Import Interceptors
const interceptors = require('./interceptors');
// Import fonctions pour l10n
const prompts = require('./prompts');
// Import Gestion partie de jeux
const session = require('./session');
// Import logic game
const logic = require('./logic');
// Import APL utilities
const apl = require('./apl');

// HANDLERS
/**
 * Handler pour traiter les requêtes d'invocation
 * Request.type === LaunchRequest
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type
            === 'LaunchRequest';
    },
    handle(handlerInput) {
        const output = prompts.welcome(handlerInput);
        apl.rulesScreen(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
            .reprompt(output.repromptText)
            .getResponse();
    }
};
/**
 * Handler pour traiter les requêtes pour recommencer une partie
 * AMAZON.StartOverIntent
 */
const NewGameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type
            === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name
            === 'AMAZON.StartOverIntent';
    },
    handle(handlerInput) {
        const output = prompts.newGame(handlerInput);
        session.resetGame(handlerInput.attributesManager);
        apl.rulesScreen(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
            .reprompt(output.repromptText)
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
        const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
        // Récupération de l'identifiant du slot
        const actionSlotValue = Alexa.getSlot(requestEnvelope, "action");
        const entityResolution = actionSlotValue.resolutions.resolutionsPerAuthority[0];
        const userAction = parseInt(entityResolution.values[0].value.id, 10);
        // Logique de jeu
        const roundResults = logic.play(userAction);
        // ajout des scores en session
        session.updateScores(attributesManager, roundResults);
        // Get des prompts
        const output = prompts.gameAction(handlerInput, roundResults);
        // Ajout du reprompt
        if (output.repromptText) {
            responseBuilder.reprompt(output.repromptText);
        } else {
            // Demande de fermeture explicite d'une session
            responseBuilder.withShouldEndSession(true);
        }
        // Gestion de l'écran
        apl.gameScreen(handlerInput, roundResults);
        // Génération du JSON de sortie
        return handlerInput.responseBuilder
            .speak(output.speechText)
            .getResponse();
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
        const output = prompts.help(handlerInput);
        apl.rulesScreen(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
            .reprompt(output.repromptText)
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
        const output = prompts.goodbye(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
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
        const output = prompts.reflector(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
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
        const output = prompts.error(handlerInput);
        apl.rulesScreen(handlerInput);
        return handlerInput.responseBuilder
            .speak(output.speechText)
            .reprompt(output.speechText)
            .getResponse();
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
    .addRequestInterceptors(interceptors.requestLogging, interceptors.localisation)
    .addResponseInterceptors(interceptors.responseLogging)
    .lambda();

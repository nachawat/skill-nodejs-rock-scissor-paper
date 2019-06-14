/**
 * Score max autorisé dans le jeu (fin de partie)
 */
const MAX_SCORE = 5;
/**
 * Import Module gestion partie de jeu
 */
const session = require('./session');
/**
 * 
 */
function playQuestion(handlerInput) {
    return handlerInput.t('QUESTION_ACTION_MSG');
}
function nextPlayQuestion(handlerInput) {
    return handlerInput.t('NEXT_ACTION_MSG');
}
/**
 * Définition du module
 */
module.exports = {
    /**
     * Récupération du prompt & reprompt
     * WELCOME_MSG
     */
    welcome: function (handlerInput) {
        const skillName = handlerInput.t('SKILL_NAME');
        return {
            speechText: handlerInput.t('WELCOME_MSG',
                {
                    skillName: skillName,
                    rounds: MAX_SCORE,
                    question: playQuestion(handlerInput)
                }),
            repromptText: playQuestion(handlerInput)
        };
    },
    /**
     * Récupération du prompt & reprompt
     * NEW_GAME
     */
    newGame: function (handlerInput) {
        return {
            speechText: handlerInput.t('NEW_GAME_MSG',
                { question: playQuestion(handlerInput) }),
            repromptText: playQuestion(handlerInput)
        };
    },
    /**
     * Récupération du prompt & reprompt
     * GAME_ACTION
     */
    gameAction: function (handlerInput, roundResults) {
        let speechText, repromptText, scoreKey, connectorKey, speechKey = 'ROUND_CHOICE';
        const game = session.getOrCreateGame(handlerInput.attributesManager);
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
            } else if (game.alexa.score > game.user.score) {
                scoreKey = 'ALEXA_WIN_ROUND'; // alexa leads
            } else if (game.alexa.score < game.user.score) {
                scoreKey = 'USER_WIN_ROUND'; // user leadrs
            }
        }
        // Détermination des clés de trads à utiliser
        // en fonction du gagant du round
        switch (roundResults.roundWinner) {
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
                    explanation: handlerInput.t(roundResults.combination),
                    score: handlerInput.t(scoreKey, {
                        userScore: game.user.score,
                        alexaScore: game.alexa.score
                    }),
                    question: repromptText
                });
        }
        return {
            speechText: speechText,
            repromptText: repromptText
        };
    },
    /**
     * Récupération du prompt & reprompt
     * HELP_MSG
     */
    help: function (handlerInput) {
        return {
            speechText: handlerInput.t('HELP_MSG', { question: playQuestion(handlerInput) }),
            repromptText: handlerInput.t('HELP_REPROMPT_MSG', { question: playQuestion(handlerInput) })
        };
    },
    /**
     * Récupération du prompt & reprompt
     * GOODBYE_MSG
     */
    goodbye: function (handlerInput) {
        return {
            speechText: handlerInput.t('GOODBYE_MSG')
        };
    },
    /**
     * Récupération du prompt & reprompt
     * REFLECTOR_MSG
     */
    reflector: function (handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        return {
            speechText: handlerInput.t('REFLECTOR_MSG', { intent: intentName })
        };
    },
    /**
     * Récupération du prompt & reprompt
     * ERROR_MSG
     */
    error: function (handlerInput) {
        return {
            speechText: handlerInput.t('ERROR_MSG')
        };
    }
};
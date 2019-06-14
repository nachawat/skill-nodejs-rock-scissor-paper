/**
 * Supprime les attributs de session de la partie en cours
 */
function resetGame(attributesManager) {
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes.game) {
        delete sessionAttributes.game;
    }
    return getOrCreateGame(attributesManager);
}
/**
 * Renvoie les attributs de session de la partie en cours
 * Initialise les attributs de sessions si nécessaire
 */
function getOrCreateGame(attributesManager) {
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
function updateScores(attributesManager, roundResults) {
    const game = getOrCreateGame(attributesManager);
    // ajout des choix user et Alexa
    game.user.rounds.push(roundResults.userAction);
    game.alexa.rounds.push(roundResults.alexaAction);
    // m.a.j. scores
    switch (roundResults.roundWinner) {
        case 1: game.user.score++; break; // win
        case -1: game.alexa.score++; break; // loose
    }
    return game;
}
/**
 * Module Export
 */
module.exports = {
    resetGame,
    getOrCreateGame,
    updateScores
}
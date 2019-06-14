/**
 * Import module APL datasources
 */
const aplDatasources = require('./aplDatasources');
/**
 * Détermines si la device du joueur est mutimodale
 */
function supportsAPL(requestEnvelope) {
    const supportedInterfaces = requestEnvelope.context.System.device.supportedInterfaces
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
};
/**
 * Ajout du rendu APL pour la home, aide, erreur et nouvelle partie
 */
function rulesScreen(handlerInput) {
    if (supportsAPL(handlerInput.requestEnvelope)) {
        const document = require('./documents/rules.json');
        const datasources = aplDatasources.getHome();
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: document,
            datasources: datasources
        });
    }
};
/**
 * Ajout rendu APL pour une manche
 */
function gameScreen(handlerInput, roundResults) {
    if (supportsAPL(handlerInput.requestEnvelope)) {
        const document = require('./documents/gameAction.json');
        const datasources = aplDatasources.getGame(handlerInput, roundResults);
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: document,
            datasources: datasources
        });
    }
}
/**
 * Définition du module
 */
module.exports = {
    rulesScreen,
    gameScreen
}
/**
 * Import Module i18n
 */
const i18n = require('i18next');
/**
 * Import Module chaines de caractères pour l10n
 */
const languageStrings = require('./localisation');
/**
 * Intercepteur pour logger le JSON de la requête
 * RequestInterceptor
 */
const requestLogging = {
    process(handlerInput) {
        console.log(`Incoming request envelope: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};
/**
 * Intercepteur pour logger le JSON de la réponse
 * ResponseInterceptor
 */
const responseLogging = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
/**
 * Intercepteur pour construire une méthode dynamique sur le handlerInput
 * pour accèder les chaines de caractères du fichier languageStrings
 */
const localisation = {
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
/**
 * Définition du module
 */
module.exports = {
    requestLogging,
    responseLogging,
    localisation,
}
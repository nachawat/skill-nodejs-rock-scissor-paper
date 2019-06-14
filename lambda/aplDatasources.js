/**
 * Import module gestion partie de jeu
 */
const session = require('./session');
/**
 * Import module Util (fonction pour présigner des URL Amazon S3)
 */
const util = require('./util');
/**
 * Définition du module
 */
module.exports = {
    /**
     * Get Datasource pour visuel d'une manche
     */
    getGame: function (handlerInput, roundResults) {
        let alexaBackground, userBackground;
        // Définition du backgrond
        switch (roundResults.roundWinner) {
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
        const game = session.getOrCreateGame(handlerInput.attributesManager);
        // Génération des URL S3 présignés pour accès publique
        const urlImgAlexa = util.getS3PreSignedUrl(`Media/${game.alexa.rounds.slice(-1)[0]}.png`);
        const urlImgUser = util.getS3PreSignedUrl(`Media/${game.user.rounds.slice(-1)[0]}.png`);
        const urlImgHeader = util.getS3PreSignedUrl('Media/rules.png');
        // Génération de la datasource
        return {
            templateData: {
                header: {
                    title: handlerInput.t('SCREEN_GAME_TITLE'),
                    image: urlImgHeader,
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
    },
    /**
     * Get Datasource pour la home
     */
    getHome: function () {
        return {
            templateData: {
                image: util.getS3PreSignedUrl('Media/rules.png')
            }
        };
    }
}
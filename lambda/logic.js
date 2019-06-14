/**
 * Actions possible du jeu
 * 1 :pierre,
 * 2 : feuille,
 * 3 : ciseaux
 * 4 : spock
 * 5 : lézard
 */
const ACTIONS = [1, 2, 3, 4, 5];
/**
 * Choix random sur la réponse de l'adversaire
 */
function getAlexaAction() {
    return ACTIONS[ACTIONS.length * Math.random() | 0];
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
/**
 * Logique de jeu complète
 * - Détermination du choix de l'adversaire
 * - Détermination de la combinaison
 * - Calcul vainqueur round
 */
function play(userAction) {
    const alexaAction = getAlexaAction();
    const combination = (userAction * 10) + alexaAction;
    const roundWinner = getRoundWinner(combination);
    return {
        alexaAction,
        userAction,
        combination,
        roundWinner
    }
}
/**
 * Définition du module
 */
module.exports = {
    play
}
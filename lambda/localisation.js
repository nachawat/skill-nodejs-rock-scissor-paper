/**
 * Module Export
 */
module.exports = {
    fr: {
        translation: {
            SKILL_NAME: 'Pierre Feuille Ciseaux (version Spock)',
            WELCOME_MSG: 'Bienvenue sur le jeu {{skillName}}. Nous avons {{rounds}} manches pour nous départager. Vous pouvez choisir entre Pierre, Feuille, Ciseaux, Lézard ou Spock pour jouer!<break time="500ms"/> J\'ai fait mon choix et vous, {{question}}',
            QUESTION_ACTION_MSG: ['Que choisissez-vous ?', 'Quel est votre choix ?', 'Que jouez-vous ?'],
            NEXT_ACTION_MSG: ['Quel est votre prochain move ?', 'Quel est votre prochain choix ?', 'Que jouez-vous pour la manche suivante ?'],
            NEW_GAME_MSG: 'Commençons une nouvelle partie. Mon choix est déjà fait et vous, {{question}}',
            ROUND_CHOICE: ['J\'ai choisi {{action}} {{connector}} {{explanation}}. {{score}} {{question}}'],
            ROUND_SAME_CHOICE: ['J\'ai choisi {{action}} tout comme vous, on ignore ce round! {{score}} {{question}}', 'Nous avons tous les deux choisi {{action}}, ça ne compte pas! {{score}} {{question}}'],
            BUT: ' mais ',
            AND: ' et ',
            GOODBYE_MSG: ['Au revoir !', 'A la prochaine fois !!'],
            REFLECTOR_MSG: 'Vous avez invoqué l\'intention {{intent}}',
            ERROR_MSG: 'Désolé, je n\'ai pas compris. Vous pouvez choisir entre Pierre, Feuille, Ciseaux, Lézard ou Spock. Pouvez-vous reformuler?',
            HELP_MSG: `Ici, les règles classiques du jeu Pierre Feuille Ciseaux s'appliquent, mais il faut ajouter que 
            <break time="500ms"/> le lézard mange le papier, empoisonne Spock, est écrasé par la pierre et est décapité par les ciseaux. 
            <break time="500ms"/> Spock vaporise la pierre, casse les ciseaux, et est discrédité par le papier.
            <break time="500ms"/> J'ai fait mon choix et vous, {{question}}`,
            HELP_REPROMPT_MSG: 'J\'ai fait mon choix et vous, {{question}}', //J\'ai fait mon choix et vous, {{question}}
            WIN_MSG: ['Félicitations, vous avez gagné {{userScore}} à {{alexaScore}}!', 'Bravo, vous êtes le meilleur, vous gagnez {{userScore}} à {{alexaScore}}!', 'Bien joué, vous m\'avez battu {{userScore}} à {{alexaScore}}'],
            LOSE_MSG: ['J\'ai gagné {{alexaScore}} à {{userScore}}, vous aurez plus de chance la prochaine fois!', 'Vous venez de perdre {{alexaScore}} à {{userScore}} !', 'Dommage, vous vous êtes bien défendu mais c\'est perdu : {{alexaScore}} à {{userScore}}'],
            USER_WIN_ROUND: 'Vous menez {{userScore}} à {{alexaScore}}.',
            ALEXA_WIN_ROUND: 'Je mène {{alexaScore}} à {{userScore}}.',
            TIE_ROUND: 'Nous sommes à égalité : {{userScore}} partout.',
            1: 'la pierre',
            2: 'la feuille',
            3: 'les ciseaux',
            4: 'Spock',
            5: 'le lézard',
            11: 'Nous avons tous les deux choisi la pierre',
            12: 'la feuille enveloppe la pierre',
            13: 'La pierre écrase les ciseaux',
            14: 'Spock vaporise la pierre',
            15: 'Le lézard est écrasé par la pierre',
            21: 'la feuille enveloppe la pierre',
            22: 'Nous avons tous les deux choisi la feuille',
            23: 'les ciseaux coupent la feuille',
            24: 'Spock est discrédité par la feuille',
            25: 'Le lézard mange la feuille',
            31: 'La pierre écrase les ciseaux',
            32: 'les ciseaux coupent la feuille',
            33: 'On a fait le même choix : les ciseaux',
            34: 'Spock casse les ciseaux',
            35: 'Le lézard est décapité par les ciseaux',
            41: 'Spock vaporise la pierre.',
            42: 'Spock est discrédité par la feuille',
            43: 'Spock casse les ciseaux',
            44: 'Nous avons fait le même choix : Spock',
            45: 'Le lézard empoisonne Spock',
            51: 'Le lézard est écrasé par la pierre',
            52: 'Le lézard mange la feuille',
            53: 'Le lézard est décapité par les ciseaux',
            54: 'Le lézard empoisonne Spock',
            55: 'le lézard est notre choix commun.',
            SCREEN_GAME_TITLE: 'Pierre, Feuille, Ciseaux, Spock, Lézard',
            SCREEN_TEXT_ALEXA: 'Alexa',
            SCREEN_TEXT_YOU: 'Vous'
        }
    }
}
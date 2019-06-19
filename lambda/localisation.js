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
    },
    en: {
        translation: {
            SKILL_NAME: 'Rock Paper Scissors (Spock version)',
            WELCOME_MSG: 'Welcome to the {{skillName}} game. We have {{rounds}} rounds to find the winner. You can choose between Rock, Paper, Scissors, Spock and Lizard!<break time="500ms"/> I\'ve already made my choice and you, {{question}}',
            QUESTION_ACTION_MSG: ['What do you play?', 'What\'s your choice?', 'What\'s your move?'],
            NEXT_ACTION_MSG: ['What\'s your next move ?', 'What do you play?', 'What\'s your choice for next round?'],
            NEW_GAME_MSG: 'Let\'s play a new game. I\'ve already made my choice and you, {{question}}',
            ROUND_CHOICE: ['I choose {{action}} {{connector}} {{explanation}}. {{score}} {{question}}'],
            ROUND_SAME_CHOICE: ['I choose {{action}} just like you, let\'s ignore this round! {{score}} {{question}}', 'We both choose {{action}}, it doesn\'t count! {{score}} {{question}}'],
            BUT: ' but ',
            AND: ' and ',
            GOODBYE_MSG: ['Goodbye!', 'See you next time !!'],
            REFLECTOR_MSG: 'You invoked intent {{intent}}',
            ERROR_MSG: 'You can choose between Rock, Paper, Scissors, Spock and Lizard. Can you reformulate please ?',
            HELP_MSG: `In this game, the standard rules for Rock Paper Scissors apply. However, the following options are also available:
            <break time="500ms"/> Lizard poisons Spock, eats paper, is crushed by rock and is decapitated by scissors;
            <break time="500ms"/> Spock smashes scissors, vaporizes rock; he is poisoned by lizard and is disproven by paper.
            <break time="500ms"/> I made my choice and you, {{question}}`,
            HELP_REPROMPT_MSG: 'I made my choice and you, {{question}}',
            WIN_MSG: ['Congratulations, you won {{userScore}} to {{alexaScore}}!', 'Bravo, you\'re the best, you won {{userScore}} to {{alexaScore}}!', 'Well done you beat me {{userScore}} to {{alexaScore}}'],
            LOSE_MSG: ['I won {{alexaScore}} to {{userScore}}, you will have better luck next time!', 'You just lost {{alexaScore}} to {{userScore}} !', 'You played well but I won {{alexaScore}} à {{userScore}}'],
            USER_WIN_ROUND: 'You lead {{userScore}} to {{alexaScore}}.',
            ALEXA_WIN_ROUND: 'I lead {{alexaScore}} to {{userScore}}.',
            TIE_ROUND: 'we are tied: {{userScore}} points each.',
            1: 'rock',
            2: 'paper',
            3: 'scissors',
            4: 'Spock',
            5: 'lizard',
            11: 'We both choose the rock',
            12: 'paper covers rock',
            13: 'rock crushes scissors',
            14: 'Spock vaporizes rock',
            15: 'Lizard is crushed by rock',
            21: 'paper covers rock',
            22: 'We both choose paper',
            23: 'scissors cuts paper',
            24: 'Spock is disproven by paper',
            25: 'Lizard eats paper',
            31: 'rock crushes scissors',
            32: 'scissors cuts paper',
            33: 'We both choose the scissors',
            34: 'Spock smashes scissors',
            35: 'Lizard is decapitated by scissors',
            41: 'Spock vaporise la pierre.',
            42: 'Spock is disproven by paper',
            43: 'Spock smashes scissors',
            44: 'We both choose Spock',
            45: 'Lizard poisons Spock',
            51: 'Lizard is crushed by rock',
            52: 'Lizard eats paper',
            53: 'Lizard is decapitated by scissors',
            54: 'Lizard poisons Spock',
            55: 'We both choose the lizard',
            SCREEN_GAME_TITLE: 'Rock, Paper, Scissors, Spock, Lizard',
            SCREEN_TEXT_ALEXA: 'Alexa',
            SCREEN_TEXT_YOU: 'You'
        }
    }
}
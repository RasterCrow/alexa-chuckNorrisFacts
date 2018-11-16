/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * With this simple Skill Alexa tells the user a funny fact about Chuck Norris
 * Nothing special in this code, I used the sample fact kit and changed the data structure
 */
'use strict';
const Alexa = require('alexa-sdk');

//ID of my skill
const APP_ID = '';

const SKILL_NAME = 'Chuck Norris Facts';
const WELCOME_MESSAGE = "Ciao, ";
const HELP_MESSAGE = 'prova a dire raccontami un fatto oppure raccontami una battuta se vuoi sapere qualcosa su di me';
const HELP_REPROMPT = 'Non ho capito, ne vuoi sentire un\'altra?';
const STOP_MESSAGE = 'Alla prossima!';
const ANOTHER_ONE = 'ne vuoi sentire un\'altra?';

const data = [
    
    'La luce solare impiega otto minuti per raggiungere la terra. Chuck Norris ne impieda due, fermandosi pure all\'autogrill.',
    'Chuck Norris può accendere il fuoco sfregando due bastoncini... Findus.',
    'Il fax di Chuck Norris esegue dipinti a olio.',
    'Chuck Norris in 15 giorni fa un mese di ferie.',
    'Chuck Norris non schiaccia pisolini... li pesta a morte.',
    'Quando Chuck Norris guarda le stelle, le stelle abbassano lo sguardo.',
    'Il fuoco non scherza mai con Chuck Norris.',
    'La sveglia di Chuck Norris non suona la mattina. Gli porta direttamente la colazione a letto.',
    'Quando Chuck Norris si trova sull\'orlo di un burrone, il burrone si butta giù per la paura.',
    'Chuck Norris ha percorso tutto il campo di Holly e Benji in una sola puntata.',
    'Non esiste la teoria dell\'evoluzione. Solo un elenco di creature cui Chuck Norris ha permesso di vivere.',
    'Quando piove Chuck Norris non ha bisogno dell\'ombrello, la pioggia lo evita...',
    'Chuck Norris può uccidere la licenza di uccidere.',
    'Mac Gyver è in grado di costruire qualunque cosa; Chuck Norris ha costruito Mac Gyver.',
    'Chuck Norris porta una maglietta con scritto: "Hiroshima, io c\'ero.',
    'Quando Chuck Norris fa una pessima figura in pubblico, tutti i presenti arrossiscono e si guardano le punte delle scarpe. Chuck Norris non può sentirsi in imbarazzo.',
    'Mosè ha aperto le acque... Chuck Norris ha aperto Mosè.',
    'Un giorno, tirando la leva del freno a mano del suo pick-up, Chuck Norris ha fatto jackpot vincendo un milione di dollari.',
    'Chuck Norris è il vero padre di Luke Skywalker.',
    'Prima di vedere Chuck Norris, la Gioconda piangeva.',
    'Chuck Norris sa sciare in salita.',
    'Quando Chuck Norris fuma, alla sigaretta viene il cancro.',
    'Chuck Norris non mangia il miele, mastica direttamente le api.',
    'Chuck Norris è riuscito a correre i 100 metri in 5 secondi con Bolt sulle spalle.',
    'Chuck Norris non si bagna. È l\'acqua che si Chuck Norris.',
    'Quando a Chuck Norris rubano la borsa crolla Wall Street.',
    'Quando Chuck Norris cade, le stelle esprimono un desiderio.',
    'Nel film "Nightmare" Johnny Depp ha sognato Freddy Krueger. Freddy Krueger ha sognato Chuck Norris.',
    'Una volta Chuck Norris ha fatto il bungee jumping. Saltando.',
    'Il giorno del ringraziamento chuck norris risponde "prego".',
    'Chuck Norris non legge, fissa un libro finché non ottiene le informazioni che vuole.',
    'Chuck Norris non accende la luce, spegne il buio.',
    'Chuck Norris ha la barba lunga, perché non esiste ancora una lama che la può tagliare.',
    'Chuck Norris riesce a guidare una bicicletta tandem dalla postazione dietro.',
    'Chuck Norris detiene ancora il record per numero di persone uccise in un videogioco: dodici. A tetris.',
    'Chuck Norris fa la torta di mele. Con le pere.',
    'Chuck Norris prende 20 piccioni, 3 condor e un\'aquila reale con mezza fava.',
    'Una volta Chuck Norris è caduto a faccia in giù sulla schiena di un istrice, trafiggendolo più volte con i peli della barba.',
    'Quando Chuck Norris guarda dentro una conchiglia, vede il mare.',
    'Chuck Norris non ha mai un asso nella manica. Ha una scala reale.',
    'Chuck Norris quando legge non si deve leccare le dita per sfogliare il libro. Sono le pagine che sudano dalla paura.',
    'La merenda preferita da Chuck Norris: pane e Philadelphia. La città.',
    'Il pitbull di Chuck Norris ha appeso al cancello di casa il cartello "attenti a Chuck Norris".',
    'Dalla vite si ricava il vino. Chuck Norris ricava la birra dai bulloni.',
    'Le piante dei piedi di Chuck Norris sono carnivore.',
    'Chuck Norris ha una grande voglia sul piede destro. Di uccidere.',
    'Quando Chuck Norris fa una gara non arriva mai primo. Arriva zero.',
    'Il cellulare di Chuck Norris non squilla. Si mette di fianco a lui, con la mano alzata. In silenzio.',
    'L\'arbre magique di Chuck Norris è una sequoia a grandezza naturale.',
    'Chuck Norris al mattino beve 18 caffè. 5 mentre sta ancora dormendo.',
    'Chuck Norris ha dimostrato le teoria dela relatività con la calcolatrice omaggio di Topolino.',
    'Chuck Norris può applaudire sbattendo le palpebre.',
    'Chuck Norris, quando un turista con una macchina fotografica gli ha chiesto di fargli uno scatto, ha stabilito subito il nuovo record sui 100m piani.',
    'I pollici di Chuck Norris non sono opponibili. Nessuno osa opporsi a Chuck Norris.',
    'Il pick-up di Chuck Norris ha la marmitta apocalittica.',
    'Chuck Norris ha partecipato al salto in lungo a Sydney 2000. Ha vinto la medaglia d\'oro atterrando 4 anni dopo ad Atene 2004.',
    'Quando Chuck Norris, da ragazzo, andava in sala giochi, i suoi amici riuscivano a mandare in tilt i flipper. Lui mandava in tilt i tavoli da biliardo.',
    'Prima di incontrare Chuck Norris, la Mano della Famiglia Addams era un uomo intero.',
    'Il rubinetto di Chuck Norris non perde. Vince.',
    'Chuck Norris una volta ordinò un "Mac toast" al Burger King. Glie l\'hanno dato.',
    'Il Titanic non fu affondato da un iceberg ma da Chuck Norris che tirava sassi da una spiaggia dela Florida per farli rimbalzare sull\'acqua.',
    'Chuck Norris per profumarsi usa l\'acqua di Colonia. Ora in Germania è emergenza idrica.',
    'Chuck Norris riesce a toccarsi la lingua con la punta del naso.',
    'Chuck Norris non legge i libri, legge i DVD.',
    'Il coccodrillo bianco delle fogne di New York crede che Chuck Norris sia una leggenda metropolitana.',
    'Chuck Norris riesce a tenere una foca ammaestrata in equilibrio sul suo naso.',
    'Chuck Norris usa Robocop come lettore mp3.',
    'Ogni giorno alle cinque Chuck Norris prende il the: si mette una bustina in bocca, ci versa l\'acqua rovente, attende tre minuti, poi beve tutto in un sorso. Bustina compresa.',
    'Chuck Norris puo scriverti nel pensiero.',
    'Chuck Norris può camminare sulle acque. Quando piove. In verticale.',
    'Chuck Norris è capace di vincere una partita di scacchi con una sola mossa, di karate.',
    'Chuck Norris... è stato l\'unico ad esaudire i tre desideri espressi dal Genio della Lampada.',
    'Il gatto di Chuck Norris... abbaia.',
    'Chuck Norris circonda i suoi nemici, da solo!',
    'Chuck Norris ha vinto l\'ultima coppa del mondo di Slalom Gigante scendendo dritto per dritto la montagna. I paletti si spostavano da soli, terrorizzati.',
    'Un giorno, chiudendo distrattamente un libro, Chuck Norris ha fatto un orecchio ad una pagina. Ora quel libro può sentire.',
    'Alle ultime Olimpiadi, Chuck Norris ha vinto i 100 metri piani. Il fotofinish lo ritrae sorridente mentre sorpassa il proiettile dello starter.',
    'Mentre Romolo uccideva il gemello Remo e fondava Roma, Chuck Norris stava già pensando a come schierare Totti, Perrotta e Mancini.',
    
    
    
];

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = WELCOME_MESSAGE + HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'RequestFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = randomFact + '...' + '...' + ANOTHER_ONE;
        const reprompt = HELP_REPROMPT;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'NoIntent': function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

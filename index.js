
'use strict';
const Alexa = require('ask-sdk-core');
const launchAPL = require('./launchAPL');




//ID of my skill
const SKILL_NAME = 'Barzellette Chuck (Non ufficiale)';
const WELCOME_MESSAGE = "Ciao, ";
const HELP_MESSAGE = 'prova a dire raccontami un fatto oppure raccontami una battuta se vuoi sapere qualcosa su di me';
const HELP_REPROMPT = 'Non ho capito, ne vuoi sentire un\'altra?';
const STOP_MESSAGE = 'Alla prossima!';
const ANOTHER_ONE = 'ne vuoi sentire un\'altra?';

const SKILL_NAME_en = 'Chuck Jokes (Not Official)';
const WELCOME_MESSAGE_en = "Hi, ";
const HELP_MESSAGE_en = 'try saying \' tell me a joke \' or \'tell me a fact about chuck norris\'!';
const HELP_REPROMPT_en = 'Could you repeat?';
const STOP_MESSAGE_en = 'See you next time!';
const ANOTHER_ONE_en = 'do you want to hear another joke?';

const smallImageUrl = "IMG LINK"
const largeImageUrl = "IMG LINK"
const smallImageUrlen = "IMG LINK"
const largeImageUrlen = "IMG LINK"



function supportsDisplay(handlerInput) {
    return handlerInput.requestEnvelope.context != undefined &&
      handlerInput.requestEnvelope.context.System != undefined &&
      handlerInput.requestEnvelope.context.System.device != undefined &&
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces != undefined &&
      (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL'] != undefined ||
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display != undefined) &&
      handlerInput.requestEnvelope.context.Viewport != undefined;
  }


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        var speechOutput, repromptOutput, title, smallImage, largeImage;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = WELCOME_MESSAGE + HELP_MESSAGE;
            repromptOutput = HELP_MESSAGE;
            title = SKILL_NAME;
            smallImage = smallImageUrl;
            largeImage = largeImageUrl;
        }else{
            speechOutput = WELCOME_MESSAGE_en + HELP_MESSAGE_en;
            repromptOutput = HELP_MESSAGE_en;
            title = SKILL_NAME_en;
            smallImage = smallImageUrlen;
            largeImage = largeImageUrlen;
        }
        if(supportsDisplay(handlerInput)){
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            //.withStandardCard(title, speechOutput, smallImage, largeImage)
            .withSimpleCard(title, speechOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: '[SkillProvidedToken]',
                version: '1.0',
                document: launchAPL,
                datasources: {
                    "myDocumentData": {
                    "title": title
                    }
                }
            })
            .getResponse();
        }else{
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            //.withStandardCard(title, speechOutput, smallImage, largeImage)
            .withSimpleCard(title, speechOutput)
            .getResponse();

        }
    }
};
const RequestFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RequestFactIntent';
    },
    handle(handlerInput) {
        //controllo lingua e recupero quella giusta
        var factArr;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            factArr = dataIt;
        }else{
            factArr = dataEn;
        }
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        var speechOutput, repromptOutput, smallImage, title, largeImage;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = randomFact + '...' + '...' + ANOTHER_ONE;
            repromptOutput =  HELP_REPROMPT;
            title = SKILL_NAME;
            smallImage = smallImageUrl;
            largeImage = largeImageUrl;
        }else{
            speechOutput = randomFact + '...' + '...' + ANOTHER_ONE_en;
            repromptOutput =  HELP_REPROMPT_en;
            title = SKILL_NAME_en;
            smallImage = smallImageUrlen;
            largeImage = largeImageUrlen;
        }
        if(supportsDisplay(handlerInput)){
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            //.withStandardCard(title, speechOutput, smallImage, largeImage)
            .withSimpleCard(title, speechOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: '[SkillProvidedToken]',
                version: '1.0',
                document: launchAPL,
                datasources: {
                    "myDocumentData": {
                        "title": randomFact
                      }
                }
            })
            .getResponse();
            }else{
                return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                //.withStandardCard(randomFact, speechOutput, smallImage, largeImage)
               .withSimpleCard(title, speechOutput)
                .getResponse();
    
            }
        
    }
};
const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent';
    },
    handle(handlerInput) {
        var speechOutput;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = STOP_MESSAGE;
        }else{
            speechOutput =STOP_MESSAGE_en;
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        var speechOutput;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = HELP_MESSAGE;
        }else{
            speechOutput = HELP_MESSAGE_en;
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        var speechOutput;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = STOP_MESSAGE;
        }else{
            speechOutput =STOP_MESSAGE_en;
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
/*
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
*/

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        var speechOutput;
        if(handlerInput.requestEnvelope.request.locale === 'it-IT'){
            speechOutput = HELP_MESSAGE;
        }else{
            speechOutput =HELP_MESSAGE_en;
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RequestFactIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        //IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

    const dataEn = [
        "Chuck Norris can pick oranges from an apple tree and make the best lemonade youve ever tasted.",
        "Chuck Norris counted to infinity. Twice.",
        "Chuck Norris beat the sun in a staring contest.",
        "Chuck Norris can build a snowman out of rain.",
        "Chuck Norris can strangle you with a cordless phone.",
        "When the Boogeyman goes to sleep every night he checks his closet for Chuck Norris.",
        "There is no theory of evolution, just a list of creatures Chuck Norris allows to live.",
        "Chuck Norris can pull a hat out of a rabbit.",
        "Chuck Norris beat Halo 1, 2, and 3 on Legendary with a broken Guitar Hero controller.",
        "Chuck Norris\"s computer has no \"backspace\" button, Chuck Norris doesn\"t make mistakes.",
        "Chuck can set ants on fire with a magnifying glass. At night.",
        "Chuck Norris can hear sign language.",
        "Chuck Norris makes onions cry.",
        "Chuck Norris is the reason Waldo is hiding.",
        "Chuck Norris doesn\"t play \"hide and seek.\" He plays \"hide and pray I-don\"t find you.\"",
        "Chuck Norris is the only person that can punch a cyclops between the eye.",
        "When Chuck Norris enters a room, he doesn\"t turn the lights on, he turns the dark off.",
        "M.C. Hammer learned the hard way that Chuck Norris can touch this.",
        "Bill Gates lives in constant fear that Chuck Norris\" PC will crash.",
        "Chuck Norris can speak braille.",
        "Chuck Norris can do a wheelie on a unicycle.",
        "Chuck refers to himself in the fourth person.",
        "Chuck Norris is the only man to ever defeat a brick wall in a game of tennis.",
        "Chuck Norris doesnt wear a watch. He decides what time it is.",
        "Chuck Norris can unscramble an egg.",
        "Chuck Norris doesn\"t dial the wrong number, you pick up the wrong phone.",
    ]
    const dataIt = [
        "La luce solare impiega otto minuti per raggiungere la terra. Chuck Norris ne impieda due, fermandosi pure all\"autogrill.",
        "Chuck Norris può accendere il fuoco sfregando due bastoncini... Findus.",
        "Il fax di Chuck Norris esegue dipinti a olio.",
        "Chuck Norris in 15 giorni fa un mese di ferie.",
        "Chuck Norris non schiaccia pisolini... li pesta a morte.",
        "Quando Chuck Norris guarda le stelle, le stelle abbassano lo sguardo.",
        "Il fuoco non scherza mai con Chuck Norris.",
        "La sveglia di Chuck Norris non suona la mattina. Gli porta direttamente la colazione a letto.",
        "Quando Chuck Norris si trova sull\"orlo di un burrone, il burrone si butta giù per la paura.",
        "Chuck Norris ha percorso tutto il campo di Holly e Benji in una sola puntata.",
        "Non esiste la teoria dell\"evoluzione. Solo un elenco di creature cui Chuck Norris ha permesso di vivere.",
        "Quando piove Chuck Norris non ha bisogno dell\"ombrello, la pioggia lo evita...",
        "Chuck Norris può uccidere la licenza di uccidere.",
        "Mac Gyver è in grado di costruire qualunque cosa; Chuck Norris ha costruito Mac Gyver.",
        "Chuck Norris porta una maglietta con scritto: \"Hiroshima, io c\"ero.",
        "Quando Chuck Norris fa una pessima figura in pubblico, tutti i presenti arrossiscono e si guardano le punte delle scarpe. Chuck Norris non può sentirsi in imbarazzo.",
        "Mosè ha aperto le acque... Chuck Norris ha aperto Mosè.",
        "Un giorno, tirando la leva del freno a mano del suo pick-up, Chuck Norris ha fatto jackpot vincendo un milione di dollari.",
        "Chuck Norris è il vero padre di Luke Skywalker.",
        "Prima di vedere Chuck Norris, la Gioconda piangeva.",
        "Chuck Norris sa sciare in salita.",
        "Quando Chuck Norris fuma, alla sigaretta viene il cancro.",
        "Chuck Norris non mangia il miele, mastica direttamente le api.",
        "Chuck Norris è riuscito a correre i 100 metri in 5 secondi con Bolt sulle spalle.",
        "Chuck Norris non si bagna. È l\"acqua che si Chuck Norris.",
        "Quando a Chuck Norris rubano la borsa crolla Wall Street.",
        "Quando Chuck Norris cade, le stelle esprimono un desiderio.",
        "Nel film \"Nightmare\" Johnny Depp ha sognato Freddy Krueger. Freddy Krueger ha sognato Chuck Norris.",
        "Una volta Chuck Norris ha fatto il bungee jumping. Saltando.",
        "Il giorno del ringraziamento chuck norris risponde \"prego\".",
        "Chuck Norris non legge, fissa un libro finché non ottiene le informazioni che vuole.",
        "Chuck Norris non accende la luce, spegne il buio.",
        "Chuck Norris ha la barba lunga, perché non esiste ancora una lama che la può tagliare.",
        "Chuck Norris riesce a guidare una bicicletta tandem dalla postazione dietro.",
        "Chuck Norris detiene ancora il record per numero di persone uccise in un videogioco: dodici. A tetris.",
        "Chuck Norris fa la torta di mele. Con le pere.",
        "Chuck Norris prende 20 piccioni, 3 condor e un\"aquila reale con mezza fava.",
        "Una volta Chuck Norris è caduto a faccia in giù sulla schiena di un istrice, trafiggendolo più volte con i peli della barba.",
        "Quando Chuck Norris guarda dentro una conchiglia, vede il mare.",
        "Chuck Norris non ha mai un asso nella manica. Ha una scala reale.",
        "Chuck Norris quando legge non si deve leccare le dita per sfogliare il libro. Sono le pagine che sudano dalla paura.",
        "La merenda preferita da Chuck Norris: pane e Philadelphia. La città.",
        "Il pitbull di Chuck Norris ha appeso al cancello di casa il cartello \"attenti a Chuck Norris\".",
        "Dalla vite si ricava il vino. Chuck Norris ricava la birra dai bulloni.",
        "Le piante dei piedi di Chuck Norris sono carnivore.",
        "Chuck Norris ha una grande voglia sul piede destro. Di uccidere.",
        "Quando Chuck Norris fa una gara non arriva mai primo. Arriva zero.",
        "Il cellulare di Chuck Norris non squilla. Si mette di fianco a lui, con la mano alzata. In silenzio.",
        "L\"arbre magique di Chuck Norris è una sequoia a grandezza naturale.",
        "Chuck Norris al mattino beve 18 caffè. 5 mentre sta ancora dormendo.",
        "Chuck Norris ha dimostrato le teoria dela relatività con la calcolatrice omaggio di Topolino.",
        "Chuck Norris può applaudire sbattendo le palpebre.",
        "Chuck Norris, quando un turista con una macchina fotografica gli ha chiesto di fargli uno scatto, ha stabilito subito il nuovo record sui 100m piani.",
        "I pollici di Chuck Norris non sono opponibili. Nessuno osa opporsi a Chuck Norris.",
        "Il pick-up di Chuck Norris ha la marmitta apocalittica.",
        "Chuck Norris ha partecipato al salto in lungo a Sydney 2000. Ha vinto la medaglia d\"oro atterrando 4 anni dopo ad Atene 2004.",
        "Quando Chuck Norris, da ragazzo, andava in sala giochi, i suoi amici riuscivano a mandare in tilt i flipper. Lui mandava in tilt i tavoli da biliardo.",
        "Prima di incontrare Chuck Norris, la Mano della Famiglia Addams era un uomo intero.",
        "Il rubinetto di Chuck Norris non perde. Vince.",
        "Chuck Norris una volta ordinò un \"Mac toast\" al Burger King. Glie l\"hanno dato.",
        "Il Titanic non fu affondato da un iceberg ma da Chuck Norris che tirava sassi da una spiaggia dela Florida per farli rimbalzare sull\"acqua.",
        "Chuck Norris per profumarsi usa l\"acqua di Colonia. Ora in Germania è emergenza idrica.",
        "Chuck Norris riesce a toccarsi la lingua con la punta del naso.",
        "Chuck Norris non legge i libri, legge i DVD.",
        "Il coccodrillo bianco delle fogne di New York crede che Chuck Norris sia una leggenda metropolitana.",
        "Chuck Norris riesce a tenere una foca ammaestrata in equilibrio sul suo naso.",
        "Chuck Norris usa Robocop come lettore mp3.",
        "Ogni giorno alle cinque Chuck Norris prende il the: si mette una bustina in bocca, ci versa l\"acqua rovente, attende tre minuti, poi beve tutto in un sorso. Bustina compresa.",
        "Chuck Norris puo scriverti nel pensiero.",
        "Chuck Norris può camminare sulle acque. Quando piove. In verticale.",
        "Chuck Norris è capace di vincere una partita di scacchi con una sola mossa, di karate.",
        "Chuck Norris... è stato l\"unico ad esaudire i tre desideri espressi dal Genio della Lampada.",
        "Il gatto di Chuck Norris... abbaia.",
        "Chuck Norris circonda i suoi nemici, da solo!",
        "Chuck Norris ha vinto l\"ultima coppa del mondo di Slalom Gigante scendendo dritto per dritto la montagna. I paletti si spostavano da soli, terrorizzati.",
        "Un giorno, chiudendo distrattamente un libro, Chuck Norris ha fatto un orecchio ad una pagina. Ora quel libro può sentire.",
        "Alle ultime Olimpiadi, Chuck Norris ha vinto i 100 metri piani. Il fotofinish lo ritrae sorridente mentre sorpassa il proiettile dello starter.",
        "Mentre Romolo uccideva il gemello Remo e fondava Roma, Chuck Norris stava già pensando a come schierare Totti, Perrotta e Mancini.",
        "Quando Chuck Norris ricama, prende gli aghi da un pagliaio.",
        "Le forbici si tagliano sui capelli di Chuck Norris",
        "Braccio di Ferro mangia spinaci, Chuck Norris mangia Braccio di Ferro.",
        
        "Chuck Norris ha scalato l’Everest in 15 minuti. 14 minuti gli son serviti a fare un pupazzo di neve alla base.",
        "Chuck Norris si Lancia ma il paracadute non si apre. Il giorno dopo lo riporta indietro per essere rimborsato.",
        "Chuck Norris può suonare il violin con un pianoforte.",
        "Chuck Norris riesce a sbattere una porta girevole.",
        "Lo sai che Chuck Norris aveva un ruolo in Star Wars? Era la forza.",
        "Il contachilometri del pick up di Chuck Norris ha le indicazioni in anni luce. ",
        "Togliendosi un sassolino dallo stivale, Chuck Norris ha trovato una miniera di diamanti.",
        "Una volta Chuck Norris ha rapito gli alieni.",
        "Chuck Norris non piange. Gli sudano gli occhi.",
        "Chuck Norris può colpire un proiettile al volo lanciando un piattello.",
        "Chuck Norris può mangiarsi le unghie senza togliersi i guanti.",
        "Chuck Norris usa Robocop come lettore mp3.",
        "Chuck Norris riesce a leccarsi il gomito.",
        "Chuck Norris può svuotare la luna piena.",
        "Chuck Norris può scavare una fossa partendo dal basso. ",
        "Chuck Norris quando gioca a dama e mangia qualche pedina non la mastica neanche.",
        "Chuck Norris può piegare un grissino.",
        "Chuck Norris può indicarsi l\"indice della mano destra con l\"indice della mano destra.",
        "Chuck Norris può costruire un castello di carte con la sabbia. ",
        "Chuck Norris può decretare la fine di un\"epoca facendo una x sul suo calendario. ",
        "Quando scatti una foto a Chuck Norris, il flash rimane accecato. ",
        "Chuck Norris ha fatto il giro del mondo in 80 giorni a bordo di un pallone fatto col Big Babol. ",
        "Chuck Norris ha scalato l\"Etna. Dall\"interno.",
        "Il dopobarba di Chuck Norris contiene semplicemente altra barba.",
        "Chuck Norris usa come carta igienica la Mummia. ",
        "Chuck Norris ha rovinato i mondiali di Palla Avvelenata trovando l\"antidoto.",
        "L\"antivirus del PC di Chuck Norris è Chuck Norris.",
        "Chuck Norris ha trovato l\"Area 51 facendo Base 17 per Altezza 3.",
        " Quando Chuck Norris cade dalla moto e striscia per terra coi suoi jeans nuovi, si strappa l\"asfalto. ",
        "I salmoni risalgono i fiumi perché sanno che in quel periodo Chuck Norris va al mare. ",
        "Quando Chuck Norris spiega le vele, la barca capisce. " 
    ]

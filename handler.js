'use strict';
const phraseModule = require('./phrase.js');
const speechModule = require('./speech.js');

//#region Launch Intent Handler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Random Generator, This tool helps you find random stuffs like phrases, words, etc. Try using Alexa, ask random generator a phrase';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Random Generator', speechText)
            .getResponse();
    }
};
//#endregion

//#region Phrase Intent Handler
const PhraseIntentHandler = {
    canHandle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'randomphrase';
    },
    handle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        const phraseCount = request.intent.slots.phrasecount.value;
        const phrases = phraseModule.getRandom(phraseCount);
        const response = speechModule.getResponse(phrases);
        return handlerInput.responseBuilder
            .speak(response.speechText)
            .withSimpleCard('Random Generator', response.displayText)
            .getResponse();
    }
};
//#endregion

//#region Help Intent Handler
const HelpIntentHandler = {
    canHandle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say share a random phrase !';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Random Phrase', speechText)
            .getResponse();
    }
};
//#endregion 

//#region Cancel Intent Handler
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};
//#endregion

//#region Session Ended Intent Handler
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        const {
            request
        } = handlerInput.requestEnvelope;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.requestEnvelope.responseBuilder.getResponse();
    }
};
//#endregion

//#region Error Intent Handler
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};
//#endregion

const Alexa = require('ask-sdk-core');
const skillBuilder = Alexa.SkillBuilders.custom();

let skill;

module.exports.main = 
//async function (event, context) {
    // if (!skill) {
        //skill = Alexa.SkillBuilders.custom()
        skillBuilder.addRequestHandlers(
                LaunchRequestHandler,
                PhraseIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .lambda();
            //.create();
    // }

    // console.log(event);
    // const responseEnvelope = await skill.invoke(event, context);    
    // return {
    //     "body": responseEnvelope
    // };
//}
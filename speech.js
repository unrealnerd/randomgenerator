module.exports = {
    getResponse(phrases) {
        var speechText = [];
        var displayText = [];
        var pause = '<break time="1s"/><emphasis level="moderate">';
        var closingPause = '</emphasis><break time="2s"/>';
        for (let i = 0; i < phrases.length; i++) {
            const element = phrases[i];
            speechText.push(element.key + `${pause} What this means is, ${element.value} ${closingPause}`);
            displayText.push(`"${element.key}" - What this means is, "${element.value}"`);

        }
        return {
            speechText: speechText.join(" "),
            displayText: displayText.join(" ")
        };
    }

}
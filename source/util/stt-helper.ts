const SpeechRecognizer = window['webkitSpeechRecognition']
const RecognitionGrammar = window['webkitSpeechGrammarList']
const RecognitionEvent = window['webkitSpeechRecognitionEvent']

class SpeechToTextHelper {
	recognizer
	wordList

	constructor(grammar, language = 'en-US') {
		this.recognizer = new SpeechRecognizer()
		this.wordList = new RecognitionGrammar()
		this.wordList.addFromString(grammar, 1)

		this.recognizer.grammars = this.wordList
		this.recognizer.continuous = false
		this.recognizer.lang = language
		this.recognizer.interimResults = false
		this.recognizer.maxAlternatives = 1
	}

	start(
		callback, // (error?: Error, result?: string) => void,
	) {
		this.recognizer.start()

		this.recognizer.onresult = (event) => {
			console.log('Heard the following:', event)
			callback(undefined, event.results[0][0].transcript)
		}

		this.recognizer.onspeechend = () => {
			this.recognizer.stop()
		}

		this.recognizer.onnomatch = (event) => {
			console.log('Could not recognize word from list:', event)

			callback(new Error('cannot-recognize'))
		}
		this.recognizer.onerror = (event) => {
			console.log('Errororrrrr:', event)

			callback(new Error('voice-error'))
		}
	}
}

export default SpeechToTextHelper

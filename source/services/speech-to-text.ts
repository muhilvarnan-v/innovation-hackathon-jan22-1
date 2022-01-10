// source/services/speech-to-text.ts
// Wrapper around the Webkit Speech Recognition API

// Grab the necessary classes from the `window` object
const SpeechRecognizer = window['webkitSpeechRecognition']
const RecognitionGrammar = window['webkitSpeechGrammarList']
const RecognitionEvent = window['webkitSpeechRecognitionEvent']

/**
 * A wrapper around the Webkit Speech Recognition API.
 */
class SpeechToTextHelper {
	/**
	 * An instance of the `window.webkitSpeechRecognition` class.
	 */
	recognizer

	/**
	 * An instance of the `window.webkitSpeechGrammarList` class.
	 *
	 * Contains a list of words to detect from the user's voice.
	 */
	wordList

	/**
	 * @constructor for the `SpeechToTextHelper` class.
	 *
	 * @param {string[]} wordList - The list of words to detect.
	 * @param {string} language - The language to assume the user is speaking in. Defaults to `en-US`.
	 */
	constructor(wordList, language = 'en-US') {
		this.recognizer = new SpeechRecognizer()
		this.wordList = new RecognitionGrammar()

		const grammar =
			'#JSGF V1.0; grammar words; public <word> = ' +
			wordList.join(' | ') +
			' ;'
		this.wordList.addFromString(grammar, 1)

		this.recognizer.grammars = this.wordList
		this.recognizer.continuous = false
		this.recognizer.lang = language
		this.recognizer.interimResults = false
		this.recognizer.maxAlternatives = 1
	}

	/**
	 * Begin listening for voice input from the user. Returns the transcript or an
	 * error via a callback.
	 *
	 * @param {(error?: Error, result?: string) => void} callback - Callback that fires on result or error.
	 *
	 * The `error.message` can be either:
	 * - `cannot-recognize`: No word from the list was heard.
	 * - `unknown-error`: An error occurred while listening for voice input. Check
	 *   if we are allowed to access the microphone.
	 */
	start(callback) {
		this.recognizer.start()

		// Fired when the user stops speaking
		this.recognizer.onspeechend = () => this.recognizer.stop()
		// Fired when voice recognition is complete
		this.recognizer.onresult = (event) => {
			console.log('Heard the following:', event)
			callback(undefined, event.results[0][0].transcript)
		}
		// Fired when no word from the list was recognized
		this.recognizer.onnomatch = (event) => {
			console.log('Could not recognize word from list:', event)
			callback(new Error('cannot-recognize'))
		}
		// Fired when there was an error listening for input
		this.recognizer.onerror = (event) => {
			console.log('Errororrrrr:', event)
			callback(new Error('unknown-error'))
		}
	}
}

export default SpeechToTextHelper

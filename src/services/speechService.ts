import { LanguageCode } from '../types';

const LANG_MAP: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  mr: 'mr-IN',
  pa: 'pa-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  bn: 'bn-IN',
  en: 'en-IN'
};

export class SpeechService {
  private static synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static recognition: any = null;

  public static speak(text: string, lang: LanguageCode = 'hi') {
    if (!this.synth) return;

    this.synth.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[lang] || 'hi-IN';
    utterance.rate = 0.95; // Slightly slower for rural farmer clarity
    utterance.pitch = 1.0;

    // Try finding exact regional voice if available
    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(LANG_MAP[lang]));
    if (voice) {
      utterance.voice = voice;
    }

    this.synth.speak(utterance);
  }

  public static stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static startListening(
    lang: LanguageCode,
    onResult: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Voice recognition is not supported in this browser. You can type manually below!');
      onEnd();
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = LANG_MAP[lang] || 'hi-IN';

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        onError(`Voice error: ${event.error}`);
        onEnd();
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
    } catch (e) {
      onError('Could not start voice recognition.');
      onEnd();
    }
  }

  public static stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

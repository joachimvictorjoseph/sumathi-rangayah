import type { Language } from "@/lib/content/types";
import type {
  SpeakOptions,
  TTSCallbacks,
  TTSEngine,
  TTSVoice,
} from "./types";

/**
 * Phase 1 engine: the browser's built-in Web Speech API (SpeechSynthesis).
 * Free, offline, zero-cost — but voice quality/availability depends on the OS.
 *
 * Everything browser-specific is contained here. Phase 2 replaces this engine
 * without touching the ListenBar UI.
 */
class WebSpeechEngine implements TTSEngine {
  readonly id = "web-speech";

  private utterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  // Chrome pauses long utterances after ~15s; this keepalive works around it.
  private keepAlive: ReturnType<typeof setInterval> | null = null;

  isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  getVoices(): Promise<TTSVoice[]> {
    return new Promise((resolve) => {
      if (!this.isSupported()) return resolve([]);

      const read = () => {
        this.voices = window.speechSynthesis.getVoices();
        resolve(this.voices.map(toTTSVoice));
      };

      const current = window.speechSynthesis.getVoices();
      if (current.length > 0) {
        this.voices = current;
        resolve(current.map(toTTSVoice));
      } else {
        // Voices load asynchronously on first visit.
        window.speechSynthesis.onvoiceschanged = read;
        // Safety timeout in case the event never fires.
        setTimeout(read, 500);
      }
    });
  }

  speak(options: SpeakOptions, callbacks?: TTSCallbacks): void {
    if (!this.isSupported()) {
      callbacks?.onError?.("Text-to-speech is not supported in this browser.");
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(options.text);
    const voice = this.pickVoice(options.language, options.voiceId);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = options.language === "ta" ? "ta-IN" : "en-US";
    }
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;

    utterance.onstart = () => {
      callbacks?.onStatusChange?.("playing");
      this.startKeepAlive();
    };
    utterance.onend = () => {
      this.stopKeepAlive();
      callbacks?.onStatusChange?.("idle");
      callbacks?.onEnd?.();
    };
    utterance.onerror = (e) => {
      this.stopKeepAlive();
      // "interrupted"/"canceled" are expected when the user stops — not errors.
      if (e.error !== "interrupted" && e.error !== "canceled") {
        callbacks?.onError?.(`Playback error: ${e.error}`);
      }
      callbacks?.onStatusChange?.("idle");
    };

    this.utterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (this.isSupported()) {
      window.speechSynthesis.pause();
      this.stopKeepAlive();
    }
  }

  resume(): void {
    if (this.isSupported()) {
      window.speechSynthesis.resume();
      this.startKeepAlive();
    }
  }

  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
    this.stopKeepAlive();
    this.utterance = null;
  }

  /** Auto-select a voice matching the story language, or the requested id. */
  private pickVoice(
    language: Language,
    voiceId?: string,
  ): SpeechSynthesisVoice | undefined {
    if (voiceId) {
      const chosen = this.voices.find((v) => voiceKey(v) === voiceId);
      if (chosen) return chosen;
    }
    const prefix = language === "ta" ? "ta" : "en";
    return (
      this.voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ??
      // Fall back to any English voice if no Tamil voice is installed.
      this.voices.find((v) => v.lang.toLowerCase().startsWith("en"))
    );
  }

  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 10_000);
  }

  private stopKeepAlive() {
    if (this.keepAlive) {
      clearInterval(this.keepAlive);
      this.keepAlive = null;
    }
  }
}

/** Build a stable id for a browser voice (name+lang is unique enough). */
function voiceKey(v: SpeechSynthesisVoice): string {
  return `${v.name}::${v.lang}`;
}

function toTTSVoice(v: SpeechSynthesisVoice): TTSVoice {
  return { id: voiceKey(v), name: v.name, lang: v.lang };
}

export const webSpeechEngine: TTSEngine = new WebSpeechEngine();

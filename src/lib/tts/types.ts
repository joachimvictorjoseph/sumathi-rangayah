import type { Language } from "@/lib/content/types";

/**
 * TTS (text-to-speech) abstraction.
 *
 * PHASE 2 EXTENSION POINT — "AI reading mode":
 * The <ListenBar/> component talks ONLY to this interface, never to the browser
 * SpeechSynthesis API directly. To upgrade to AI voices in Phase 2, implement a
 * new engine (e.g. `aiVoiceEngine`) that satisfies `TTSEngine` — streaming audio
 * from an API — and return it from `getTTSEngine()`. No UI changes required.
 */

export type TTSStatus = "idle" | "loading" | "playing" | "paused";

export interface TTSVoice {
  /** Stable identifier used by the engine to re-select the voice. */
  id: string;
  /** Human-readable label for the voice selector. */
  name: string;
  /** BCP-47 language tag, e.g. "ta-IN", "en-US". */
  lang: string;
}

export interface SpeakOptions {
  text: string;
  /** Content language — used to auto-pick a matching voice when none chosen. */
  language: Language;
  /** Engine voice id (from getVoices()); falls back to auto-selection. */
  voiceId?: string;
  rate?: number;
  pitch?: number;
}

export interface TTSCallbacks {
  onStatusChange?: (status: TTSStatus) => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
}

export interface TTSEngine {
  /** Identifier, useful for analytics / debugging (e.g. "web-speech"). */
  readonly id: string;
  /** Whether this engine can run in the current environment. */
  isSupported(): boolean;
  /** Available voices (may resolve asynchronously as the platform loads them). */
  getVoices(): Promise<TTSVoice[]>;
  /** Begin (or restart) speaking. */
  speak(options: SpeakOptions, callbacks?: TTSCallbacks): void;
  pause(): void;
  resume(): void;
  stop(): void;
}

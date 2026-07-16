import type { TTSEngine } from "./types";
import { webSpeechEngine } from "./web-speech-engine";

export * from "./types";

/**
 * Returns the active TTS engine.
 *
 * PHASE 2: swap the return value for an AI-voice engine (or choose at runtime,
 * e.g. based on a feature flag or the story's `aiVoice` field). The ListenBar
 * calls this and is otherwise unaware of which engine backs it.
 */
export function getTTSEngine(): TTSEngine {
  // Phase 1: browser Web Speech API.
  return webSpeechEngine;

  // Phase 2 sketch:
  // return process.env.NEXT_PUBLIC_AI_VOICE === "on" ? aiVoiceEngine : webSpeechEngine;
}

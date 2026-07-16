"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Language } from "@/lib/content/types";
import { getTTSEngine, type TTSStatus, type TTSVoice } from "@/lib/tts";
import { PlayIcon, PauseIcon, StopIcon, SpeakerIcon } from "@/components/ui/icons";

/**
 * LISTEN bar shown at the top of a story.
 *
 * Deliberately ISOLATED from the rest of the reading page and from any specific
 * speech backend — it only depends on the `TTSEngine` interface via
 * getTTSEngine(). Phase 2 ("AI reading mode") swaps the engine with no changes
 * to this component.
 *
 * Behaviour:
 *  - Auto-selects a Tamil or English voice based on `language`.
 *  - Offers a voice selector (voices matching the story language float to top).
 *  - Play / Pause / Stop controls using the active engine.
 *  - Degrades gracefully when TTS is unavailable in the browser.
 */
export function ListenBar({
  text,
  language,
}: {
  text: string;
  language: Language;
}) {
  const engine = useMemo(() => getTTSEngine(), []);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<TTSStatus>("idle");
  const [voices, setVoices] = useState<TTSVoice[]>([]);
  const [voiceId, setVoiceId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Keep the latest voice selection available to callbacks without re-binding.
  const voiceIdRef = useRef(voiceId);
  voiceIdRef.current = voiceId;

  // Load engine support + voices on mount.
  useEffect(() => {
    if (!engine.isSupported()) {
      setSupported(false);
      return;
    }
    let cancelled = false;
    engine.getVoices().then((all) => {
      if (cancelled) return;
      setVoices(sortByLanguage(all, language));
    });

    // Stop playback if the user navigates away.
    return () => {
      cancelled = true;
      engine.stop();
    };
  }, [engine, language]);

  const handlePlay = () => {
    setError(null);
    if (status === "playing") {
      engine.pause();
      setStatus("paused");
      return;
    }
    if (status === "paused") {
      engine.resume();
      setStatus("playing");
      return;
    }
    engine.speak(
      { text, language, voiceId: voiceIdRef.current || undefined },
      {
        onStatusChange: setStatus,
        onError: (msg) => setError(msg),
      },
    );
  };

  const handleStop = () => {
    engine.stop();
    setStatus("idle");
  };

  const onVoiceChange = (id: string) => {
    setVoiceId(id);
    // If already speaking, restart with the newly chosen voice.
    if (status === "playing" || status === "paused") {
      engine.speak(
        { text, language, voiceId: id || undefined },
        { onStatusChange: setStatus, onError: setError },
      );
    }
  };

  if (!supported) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-plum/15 bg-lavender/40 px-4 py-3 text-sm text-muted">
        <SpeakerIcon className="h-4 w-4" />
        Listening isn&apos;t supported in this browser. Try Chrome, Edge or Safari.
      </div>
    );
  }

  const isPlaying = status === "playing";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-plum/15 bg-lavender/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePlay}
          className="btn-plum !px-4 !py-2"
          aria-label={isPlaying ? "Pause" : "Listen to this story"}
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
          <span>{isPlaying ? "Pause" : status === "paused" ? "Resume" : "Listen"}</span>
        </button>

        {status !== "idle" && (
          <button
            type="button"
            onClick={handleStop}
            className="btn-ghost !px-3 !py-2"
            aria-label="Stop"
          >
            <StopIcon className="h-4 w-4" />
          </button>
        )}

        <span className="flex items-center gap-1.5 text-xs text-muted">
          <SpeakerIcon className="h-4 w-4" />
          {status === "playing"
            ? "Reading aloud…"
            : status === "paused"
              ? "Paused"
              : "Listen to this story"}
        </span>
      </div>

      {/* Voice selector */}
      <label className="flex items-center gap-2 text-xs text-muted">
        <span className="whitespace-nowrap">Voice</span>
        <select
          value={voiceId}
          onChange={(e) => onVoiceChange(e.target.value)}
          className="max-w-[190px] rounded-md border border-plum/20 bg-white/70 px-2 py-1 text-xs text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-light"
        >
          <option value="">
            Auto ({language === "ta" ? "Tamil" : "English"})
          </option>
          {voices.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="text-xs text-plum sm:w-full sm:text-right" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Voices whose language matches the story float to the top of the list. */
function sortByLanguage(voices: TTSVoice[], language: Language): TTSVoice[] {
  const prefix = language === "ta" ? "ta" : "en";
  return [...voices].sort((a, b) => {
    const aMatch = a.lang.toLowerCase().startsWith(prefix) ? 0 : 1;
    const bMatch = b.lang.toLowerCase().startsWith(prefix) ? 0 : 1;
    return aMatch - bMatch;
  });
}

import React, { useState, useEffect } from 'react';
import { Waves, Volume2, VolumeX } from 'lucide-react';

// Shared singleton audio engine to keep desktop & mobile buttons perfectly synchronized
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let stopNodes: (() => void) | null = null;
let isPlayingGlobal = false;
const listeners = new Set<(playing: boolean) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener(isPlayingGlobal));
}

function toggleGlobalOceanSound(): void {
  if (isPlayingGlobal) {
    // Graceful fade out
    if (gainNode && audioCtx) {
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
      setTimeout(() => {
        if (stopNodes) stopNodes();
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.close().catch(() => {});
          audioCtx = null;
        }
        isPlayingGlobal = false;
        notifyListeners();
      }, 500);
    } else {
      isPlayingGlobal = false;
      notifyListeners();
    }
  } else {
    // Start procedural ocean wave sound
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtx = ctx;

      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate ocean wave dynamics
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      // LFO for wave swelling
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8s cycle

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(260, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Master gain with smooth fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.2);
      gainNode = masterGain;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      whiteNoise.start(0);
      lfo.start(0);

      stopNodes = () => {
        try {
          whiteNoise.stop();
          lfo.stop();
        } catch {
          // ignore
        }
      };

      isPlayingGlobal = true;
      notifyListeners();
    } catch (e) {
      console.error('Audio init error:', e);
    }
  }
}

export interface SoundAmbianceProps {
  id?: string;
  size?: 'sm' | 'default';
  className?: string;
}

export const SoundAmbiance: React.FC<SoundAmbianceProps> = ({
  id = 'btn-sound-ambiance',
  size = 'default',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(isPlayingGlobal);

  useEffect(() => {
    const handleStateChange = (playing: boolean) => {
      setIsPlaying(playing);
    };
    listeners.add(handleStateChange);
    return () => {
      listeners.delete(handleStateChange);
    };
  }, []);

  const isSmall = size === 'sm';

  return (
    <button
      id={id}
      onClick={toggleGlobalOceanSound}
      className={`inline-flex items-center transition-all duration-300 rounded-full font-medium ${
        isSmall
          ? `gap-1.5 px-2.5 py-1 text-[11px] shadow-2xs ${
              isPlaying
                ? 'bg-emerald-800 text-emerald-100 shadow-xs shadow-emerald-900/30 ring-1 ring-emerald-500/50 animate-pulse'
                : 'bg-white/85 hover:bg-white text-stone-700 hover:text-stone-900 border border-black/5'
            }`
          : `gap-2 px-3 py-1.5 text-xs ${
              isPlaying
                ? 'bg-emerald-800 text-emerald-100 shadow-sm shadow-emerald-900/20 ring-2 ring-emerald-600/40 animate-pulse'
                : 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-700 hover:text-stone-900 border border-stone-300/50'
            }`
      } ${className}`}
      title={isPlaying ? 'Pausar som ambiente de ondas' : 'Tocar som relaxante das ondas de Morro de São Paulo'}
      aria-label="Som ambiente da praia"
    >
      {isPlaying ? (
        <>
          <Waves className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-300 animate-bounce`} />
          {isSmall ? (
            <span>Som do Mar ON</span>
          ) : (
            <>
              <span className="hidden sm:inline">Som do Mar Ativo</span>
              <span className="sm:hidden">Ondas ON</span>
            </>
          )}
          <Volume2 className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-300`} />
        </>
      ) : (
        <>
          <Waves className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-stone-500`} />
          {isSmall ? (
            <span>Som do Mar</span>
          ) : (
            <>
              <span className="hidden sm:inline">Ouvir Som do Mar</span>
              <span className="sm:hidden">Som do Mar</span>
            </>
          )}
          <VolumeX className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-stone-400`} />
        </>
      )}
    </button>
  );
};

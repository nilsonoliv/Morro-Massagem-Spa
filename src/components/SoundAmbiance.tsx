import React, { useState, useEffect, useRef } from 'react';
import { Waves, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const SoundAmbiance: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const stopNodesRef = useRef<(() => void) | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      // Stop
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          if (stopNodesRef.current) stopNodesRef.current();
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
          }
          setIsPlaying(false);
        }, 600);
      } else {
        setIsPlaying(false);
      }
    } else {
      // Start audio synthesis
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Buffer for pink/sea noise
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
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 seconds per ocean wave cycle

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(260, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.2);
        gainNodeRef.current = masterGain;

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        whiteNoise.start(0);
        lfo.start(0);

        stopNodesRef.current = () => {
          try {
            whiteNoise.stop();
            lfo.stop();
          } catch {
            // ignore
          }
        };

        setIsPlaying(true);
      } catch (e) {
        console.error('Audio init error:', e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      id="btn-sound-ambiance"
      onClick={toggleSound}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        isPlaying
          ? 'bg-emerald-800 text-emerald-100 shadow-sm shadow-emerald-900/20 ring-2 ring-emerald-600/40 animate-pulse'
          : 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-700 hover:text-stone-900 border border-stone-300/50'
      }`}
      title={isPlaying ? 'Pausar som ambiente de ondas' : 'Tocar som relaxante das ondas de Morro de São Paulo'}
      aria-label="Som ambiente da praia"
    >
      {isPlaying ? (
        <>
          <Waves className="w-3.5 h-3.5 text-emerald-300 animate-bounce" />
          <span className="hidden sm:inline">Som do Mar Ativo</span>
          <span className="sm:hidden">Ondas ON</span>
          <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
        </>
      ) : (
        <>
          <Waves className="w-3.5 h-3.5 text-stone-500" />
          <span className="hidden sm:inline">Ouvir Som do Mar</span>
          <span className="sm:hidden">Som do Mar</span>
          <VolumeX className="w-3.5 h-3.5 text-stone-400" />
        </>
      )}
    </button>
  );
};

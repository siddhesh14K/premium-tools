// Video compression worker
const ctx: Worker = self as any;

interface CompressionMessage {
  type: string;
  payload: {
    id: string;
    file: File;
    settings: CompressionSettings;
  };
}

interface CompressionSettings {
  quality: number;
  resolution: string;
  bitrate: number;
  format: string;
  fps: number;
  audioQuality: number;
  removeAudio: boolean;
  fastStart: boolean;
  twoPass: boolean;
  preset: "ultrafast" | "fast" | "medium" | "slow" | "veryslow";
  codec: "h264" | "h265" | "vp9" | "av1";
}

ctx.onmessage = async (event: MessageEvent<CompressionMessage>) => {
  const { type, payload } = event.data;

  if (type === 'compress') {
    try {
      // Report progress start
      ctx.postMessage({
        type: 'progress',
        payload: { id: payload.id, progress: 0 }
      });

      // Create video element to process the video
      const videoBlob = new Blob([payload.file], { type: payload.file.type });
      const videoUrl = URL.createObjectURL(videoBlob);
      
      // Process the video using WebCodecs API if available
      if ('VideoEncoder' in globalThis) {
        // Implementation for modern browsers with WebCodecs
        const compressedBlob = await compressWithWebCodecs(videoUrl, payload.settings);
        
        ctx.postMessage({
          type: 'complete',
          payload: {
            id: payload.id,
            blob: compressedBlob,
            size: compressedBlob.size
          }
        });
      } else {
        // Fallback implementation
        const compressedBlob = await compressWithCanvas(videoUrl, payload.settings);
        
        ctx.postMessage({
          type: 'complete',
          payload: {
            id: payload.id,
            blob: compressedBlob,
            size: compressedBlob.size
          }
        });
      }

      URL.revokeObjectURL(videoUrl);
    } catch (error) {
      ctx.postMessage({
        type: 'error',
        payload: {
          id: payload.id,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }
};

async function compressWithWebCodecs(videoUrl: string, settings: CompressionSettings): Promise<Blob> {
  // This is a placeholder for the WebCodecs implementation
  // The actual implementation would use the VideoEncoder API
  throw new Error('WebCodecs compression not implemented yet');
}

async function compressWithCanvas(videoUrl: string, settings: CompressionSettings): Promise<Blob> {
  // This is a placeholder for the canvas-based fallback implementation
  // The actual implementation would use canvas to compress the video
  throw new Error('Canvas compression not implemented yet');
}

// Prevent TypeScript error about missing module exports
export {};

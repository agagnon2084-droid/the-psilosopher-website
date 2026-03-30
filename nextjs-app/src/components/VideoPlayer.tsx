/**
 * Video player placeholder. When Mux integration is ready,
 * install @mux/mux-player-react and render <MuxPlayer> here.
 */
export default function VideoPlayer({ playbackId }: { playbackId: string | null }) {
  if (!playbackId) return null;

  return (
    <div className="aspect-video bg-earth-900 rounded-xl flex items-center justify-center mb-8">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-earth-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-earth-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-earth-400 text-sm">Video content coming soon</p>
      </div>
    </div>
  );
}

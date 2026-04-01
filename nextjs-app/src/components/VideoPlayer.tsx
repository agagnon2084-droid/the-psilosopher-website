'use client';

/** Extracts a YouTube video ID from any standard YouTube URL format */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoPlayer({ youtubeUrl }: { youtubeUrl: string | null }) {
  if (!youtubeUrl) return null;

  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="aspect-video bg-earth-900 rounded-xl flex items-center justify-center mb-8">
        <p className="text-earth-400 text-sm">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Lesson video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

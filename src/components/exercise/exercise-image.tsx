import { useGifPreview } from "@/hooks/useGifPreview";

export default function ExerciseImage({
  gifUrl,
  exerciseId,
}: {
  gifUrl: string;
  exerciseId: string;
}) {
  const preview = useGifPreview(gifUrl, exerciseId);
  return (
    <img
      src={preview || gifUrl}
      alt={exerciseId}
      className="w-12 h-12 rounded-full object-cover"
    />
  );
}

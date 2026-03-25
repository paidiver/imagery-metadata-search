import { SummaryResult } from 'src/types/annotation';

interface ResultsSummaryProps {
  summary: SummaryResult;
}

export function ResultsSummary({ summary }: ResultsSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <div className="rounded-lg border border-default-200 p-4">
        <div className="text-xs text-default-500 uppercase tracking-wide">Annotations</div>
        <div className="text-2xl font-semibold">{summary.n_annotations}</div>
      </div>

      <div className="rounded-lg border border-default-200 p-4">
        <div className="text-xs text-default-500 uppercase tracking-wide">Images</div>
        <div className="text-2xl font-semibold">{summary.n_images}</div>
      </div>

      <div className="rounded-lg border border-default-200 p-4">
        <div className="text-xs text-default-500 uppercase tracking-wide">Annotation sets</div>
        <div className="text-2xl font-semibold">{summary.n_annotation_sets}</div>
      </div>

      <div className="rounded-lg border border-default-200 p-4">
        <div className="text-xs text-default-500 uppercase tracking-wide">Image sets</div>
        <div className="text-2xl font-semibold">{summary.n_image_sets}</div>
      </div>
    </div>
  );
}

import { AnnotationResult } from 'src/types/annotation';

interface AnnotationCardProps {
  item: AnnotationResult;
}

export function AnnotationCard({ item }: AnnotationCardProps) {
  return (
    <div className="rounded-lg border border-default-200 p-3 flex flex-col gap-1">
      <div>
        <strong>Image:</strong> {item.image_filename}
      </div>
      <div>
        <strong>Label:</strong> {item.label_name}
      </div>
      <div>
        <strong>AphiaID:</strong> {item.label_aphia_id ?? '—'}
      </div>
      <div>
        <strong>Annotator:</strong> {item.annotator_name}
      </div>
      <div>
        <strong>Platform:</strong> {item.annotation_platform ?? '—'}
      </div>
      <div>
        <strong>Shape:</strong> {item.annotation_shape}
      </div>
      <div>
        <strong>Created:</strong> {item.creation_datetime}
      </div>
    </div>
  );
}

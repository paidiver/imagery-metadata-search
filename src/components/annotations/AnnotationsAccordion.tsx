import { Accordion, AccordionItem } from '@heroui/accordion';
import { AnnotationResult } from 'src/types/annotation';

import { AnnotationCard } from './AnnotationCard';

interface AnnotationsAccordionProps {
  submissions: Record<string, AnnotationResult[]>;
}

export function AnnotationsAccordion({ submissions }: AnnotationsAccordionProps) {
  return (
    <Accordion selectionMode="multiple" variant="splitted">
      {Object.entries(submissions).map(([annotationSetId, items]) => {
        const annotationSetName = items[0]?.annotation_set_name || annotationSetId;

        return (
          <AccordionItem
            key={annotationSetId}
            aria-label={annotationSetName}
            title={annotationSetName}
            subtitle={`${items.length} annotation${items.length === 1 ? '' : 's'}`}
          >
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <AnnotationCard key={item.uuid} item={item} />
              ))}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

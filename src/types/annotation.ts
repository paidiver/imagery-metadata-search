export interface Params {
  page_size: number;
  page: number;
  aphia_ids?: number[];
  name_part?: string;
  include_descendants?: boolean;
  calculate_summary?: boolean;
}

export interface SearchTerms {
  fieldType: 'name_part' | 'aphia_ids';
  value: string | [number, string];
}

export interface WormsResult {
  AphiaID: number;
  scientificname: string;
  url: string;
  rank: string;
  status: string;
  valid_AphiaID: number;
  valid_name: string;
  modified: string;
  cached_at: string;
  parent_AphiaID: number;
}

export interface AnnotationResult {
  uuid: string;
  creation_datetime: string;
  annotation_set_name: string;
  image_set_name: string;
  image_set_uuid: string;
  image_filename: string;
  image_uuid: string;
  label_name: string;
  label_aphia_id: number | null;
  annotation_platform: string | null;
  annotation_shape: string;
  annotation_coordinates: number[][];
  annotation_dimension_pixels: number | null;
  annotator_name: string;
}

export interface SummaryResult {
  n_annotations: number;
  n_images: number;
  n_annotation_sets: number;
  n_image_sets: number;
}

export interface SearchResults {
  summary: SummaryResult;
  annotations: Record<string, AnnotationResult[]>;
}

export interface SearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResults;
}

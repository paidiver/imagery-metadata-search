export type SetKind = 'image' | 'annotation' | 'label';

export interface SetMetadataRecord {
  id: string;
  name: string;
  handle?: string | null;
  project?: { id: string; name: string } | null;
  context?: { id: string; name: string } | null;
  abstract?: string | null;
  objective?: string | null;
  target_timescale?: string | null;
  target_environment?: string | null;
  platform?: { id: string; name: string } | null;
  sensor?: { id: string; name: string } | null;
  longitude?: number | null;
  latitude?: number | null;
  obis_handles?: string[] | null;
  [key: string]: unknown;
}

export interface SetSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SetMetadataRecord[];
}

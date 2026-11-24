import axios from 'axios';
import qs from 'qs';
import { SetKind, SetSearchResponse } from 'src/types/setSearch';

export const API_BASE = `${process.env.NEXT_PUBLIC_ANNOTATIONS_API || 'http://localhost:8000'}/api/`;

const SET_URLS: Record<SetKind, string> = {
  image: 'images/image_sets/',
  annotation: 'annotations/annotation_sets/',
  label: 'labels/label_sets/'
};

export async function fetchSetMetadata(
  kind: SetKind,
  page: number,
  filters: Record<string, string>
): Promise<SetSearchResponse> {
  const params = {
    page,
    page_size: 20,
    ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value.trim() !== ''))
  };

  const response = await axios.get<SetSearchResponse>(`${API_BASE}${SET_URLS[kind]}`, {
    params,
    paramsSerializer: currentParams => qs.stringify(currentParams)
  });

  return response.data;
}

'use client';

import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'src/components/common/Spinner';
import { fetchSetMetadata } from 'src/hooks/actions/setSearchActions';
import { SetKind, SetMetadataRecord } from 'src/types/setSearch';

import { SetMetadataDetails } from './SetMetadataDetails';
import { SetMetadataResults } from './SetMetadataResults';

interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number';
  placeholder?: string;
}

interface GroupConfig {
  title: string;
  fields: FieldConfig[];
}

const TAB_CONFIG: Record<SetKind, { label: string; groups: GroupConfig[] }> = {
  image: {
    label: 'Image sets',
    groups: [
      {
        title: 'Image set metadata',
        fields: [
          {
            key: 'metadata_search',
            label: 'Image set metadata',
            placeholder: 'Search name, project, context, abstract, objective or target timescale'
          }
        ]
      },
      {
        title: 'DOI or UUID',
        fields: [
          { key: 'handle', label: 'Handle / DOI' },
          { key: 'uuid', label: 'UUID' }
        ]
      },
      {
        title: 'Location',
        fields: [
          { key: 'longitude', label: 'Longitude', type: 'number' },
          { key: 'latitude', label: 'Latitude', type: 'number' }
        ]
      },
      {
        title: 'Imaging platform or sensor',
        fields: [
          { key: 'platform', label: 'Platform' },
          { key: 'sensor', label: 'Sensor' }
        ]
      }
    ]
  },
  annotation: {
    label: 'Annotation sets',
    groups: [
      {
        title: 'Annotation set metadata',
        fields: [
          {
            key: 'metadata_search',
            label: 'Annotation set metadata',
            placeholder: 'Search name, project, context, abstract, objective or target environment'
          }
        ]
      },
      {
        title: 'Target timescale',
        fields: [{ key: 'target_timescale', label: 'Target timescale' }]
      },
      {
        title: 'Label name',
        fields: [{ key: 'label-name', label: 'Label name' }]
      },
      {
        title: 'DOI or UUID',
        fields: [
          { key: 'handle', label: 'Handle / DOI' },
          { key: 'uuid', label: 'UUID' },
          { key: 'obis_data', label: 'OBIS data' }
        ]
      }
    ]
  },
  label: {
    label: 'Label sets',
    groups: [
      {
        title: 'Label set metadata',
        fields: [
          {
            key: 'metadata_search',
            label: 'Label set metadata',
            placeholder: 'Search name, project, context, abstract or objective'
          }
        ]
      },
      {
        title: 'Label metadata',
        fields: [
          {
            key: 'label_search',
            label: 'Label metadata',
            placeholder: 'Search label name, parent name, taxonomy or AphiaID'
          }
        ]
      },
      {
        title: 'DOI or UUID',
        fields: [
          { key: 'handle', label: 'Handle / DOI' },
          { key: 'uuid', label: 'UUID' }
        ]
      }
    ]
  }
};

const emptyFilters = (kind: SetKind) =>
  Object.fromEntries(
    TAB_CONFIG[kind].groups.flatMap(group => group.fields).map(field => [field.key, ''])
  );

export function SetSearchPage({ kind }: { kind: SetKind }) {
  const [filters, setFilters] = useState<Record<string, string>>(() => emptyFilters(kind));
  const [results, setResults] = useState<SetMetadataRecord[]>([]);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewedItem, setViewedItem] = useState<SetMetadataRecord | null>(null);

  const currentConfig = useMemo(() => TAB_CONFIG[kind], [kind]);

  const loadData = useCallback(
    async (page: number, activeFilters: Record<string, string>) => {
      setIsLoading(true);
      try {
        const data = await fetchSetMetadata(kind, page, activeFilters);
        setCount(data.count);
        setResults(previous => (page === 1 ? data.results : [...previous, ...data.results]));
        setNextPage(data.next ? page + 1 : null);
      } catch (error) {
        console.error(`Failed to load ${kind} set metadata:`, error);
        if (page === 1) {
          setCount(0);
          setResults([]);
          setNextPage(null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [kind]
  );

  useEffect(() => {
    void loadData(1, filters);
  }, [kind, loadData]);

  const submitSearch = async () => {
    setViewedItem(null);
    await loadData(1, filters);
  };

  const updateFilter = (key: string, value: string) => {
    setFilters(previous => ({ ...previous, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{currentConfig.label}</h1>

      {viewedItem ? (
        <SetMetadataDetails item={viewedItem} close={() => setViewedItem(null)} />
      ) : (
        <>
          <Form
            className="w-full"
            onSubmit={async event => {
              event.preventDefault();
              await submitSearch();
            }}
          >
            <Card className="w-full">
              <CardBody className="flex flex-col gap-5">
                {currentConfig.groups.map(group => (
                  <fieldset key={group.title} className="flex flex-col gap-3">
                    <legend className="text-sm font-semibold">{group.title}</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.fields.map(field => (
                        <Input
                          key={field.key}
                          label={field.label}
                          name={field.key}
                          placeholder={field.placeholder}
                          type={field.type || 'text'}
                          value={filters[field.key] || ''}
                          onValueChange={value => updateFilter(field.key, value)}
                        />
                      ))}
                    </div>
                  </fieldset>
                ))}
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Search
                </Button>
              </CardFooter>
            </Card>
          </Form>

          {!isLoading && count > 0 && (
            <div className="text-sm text-default-500">
              {count} result{count === 1 ? '' : 's'}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!isLoading && results.length === 0 && (
              <div>No {currentConfig.label.toLowerCase()}</div>
            )}
            <SetMetadataResults results={results} setViewedItem={setViewedItem} />
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <Spinner />
            </div>
          ) : (
            nextPage !== null && (
              <Button onPress={() => loadData(nextPage, filters)}>Show more</Button>
            )
          )}
        </>
      )}
    </div>
  );
}

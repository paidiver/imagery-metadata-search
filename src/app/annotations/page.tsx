'use client';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Switch } from '@heroui/switch';
import axios from 'axios';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Spinner } from 'src/components/common/Spinner';
import { ImageryItem } from 'src/components/imageryList';
import { SubmissionDetails } from 'src/components/submission/SubmissionDetails';
import { Submission } from 'src/models/submission';

const PAGE_SIZE = 20;

interface Params {
  limit: number;
  offset: number;
  search?: string;
  sub_status?: string;
  start_date?: string;
  end_date?: string;
  originator?: number;
  reviewer?: string;
  sort_by?: string;
  sort_direction?: string;
  submission_type?: string[];
}

const API_BASE =
  process.env.NODE_ENV === 'development'
    ? '/api/'
    : `${process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://submit-data.bodc.ac.uk'}/api/`;

const apiClient = axios.create({
  baseURL: API_BASE
});

export default function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number | null>(PAGE_SIZE);
  const [viewedSubmission, setViewedSubmission] = useState<Submission | null>();
  const [viewedSubmissionId, setViewedSubmissionId] = useState<string | null>('');

  const [searchInput, setSearchInput] = useState('');
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [includeDependents, setIncludeDependents] = useState(false);

  const updateViewedSubmission = (id: string): void => {
    setViewedSubmissionId(id);
    setViewedSubmission(submissions.find(x => x.id === id));
  };

  const closeViewedSubmission = () => {
    setViewedSubmissionId('');
  };

  const loadData = useCallback(async (offset = 0, searchTerm = '') => {
    setIsLoading(true);

    const params: Params = {
      limit: PAGE_SIZE,
      offset,
      submission_type: ['imagery']
    };

    const url =
      searchTerm !== ''
        ? `imagery-submissions?search=${encodeURIComponent(searchTerm)}`
        : 'imagery-submissions';

    const resp = await apiClient.get(url, {
      params,
      paramsSerializer: { indexes: null }
    });

    setSubmissions(resp.data);

    if (resp.data.length === PAGE_SIZE) {
      setNextOffset(offset + PAGE_SIZE);
    } else {
      setNextOffset(null);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData(0);
  }, [loadData]);

  const addSearchTerm = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setSearchTerms(prev => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });
    setSearchInput('');
  };

  const removeSearchTerm = (termToRemove: string) => {
    setSearchTerms(prev => prev.filter(term => term !== termToRemove));
  };

  const handleSearchInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSearchTerm(searchInput);
    }

    if (e.key === 'Backspace' && searchInput === '' && searchTerms.length > 0) {
      e.preventDefault();
      setSearchTerms(prev => prev.slice(0, -1));
    }
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pendingValue = searchInput.trim();
    const finalTerms = pendingValue
      ? [...searchTerms, pendingValue].filter((term, index, arr) => arr.indexOf(term) === index)
      : searchTerms;

    if (pendingValue) {
      setSearchTerms(finalTerms);
      setSearchInput('');
    }

    loadData(0, finalTerms.join(' '));
  };

  return (
    <div className="flex flex-col gap-4">
      {viewedSubmissionId === '' ? (
        <>
          <Form className="w-full" onSubmit={handleSubmitSearch}>
            <div className="flex w-full items-start gap-3 flex-wrap">
              <Button
                type="button"
                variant="flat"
                startContent={<AdjustmentsHorizontalIcon className="h-5 w-5" />}
              >
                Advanced filters
              </Button>

              <div className="flex-1 min-w-[320px] rounded-large border border-default-200 px-3 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  {searchTerms.map(term => (
                    <Chip
                      key={term}
                      onClose={() => removeSearchTerm(term)}
                      variant="flat"
                      color="primary"
                    >
                      {term}
                    </Chip>
                  ))}

                  <div className="flex-1 min-w-[180px]">
                    <Input
                      aria-label="Search terms"
                      placeholder="Add search terms and press Enter"
                      type="text"
                      variant="bordered"
                      value={searchInput}
                      onValueChange={setSearchInput}
                      onKeyDown={handleSearchInputKeyDown}
                      classNames={{
                        inputWrapper: 'border-none shadow-none !bg-transparent px-0 min-h-0',
                        input: 'text-sm'
                      }}
                    />
                  </div>
                </div>
              </div>

              <Button color="primary" type="submit">
                Search
              </Button>

              <Switch isSelected={includeDependents} onValueChange={setIncludeDependents}>
                include dependents
              </Switch>
            </div>
          </Form>

          <Card>
            <CardBody className="flex flex-col gap-3">
              <div className="container">
                <div className="flex flex-col gap-2 mb-4">
                  {!isLoading && submissions.length === 0 && <div>No submissions to display</div>}

                  {submissions.map(submission => (
                    <ImageryItem
                      key={submission.id}
                      submission={submission}
                      updateViewedSubId={updateViewedSubmission}
                    />
                  ))}

                  {isLoading ? (
                    <div style={{ textAlign: 'center' }}>
                      <Spinner />
                    </div>
                  ) : (
                    nextOffset !== null && (
                      <Button onPress={() => loadData(nextOffset)}>Show more</Button>
                    )
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <Card>
          <CardBody className="flex flex-col gap-3">
            <div className="container">
              <div className="flex flex-col gap-2 mb-4">
                {viewedSubmission && (
                  <SubmissionDetails submission={viewedSubmission} close={closeViewedSubmission} />
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

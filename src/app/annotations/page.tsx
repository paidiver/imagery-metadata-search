'use client';

import { Button } from '@heroui/button';
import { AnnotationsAccordion } from 'src/components/annotations/AnnotationsAccordion';
import { AnnotationsSearchForm } from 'src/components/annotations/AnnotationsSearchForm';
import { ResultsSummary } from 'src/components/annotations/ResultsSummary';
import { useAnnotationsSearch } from 'src/hooks/useAnnotationsSearch';
import { useWormsAutocomplete } from 'src/hooks/useWormsAutocomplete';

export default function AnnotationsPage() {
  const {
    submissions,
    count,
    summary,
    isLoading,
    nextPage,
    hasResults,
    searchInput,
    setSearchInput,
    searchTerms,
    includeDescendants,
    setIncludeDescendants,
    chipLabel,
    selectWormsOption,
    removeSearchTerm,
    handleSearchInputKeyDown,
    submitSearch,
    loadMore
  } = useAnnotationsSearch();

  const { wormsOptions, wormsLoading } = useWormsAutocomplete(searchInput);

  return (
    <div className="flex flex-col gap-4">
      <AnnotationsSearchForm
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchInputKeyDown={handleSearchInputKeyDown}
        chipLabel={chipLabel}
        hasSearchTerm={Boolean(searchTerms)}
        onRemoveSearchTerm={removeSearchTerm}
        includeDescendants={includeDescendants}
        onIncludeDescendantsChange={setIncludeDescendants}
        wormsOptions={wormsOptions}
        wormsLoading={wormsLoading}
        onSelectWormsOption={selectWormsOption}
        onSubmit={submitSearch}
      />

      <div className="flex flex-col gap-4">
        {!isLoading && !hasResults && <div>No submissions to display</div>}

        {!isLoading && count > 0 && (
          <div className="text-sm text-default-500">
            {count} result{count === 1 ? '' : 's'}
          </div>
        )}

        {!isLoading && summary && <ResultsSummary summary={summary} />}

        <AnnotationsAccordion submissions={submissions} />

        {!isLoading && nextPage !== null && <Button onPress={loadMore}>Show more</Button>}
      </div>
    </div>
  );
}

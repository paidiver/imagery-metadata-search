'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Form } from '@heroui/form';
import { Switch } from '@heroui/switch';
import { KeyboardEvent } from 'react';
import { WormsResult } from 'src/types/annotation';

interface AnnotationsSearchFormProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;

  chipLabel: string;
  hasSearchTerm: boolean;
  onRemoveSearchTerm: () => void;

  includeDescendants: boolean;
  onIncludeDescendantsChange: (value: boolean) => void;

  wormsOptions: WormsResult[];
  wormsLoading: boolean;
  onSelectWormsOption: (item: WormsResult) => void;

  onSubmit: () => Promise<void> | void;
}

export function AnnotationsSearchForm({
  searchInput,
  onSearchInputChange,
  onSearchInputKeyDown,
  chipLabel,
  hasSearchTerm,
  onRemoveSearchTerm,
  includeDescendants,
  onIncludeDescendantsChange,
  wormsOptions,
  wormsLoading,
  onSelectWormsOption,
  onSubmit
}: AnnotationsSearchFormProps) {
  return (
    <Form
      className="w-full"
      onSubmit={async e => {
        e.preventDefault();
        await onSubmit();
      }}
    >
      <div className="flex w-full gap-3 flex-wrap items-center">
        {/* <Button
          type="button"
          variant="flat"
          startContent={<AdjustmentsHorizontalIcon className="h-5 w-5" />}
        /> */}

        <div className="flex-1 min-w-[320px] rounded-large border border-default-200 px-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {hasSearchTerm && (
              <Chip onClose={onRemoveSearchTerm} variant="flat" color="primary">
                {chipLabel}
              </Chip>
            )}

            {!hasSearchTerm && (
              <div className="flex-1 min-w-45">
                <Autocomplete
                  aria-label="Search taxa"
                  inputValue={searchInput}
                  onInputChange={onSearchInputChange}
                  onKeyDown={onSearchInputKeyDown}
                  items={wormsOptions}
                  isLoading={wormsLoading}
                  placeholder="Scientific or Common name"
                  variant="bordered"
                  selectedKey={null}
                  menuTrigger="input"
                  onSelectionChange={key => {
                    if (!key) return;

                    const selectedItem = wormsOptions.find(
                      option => String(option.AphiaID) === String(key)
                    );

                    if (selectedItem) {
                      onSelectWormsOption(selectedItem);
                    }
                  }}
                  classNames={{
                    base: 'w-full',
                    selectorButton: 'hidden',
                    clearButton: 'hidden'
                  }}
                >
                  {item => (
                    <AutocompleteItem key={item.AphiaID} textValue={item.scientificname}>
                      <div className="flex flex-col">
                        <span>{item.scientificname}</span>
                        <span className="text-xs text-default-500">
                          AphiaID: {item.AphiaID}, Rank: {item.rank}
                        </span>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            )}
          </div>
        </div>

        <Button color="primary" type="submit">
          Search
        </Button>

        <Switch isSelected={includeDescendants} onValueChange={onIncludeDescendantsChange}>
          <div>include</div>
          <div>children</div>
        </Switch>
      </div>
    </Form>
  );
}

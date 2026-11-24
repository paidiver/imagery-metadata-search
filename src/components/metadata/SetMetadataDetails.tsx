import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { IconButton } from 'src/components/common/IconButton';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from 'src/components/common/Table';
import { SetMetadataRecord } from 'src/types/setSearch';

interface SetMetadataDetailsProps {
  item: SetMetadataRecord;
  close: () => void;
}

const titleise = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase());

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return 'None';
  if (typeof value === 'object') {
    if ('name' in (value as object)) return String((value as { name: unknown }).name);
    return JSON.stringify(value);
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

export function SetMetadataDetails({ item, close }: SetMetadataDetailsProps) {
  const hiddenFields = new Set(['id', 'created', 'modified', 'created_by', 'modified_by']);
  const rows = Object.entries(item).filter(([key]) => !hiddenFields.has(key));

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <h2>Metadata Set Details</h2>
          <IconButton title="Close metadata details" onPress={close}>
            <span className="fa fa-close text-white" />
          </IconButton>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Table isStriped aria-label="Table of metadata set values">
          <TableHeader>
            <TableColumn>Key</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableHeader>
          <TableBody>
            {rows.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <b>{titleise(key)}</b>
                </TableCell>
                <TableCell>{formatValue(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

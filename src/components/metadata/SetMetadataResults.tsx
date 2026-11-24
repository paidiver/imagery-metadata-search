import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { IconButton } from 'src/components/common/IconButton';
import { SetMetadataRecord } from 'src/types/setSearch';

export function SetMetadataResults({ results, setViewedItem }: { results: SetMetadataRecord[]; setViewedItem: (item: SetMetadataRecord) => void; }) {
  return (
    <div className="flex flex-col gap-4">
      {results.map(item => (
        <Card key={item.id} className="submission-card">
          <CardHeader>
            <div className="w-full flex justify-between">
              <span>ID: {item.id}</span>
              <IconButton title="View metadata set" onPress={() => setViewedItem(item)}>
                <span className="fa fa-eye text-white" />
              </IconButton>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="text-sm">
            <div>
              <b>{item.name}</b>
            </div>
            {item.abstract && <div>{item.abstract}</div>}
          </CardBody>
          <Divider />
          <CardFooter className="text-sm flex flex-col gap-1">
            {item.project && <div>Project: {item.project.name}</div>}
            {item.context && <div>Context: {item.context.name}</div>}
            {item.handle && <div>Handle: {item.handle}</div>}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

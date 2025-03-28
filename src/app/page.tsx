'use client'
import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'
import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Submission } from 'src/models/submission'
import { ImageryItem } from 'src/components/imageryList'
import { Spinner } from 'src/components/common/Spinner'

const PAGE_SIZE = 20

interface Params {
  limit: number
  offset: number
  search?: string
  sub_status?: string
  start_date?: string
  end_date?: string
  originator?: number
  reviewer?: string
  sort_by?: string
  sort_direction?: string
  submission_type?: string[]
}

const apiClient = axios.create({
  baseURL: `${process.env.PUBLIC_URL || 'https://submit-datadev.bodc.ac.uk'}/api/`
})


export default function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextOffset, setNextOffset] = useState<number | null>(PAGE_SIZE)

  const loadData = useCallback(async (offset = 0, searchTerm = '') => {
    setIsLoading(true)
    const params: Params = {
      limit: PAGE_SIZE,
      offset
    }

    params.submission_type = ['imagery']
    const url = searchTerm !== '' ? 'imagery-submissions?search=' + searchTerm : 'imagery-submissions'
    const resp = await apiClient.get(url, { params, paramsSerializer: { indexes: null } })
    setSubmissions(resp.data)
    if (resp.data.length === PAGE_SIZE) {
      setNextOffset(offset + PAGE_SIZE)
    } else {
      // If returned data isn't a full page, we know there won't be another
      setNextOffset(null)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => { loadData(0) }, [loadData])

  return (
    <div className='flex flex-col gap-4'>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget))

          let searchTerm = ''
          if(data.searchterm) searchTerm = data.searchterm.toString()
          loadData(0, searchTerm)
        }}
      >
        <Input
          label="Search"
          name="searchterm"
          placeholder="Search in dataset title"
          type="text"
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Search
          </Button>
        </div>
      </Form>
      <Card>
        <CardBody className='flex flex-col gap-3'>
          <div className='container'>
            <div className='flex flex-col gap-2 mb-4'>
              {!isLoading && submissions.length === 0 &&
                  <div>No submissions to display</div>
              }
              {submissions.map(submission => (
                <ImageryItem key={submission.id} submission={submission}/>
              ))}
              {isLoading
                ? <div style={{textAlign: 'center'}}><Spinner/></div>
                : (nextOffset !== null &&
                      <Button onPress={() => loadData(nextOffset)}>
                          Show more
                      </Button>
                )
              }
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

'use client'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardBody } from '@heroui/react'
import { Button } from '../components/common/Button'
import { Submission } from '../models/submission'
import { ImageryItem } from '../components/imageryList'
import { Spinner } from '../components/common/Spinner'

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
  baseURL: `${process.env.PUBLIC_URL || 'https://submit-data.bodc.ac.uk'}/api/`
})


export default function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextOffset, setNextOffset] = useState<number | null>(PAGE_SIZE)

  const loadData = useCallback(async (offset = 0) => {
    setIsLoading(true)
    const params: Params = {
      limit: PAGE_SIZE,
      offset
    }

    params.submission_type = ['imagery']
    const resp = await apiClient.get('imagery-submissions', { params, paramsSerializer: { indexes: null } })
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

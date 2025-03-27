import React from 'react'

import { Divider } from '@heroui/react'
import { startCase } from 'lodash'
import Link from 'next/link'

import { Card, CardHeader, CardBody, CardFooter } from '../../components/common/Card'
import { Row } from '../../components/common/Grid'
import { IconButton } from '../../components/common/IconButton'
import { DRAFT, Submission } from '../../models/submission'
import { formatUuid } from '../../utils'

const PDL_BASE_URL = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/data/published_data_library/catalogue/10.5285/`

export const ImageryItem = ({ submission }: {submission: Submission}) => {

  const isDraft = submission.status === DRAFT

  return (
    <>
      <Card className='submission-card'>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <span>
              ID: {submission.display_id} | {startCase(submission.status)}
            </span>
            <span className='flex gap-2'>
              <IconButton
                as={Link}
                href={`/submissions/view/${submission.id}`}
                title='View submission'
              >
                <span className='fa fa-eye text-white' />
              </IconButton>
              {isDraft &&
                <>
                  <IconButton
                    as={Link}
                    href={`/submissions/edit/${submission.id}`}
                    title='Edit submission'
                  >
                    <span className='fa fa-pencil text-white' />
                  </IconButton>
                </>
              }
            </span>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='text-sm'>
          <div>
            <b>{submission.title}</b>
          </div>
          <div>
            {submission.description}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className='text-sm flex flex-col gap-1'>
          <Row>
            {/* <Col xs='6'> */}
              Originator: {submission.originator &&
                <>
                  {submission.originator_label?.split(';;;')[0]}
                  {' '}
                  <b>{submission.originator_label?.split(';;;')[1]}</b>
                </>
            }
          </Row>
          <div className='w-full flex justify-between'>
            <div>
              {submission.ACNO && <>ACNO: {submission.ACNO} </>}
            </div>
            {submission.pdl_uuid &&
              <div className='text-right'>
                {submission.pdl_published
                  ? <>DOI:{' '}
                      <a
                        href={`${PDL_BASE_URL}${formatUuid(submission.pdl_uuid)}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {submission.pdl_uuid}
                      </a>
                    </>
                  : <>
                      <Link href={`/doi/${submission.pdl_uuid}`}>
                        DOI Preview
                      </Link>
                    </>
                }
              </div>
            }
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

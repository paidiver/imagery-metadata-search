import React from 'react'

import { Divider } from '@heroui/divider'
import Link from 'next/link'

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Col, Row } from 'src/components/common/Grid'
import { IconButton } from 'src/components/common/IconButton'
import { Submission } from 'src/models/submission'
import { formatUuid } from 'src/utils'

const PDL_BASE_URL = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/data/published_data_library/catalogue/10.5285/`

interface imageryItemProps {
  submission: Submission,
  updateViewedSubId: (id: string) => void
}

export const ImageryItem = ( props: imageryItemProps ) => {

  return (
    <>
      <Card className='submission-card'>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <span>
              ID: {props.submission.display_id}
            </span>
            <span className='flex gap-2'>
              <IconButton
                title='View submission'
                onPress={() => props.updateViewedSubId(props.submission.id)}
              >
                <span className='fa fa-eye text-white' />
              </IconButton>
            </span>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='text-sm'>
          <div>
            <b>{props.submission.title}</b>
          </div>
          <div>
            {props.submission.description}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className='text-sm flex flex-col gap-1'>
          <Row>
             <Col xs='6'>
              Originator: {props.submission.originator &&
                <>
                  {props.submission.originator_label?.split(';;;')[0]}
                  {' '}
                  <b>{props.submission.originator_label?.split(';;;')[1]}</b>
                </>
             }
             </Col>
          </Row>
          <div className='w-full flex justify-between'>
            <div>
              {props.submission.ACNO && <>ACNO: {props.submission.ACNO} </>}
            </div>
            {props.submission.pdl_uuid &&
              <div className='text-right'>
                {props.submission.pdl_published
                  ? <>DOI:{' '}
                      <a
                        href={`${PDL_BASE_URL}${formatUuid(props.submission.pdl_uuid)}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {props.submission.pdl_uuid}
                      </a>
                    </>
                  : <>
                      <Link href={`/doi/${props.submission.pdl_uuid}`}>
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

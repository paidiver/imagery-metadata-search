import React from "react"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from 'src/components/common/Table'
import { Author, Parameter, Platform, Submission } from "src/models/submission"
import { formatDatetime } from 'src/utils'
import { IconButton } from "src/components/common/IconButton"


interface submissionDetailsProps {
  submission: Submission,
  close: () => void
}

export const SubmissionDetails = ( props: submissionDetailsProps ) => {
  const titleise = (item: string) => {
    const words = []
    for (const word of item.split('_')) {
      if (['id', 'doi', 'pdl', 'uuid'].includes(word)) {
        words.push(word.toUpperCase())
      } else if (word === 'and') {
        words.push('&')
      } else {
        words.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
    }
    return words.join(' ')
  }

  // List of tables is to prevent "non tables" from appearing as tabs when they have no data
  const tables = [
    'parameters',
    'edmeds',
    'projects',
    'authors',
    'contributors',
    'platforms',
    'datasets'
  ]

  interface TableMapping {
    key: string
    value: Array<string | Parameter | number | Author | Platform>
  }

  // Pre-process the submission data to sieve null values, and separate tables from direct key-value pairs
  const directMappings: { key: string, value: string }[] = []
  const tableMappings: TableMapping[] = []
  Object.entries(props.submission).map(([key, value]) => {
    const hiddenFields = ['originator', 'missing_authors', 'created', 'modified', 'created_by', 'modified_by', 'type', 'status']
    if (hiddenFields.includes(key)) {
      return false
    }
    switch (typeof (value)) {
      case 'string':
        if (key === 'created' || key === 'modified') {
          directMappings.push({ key, value: formatDatetime(value, true) })
        } else if (key === 'id') {
          directMappings.push({ key: 'Submission ID', value })
        } else if (key === 'start_date' || key === 'end_date') {
          directMappings.push({ key, value: formatDatetime(value, false) })
        } else if (key === 'originator_label') {
          directMappings.push({ key: 'originator', value })
        } else {
          directMappings.push({ key, value })
        }
        break
      case 'number':
        directMappings.push({ key, value: value.toString() })
        break
      case 'boolean':
        directMappings.push({ key, value: value ? 'Yes' : 'No' })
        break
      case 'object':
        if (tables.indexOf(key) > -1) {
          tableMappings.push({ key, value })
        } else if (key === 'archives') {
          if (props.submission.ACNO) {
            let displayVal = ''
            if (value.accession) {
              if (value.accession.archive_location) displayVal = value.accession.archive_location
              else displayVal = `${value.accession.archival_status} - ${value.accession.message}`
            } else {
              displayVal = 'Pending'
            }
            directMappings.push({ key: 'Accession Archive', value: displayVal })
          }
          if (props.submission.pdl_uuid) {
            let displayVal = ''
            if (value.doi) {
              if (value.doi.archive_location) displayVal = value.doi.archive_location
              else displayVal = `${value.doi.archival_status} - ${value.doi.message}`
            } else {
              displayVal = 'Pending'
            }
            directMappings.push({ key: 'DOI Archive', value: displayVal })
          }
        } else if (key === 'archive_paths') {
          directMappings.push({ key, value: value.join(';;;') })
        } else {
          directMappings.push({ key, value: 'None' })
        }
        break
      default:
        directMappings.push({ key, value: JSON.stringify(value) })
    }
    return true
  })

  return (
    <>
      <span className='flex gap-2 justify-end'>
        <IconButton title='Close submission details'
                    onPress={() => props.close()}
        >
          <span className='fa fa-close text-white' />
        </IconButton>
      </span>
      <Table isStriped aria-label='Table of submission values'>
        <TableHeader>
          <TableColumn>Key</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          {directMappings.map(mapping => (
            <TableRow key={mapping.key}>
              <TableCell><b>{titleise(mapping.key)}</b></TableCell>
              {
                (() => {
                  if (mapping.key === 'originator') {
                    const parts = mapping.value.split(';;;')
                    return <TableCell>{parts[0]} <b>{parts[1]}</b></TableCell>
                  } else if (mapping.key === 'archive_paths') {
                    return (
                      <TableCell>
                        <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
                          {mapping.value.split(';;;').map(x => <li key={x}>{x}</li>)}
                        </ul>
                      </TableCell>
                    )
                  } else {
                    return <TableCell>{mapping.value}</TableCell>
                  }
                })()
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
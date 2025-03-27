import { Card, CardBody, CardHeader as LibCardHeader, CardFooter, HTMLNextUIProps } from '@heroui/react'

const CardHeader = (props: HTMLNextUIProps) => (
  <LibCardHeader className='z-0' {...props} />
)

export { Card, CardBody, CardHeader, CardFooter }

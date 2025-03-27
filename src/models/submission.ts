// Define constants for statuses
export const DRAFT = 'draft'
export const IN_REVIEW = 'in_review'
export const CLOSED = 'closed'

// Define constants for submission types
export const GENERIC = 'generic'
export const SAMPLES = 'samples'
export const GEOTRACES = 'geotraces'
export const IMAGERY = 'imagery'

export const SUBMISSION_TYPES = ['generic', 'samples', 'geotraces', 'imagery']

export interface Parameter {
  header: string
  description: string
  units?: string
  p01?: string
  p02?: string
  p06?: string
  l22?: string
  s21?: string
  has_replicates?: boolean
  samples_filtered?: boolean
  filter_size?: string
}

export interface Author {
  iorgrf: number
  rank: number
}

export interface MissingAuthor {
  title: string
  first_name: string
  middle_initial?: string
  last_name: string
  organisation: string
  rank: number
  comments?: string
  type: 'author' | 'contributor'
  resolved: boolean
}

export interface Platform {
  b76?: string
  cruise?: string
  c17?: string
  l06: string
}

// Fields for imagery submission type.
export interface ImagerySubmissionFields {
  image_acquisition?: string
  image_quality?: string
  image_deployment?: string
  image_navigation?: string
  image_scale_reference?: string
  image_illumination?: string
  image_pixel_magnitude?: string
  image_marine_zone?: string
  image_spectral_resolution?: string
  image_capture_mode?: string
  image_acquisition_settings?: string
  image_camera_housing_viewport?: string
  image_flatport_parameters?: string
  image_domeport_parameters?: string
  image_camera_calibration_model?: string
  image_photometric_calibration?: string
  image_target_environment?: string
  image_time_syncronisation?: string
  image_item_identification_scheme?: string
  image_visual_constraints?: string
  image_fauna_attraction?: string
}

// SubmissionContent is the main body of the submission, fields that appear for create, edit and retrieve.
export interface SubmissionContent extends ImagerySubmissionFields {
  title?: string
  type?: string
  abstract?: string
  description?: string
  t_and_c_agreed?: boolean
  start_date?: string
  end_date?: string
  north_bound?: string
  south_bound?: string
  east_bound?: string
  west_bound?: string
  doi_requested?: boolean
  skip_doi_archive?: boolean
  external_archive_location?: string
  sampling_protocol?: string
  analytical_protocol?: string
  data_quality_comments?: string
  originator?: number
  parameters?: Parameter[]
  edmeds?: string[]
  projects?: number[]
  authors?: Author[]
  contributors?: Author[]
  platforms?: Platform[]
  ACNO?: string
  reviewer?: string
  pdl_uuid?: string
  pdl_published?: boolean
  missing_authors?: MissingAuthor[]
  free_text?: string
  datasets?: number[]
}

// This model adds to SubmissionContent the fields that only appear when fetching an existing entry from the API.
export interface Submission extends SubmissionContent {
  id: string
  display_id: number
  type: string
  status: string
  created: string
  modified: string
  originator_label?: string
  created_by: string
  modified_by: string
}

export interface Project {
  bodcacr: string
  indref: number
  ipjref: number
  pjmetaref: number
  projfull: string
  projshort: string
  projurl: string
}

export interface Edmed {
  uri: string
  title: string
}

export interface Cruise {
  csrref: string
  label: string
}

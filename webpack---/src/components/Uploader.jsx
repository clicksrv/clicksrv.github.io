import PropTypes from 'prop-types'
import Uploady from '@rpldy/uploady'
import { useCallback } from 'react'

import conf from '../conf'

import FileUpload from './FileUpload'

const { maxUploadFileSize, supportedFileTypes } = conf

const Uploader = ({ className, destination, multiple, onCancel, onError, onSuccess, restrictContentTypes }) => {
  const filterFiles = useCallback(
    (file) => {
      const allowedMimeTypes = () => {
        if (restrictContentTypes.length) {
          return restrictContentTypes.flatMap((type) => (supportedFileTypes[type] ? supportedFileTypes[type][1] : []))
        }

        return Object.values(supportedFileTypes).flatMap((item) => item[1])
      }

      const sizeWithinLimit = file.size < maxUploadFileSize * 1024 * 1024
      const allowedMimeType = allowedMimeTypes().includes(file.type)

      return sizeWithinLimit && allowedMimeType
    },
    [restrictContentTypes]
  )

  return (
    <Uploady
      autoUpload={false}
      destination={destination}
      multiple={multiple}
      fileFilter={filterFiles}>
      <FileUpload
        className={className}
        onCancel={onCancel}
        onError={onError}
        onSuccess={onSuccess}
        restrictContentTypes={restrictContentTypes}
      />
    </Uploady>
  )
}

Uploader.propTypes = {
  className: PropTypes.string,
  destination: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  onCancel: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  restrictContentTypes: PropTypes.array,
}

export default Uploader

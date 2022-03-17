// Handles single file uploads
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UploadDropZone from '@rpldy/upload-drop-zone'
import { useContext, useState } from 'react'
import {
  UploadyContext,
  useAbortItem,
  useBatchAddListener,
  useBatchFinishListener,
  useBatchProgressListener,
  useBatchStartListener,
  useItemErrorListener,
} from '@rpldy/uploady'

import conf from '../conf'
import { grey, greyDark, greySubtleBluish, primary, primaryLight, redError } from '../colors'
import { t } from '../locales'

import fileIcon from '../assets/images/file.svg'
import checkmarkIcon from '../assets/images/check.svg'

import FileUploadItem from './FileUploadItem'

const Icon = styled.img`
  display: block;
  height: 160px;
  margin: 0 auto;
  padding: ${({ checkmarkIcon }) => (checkmarkIcon ? '25px' : '0')};
`

const Title = styled.p`
  color: ${primary};
  font-size: 16px;
  font-weight: 500;

  margin: 0 0 4px;
`

const TitleDrop = styled(Title)`
  color: ${greyDark};

  display: none;
  margin-top: 10px;
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 13px;
  font-weight: 300;

  margin: 0;
`

const Container = styled(UploadDropZone).attrs((props) => ({ className: props.className }))`
  background-color: ${greySubtleBluish};
  border: 2px dashed ${primary};
  border-radius: 16px;
  cursor: ${(props) => (props.uploadAvailable ? 'pointer' : 'default')};
  text-align: center;

  min-height: 225px;
  padding: 5px 20px 10px;

  &.drag-over {
    border-color: ${primaryLight};

    ${Icon} {
      opacity: 0.4;
    }

    ${Title} {
      display: none;
    }

    ${Subtitle} {
      display: none;
    }

    ${TitleDrop} {
      display: block;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin: -10px auto 0;
  max-width: 310px;
  min-height: 80px;
`

const Info = styled.p`
  color: ${greyDark};
  font-size: 15px;
  font-weight: 300;

  margin-bottom: 8px;
`

const Error = styled.p`
  font-size: 14px;
`

const ErrorMessage = styled.span`
  color: ${redError};
`

const RetryCancel = styled.p`
  font-size: 14px;

  margin-top: 5px;
`

const { maxUploadFileSize, supportedFileTypes } = conf

const FileUpload = ({ className, onCancel, onError, onSuccess, restrictContentTypes }) => {
  const [batch, setBatch] = useState(null)
  const [uploaded, setUploaded] = useState(false)

  const uploady = useContext(UploadyContext)
  const abortItem = useAbortItem()

  const error = batch && batch.items[0]?.state === 'error'
  const uploadAvailable = !batch

  useBatchAddListener((newBatch) => {
    newBatch.items.forEach((item, index) => {
      if (uploaded) {
        // if upload already completed, abort
        abortItem(item.id)
      } else if (index > 0) {
        // allow only single file to be uploaded
        abortItem(item.id)
      }
    })

    if (!uploaded) {
      setBatch(newBatch)

      // automatically start upload
      uploady.processPending()
    }
  })

  // will show 0% progress
  useBatchStartListener((newBatch) => !uploaded && setBatch(newBatch))

  // will show 0-100% progress
  useBatchProgressListener((newBatch) => !uploaded && setBatch(newBatch))

  // will set 'finished' or 'error' state
  useBatchFinishListener((newBatch) => {
    if (uploaded) {
      return
    }

    setBatch(newBatch)

    if (newBatch.items.length && newBatch.items[0].state !== 'error') {
      setUploaded(true)

      if (typeof onSuccess === 'function') {
        const { data } = newBatch.items[0].uploadResponse
        const { file } = newBatch.items[0]

        onSuccess({ data, file })
      }
    }
  })

  useItemErrorListener((item) => {
    console.error(`Upload failed for item ${item.id}: `, item.uploadResponse?.data)

    if (typeof onError === 'function') {
      onError(item.uploadResponse)
    }
  })

  const allowedExtensions = () => {
    if (restrictContentTypes?.length) {
      return restrictContentTypes.flatMap((type) => (supportedFileTypes[type] ? supportedFileTypes[type][0] : []))
    }

    return Object.values(supportedFileTypes).flatMap((item) => item[0])
  }

  const onClick = () => uploadAvailable && uploady.showFileUpload()

  const retryUpload = () => {
    const file = batch.items[0].file

    setBatch(null)
    uploady.upload(file)
  }

  const cancelUpload = () => {
    uploady.abortBatch()
    setBatch(null)
    setUploaded(false)

    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  return (
    <Container
      className={className}
      extraProps={{ onClick }}
      onDragOverClassName="drag-over"
      uploadAvailable={uploadAvailable}>
      <Icon
        checkmarkIcon={uploaded && !error}
        src={uploaded && !error ? checkmarkIcon : fileIcon}
      />

      <Content>
        {uploaded && !error && <Info>{t('uploaded')}</Info>}

        {batch && batch.items[0] && (
          <FileUploadItem
            cancelUpload={cancelUpload}
            item={batch.items[0]}
          />
        )}

        {error && (
          <>
            <Error>
              <ErrorMessage>{t('upload_error')}</ErrorMessage> (<a onClick={retryUpload}>{t('retry')}</a>)
            </Error>

            <RetryCancel>
              <a onClick={cancelUpload}>{t('cancel_upload')}</a>
            </RetryCancel>
          </>
        )}

        {!batch && (
          <>
            <Title>{t('click_or_drop_file_here')}</Title>
            <TitleDrop>{t('drop_here')}</TitleDrop>

            <Subtitle>
              {t('add_type', { type: allowedExtensions().join(', ') })}{' '}
              {t('max_file_size', { size: maxUploadFileSize })}
            </Subtitle>
          </>
        )}
      </Content>
    </Container>
  )
}

FileUpload.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  restrictContentTypes: PropTypes.array,
}

export default FileUpload

import classNames from 'classnames'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import docImage from '../assets/images/icons/doc-small.png'
import pdfImage from '../assets/images/icons/pdf-small.png'
import fileImage from '../assets/images/icons/file-small.png'

const Container = styled.div`
  display: inline-block;
  margin: 10px;
  position: relative;
  width: 200px;
`

const FileName = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 25px;
  overflow: hidden;
  pointer-events: none;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 2;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  height: 25px;
  padding: 0 5px;
`

const ThumbImage = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('${({ background }) => background}');
  border-radius: 1px;
  overflow: hidden;

  display: block;
  height: 0px;
  padding-bottom: 75%;
  position: relative;
  width: 100%;
`

const fileTypes = {
  doc: docImage,
  docx: docImage,
  pdf: pdfImage,
}

const Asset = ({ asset, children, showFileName }) => {
  const { file_key: fileKey, file_name: fileName, file_extension: fileExtension, thumb, type } = asset
  const background = thumb || fileTypes[fileExtension] || fileImage
  const displayFileName = fileKey ? `${fileKey} (${type})` : fileName

  return (
    <Container
      className={classNames('thumb', type)}
      key={asset.id}>
      {children}

      {showFileName && <FileName>{displayFileName}</FileName>}

      <ThumbImage background={background} />
    </Container>
  )
}

Asset.propTypes = {
  asset: PropTypes.object.isRequired,
  children: PropTypes.node,
  showFileName: PropTypes.bool,
}

export default Asset

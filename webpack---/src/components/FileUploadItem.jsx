import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  black,
  greenSuccess,
  grey,
  greyDark,
  greyLight,
  greyLightest,
  primary,
  primaryLighter,
  redDanger,
} from '../colors'

import { t } from '../locales'

const Container = styled.aside`
  width: 100%;
`

const Header = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-between;
`

const Info = styled.p`
  color: ${greyDark};
  font-size: 15px;
  font-weight: 300;

  margin-bottom: 5px;
`

const Percentage = styled.p`
  color: ${primary};
  font-size: 14px;
  font-weight: 700;

  margin-bottom: 6px;
`

const ProgressBar = styled.span`
  background-color: ${greyLightest};
  border-radius: 3px;
  height: 4px;

  display: block;
`

const ProgressBarIndicator = styled(ProgressBar)`
  background-color: ${greenSuccess};
  width: ${(props) => props.progress}%;
`

const Filename = styled.p`
  color: ${greyLight};
  font-size: 14px;
  font-weight: 300;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: 10px auto 0;
  width: 80%;
`

const Item = styled.p`
  background-color: ${primaryLighter};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 9px 12px;
`

const IconFile = styled.span`
  color: ${primary};
  font-size: 23px;

  margin-right: 6px;
`

const Name = styled.span`
  color: ${black};
  font-size: 14px;
  font-weight: 300;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-right: 6px;
  max-width: 100%;
`

const Size = styled.span`
  color: ${grey};
  font-size: 12px;
  text-align: left;

  flex-grow: 1;
`

const Icon = styled.i`
  color: ${redDanger};
  cursor: pointer;
  font-size: 22px;

  margin-bottom: 3px;
  margin-left: 4px;
`

const FileUploadItem = ({ cancelUpload, item }) => {
  if (!item) {
    return null
  }

  const error = item.state === 'error'
  const uploaded = item.state === 'finished'
  const uploading = !uploaded && !error

  // convert to MB and round to single decimal place
  const size = Math.round((item.file.size * 10) / 1024 / 1024) / 10

  const completed = Math.round(item.completed)

  return (
    <Container>
      {uploading && (
        <>
          <Header>
            <Info>{t('uploading')}</Info>
            <Percentage>{completed}%</Percentage>
          </Header>

          <ProgressBar>
            <ProgressBarIndicator progress={completed}></ProgressBarIndicator>
          </ProgressBar>

          <Filename>{item.file.name}</Filename>
        </>
      )}

      {uploaded && (
        <Item>
          <IconFile className="icon-document-alt" />
          <Name>{item.file.name}</Name>
          <Size>{size}MB</Size>
          <Icon
            className="icon-trash"
            onClick={cancelUpload}
          />
        </Item>
      )}
    </Container>
  )
}

FileUploadItem.propTypes = {
  cancelUpload: PropTypes.func,
  item: PropTypes.object.isRequired,
}

export default FileUploadItem

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import api from '../services/api'
import conf from '../conf'
import events from '../services/events'
import history from '../services/history'
import notify from '../services/notify'
import useSidebar from '../hooks/useSidebar'
import { black, grey, greyDark, greyLightest, primary, primaryLightest, transparent } from '../colors'
import { formatDateTime, relativeTimeDifference } from '../helpers/dates'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import { Btn } from './styled/Button'

const VersionsList = styled.ul``

const Row = styled.li`
  border-bottom: 1px solid ${greyLightest};

  &:last-of-type {
    border-bottom: none;
  }

  padding: 4px 0;
`

const Version = styled.section`
  background-color: ${({ active }) => (active ? primaryLightest : transparent)};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 3px;

  &:hover {
    background-color: ${primaryLightest};
  }
`

const Details = styled.div``

const VersionTime = styled.p`
  color: ${({ active }) => (active ? black : greyDark)};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  font-size: 15px;

  margin: 0 0 6px;
`
const VersionDate = styled.p`
  color: ${grey};
  font-size: 13px;
  font-weight: 300;

  margin: 0;
`

const Actions = styled.div``

const Preview = styled.a`
  color: ${primary};
  font-size: 14px;
  font-weight: 500;

  margin-right: 15px;

  &:hover {
    color: ${primary};
    text-decoration: underline;
  }
`

const History = ({ active, cv }) => {
  const [versions, setVersions] = useState([])
  const [selectedVersion, setSelectedVersion] = useState(null)
  const { handleSidebarItemSelected } = useSidebar()

  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    if (active) {
      api.getCvVersions(cv).then(setVersions).catch(onGetVersionsError)
    }
  }, [active, cv])

  const { locale } = user
  const { publicCvsHost } = conf

  const onGetVersionsError = () => notify.error(t('cv_history_loading_error'))
  const onCvRestoreError = () => notify.error(t('cv_restore_version_error'))

  const onCvRestored = (cv) => {
    trackEvent('restored-cv-version', 'interaction')

    handleSidebarItemSelected(cv)

    events.emit('CV::INIT', cv)

    history.push(`/cvs/${cv.id}`)
  }

  const restoreCv = (version) => () => {
    setSelectedVersion(version)

    api.restoreCv(cv, version.id).then(onCvRestored).catch(onCvRestoreError)
  }

  const selectVersion = (version) => () => setSelectedVersion(version)

  const isActive = (version) => version === selectedVersion

  return (
    <VersionsList>
      {versions.map((version) => (
        <Row key={version.id}>
          <Version active={isActive(version)}>
            <Details>
              <VersionTime active={isActive(version)}>
                {relativeTimeDifference(version.created_at, new Date(), locale)}
              </VersionTime>
              <VersionDate>
                {formatDateTime(version.created_at, locale, { dateStyle: 'medium', timeStyle: 'short' })}
              </VersionDate>
            </Details>

            <Actions>
              <Preview
                href={`${publicCvsHost}/${cv.url}/?version=${version.id}`}
                rel="noopener"
                target="_blank"
                onClick={selectVersion(version)}>
                {t('preview')}
              </Preview>

              <Btn
                small
                onClick={restoreCv(version)}>
                {t('restore')}
              </Btn>
            </Actions>
          </Version>
        </Row>
      ))}
    </VersionsList>
  )
}

History.propTypes = {
  active: PropTypes.bool,
  cv: PropTypes.object.isRequired,
}

export default History

import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import notify from '../services/notify'
import useCvs from '../hooks/useCvs'
import useJournalEntries from '../hooks/useJournalEntries'
import useQuery from '../hooks/useQuery'
import { t } from '../locales'

import LoadingSpinner from './LoadingSpinner'
import ModalPublish from './ModalPublish'
import ModalShare from './ModalShare'
import ModalUpgrade from './ModalUpgrade'

const Application = ({ children }) => {
  const { modal } = useQuery()
  const user = useSelector((state) => state.session.user)
  const [loadingError, setLoadingError] = useState(false)

  const { getCvs, cvsLoading } = useCvs()
  const { getJournalEntries, journalEntriesLoading } = useJournalEntries()

  const onLoadingCvsError = () => {
    setLoadingError(true)
    notify.error(t('cvs_loading_error'), { autoClose: false })
  }

  const onLoadingJournalEntriesError = () => setLoadingError(true)

  useEffect(() => {
    if (!user) {
      return
    }

    getCvs().catch(onLoadingCvsError)
    getJournalEntries().catch(onLoadingJournalEntriesError)
  }, [user])

  const showPublishModal = modal === 'publish'
  const showShareModal = modal === 'share'
  const showUpgradeModal = modal === 'upgrade'

  const loading = !user || journalEntriesLoading || cvsLoading

  return (
    <>
      <ModalPublish isOpen={showPublishModal} />
      <ModalShare isOpen={showShareModal} />
      <ModalUpgrade isOpen={showUpgradeModal} />

      {loading && <LoadingSpinner />}

      {!loading && !loadingError && children}
    </>
  )
}

Application.propTypes = {
  children: PropTypes.node,
}

export default Application

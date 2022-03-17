import styled from 'styled-components'
import { useEffect, useState } from 'react'

import api from '../services/api'
import notify from '../services/notify'
import { t } from '../locales'

import BillingInfo from './BillingInfo'
import LoadingSpinner from './LoadingSpinner'
import PageTitle from './PageTitle'

const Container = styled.div`
  background: #f4f7f8;

  flex: 1;

  padding: 30px 15px;
`

const Page = styled.div`
  margin: 0 auto;
  max-width: 500px;
`

const Title = styled(PageTitle)`
  margin: 0 0 30px;
`

const UpdateBilling = () => {
  const [billingInfo, setBillingInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onError = () => {
      setLoading(false)

      notify.error(t('billing_info_loading_error'))
    }

    api
      .getBillingInfo()
      .then(setBillingInfo)
      .then(() => setLoading(false))
      .catch(onError)
  }, [])

  return (
    <Container>
      <Title>{t('your_billing_information')}</Title>

      <Page>
        {loading && <LoadingSpinner />}

        {!loading && <BillingInfo billingInfo={billingInfo} />}
      </Page>
    </Container>
  )
}

export default UpdateBilling

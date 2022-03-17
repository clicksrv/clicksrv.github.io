import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { t } from '../../locales'
import events from '../../services/events'
import { FormBuilder } from '../forms'
import Button, { Btn } from '../styled/Button'
import { PanelWithMargin as Panel, PanelTitle } from '../styled/Panel'
import { trackEvent } from '../../helpers/analytics'

const Container = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  max-width: 930px;
  margin: 0 auto;
`

const Instructions = styled.div`
  margin-bottom: 50px;
`

const LearnMore = ({ url }) => (
  <p>
    {t('learn_more_integration')}{' '}
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank">
      {t('knowledge_center')}
    </a>
    .
  </p>
)

LearnMore.propTypes = {
  url: PropTypes.string,
}

const Extras = () => {
  const user = useSelector((state) => state.session.user)

  const updateUser = (formData) => {
    events.emit('SETTINGS::PATCH', formData)
  }

  const trackUpgradeClick = (section) => trackEvent('clicked-upgrade', 'click', 0, { section })

  const renderUpgradeSection = (section) => (
    <div>
      <p>{t('upgrade_to_access_pro_features')}.</p>

      <Button
        cta
        to="/checkout"
        onClick={() => trackUpgradeClick(section)}>
        {t('upgrade')}
      </Button>
    </div>
  )

  const domainSchema = {
    domain: {
      label: t('domain_name'),
      type: 'text',
      placeholder: 'www.your-domain.com',
    },
  }

  const domainData = _.pick(user, ['domain'])

  return (
    <Container>
      <Panel>
        <PanelTitle>{t('custom_domain')}</PanelTitle>

        {user.free_tier ? (
          renderUpgradeSection('custom_domain')
        ) : (
          <div>
            <Instructions>
              <p>{t('custom_domains_steps')}:</p>
              <ol>
                <li>{t('custom_domains_step_1')}: 54.191.84.108</li>
                <li>{t('custom_domains_step_2')}</li>
                <li>{t('custom_domains_step_3')}</li>
              </ol>
              <LearnMore url="https://support.visualcv.com/article/21-how-do-i-use-a-custom-domain-name" />
            </Instructions>
            <FormBuilder
              formData={domainData}
              schema={domainSchema}
              submitLabel={t('save')}
              onValidSubmit={updateUser}>
              <Btn
                type="submit"
                style={{ marginRight: 10 }}>
                {t('save')}
              </Btn>
            </FormBuilder>
          </div>
        )}
      </Panel>
    </Container>
  )
}

export default Extras

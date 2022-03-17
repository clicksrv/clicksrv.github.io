import PropTypes from 'prop-types'
import styled from 'styled-components'

import Survey from './Survey'

const Container = styled.div`
  margin: 0 auto;
  max-width: 650px;
  padding-bottom: 40px;
`

const DowngradeFlow = ({ actionText, deleteAccount, onComplete, title }) => {
  const complete = ({ reason, feedback }) => onComplete({ reason, feedback })

  return (
    <Container>
      <Survey
        title={title}
        deleteAccount={deleteAccount}
        actionText={actionText}
        onComplete={complete}
      />
    </Container>
  )
}

DowngradeFlow.propTypes = {
  actionText: PropTypes.string.isRequired,
  deleteAccount: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default DowngradeFlow

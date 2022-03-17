import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 16px;

  display: flex;
  flex-wrap: wrap;

  max-width: 930px;
  margin: 0 auto 25px;
`

const Tab = styled(({ active, ...rest }) => <a {...rest} />)`
  padding: 0.5em 1em;
  color: ${({ active }) => (active ? '#3e94e4' : '#bbb')} !important;
  border-bottom: ${({ active }) => active && '2px solid #3e94e4'};
  margin-bottom: 15px;
  transition: all 0.2s !important;
`

const Tabs = ({ onSelect, selected, tabs }) => {
  const selectTab = (tabIndex) => () => {
    onSelect(tabIndex)
  }

  const renderTab = (tabName, tabIndex) => {
    const active = selected === tabIndex

    return (
      <Tab
        key={tabName}
        active={active}
        onClick={selectTab(tabIndex)}>
        {tabName}
      </Tab>
    )
  }

  return <Container>{tabs.map(renderTab)}</Container>
}

Tabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Tabs.defaultProps = {
  selected: 0,
}

export default Tabs

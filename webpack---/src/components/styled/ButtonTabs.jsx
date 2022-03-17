import PropTypes from 'prop-types'
import styled from 'styled-components'

import { greyLightest } from '../../colors'

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  & > button {
    &:first-child {
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
`

export const ButtonTab = styled(({ active, ...rest }) => <button {...rest} />)`
  width: 180px;
  height: 35px;
  color: ${({ active }) => (active ? 'white' : '#bbb')};
  background-color: ${({ active }) => (active ? '#777' : greyLightest)};
  border: none;
  font-size: 15px;
  transition: background-color 0.15s ease, color 0.15s ease;
`

const ButtonTabs = ({ onSelect, selected, tabs }) => {
  const selectTab = (tabIndex) => () => {
    onSelect(tabIndex)
  }

  const renderTab = (tabName, tabIndex) => {
    const active = selected === tabIndex

    return (
      <ButtonTab
        key={tabIndex}
        active={active}
        onClick={selectTab(tabIndex)}>
        {tabName}
      </ButtonTab>
    )
  }

  return <Container>{tabs.map(renderTab)}</Container>
}

ButtonTabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  tabs: PropTypes.array.isRequired,
}

export default ButtonTabs

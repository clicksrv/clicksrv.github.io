import styled from 'styled-components'

const NavBarSection = styled.div`
  display: flex;
  align-items: center;

  flex: ${({ grow }) => (grow ? 1 : 0)} 1 auto;

  height: 100%;
`

export default NavBarSection

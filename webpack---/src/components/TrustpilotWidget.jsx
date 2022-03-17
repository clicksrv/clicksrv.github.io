import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Container = styled.div`
  margin-left: -15px;
  margin-bottom: 16px;
  max-width: max-content;
`

const TrustpilotWidget = () => {
  const ref = useRef(null)
  const locale = useSelector((state) => state.application.locale)

  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

  return (
    <Container
      ref={ref}
      className="trustpilot-widget"
      data-locale={locale}
      data-template-id="5419b732fbfb950b10de65e5"
      data-businessunit-id="5c8e7739f69c180001e0c486"
      data-style-height="24px"
      data-style-width="100%"
      data-theme="light">
      <a
        href="https://www.trustpilot.com/review/example.com"
        target="_blank"
        rel="noopener noreferrer">
        Trustpilot
      </a>
    </Container>
  )
}

export default TrustpilotWidget

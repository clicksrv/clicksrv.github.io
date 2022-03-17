import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import api from '../services/api'
import notify from '../services/notify'
import useDebounce from '../hooks/useDebounce'
import useDropdown from '../hooks/useDropdown'
import useSidebar from '../hooks/useSidebar'
import { grey, primaryLightest } from '../colors'
import { localeIndexOf, localeMatch, t } from '../locales'
import { importCvContentFromSample, isRecentlyCreated } from '../helpers/cv'
import { media } from './styled/Grid'
import { trackEvent } from '../helpers/analytics'

import CvContentFromSamplePoster from './CvContentFromSamplePoster'
import Input from './Input'
import ModalConfirm from './ModalConfirm'
import PageSubtitle from './PageSubtitle'
import { CvPostersContainer } from './CvPoster'
import { DropdownContent } from './Dropdown'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: -10px;
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 14px;

  margin-bottom: 12px;
`

const Search = styled.div`
  margin-top: 12px;
  max-width: 100%;
  position: relative;
  width: 600px;
`

const InputSearch = styled(Input)`
  margin-bottom: unset;
`

const IconReset = styled.i`
  color: ${grey};
  cursor: pointer;
  font-size: 14px;

  position: absolute;
  top: 14px;
  right: 14px;
`

const SearchResultsContainer = styled(DropdownContent)`
  padding: 10px 0;
  width: 100%;
`

const SearchResults = styled.ul`
  list-style: none;
`

const SearchResult = styled.li`
  background-color: transparent;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s;

  margin: 0;
  padding: 9px 20px;

  strong {
    font-weight: 600;
  }

  :hover {
    background-color: ${primaryLightest};
  }
`

const NoResults = styled.p`
  color: ${grey};
  font-size: 15px;

  margin: 7px 0;
  padding: 0 20px;
`

const Title = styled(PageSubtitle)`
  font-size: 25px;

  margin: 50px 0 20px;

  ${media.sm`
    font-size: 28px;
  `}

  ${media.lg`
    font-size: 32px;
  `}
`

const CvContentFromSample = ({ active, cv }) => {
  const [samples, setSamples] = useState([])
  const [samplesLoaded, setSamplesLoaded] = useState(false)
  const [popularSamples, setPopularSamples] = useState([])
  const [searchTerm, setSearchTerm] = useState('') // as user typed it
  const [selectedName, setSelectedName] = useState(null) // user chosen result
  const [selectedSlug, setSelectedSlug] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const { closeDropdown, dropdownOpen, openDropdown } = useDropdown({ ignoreOuterClicks: true })
  const { handleSidebarItemSelected } = useSidebar()

  const locale = useSelector((state) => state.application.locale)

  const searchTermDebounced = useDebounce(searchTerm, 200)

  const maximumSearchResults = 10

  useEffect(() => {
    const onError = () => notify.error(t('samples_loading_error'))

    // will load on first activation
    if (active && !samplesLoaded) {
      api.getSamples().then(setSamples).catch(onError)
      api.getPopularSamples().then(setPopularSamples).catch(onError)

      setSamplesLoaded(true)
    }
  }, [active, samplesLoaded])

  useEffect(() => {
    if (searchTermDebounced) {
      openDropdown()
    } else {
      closeDropdown()
    }
  }, [searchTermDebounced])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const sampleNames = useMemo(() => Array.from(new Set(samples.map(({ name }) => name))), [samples])

  // split by whitespace/punctuation and search by such split search terms
  const searchTermParts = useMemo(
    () => searchTermDebounced.split(/[\s,\-_'’]/u).filter((term) => !!term),
    [searchTermDebounced]
  )

  const filteredNames = useMemo(() => {
    if (!searchTermParts.length) {
      return []
    }

    // partial match means one, whitespace/punctuation separated part matched
    const isPartialMatch = (sampleName, part) => localeMatch(sampleName, part, locale)

    // there needs to be a match for every search term part
    const isFullMatch = (sampleName) => searchTermParts.every((part) => isPartialMatch(sampleName, part))

    return sampleNames.filter(isFullMatch).slice(0, maximumSearchResults)
  }, [locale, sampleNames, searchTermParts])

  const filteredSamples = useMemo(() => samples.filter(({ name }) => name === selectedName), [samples, selectedName])

  const onSearch = ({ search }) => setSearchTerm(search)

  // adds html <strong> tags to matched letters from search terms (space separated)
  const highlight = (name) => {
    const letters = [...name]
    const highlightedLetters = letters.map((letter, index) => <strong key={`${letter}${index}`}>{letter}</strong>)

    // for each matched term replace matched letters with their <strong>ed equivalent
    searchTermParts.forEach((term) => {
      const termLength = term.length
      const termIndex = localeIndexOf(name, term, locale)

      letters.splice(termIndex, termLength, ...highlightedLetters.slice(termIndex, termIndex + termLength))
    })

    return letters
  }

  // opens results dropdown when input is focused again
  const onInputClick = () => searchTermDebounced && !dropdownOpen && openDropdown()

  const onNameClick = (name) => () => {
    setSelectedName(name)
    closeDropdown()
  }

  const resetSearch = () => {
    setSelectedName(null)
    setSelectedSlug(null)
    closeDropdown()
    setSearchTerm('')
  }

  const noResults = !filteredNames.length

  const selectSample = (slug) => (event) => {
    event.stopPropagation()

    setSelectedSlug(slug)

    if (isRecentlyCreated(cv)) {
      // CVs created in the last 5 minutes don't need a confirmation
      importContent(slug)()
    } else {
      openModal()
    }
  }

  /**
   * Function returning function so that it re-renders on selectedSlug change (in ModalConfirm)
   * @param {string} slug CV slug to import
   * @returns {function} to be used as onClick handler
   */
  const importContent = (slug) => () => {
    closeModal()

    trackEvent('imported-content-from-sample', 'interaction')

    importCvContentFromSample(cv, slug, {})

    handleSidebarItemSelected(cv)
    resetSearch()
  }

  return (
    <Container>
      <Subtitle>{t('choose_example_info')}</Subtitle>

      <Search>
        <Formsy onChange={onSearch}>
          <InputSearch
            aria-autocomplete="both"
            aria-haspopup="false"
            autoComplete="off"
            autoFill="off"
            name="search"
            onClick={onInputClick}
            placeholder={t('search_by_job_title')}
            search
            small
            spellcheck="false"
            type="text"
            value={searchTerm}
          />

          {searchTermDebounced && (
            <IconReset
              className="icon-close"
              onClick={resetSearch}
            />
          )}
        </Formsy>

        <SearchResultsContainer
          closeDropdown={closeDropdown}
          desktopLayout
          dropdownOpen={dropdownOpen}>
          <SearchResults>
            {filteredNames.map((name) => (
              <SearchResult
                key={name}
                onClick={onNameClick(name)}>
                {highlight(name)}
              </SearchResult>
            ))}
          </SearchResults>

          {searchTermDebounced && noResults && <NoResults>{t('no_results_found')}</NoResults>}
        </SearchResultsContainer>
      </Search>

      {selectedName && <Title>{selectedName}</Title>}

      <CvPostersContainer>
        {filteredSamples.map((sample) => (
          <CvContentFromSamplePoster
            key={sample.url}
            sample={sample}
            selectSample={selectSample}
          />
        ))}
      </CvPostersContainer>

      {popularSamples.length > 0 && (
        <>
          <Title>{t('most_popular_samples')}</Title>

          <CvPostersContainer>
            {popularSamples.map((sample) => (
              <CvContentFromSamplePoster
                key={sample.url}
                sample={sample}
                selectSample={selectSample}
              />
            ))}
          </CvPostersContainer>
        </>
      )}

      <ModalConfirm
        cancelLabel={t('cancel')}
        confirmLabel={t('add_content')}
        isOpen={showModal}
        message={t('content_overwrite_warning')}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={importContent(selectedSlug)}
        title={t('are_you_sure_to_add_content')}
      />
    </Container>
  )
}

CvContentFromSample.propTypes = {
  active: PropTypes.bool.isRequired,
  cv: PropTypes.object.isRequired,
}

export default CvContentFromSample

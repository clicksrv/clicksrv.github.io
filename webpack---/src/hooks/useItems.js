import useCvs from './useCvs'
import useJournalEntries from './useJournalEntries'
import {
    isCoverLetter,
    isResume,
    isWebsite
} from '../helpers/cv'

/**
 * React Hook to be used in places where we want to get filtered collection of user items
 * Aggregates data from useCvs() and useJournalEntries() hooks
 *
 * @param {string} type resume / cover_letter / website / journal_entry
 * @returns {array} of filtered items
 */
const useItems = (type) => {
    const {
        cvs
    } = useCvs()
    const {
        journalEntries
    } = useJournalEntries()

    const cvFilterFunctions = {
        resume: isResume,
        cover_letter: isCoverLetter,
        website: isWebsite,
    }

    const journalEntry = type === 'journal_entry'

    const cvFilterFunction = cvFilterFunctions[type]

    const filterItems = () => {
        if (journalEntry) {
            return journalEntries
        }

        return cvs.filter(cvFilterFunction)
    }

    const items = filterItems()

    return {
        items,
    }
}

export default useItems
import {
    useDispatch
} from 'react-redux'
import {
    useContext
} from 'react'

import api from '../services/api'
import groupBy from '../helpers/groupBy'
import notify from '../services/notify'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'
import {
    t
} from '../locales'
import {
    trackEvent
} from '../helpers/analytics'

const useJournalEntries = () => {
    const [state, setState] = useContext(ApplicationContext)
    const dispatch = useDispatch()

    const {
        journalEntries,
        journalEntriesLoading
    } = state

    const isPinned = (journalEntry) => journalEntry.pinned
    const pinnedJournalEntries = journalEntries && journalEntries.filter(isPinned)
    const groupedJournalEntries = journalEntries && groupBy(journalEntries, 'date')

    // sorting function
    const compareJournalEntriesByCreationDate = (entryA, entryB) => {
        if (entryA.created_at > entryB.created_at) {
            // most recent 'created_at' -> at the beginning
            return -1
        } else if (entryA.created_at < entryB.created_at) {
            return 1
        }

        return 0
    }

    // sorting function
    const compareJournalEntriesByDate = (entryA, entryB) => {
        if (entryA.date > entryB.date) {
            // most recent date -> at the beginning
            return -1
        } else if (entryA.date < entryB.date) {
            return 1
        }

        // date is the same
        if (entryA.created_at > entryB.created_at) {
            // most recently created -> at the beginning
            return -1
        }

        // equal; never reached with real data
        return 0
    }

    const latestJournalEntry = journalEntries && [...journalEntries].sort(compareJournalEntriesByCreationDate)[0]

    const journalEntriesLoaded = () =>
        setState((state) => ({
            ...state,
            journalEntriesLoading: false,
        }))

    const setJournalEntries = (newJournalEntries) =>
        setState((state) => ({
            ...state,
            journalEntries: newJournalEntries,
        }))

    const createJournalEntry = (params) => {
        const onCreated = (data) => {
            trackEvent('published-journal-entry', 'interaction')

            const journalEntry = data.journal_entry

            dispatch({
                type: 'USER::NEW_JOURNAL_ENTRY',
                data: journalEntry,
            })

            const newJournalEntries = [...journalEntries, journalEntry]

            return setJournalEntries([...newJournalEntries].sort(compareJournalEntriesByDate))
        }

        return api.createJournalEntry(params).then(onCreated)
    }

    const deleteJournalEntry = (id) => {
        const onDeleted = () => {
            trackEvent('deleted-journal-entry', 'interaction')

            notify.success(t('journal_entry_deleted'))

            const newJournalEntries = journalEntries.filter((journalEntry) => journalEntry.id !== id)

            return setJournalEntries(newJournalEntries)
        }

        return api.deleteJournalEntry(id).then(onDeleted)
    }

    const getJournalEntries = () => api.getJournalEntries().then(setJournalEntries).finally(journalEntriesLoaded)

    const togglePinned = (journalEntry) => {
        const {
            assets,
            pinned
        } = journalEntry

        const assetsIds = assets.map(({
            id
        }) => id)

        const onUpdated = () => {
            const eventName = pinned ? 'unpinned-journal-entry' : 'pinned-journal-entry'

            return trackEvent(eventName, 'interaction')
        }

        return updateJournalEntry({ ...journalEntry,
            assets: assetsIds,
            pinned: !pinned
        }).then(onUpdated)
    }

    const updateJournalEntry = (journalEntry) => {
        const onUpdated = (data) => {
            const journalEntry = data.journal_entry

            const newJournalEntries = journalEntries.map((entry) => {
                if (entry.id === journalEntry.id) {
                    return journalEntry
                }

                return entry
            })

            return setJournalEntries([...newJournalEntries].sort(compareJournalEntriesByDate))
        }

        return api.updateJournalEntry(journalEntry).then(onUpdated)
    }

    return {
        createJournalEntry,
        deleteJournalEntry,
        getJournalEntries,
        groupedJournalEntries,
        journalEntries,
        journalEntriesLoading,
        latestJournalEntry,
        pinnedJournalEntries,
        togglePinned,
        updateJournalEntry,
    }
}

export default useJournalEntries
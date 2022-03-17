import axios from 'axios'
import store from '../services/store'

import {
    trackEvent
} from './analytics'

export const downloadFile = async (url, expectedContentType) => {
    const response = await axios({
        method: 'get',
        url,
        responseType: 'blob',
        auth: {
            username: 'token',
            password: store.getState().session.token
        },
    })

    if (response.headers['content-type'] !== expectedContentType) {
        throw new Error('Unexpected content type')
    }

    return {
        filename: getFileNameByContentDisposition(response.headers['content-disposition']),
        blob: response.data,
    }
}

export const saveTempFile = (fileData, fileName) => {
    return new Promise((resolve, reject) => {
        window.requestFileSystem(
            window.TEMPORARY,
            5 * 1024 * 1024,
            function(fs) {
                fs.root.getFile(
                    fileName, {
                        create: true,
                        exclusive: false
                    },
                    function(fileEntry) {
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.onwriteend = function() {
                                resolve(fileEntry.toURL())
                            }
                            fileWriter.onerror = reject

                            fileWriter.write(fileData)
                        })
                    },
                    reject
                )
            },
            reject
        )
    })
}

export const openFile = (url, contentType) => {
    return new Promise((resolve, reject) => {
        cordova.plugins.fileOpener2.open(url, contentType, {
            error(e) {
                if (e.status === 9) {
                    // No application installed for contentType. Show Open dialog instead.
                    cordova.plugins.fileOpener2.showOpenWithDialog(url, contentType, {
                        error: reject,
                        success: resolve,
                    })
                } else {
                    reject(e)
                }
            },
            success: resolve,
        })
    })
}

const getFileNameByContentDisposition = (contentDisposition) => {
    const regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/
    const matches = regex.exec(contentDisposition)
    let filename

    if (matches != null && matches[3]) {
        filename = matches[3].replace(/['"]/g, '')
    }

    return filename ? decodeURI(filename) : undefined
}

const downloadAndOpenPdf = async (pdfUrl) => {
    try {
        const contentType = 'application/pdf'
        const downloadedPdf = await downloadFile(pdfUrl, contentType)
        const url = await saveTempFile(downloadedPdf.blob, downloadedPdf.filename || 'VisualCV_Resume.pdf')
        await openFile(url, contentType)
    } catch (error) {
        alert('PDF download failed.')
    }
}

/*
 * @returns {function} to be used as an onClick handler
 */
export const downloadPdf = (pdfUrl) => (event) => {
    trackEvent('downloaded-pdf', 'interaction')

    if (process.env.CORDOVA) {
        event.preventDefault()

        downloadAndOpenPdf(pdfUrl)
    }
}

const downloadAndOpenWord = async (wordUrl) => {
    try {
        const contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        const downloadedDocx = await downloadFile(wordUrl, contentType)
        const url = await saveTempFile(downloadedDocx.blob, downloadedDocx.filename || 'VisualCV_Resume.docx')
        await openFile(url, contentType)
    } catch (error) {
        alert('Word download failed.')
    }
}

/*
 * @returns {function} to be used as an onClick handler
 */
export const downloadWord = (wordUrl) => (event) => {
    trackEvent('downloaded-word', 'interaction')

    if (process.env.CORDOVA) {
        event.preventDefault()

        downloadAndOpenWord(wordUrl)
    }
}
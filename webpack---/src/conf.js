import countries from './constants/countries'
import fonts from './constants/fonts'
import languages from './constants/languages'
import themes from './constants/themes'
import timezones from './constants/timezones'

const intercomAppId = 'pc3yidi4'

const host = `https://${process.env.VCV_HOST}` // API server
const version = 'api/v2' // API version
const publicCvsHost = `https://${process.env.PUBLIC_CVS_HOST}` // my.visualcv.com

let sentryDSN

switch (process.env.CORDOVA) {
    case 'android':
        sentryDSN = 'https://8c865f438bab4e8baa6db4413e5e9797@sentry.io/59134'
        break
    case 'ios':
        sentryDSN = 'https://e2d2ddc368de4d5e9180eb192d0c0cae@sentry.io/1416666'
        break
    default:
        // Web client
        sentryDSN = 'https://9b44a14db1ff4e8297161393cf76ec93@sentry.io/75003'
}

const addableSections = [
    'summary',
    'positions',
    'degrees',
    'strengths',
    'portfolio',
    'text_story',
    'dated_stories',
    'contact_me',
]

// This list should reduce over time, as we add more inline editing capabilities
// to the visual editor for these section types.
const editableSections = ['profile', 'positions', 'degrees', 'portfolio', 'dated_stories']

// references and certifications are legacy sections, without UI support
const supportedSections = [
    'profile',
    'summary',
    'positions',
    'degrees',
    'strengths',
    'portfolio',
    'text_story',
    'dated_stories',
    'references',
    'certifications',
    'contact_me',
]

const datedStory = {
    title: '',
    organization: '',
    organization_url: '',
    description: '',
    start_date: '',
    end_date: '',
}

const textStory = {
    description: '',
}

const formSchema = {
    profile: {
        thumb: '',
        full_name: '',
        email: '',
        phone: '',
        location: '',
        headline: '',
        websites: [],
    },
    summary: {
        description: '',
    },
    positions: {
        ...datedStory,
    },
    degrees: {
        ...datedStory,
    },
    strengths: {
        name: '',
        description: '',
        level: 0,
    },
    portfolio: {
        description: '',
        assets: [],
    },
    text_story: {
        ...textStory,
    },
    dated_stories: {
        ...datedStory,
    },
    references: {
        ...textStory,
    },
    certifications: {
        ...datedStory,
    },
    contact_me: {
        description: '',
        contact_form: null,
    },
    dated_story: {
        ...datedStory,
    },
    asset: {
        title: '',
        description: '',
    },
}

const defaultCv = {
    name: 'My VisualCV',
    theme: 'standard',
    style: {},
    sections: {
        profile: {
            content: formSchema.profile,
        },
    },
}

const downgradePlans = {
    oneYear: 'pro_loyalty_1y_99',
    threeYears: 'pro_loyalty_3y_199',
}

const discontinuedDowngradePlans = {
    annual: 'dg_pro_yearly',
    lifetime: 'lifetime75',
}

const supportedFileTypes = {
    image: [
        ['JPG', 'PNG'],
        ['image/jpeg', 'image/png'],
    ],
    document: [
        ['PDF', 'DOCX', 'PPT'],
        [
            'application/pdf',
            'application/msword',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ],
    ],
}

const maxUploadFileSize = 100 // Megabytes
const lightboxFadeInOutTime = 200 // Miliseconds

const conf = {
    intercomAppId,
    host,
    publicCvsHost,
    addableSections,
    editableSections,
    supportedSections,
    themes,
    fonts,
    languages,
    countries,
    timezones,
    downgradePlans,
    discontinuedDowngradePlans,
    sentryDSN,
    supportedFileTypes,
    maxUploadFileSize,
    lightboxFadeInOutTime,

    endpoint: (path) => {
        return [host, version, path].join('/')
    },

    formSchema,

    defaults: {
        resume: defaultCv,
        cover_letter: {
            name: 'Cover Letter',
            theme: 'cl1',
            style: {},
            sections: {
                text_story: {
                    content: {
                        description: "<p>Hi [name of hiring manager],</p>\n<p>I'm [name], a [cashier, software developer, nurse]. I have worked in this field for more than [two, five, ten] years, including experience with [logistics, PHP, customer service] and [cash-handling, project management, inventory]. I am [hard-working, independent] and passionate about [solving problems, working in a team].</p>\n<p>I believe that [organization name] is an impressive company whose values I share. I thrive in a [fast-paced, collaborative, innovative] environment and I know that I have the skills, experience, and attitude to excel in this position.</p>\n<p>I would love to meet and discuss what I can bring to this role. I can be reached at [email] and [phone number].</p>\n<p>Thanks,<br />[name]</p>",
                    },
                },
            },
        },
        website: {
            ...defaultCv,
            theme: 'lingo',
        },
        state: {
            admin: {
                cvs: [],
                users: [],
                stats: {},
            },
            application: {
                locale: 'en',
                locationHistory: [],
                cvSample: null,
            },
            session: {},
            settings: {
                user: {},
                errors: {},
            },
            editor: {
                cv: defaultCv,
                errors: {},
            },
        },
    },
}

export default conf
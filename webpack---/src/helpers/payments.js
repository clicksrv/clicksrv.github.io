import {
    redDanger
} from '../colors'
import {
    t
} from '../locales'

export const configureRecurly = () => {
    // Detect Recurly hanged up state, where the CC field didn't fully load and
    // manually set `readyState` to a value, which allows executing
    // `configure()` again to reattach the hosted field
    // https://github.com/recurly/recurly-js/issues/570
    if (recurly ? .readyState === 1) {
        recurly.readyState = 2
    }

    recurly ? .configure({
        publicKey: process.env.RECURLY_PUBLIC_KEY,
        fields: {
            all: {
                style: {
                    fontColor: '#000',
                    fontFamily: 'Helvetica',
                    fontSize: '16px',
                    placeholder: {
                        color: '#999 !important',
                        fontWeight: 'lighter',
                        fontSize: '15px',
                    },
                },
            },

            card: {
                displayIcon: true,
                style: {
                    invalid: {
                        fontColor: redDanger,
                    },
                    placeholder: {
                        content: {
                            number: t('card_number'),
                            expiry: 'MM/YY',
                            cvv: 'CVV',
                        },
                    },
                },
            },
        },
    })
}
import conf from '../conf'

const {
    themes
} = conf

export const isFreeTheme = (theme, user) => {
    const freeTierTheme = themes[theme].tier === 'free'

    const grandfatheredStarterBasicTheme = [
        'grandfathered_starter_basic',
        'grandfathered_starter_basic_standard',
    ].includes(themes[theme].tier)

    const grandfatheredStandardTheme = ['grandfathered_starter_basic_standard'].includes(themes[theme].tier)

    const starterOrBasicTierUser = ['starter', 'basic'].includes(user.tier)
    const starterOrBasicOrStandardTierUser = ['starter', 'basic', 'standard'].includes(user.tier)

    return (
        freeTierTheme ||
        (starterOrBasicTierUser && grandfatheredStarterBasicTheme) ||
        (starterOrBasicOrStandardTierUser && grandfatheredStandardTheme)
    )
}

export const isProTheme = (theme) => themes[theme].tier === 'professional'
export const isResumeTheme = (theme) => themes[theme].type === 'resume'
export const isWebsiteTheme = (theme) => themes[theme].type === 'website'

export const isNewTheme = (theme) => !!themes[theme].new
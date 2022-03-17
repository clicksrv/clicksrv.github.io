import conf from '../conf'

export const usedDowngradeOffer = (user) => {
    const {
        downgradePlans,
        discontinuedDowngradePlans
    } = conf

    const currentSubscription = user ? .current_subscription
    const currentPlanCode = currentSubscription ? .plan_code
    const pendingPlanCode = currentSubscription ? .pending_plan_code

    if (Object.values(downgradePlans).includes(currentPlanCode)) {
        return true
    }

    if (Object.values(downgradePlans).includes(pendingPlanCode)) {
        return true
    }

    if (Object.values(discontinuedDowngradePlans).includes(currentPlanCode)) {
        return true
    }

    if (Object.values(discontinuedDowngradePlans).includes(pendingPlanCode)) {
        return true
    }

    return false
}
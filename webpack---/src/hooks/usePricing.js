const usePricing = () => {
    const monthlyAmount = 20
    const quarterlyMonthlyAmount = 13

    const monthlyPlan = 'pro_monthly_20'
    const quarterlyPlan = 'pro_quarterly_39'

    return {
        monthlyAmount,
        quarterlyMonthlyAmount,
        monthlyPlan,
        quarterlyPlan,
    }
}

export default usePricing
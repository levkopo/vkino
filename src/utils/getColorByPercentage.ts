export const getColorByPercentage = (percentage: number) => {
    return percentage >= 0.7 ? 'var(--vkui--color_text_positive)' :
        percentage >= 0.5 ? 'var(--vkui--color_accent_orange)' :
            percentage > 0 ? 'var(--vkui--color_text_negative)' :
                'currentcolor'
}
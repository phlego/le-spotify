export function capitalizeFirstLetter(text: string) {
    return text?.length
        ? text.charAt(0).toUpperCase() + text.slice(1)
        : text
}
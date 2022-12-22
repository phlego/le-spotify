export function download(filename: string, data: object) {
    const element = document.createElement('a')
    const text = JSON.stringify(data, null, 2)
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}
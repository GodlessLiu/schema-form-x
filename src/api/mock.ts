export function mockUploadImage(): Promise<string> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('https://via.placeholder.com/200x200')
    }, 1000)
  })
}

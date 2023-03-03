export default async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(function () {
      resolve('true')
    }, ms)
  })
}

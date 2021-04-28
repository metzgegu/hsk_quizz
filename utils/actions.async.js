export const getHskData = async (level) => {
  const res = await fetch(
    level === 'custom' ? `../hsk-custom.json` : `https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-${level}.json`
  )
  return await res.json()
}

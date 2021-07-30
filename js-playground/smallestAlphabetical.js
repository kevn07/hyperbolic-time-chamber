
S = 'abcd'

function returnSmallestAlphabetical(s) {
  let next = 1
  let toRemove = 0
  for (let i=0; i < S.length; i++) {
      if (S[next] > S[i]) {
          toRemove = next
      }
      next += 1
      if (S[next] < S[toRemove]) {
          break
      }
  }
  let array = S.split('')
  array.splice(toRemove, 1)
  return array.join('')
}
"""
  Time Complexity: O(logN)
"""


"""
  Recursive Binary Search
"""
def recursiveBinarySearch(inputArray, low, high, toSearch):
  if high >= low:
    mid = (high + low) // 2

    if inputArray[mid] == toSearch:
      return mid
    elif arr[mid] > toSearch:
      return recursiveBinarySearch(inputArray, low, mid - 1, toSearch)
    else:
      return recursiveBinarySearch(inputArray, mid + 1, high, x)
  
  else:
    return -1


"""
  Iterative Binary Search
"""
def iterativeBinarySearch(inputArray, toSearch):
  low = 0
  high = len(inputArray) - 1
  mid = 0

  while low <= high:
    mid = (high + low) // 2
    if inputArray[mid] < toSearch:
      low = mid + 1
    elif inputArray[mid] > toSearch:
      high = mid - 1
    else:
      return mid
  
  return -1
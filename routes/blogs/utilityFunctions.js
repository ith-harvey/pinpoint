

function turnIntoArray(data) {
  if(typeof data === 'string') {
    data = [data]
    return data
  } else if (data.length > 1 && Array.isArray(data)) {
    return data
  }
}

function valueInEveryIndex(arr) {
  if(arr.every( item => {return item != ''})) {
    return arr
  }
}

function removeDuplicates(originalArray, prop) {
     const newArray = []
     const lookupObject = {}

     for(let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i]
     }

     for(let i in lookupObject) {
         newArray.push(lookupObject[i])
     }
      return newArray
 }




module.exports = {

  turnIntoArray,
  valueInEveryIndex,
  removeDuplicates


}

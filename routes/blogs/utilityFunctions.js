

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




module.exports = {

  turnIntoArray,
  valueInEveryIndex


}

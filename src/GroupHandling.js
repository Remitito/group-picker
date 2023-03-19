const randomize = (arr) => {
  var i, j, tmp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
  }
  return arr;
}

const changeGroupFunc = (direction, student, groupNum, groups) => {
    let groupsCopy = groups
    groupsCopy[groupNum].splice(groupsCopy[groupNum].indexOf(student), 1)
    if(direction === "down") {
      if(groupsCopy[groupNum + 1]) {
        groupsCopy[groupNum + 1].push(student)
      }
      else {
        groupsCopy[0].push(student)
      }
    }
    else {
      if(groupsCopy[groupNum - 1]) {
        groupsCopy[groupNum - 1].push(student)
      }
      else {
        groupsCopy[groupsCopy.length - 1].push(student)
      }
    }
    return groupsCopy
  }

// according to required number of groups
const makeGroupsByGenderFunc = (numGroups, studentInfo) => {
    // Add group arrays
    let output = []
    for (let i = 0; i < numGroups; i++) {
      output.push([])
    }
    // Split male/female
    let male = []
    let female = []
    studentInfo.forEach(student => {
      if(student[1] === "m") {
        male.push(student[0])
      }
      else {
        female.push(student[0])
      }
    })
    let maleShuffled = randomize(male)
    let femaleShuffled = randomize(female)
    // Assign groups
    while (maleShuffled.length > 0 || femaleShuffled.length > 0) {
      output.forEach(group => {
        if(maleShuffled.length > 0) {
          group.push(maleShuffled.pop())
        }
        else if (femaleShuffled.length > 0) {group.push(femaleShuffled.pop())}
      })
    }
    return output
  }


const makeGroupsFunc = (numGroups, studentInfo) => {
  let output = []
  // Get names
  let names = []
  randomize(studentInfo).forEach(student => {
      names.push(student[0])
  })
  // Add group arrays
    for (let i = 0; i < numGroups; i++) {
      output.push([])
    }
    while (names.length > 0) {
      for (let i = 0; i < numGroups; i++) {
          if(names.length > 0) {
            let name = names.pop()
            output[i].push(name)
          }
      }
    }
  return output
}

export {changeGroupFunc, makeGroupsFunc, makeGroupsByGenderFunc};
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
    while (maleShuffled.length > 0) {
      for (let i = 0; i < numGroups; i++) {
        if (maleShuffled.length > 0) {
          let name = maleShuffled.pop()
          output[i].push(name)
        }
      }
    }
    while (femaleShuffled.length > 0) {
      for (let i = 0; i < numGroups; i++) {
        if (femaleShuffled.length > 0) {
          let name = femaleShuffled.pop()
          output[i].push(name)
        }
      }
    }
    return output
  }

  // same as above but according to members per group not number of groups
  const makeGroupsByGenderMemFunc = (numGroups, studentInfo) => {
    let output = []
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
      let newGroup = []
      let counter = 1
      while (counter < numGroups) { 
        if(maleShuffled.length > 0) {
          let male = maleShuffled.pop()
          newGroup.push(male)
          counter += 1
          if(femaleShuffled.length > 0) {
            let female = femaleShuffled.pop()
            newGroup.push(female)
            counter += 1
          }
          else {
            if(maleShuffled.length > 0) {
              let maleTwo = maleShuffled.pop()
              newGroup.push(maleTwo) 
              counter += 1
            }
          }
        }
        else {
          let female = femaleShuffled.pop()
          newGroup.push(female)
          counter += 1
        }
      output.push(newGroup)
      }
    }
    return output
  }


const makeGroupsFunc = (numGroups, studentInfo, perGroup) => {
  let output = []
  // Get names
  let names = []
  randomize(studentInfo).forEach(student => {
      names.push(student[0])
  })
  // Assign groups for number of groups
  if(!perGroup) {
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
  }
  else {
   // Assign groups for members per group
    while (names.length > 0) {
      let newGroup = []
      for (let i = 0; i < numGroups; i++) {
        if(names.length > 0) {
          let name = names.pop()
          newGroup.push(name)
        }
      }
      output.push(newGroup)
    }
    // if last group only has one student alone, add them to the last group
    if(output.at(-1).length === 1) {
      let lastGroup = output.pop()
      output.at(-1).push(lastGroup[0])
    }
  }
  return output
}

export {changeGroupFunc, makeGroupsFunc, makeGroupsByGenderFunc, makeGroupsByGenderMemFunc};
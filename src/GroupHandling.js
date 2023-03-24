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
        male.push(student)
      }
      else {
        female.push(student)
      }
    })
    let maleShuffled = randomize(male)
    let femaleShuffled = randomize(female)
    // Assign groups
    while (maleShuffled.length > 0 || femaleShuffled.length > 0) {
      output.forEach(group => {
        if(maleShuffled.length > 0) {
          if(checkValidity(maleShuffled[maleShuffled.length - 1][2], group)) {
            group.push(maleShuffled.pop())
          }
        }
        else if (femaleShuffled.length > 0) {
          if(checkValidity(femaleShuffled[femaleShuffled.length - 1][2], group)) {
            group.push(femaleShuffled.pop())
          }
        }
      })
    }
    return output
  }


  const checkValidity = (student, group) => {
    let valid = true
    student[2].forEach(name => {
      if(valid) {
        group.forEach(member => {
          if(name === member[0]) {
            valid = false
          }
        })
      }
    })
    return valid
  }

const checkGroupsEven = (groups) => {
  let biggest = 0
  let smallest = groups[0].length
  groups.forEach(group => {
    if(group.length > biggest) {biggest = group.length}
    else if(group.length < smallest) {smallest = group.length}
  })
  if(Math.abs(biggest - smallest) > 1) {
    return false
  }
  return true
}


const addMembers = (students, numGroups, output) => {
  let go = students.length // only allow a certain amount of iterations 
  while (students.length > 0 && go < students.length * 25) {
    for (let i = 0; i < numGroups; i++) {
        if(students.length > 0) {
          go += 1
          if(checkValidity(students[students.length - 1], output[i])) {
            let student = students.pop() 
            output[i].push(student)
          }
        }
    }
  }
  // if a student couldn't be assigned or groups are uneven
  if(students.length > 0 || !checkGroupsEven(output)) {
    return false
  }
  return output
}

const makeGroupsFunc = (numGroups, studentInfo) => {
  let students = [...studentInfo]
  let output = []
  randomize(students)
  // Add group arrays
  for (let i = 0; i < numGroups; i++) {
    output.push([])
  }
  // repeat 1000 times to try and complete assignment
  let counter = 0
  while (counter < 500) {
    randomize(students)
    if(!addMembers(students, numGroups, output)) {
      addMembers(students, numGroups, output)
      counter += 1
    }
    else {
      return output
    }
  }
  // try once more
  return false
}



export {changeGroupFunc, makeGroupsFunc, makeGroupsByGenderFunc};
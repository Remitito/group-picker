import {Main, Info, TextBox, Button, Column, Name, OptionTitle, NumGroups, GroupName, Notice,
  Row, Student, Gender, GenderCont, Title, ToAvoid, ChangeCont, OptionLabel, Important, Change, Member, GenderLogo,
  StudentCont, Option, OptionRow, Group, RadioButton} from './styles'
import { IoManSharp, IoWomanSharp} from "react-icons/io5"; 
import { IconStyleMan, IconStyleWoman } from './styles';
import React from "react";
import './fonts.css';


// Todo: Add back in change radio button as realised it was for the gender part 

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      students: "",
      nameArray: ["Jack", "Jane", "Sarah", "Frank", "Keith", "Rachel", "Melvin"],
      studentInfo: [["Jack", "m", [""]], ["Jane", "f", []], ["Sarah", "f", [""]], ["Frank", "m", []], ["Keith", "m", []], ["Rachel", "f", []], ["Melvin", "m", []]],
      step: 3,
      groups: [["Melvin", "Jane", "Sarah", "Frank"], ["Rachel", "Keith", "Jack"]],
      biggestGroup: 4,
      byGender: "no",
      numGroups: 2,
      student1: ["", 0],
      error: "",
      currentStudent: "", 
      toAvoid: []
    }
  }


  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState({[name]: value})
  }

  addToAvoid = (name) => { // add to current avoid list
    let toAvoidCopy = this.state.toAvoid
    if(toAvoidCopy.includes(name)) {
      toAvoidCopy.splice(toAvoidCopy.indexOf(name), 1)
    }
    else {
      toAvoidCopy.push(name)
    }
    this.setState({toAvoid: toAvoidCopy})
  }

  updateAvoidInfo = () => { // update student info using current avoid list
    let studentInfoCopy = this.state.studentInfo
    studentInfoCopy.forEach((student, index) => {
      if(student[0] === this.state.currentStudent) {
        studentInfoCopy[index][2] = []
        this.state.toAvoid.forEach(name => {
          studentInfoCopy[index][2].push(name)
        })
      }
    })
    this.setState({studentInfo: studentInfoCopy, step: 2})
  } 

  loadAvoidPage = (name) => { // show avoid list page
    if(name === this.state.currentStudent) {
      this.setState({step: 4})
    }
    else {
      this.setState({step: 4, currentStudent: name, toAvoid: []})
    }
  }

  addStudents = () => { // turn initial name list into student name array and student info array
    let studentNames = this.state.students.split(/\r?\n/)
      if(studentNames.length < 4) {
        this.setState({error: "Please enter at least 4 names"})
        return
      }
      if(studentNames.length !== new Set(studentNames).size) {
        this.setState({error: "Please ensure all names are different"})
        return
      }
      else {
        const output = []
        studentNames.forEach((name) => {
        output.push([name, "", ""])
      })
      this.setState({step: 2, studentInfo: output, 
        numGroups: (Math.round(studentNames.length / 3)),
        nameArray: studentNames})
      }
    }


  randomize = (arr) => {
    var i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
  }

  makeGroupsByGender = () => {
    // Add group arrays
    let output = []
    for (let i = 0; i < this.state.numGroups; i++) {
      output.push([])
    }
    // Split male/female
    let male = []
    let female = []
    this.state.studentInfo.forEach(student => {
      if(student[1] === "m") {
        male.push(student[0])
      }
      else {
        female.push(student[0])
      }
    })
    let maleShuffled = this.randomize(male)
    let femaleShuffled = this.randomize(female)
    // Assign groups
    while (maleShuffled.length > 0) {
      for (let i = 0; i < this.state.numGroups; i++) {
        if (maleShuffled.length > 0) {
          let name = maleShuffled.pop()
          output[i].push(name)
        }
      }
    }
    while (femaleShuffled.length > 0) {
      for (let i = 0; i < this.state.numGroups; i++) {
        if (femaleShuffled.length > 0) {
          let name = femaleShuffled.pop()
          output[i].push(name)
        }
      }
    }
    while (!this.checkGroups(output)) {
      this.makeGroupsByGender()
    }
    this.setState({groups: output, step: 3})
  }

  checkGroups = (groupList) => {
    let success = true
    groupList.forEach((group, groupNum) => {
      group.forEach((member) => {
        if(!this.checkAvoidList(member, group)) {
          success = false
        }
      })
    })
    return success
  }

  checkAvoidList = (student, group) => {
    for(let i = 0; i < this.state.studentInfo.length; i++) {
      if(this.state.studentInfo[i][0] === student) {
        let avoidList = this.state.studentInfo[i][2]
        for(let e = 0; e < group.length; e++) {
          if(avoidList.includes(group[e])) {
            return false
          }
      }
    }
  }
  return true
}

  makeGroups = () => { // Make groups not based on gender
    let output = []
    for (let i = 0; i < this.state.numGroups; i++) {
      output.push([])
    }
    let namesShuffled = this.randomize(this.state.nameArray)
    while (namesShuffled.length > 0) {
      for (let i = 0; i < this.state.numGroups; i++) {
        if (namesShuffled.length > 0) {
          let name = namesShuffled.pop()
          output[i].push(name)
        }
      }
    }
    while (!this.checkGroups(output)) {
      this.makeGroupsByGender()
    }
    this.setState({groups: output, step: 3})
  }

  switchStudents = (name, groupNum) => {
    if(this.state.student1[0].length === 0) {
      this.setState({student1: [name, groupNum]})
    }
    else {
      let groupsCopy = this.state.groups
      const student1Name = this.state.student1[0]
      const student2Name = name
      const student1Group = this.state.student1[1]
      const student2Group = groupNum
      const student1Pos = groupsCopy[student1Group].indexOf(student1Name)
      const student2Pos = groupsCopy[student2Group].indexOf(student2Name)
      groupsCopy[student1Group][student1Pos] = student2Name
      groupsCopy[student2Group][student2Pos] = student1Name
      this.setState({groups: groupsCopy, student1: ["", 0]})
    }
  }

  changeGender = (key, gender) => {
    let studentInfoCopy = this.state.studentInfo
    if(studentInfoCopy[key][1] !== gender) {
      studentInfoCopy[key][1] = gender
    }
    else {
      studentInfoCopy[key][1] = ""
    }
    console.log(this.state.studentInfo[key])
    this.setState({studentInfo: studentInfoCopy})
  }

  changeGroup = (direction, student, groupNum) => {
    let groupsCopy = this.state.groups
    console.log(groupsCopy)
    groupsCopy[groupNum].splice(groupsCopy[groupNum].indexOf(student), 1)
    if(direction === "up") {
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
    this.setState({groups: groupsCopy, student1: ["", 0], biggestGroup: this.getLongestGroup()})
  }

  getLongestGroup = () => {
    let newBiggest = this.state.biggestGroup
    this.state.groups.forEach(group => {
      if(group.length > newBiggest) {
        group.length = newBiggest
      }})
    return newBiggest 
  }
  
  mapStudents = () => { 
  return this.state.studentInfo.map((student, key) => 
  <Student>
    <Name>{student[0]}</Name>
    <GenderCont>
      <Gender selected={this.state.studentInfo[key][1] === "m"} gender="m" name={key} onClick={() => this.changeGender(key, "m")} value="m"><GenderLogo src='/male.png'/></Gender>
      <Gender selected={this.state.studentInfo[key][1] === "f"} gender="f" name={key} onClick={() => this.changeGender(key, "f")} value="f"><GenderLogo src='/female.png'/></Gender>
    </GenderCont>
    <ToAvoid className='anton' onClick={() => this.loadAvoidPage(student[0])}>
      Avoid
    </ToAvoid>
  </Student>)
  }

  mapStudentsToAvoid = () => {
    return this.state.nameArray.map ((student) => 
    <>
    {this.state.currentStudent !== student ?
      <Student>
        <OptionRow>
          <ToAvoid onClick={() => this.addToAvoid(student)}>Avoid {student}</ToAvoid>
        </OptionRow>
      </Student>
    : <></>}
    </>
    )
  }

  mapGroups = () => {
    return this.state.groups.map((group, groupNum) => 
      <Group width={(this.state.biggestGroup * 100).toString() + "px"}>
        <GroupName>Group {groupNum + 1}</GroupName>
          <StudentCont>
            {group.map((student) => 
            <Member>{student}
              <ChangeCont>
                <Change value={student} onClick={() => this.switchStudents(student, groupNum)}>C</Change>
                <Change value={student} onClick={() => this.changeGroup("up", student, groupNum)}>U</Change>
                <Change value={student} onClick={() => this.changeGroup("down", student, groupNum)}>D</Change>
              </ChangeCont>
            </Member>
            )}
          </StudentCont>
      </Group>
    )
  }

  avoidList = () => {
    return this.state.toAvoid.map((student) => 
      <label>{student}</label>
    )
  }
  
  render() {
  
  return (
    <>
    {this.state.error.length === 0 ?
      <Main>
        <Title className='title'>Group Picker</Title>
        {this.state.step === 1 ?
        <>
          <Info className='rubik'>Copy and paste the names below <Important className='rubik'>(each name on a new line)</Important> to get started!</Info>
          <TextBox name="students" value={this.state.students} onChange={this.handleChange}/>
          <Button className='title' onClick={this.addStudents}>Add Students</Button>
        </>
        :
        <>
        {this.state.step === 2 ?
        <>
            <Row>
              <Column>{this.mapStudents()}</Column>
              <Column>
              <Option>
                <OptionTitle>Select by gender:</OptionTitle>
                <OptionRow>
                  <OptionLabel>Yes</OptionLabel>
                  <RadioButton name="byGender" checked={this.state.byGender === "yes"} value={"yes"} onChange={this.handleChange} type="radio"/>
                  <OptionLabel>No</OptionLabel>
                  <RadioButton name="byGender" checked={this.state.byGender === "no"} value={"no"} onChange={this.handleChange} type="radio"/>
                </OptionRow>
              </Option>
              <Option>
                <Notice className='rubik'>Press the "Avoid" button to choose which students you would prefer not to be put in the same group as a particular student</Notice>
              </Option>
              <Option>
                <OptionTitle>Number of groups:</OptionTitle>
                  <OptionRow>
                    <NumGroups name="numGroups" value={this.state.numGroups} onChange={this.handleChange} type="text"></NumGroups>
                  </OptionRow>
              </Option>
              </Column>
            </Row>
            <Button onClick={this.state.byGender === "yes" ? () => this.makeGroupsByGender() : () => this.makeGroups()}>Make Groups</Button>
            </>
          : 
          <>
            {this.state.step === 3 ?
            <>
              {this.mapGroups()}
              <Button onClick={() => console.log(this.state.groups)}>Test</Button>
            </>
            :
            <>
            <h3>Choose students to be avoided by {this.state.currentStudent}</h3>
              {this.mapStudentsToAvoid()}
              <>
                Currently avoiding: {this.avoidList()}
              </>
              <Button onClick={() => this.updateAvoidInfo()}>
                Confirm
              </Button>
            </>}
          </>}
        </>
        }
      </Main>
      : 
      <div>
        <h3>{this.state.error}</h3>
        <button onClick={() => {this.setState({error: ""})}}>Go back</button>
      </div>}
    </>
    );
  }
  }
  
export default App;
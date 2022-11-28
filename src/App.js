import {Main, Info, TextBox, Button, Column, Name, OptionTitle, NumGroups, GroupName, Notice,
  Row, Student, Gender, GenderCont, ToAvoidLogo, Title, ChangeLogo, ToAvoid, ChangeCont, OptionLabel, Change, Member, GenderLogo,
  StudentCont, Option, OptionRow, AvoidStudent, AvoidCont, InfoSection, Group, RadioButton} from './styles'
import React from "react";
import {changeGroupFunc, makeGroupsByGenderMemFunc, makeGroupsFunc, makeGroupsByGenderFunc} from './GroupHandling.js';
import './fonts.css';

// Make it so they can choose by students per group NEED TO FINISH
// Can export groups as a jpg
// Can add divisions to group or labels to certain members
// Make it so that moving out of bounds makes a new group

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      students: "",
      nameArray: ["Jack", "Jane", "Sarah", "Frank", "Keith", "Rachel", "Melvin"],
      studentInfo: [["Jack", "m", [""]], ["Jane", "f", []], ["Sarah", "f", [""]], ["Frank", "m", []], ["Keith", "m", []], ["Rachel", "f", []], ["Melvin", "m", []]],
      step: 2,
      groups: [["Melvin", "Jane", "Sarah", "Frank"], ["Rachel", "Keith", "Jack"]],
      byGender: "no",
      numGroups: 2,
      student1: ["", 0],
      error: "",
      errorCode: "",
      currentStudent: "", 
      toAvoid: [],
      chooseByNumGroups: true
    }
  }


  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState({[name]: value, errorCode: ""})
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
    this.state.studentInfo.forEach((student, index) => {
      if(student[0] === name) {
        this.setState({toAvoid: student[2]})
      }
    })
    if(name === this.state.currentStudent) {
      this.setState({step: 4})
    }
    else {
      this.state.studentInfo.forEach((student, index) => {
        if(student[0] === name) {
          this.setState({step: 4, currentStudent: name, toAvoid: student[2]})
        }
      })
    }
  }

  addStudents = () => { // turn initial name list into student name array and student info array
    let studentNames = this.state.students.split(/\r?\n/)
      if(studentNames.length < 4) {
        this.setState({error: "Please enter at least 4 names", errorCode: "4"})
        return
      }
      if(studentNames.length !== new Set(studentNames).size) {
        this.setState({error: "Please ensure all names are different", errorCode: "unique"})
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

  makeGroups = () => {
    let output = []
    if(this.state.chooseByNumGroups) { 
      output = makeGroupsFunc(this.state.numGroups, this.state.studentInfo, false)
    }
    else {
      output = makeGroupsFunc(this.state.numGroups, this.state.studentInfo, true)
    }
    while (!this.checkGroups(output)) {
      this.makeGroups()
    }
    this.setState({groups: output, step: 3})
  }

  makeGroupsByGender = () => {
    let output = []
    if(this.state.chooseByNumGroups) {
      output = makeGroupsByGenderFunc(this.state.numGroups, this.state.studentInfo)
    }
    else {
      output = makeGroupsByGenderMemFunc(this.state.numGroups, this.state.studentInfo)
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
    this.setState({studentInfo: studentInfoCopy})
  }

  changeGroup = (direction, student, groupNum) => {
    let newGroups = changeGroupFunc(direction, student, groupNum, this.state.groups)
    this.setState({groups: newGroups, student1: ["", 0]})
  } 

  
  mapStudents = () => { 
  return this.state.studentInfo.map((student, key) => 
  <Student>
    <Name className='anton'>{student[0]}</Name>
    <GenderCont>
      <Gender selected={this.state.studentInfo[key][1] === "m"} gender="m" name={key} onClick={() => this.changeGender(key, "m")} value="m"><GenderLogo src='/male.png'/></Gender>
      <Gender selected={this.state.studentInfo[key][1] === "f"} gender="f" name={key} onClick={() => this.changeGender(key, "f")} value="f"><GenderLogo src='/female.png'/></Gender>
    </GenderCont>
    <ToAvoid className='anton' onClick={() => this.loadAvoidPage(student[0])}>
      <ToAvoidLogo src="/avoid.png" />
    </ToAvoid>
  </Student>)
  }

  mapStudentsToAvoid = () => {
    return this.state.nameArray.map ((student) => 
    <>
    {this.state.currentStudent !== student ?
      <AvoidStudent className='anton' selected={this.state.toAvoid.includes(student)} onClick={() => this.addToAvoid(student)}>Avoid {student}</AvoidStudent>
    : <></>}
    </>
    )
  }

  mapGroups = () => {
    return this.state.groups.map((group, groupNum) => 
      <Group hide={group.length === 0}>
        <GroupName>Group {groupNum + 1}</GroupName>
          <StudentCont>
            {group.map((student) => 
            <Member className='anton'>{student}
              <ChangeCont>
                <Change value={student} onClick={() => this.switchStudents(student, groupNum)}>
                  <ChangeLogo src={'/change.png'} background={student === this.state.student1[0]}/></Change>
                <Change value={student} onClick={() => this.changeGroup("up", student, groupNum)}><ChangeLogo src={'/upArrow.png'}/></Change>
                <Change value={student} onClick={() => this.changeGroup("down", student, groupNum)}><ChangeLogo src={'/downArrow.png'}/></Change>
              </ChangeCont>
            </Member>
            )}
          </StudentCont>
      </Group>
    )
  }

  mapAvoidList = () => {
    return this.state.toAvoid.map((student) => 
      <p>{student}</p>
    )
  }
  
  render() {
  
  return (
      <Main>
        <Title className='title'>Group Picker</Title>
        {this.state.step === 1 ?
        <Row>
          <TextBox name="students" value={this.state.students} onChange={this.handleChange}/>
          <Column>
            <Info className='rubik'>Enter names then press confirm</Info>
            <Button className='anton' onClick={this.addStudents}>Confirm</Button>
            <Info className='rubik'><InfoSection>1 name per line</InfoSection><p></p><InfoSection selected={this.state.errorCode === "4"}>Minimum of 4 names</InfoSection><p></p><InfoSection selected={this.state.errorCode === "unique"}>No repeated names</InfoSection></Info>
          </Column>
        </Row>
        :
        <>
        {this.state.step === 2 ?
        <>
            <Row>
              <Column>{this.mapStudents()}</Column>
              <Column>
              <Option>
                <OptionTitle>Split by gender:</OptionTitle>
                <OptionRow>
                  <OptionLabel>Yes</OptionLabel>
                  <RadioButton name="byGender" checked={this.state.byGender === "yes"} value={"yes"} onChange={this.handleChange} type="radio"/>
                  <OptionLabel>No</OptionLabel>
                  <RadioButton name="byGender" checked={this.state.byGender === "no"} value={"no"} onChange={this.handleChange} type="radio"/>
                </OptionRow>
              </Option>
              <Option>
                <Notice className='anton'>Press the hand icon to choose which students you would prefer not to be put in the same group as a particular student</Notice>
              </Option>
              <>
              {this.state.chooseByNumGroups ?
                <Option>
                  <OptionTitle>Number of groups:</OptionTitle>
                    <OptionRow>
                      <NumGroups name="numGroups" value={this.state.numGroups} onChange={this.handleChange} type="text"></NumGroups>
                    </OptionRow>
                    <button onClick={() => this.setState({chooseByNumGroups: false})}>Choose by number per group</button>
                </Option> :
                <Option>
                <OptionTitle>Members per group:</OptionTitle>
                  <OptionRow>
                    <NumGroups name="numGroups" value={this.state.numGroups} onChange={this.handleChange} type="text"></NumGroups>
                  </OptionRow>
                  <button onClick={() => this.setState({chooseByNumGroups: true})}>Choose by number per group</button>
              </Option>
                }
              </>
              </Column>
            </Row>
            <Button className='anton' onClick={this.state.byGender === "yes" ? () => this.makeGroupsByGender() : () => this.makeGroups()}>Make Groups</Button>
            </>
          : 
          <>
            {this.state.step === 3 ?
            <>
              {this.mapGroups()}
              <Button className='anton' onClick={() => this.setState({step: 2})}>Back</Button>
            </>
            :
            <>
            <h3>Choose students to be avoided by {this.state.currentStudent}</h3>
              <AvoidCont>
              {this.mapStudentsToAvoid()}
              </AvoidCont>
              <h3>
                Currently avoiding: {this.mapAvoidList()}
              </h3>
              <Button className='anton' onClick={() => this.updateAvoidInfo()}>
                Confirm
              </Button>
            </>}
          </>}
        </>
        }
      </Main>
    );
  }
  }
  
export default App;
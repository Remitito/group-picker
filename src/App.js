import {Main, Info, TextBox, Button, Column, Name, OptionTitle, NumGroups, GroupName, Notice,
  Row, Student, Gender, GenderCont, GroupButton, ToAvoidLogo, Title, ChangeLogo, ToAvoid, ChangeCont, OptionLabel, Change, Member, GenderLogo,
  StudentCont, OptionRow, AvoidStudent, AvoidCont, InfoSection, Group, GroupCont} from './styles'
import React from "react";
import html2canvas from 'html2canvas';
import {changeGroupFunc, makeGroupsByGenderMemFunc, makeGroupsFunc, makeGroupsByGenderFunc} from './GroupHandling.js';
import './fonts.css';
import './index.css'
import jsPDF from 'jspdf';
// ["Bruce", "m", []], ["Steve", "m", []], ["Ryan", "m", []], ["Sally", "f", []], ["Polly", "f", []], ["Rick", "m", []]

// Check by group members function (if there are leftover students they should be added to make a bigger group, not put on their own)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      students: "",
      nameArray: ["Jack", "Jane", "Sarah", "Frank", "Keith", "Rachel", "Melvin"],
      studentInfo: [["Jack", "m", [""]], ["Jane", "f", []], ["Sarah", "f", [""]], ["Frank", "m", []], ["Keith", "m", []], ["Rachel", "f", []], ["Melvin", "m", []]],
      step: 2,
      groups: [["Melvin", "Jane", "Sarah", "Frank"], ["Rachel", "Keith", "Jack"]],
      byGender: false,
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

  changeByGender = (e) => {
    this.setState({byGender: e.target.checked})
  }

  doCapture = () => {
    const input = document.getElementById("groupCont")
    html2canvas(input, {logging: true, letterRendering: 1, useCORS: true}).then(canvas => {
      const imgWidth = 200;
      const imgHeight = canvas.height * imgWidth / canvas.width
      const imgData = canvas.toDataURL('img/png')
      let groupsString = "\n \n \n "
      for(let i = 0; i < this.state.groups.length; i++) {
        let currentString = "\n \n Group " + (i + 1) + ": "
        for(let e = 0; e < this.state.groups[i].length; e++) {
          currentString += this.state.groups[i][e] + " "
        }
        groupsString += currentString
      }
      const pdf = new jsPDF()
      pdf.text(groupsString, 1, 1)
      // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('groups.pdf')
    })
  }

  addToAvoid = (name) => { // add to current avoid list
    let toAvoidCopy = this.state.toAvoid
    if(toAvoidCopy.includes(name)) {
      toAvoidCopy.splice(toAvoidCopy.indexOf(name), 1)
    }
    else {
      toAvoidCopy.push(name)
    }
    this.setState({toAvoid: toAvoidCopy, errorCode: ""})
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
    this.setState({studentInfo: studentInfoCopy, step: 2, errorCode: ""})
  } 

  loadAvoidPage = (name) => { // show avoid list page
    this.state.studentInfo.forEach((student, index) => {
      if(student[0] === name) {
        this.setState({toAvoid: student[2], errorCode: ""})
      }
    })
    if(name === this.state.currentStudent) {
      this.setState({step: 4, errorCode: ""})
    }
    else {
      this.state.studentInfo.forEach((student, index) => {
        if(student[0] === name) {
          this.setState({step: 4, currentStudent: name, toAvoid: student[2], errorCode: ""})
        }
      })
    }
  }

  addStudents = () => { // turn initial name list into student name array and student info array
    if(this.state.students.length === 0) {
      this.setState({step: 2})
      return
    }
    let removeEmptyLines = this.state.students.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm,"")
    let studentNames = removeEmptyLines.split(/\r?\n/)
    if(studentNames.length !== new Set(studentNames).size) {
      this.setState({error: "Please ensure all names are different", errorCode: "unique"})
      return
    }
    for (let i = 0; i < studentNames.length; i++) {
      if(this.state.nameArray.includes(studentNames[i])) {
        this.setState({error: "Please ensure all names are different", errorCode: "unique"})
        return
      }
      let newStudentInfo = this.state.studentInfo
      let newNameArray = this.state.nameArray
      studentNames.forEach((name) => {
        newStudentInfo.push([name, "", []])
        newNameArray.push(name)
    })
    this.setState({step: 2, students: "", studentInfo: newStudentInfo, errorCode: "",
      numGroups: (Math.round(studentNames.length / 3)),
      nameArray: newNameArray})    
    }
  }

  checkGroups = (groupList) => { // check group members arent on avoid list
    groupList.forEach((group, groupNum) => {
      group.forEach((member) => {
        for(let i = 0; i < this.state.studentInfo.length; i++) {
          if(this.state.studentInfo[i][0] === member) {
            let avoidList = this.state.studentInfo[i][2]
            for(let e = 0; e < group.length; e++) {
              if(avoidList.includes(group[e])) {
                return false
              }
            }
          }
        }
      })
    })
    return true
  }

  removeStudent = (studentToRemove) => {
    let newStudentInfo = this.state.studentInfo
    let newStudents = this.state.students
    let newNameArray = this.state.nameArray
    this.state.studentInfo.forEach((student, index) => {
      if(student[0] === studentToRemove) {
        newStudentInfo.splice(index, 1)
        newStudents = newStudents.replace(`${studentToRemove}\n`, "")
        newNameArray.splice(index, 1)
      }
    })
    this.setState({students: newStudents, nameArray: newNameArray, studentInfo: newStudentInfo})
  }

  makeGroups = () => {
    console.log(this.state.groups)
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
    this.setState({groups: output, step: 3, errorCode: ""})
  }

  makeGroupsByGender = () => {
    let success = true
    this.state.studentInfo.forEach((student) => { // if no gender assigned
      if(student[1].length === 0) {
        this.setState({error: "Please assign a gender to each group member or change the 'Split by gender' option", errorCode: "gender"})
        success = false
      }
    })
    if(success) {
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
      this.setState({groups: output, step: 3, errorCode: ""})
    }
  }

  switchStudents = (name, groupNum) => {
    if(this.state.student1[0].length === 0) {
      this.setState({student1: [name, groupNum], errorCode: ""})
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
      this.setState({groups: groupsCopy, student1: ["", 0], errorCode: ""})
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
    this.setState({studentInfo: studentInfoCopy, errorCode: ""})
  }

  changeGroup = (direction, student, groupNum) => {
    let newGroups = changeGroupFunc(direction, student, groupNum, this.state.groups)
    this.setState({groups: newGroups, student1: ["", 0], errorCode: ""})
  }

  goBack = () => {
    if(window.confirm("This will delete the current groups. Are you sure?")) {
      this.setState({step: 2, errorCode: ""})
    }
    else {
      return
    }
  }

  
  mapStudents = () => { 
  return this.state.studentInfo.map((student, key) => 
  <Student>
    <Name className='openSans'>{student[0]}</Name>
    <GenderCont>
      <Gender selected={this.state.studentInfo[key][1] === "m"} gender="m" name={key} onClick={() => this.changeGender(key, "m")} value="m"><GenderLogo src={require('./images//male.png')}/></Gender>
      <Gender selected={this.state.studentInfo[key][1] === "f"} gender="f" name={key} onClick={() => this.changeGender(key, "f")} value="f"><GenderLogo src={require('./images//female.png')}/></Gender>
    </GenderCont>
    <ToAvoid className='openSans' onClick={() => this.loadAvoidPage(student[0])}>
      <ToAvoidLogo src={require("./images/avoid.png")} />
    </ToAvoid>
    <ToAvoid className='openSans' onClick={() => this.removeStudent(student[0])}>
      <ToAvoidLogo src={require("./images/bin.png")} />
    </ToAvoid>
  </Student>)
  }

  mapStudentsToAvoid = () => {
    return this.state.nameArray.map ((student) => 
    <>
    {this.state.currentStudent !== student ?
      <AvoidStudent className='openSans' selected={this.state.toAvoid.includes(student)} onClick={() => this.addToAvoid(student)}>Avoid {student}</AvoidStudent>
    : <></>}
    </>
    )
  }

  mapGroups = () => {
    return this.state.groups.map((group, groupNum) => 
      <Group hide={group.length === 0}>
        <GroupName className='nerko'>Group {groupNum + 1}</GroupName>
          <StudentCont>
            {group.map((student) => 
            <Member className='openSans'>{student}
              <ChangeCont>
                <Change value={student} onClick={() => this.switchStudents(student, groupNum)}>
                  <ChangeLogo src={require('./images//change.png')} background={student === this.state.student1[0]}/></Change>
                <Change value={student} onClick={() => this.changeGroup("down", student, groupNum)}><ChangeLogo src={require('./images//upArrow.png')}/></Change>
                <Change value={student} onClick={() => this.changeGroup("up", student, groupNum)}><ChangeLogo src={require('./images//downArrow.png')}/></Change>
              </ChangeCont>
            </Member>
            )}
          </StudentCont>
      </Group>
    )
  }

  mapAvoidList = () => {
    return this.state.toAvoid.map((student) => 
      <label className='openSans'><br/>{student}</label>
      
    )
  }

  clear = () => {
    let emptyGroups = []
    let emptyStudentInfo = []
    let emptyNameArray = []
    this.setState({studentInfo: emptyStudentInfo, nameArray: emptyNameArray, groups: emptyGroups, currentStudent: "", students: ""})
  }
  
  render() {
  
  return (
    <div style={{margin: "auto", maxWidth: "500px", marginTop: "50px"}}>
      <Main>
        <Title className='openSans'>Group Picker</Title>
        {this.state.step === 1 ?
        <Row>
          <Column>
            <TextBox placeholder="Enter names here" name="students" value={this.state.students} onChange={this.handleChange}/>
            <Button mobile="visible" hideInitially className='openSans' onClick={this.addStudents}>Confirm</Button>
          </Column>
          <Column>
            <Info className='openSans'><InfoSection selected={this.state.errorCode === "unique" ? true : false}>No repeated names</InfoSection><p></p> One name per line</Info>
            <Button mobile="hidden" className='openSans' onClick={this.addStudents}>Confirm</Button>
          </Column>
        </Row>
        :
        <>
        {this.state.step === 2 ?
        <>
            <Row>
              <Column>
              <Row bottom="5px">
                <Button size="1rem" onClick={() => {this.clear()}}>Clear</Button>
                <Button size="1rem" onClick={() => {this.setState({step: 1})}}>Add Names</Button>
                <Button size="1rem" className='openSans' onClick={this.state.byGender === true ? () => this.makeGroupsByGender() : () => this.makeGroups()}>Make Groups</Button>
              </Row>
              {this.mapStudents()}
              <Row style={{marginLeft: "5%"}}>{this.state.nameArray.length === 0 ? <Notice style={{margin: "auto", fontSize: "0.9rem", marginBottom: "5px"}} error>Add names to get started</Notice> : <></>}</Row>
              </Column>
              <Column>
              {this.state.errorCode !== "gender" ?
                <Notice className='openSans'>Press the hand icon to choose which people you would prefer not to be put in the same group as a particular person</Notice>
              :
                <Notice error className='openSans'>{this.state.error}</Notice>
              }
                <OptionRow>
                  <OptionTitle className='openSans'>Split by gender:</OptionTitle>
                  <label className="switch">
                    <input checked={this.state.byGender} 
                    onClick={this.changeByGender} type="checkbox"/>
                    <span className="slider round"></span>
                  </label>
                </OptionRow>
              <>
              {this.state.chooseByNumGroups ?
                <>
                    <OptionRow>
                    <OptionTitle className='openSans'>Number of groups:</OptionTitle>
                      <NumGroups name="numGroups" type="number" min="1" value={this.state.numGroups} onChange={this.handleChange}></NumGroups>
                    </OptionRow>
                    <OptionRow>
                      <GroupButton className='openSans' onClick={() => this.setState({chooseByNumGroups: false, errorCode: ""})}>Choose by members per group</GroupButton>
                    </OptionRow>
                </> :
                <>
                  <OptionRow>
                    <OptionTitle className='openSans'>Members per group:</OptionTitle>
                    <NumGroups name="numGroups" type="number" min="1" value={this.state.numGroups} onChange={this.handleChange}></NumGroups>
                  </OptionRow>
                    <OptionRow>
                      <GroupButton className='openSans' onClick={() => this.setState({chooseByNumGroups: true, errorCode: ""})}>Choose by number of groups</GroupButton>
                    </OptionRow>
              </>
                }
              </>
              </Column>
            </Row>
            </>
          : 
          <>
            {this.state.step === 3 ?
            <>
              <div style={{"backgroundColor": "#fcde67"}} id="groupCont">
              {this.state.groups[0].length === 0 ? <div style={{marginBottom: "20px"}}>
                <Notice error className='openSans'>You need to add some names first!</Notice>
                </div> : 
                <>
              <GroupCont>
                {this.mapGroups()}
              </GroupCont>
              </>
            }
              </div>
              <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                <Button className='openSans' onClick={() => this.goBack()}>Back</Button>
                <Button className='openSans' onClick={() => this.doCapture()}>Save as PDF</Button>
              </div>
            </>
            :
            <>
            {this.state.nameArray.length > 1 ?
              <label style={{marginBottom: "3%"}} className='openSans'>Choose people to be avoided by {this.state.currentStudent}:</label>
              : <Notice error style={{margin: "auto"}} className='openSans'>{this.state.currentStudent} is the only member so there is nobody to avoid!</Notice>}
              <AvoidCont>
              {this.mapStudentsToAvoid()}
              </AvoidCont>
              {this.state.toAvoid.length > 0 ?
                <label style={{marginTop: "3%", marginBottom: "3px"}} className='openSans'>
                  Currently avoiding: {this.mapAvoidList()}
                </label>
                :
                <label style={{marginTop: "3%", marginBottom: "3px"}} className='openSans'>
                  Currently avoiding nobody
                </label>
              }
              <Button className='openSans' onClick={() => this.updateAvoidInfo()}>
                Confirm
              </Button>
            </>}
          </>}
        </>
        }
      </Main>
      </div>
    );
  }
  }
  
export default App;
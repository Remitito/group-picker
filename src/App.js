import {Main, Info, TextBox, Button, Column, Name, OptionTitle, NumGroups, GroupName,
  Row, Student, Gender, GenderCont, OptionLabel, Important, Change, Member, StudentCont, Option, OptionRow, Group, ByGender} from './styles'
import { IoManSharp, IoWomanSharp} from "react-icons/io5"; 
import { IconStyleMan, IconStyleWoman } from './styles';
import React, {useEffect, useState} from "react";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      students: "",
      nameArray: ["Jack", "Jane", "Sarah", "Frank", "Keith", "Rachel", "Melvin"],
      studentInfo: [["Jack", "m"], ["Jane", "f"], ["Sarah", "f"], ["Frank", "m"], ["Keith", "m"], ["Rachel", "f"], ["Melvin", "m"]],
      step: 1,
      groups: [["Jack", "Jane", "Sarah", "Frank"], ["Keith", "Rachel", "Melvin"]],
      byGender: "no",
      numGroups: 21,
      student1: ["", 0],
      error: ""
    }
  }
  
  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState({[name]: value})
  }

  addStudents = () => {
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
  
  changeGender = (e) => {
    let arrayCopy = this.state.studentInfo
    arrayCopy[e.target.name][1] = e.target.value
    this.setState({studentInfo: arrayCopy})
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

  makeGroupsByGender = (e) => {
    // Add group arrays
    let output = []
    for (let i = 0; i < this.state.numGroups; i++) {
      output.push([])
    }
    // Split male/female
    let male = []
    let female = []
    this.state.studentInfo.forEach(student => {
      if(student[1] == "m") {
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

    this.setState({groups: output, step: 3})
  }

  makeGroups = (e) => {
    // Add group arrays
    let output = []
    for (let i = 0; i < this.state.numGroups; i++) {
      output.push([])
    }
    // Add students' names
    let namesShuffled = this.randomize(this.state.nameArray)
    while (namesShuffled.length > 0) {
      for (let i = 0; i < this.state.numGroups; i++) {
        if (namesShuffled.length > 0) {
          let name = namesShuffled.pop()
          output[i].push(name)
        }
      }
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
  
  mapStudents = () => { 
  return this.state.studentInfo.map((student, key) => 
  <Student>
    <Name>{student[0]}</Name>
    <GenderCont>
      <Gender selected={this.state.studentInfo[key][1] == "m"} gender="m" name={key} value="m" onClick={(e) => this.changeGender(e)}>Male</Gender>
      <Gender selected={this.state.studentInfo[key][1] == "f"} gender="f" name={key} value="f" onClick={(e) => this.changeGender(e)}>Female</Gender>
    </GenderCont>
  </Student>)
  }

  mapGroups = () => {
    return this.state.groups.map((group, groupNum) => 
      <Group>
        <GroupName>Group {groupNum + 1}</GroupName>
          <StudentCont>
            {group.map((student) => 
            <Member>{student}
              <Change value={student} onClick={() => this.switchStudents(student, groupNum)}>C</Change>
            </Member>
            )}
          </StudentCont>
      </Group>
    )
  }
  
  render() {
  
  return (
    <>
    {this.state.error.length === 0 ?
      <Main>
        <h1>Group Picker</h1>
        {this.state.step === 1 ?
        <>
          <Info>Copy and paste the names below <Important>(each name on a new line)</Important> to get started!</Info>
          <TextBox name="students" value={this.state.students} onChange={this.handleChange}/>
          <Button onClick={this.addStudents}>Add Students</Button>
        </>
        :
        <>
        {this.state.step == 2 ?
        <>
            <Row>
              <Column>{this.mapStudents()}</Column>
              <Column>
              <Option>
                <OptionTitle>Select by gender:</OptionTitle>
                <OptionRow>
                  <OptionLabel>Yes</OptionLabel>
                  <ByGender name="byGender" checked={this.state.byGender == "yes"} value={"yes"} onChange={this.handleChange} type="radio"/>
                  <OptionLabel>No</OptionLabel>
                  <ByGender name="byGender" checked={this.state.byGender == "no"} value={"no"} onChange={this.handleChange} type="radio"/>
                </OptionRow>
              </Option>
              <Option>
                <OptionTitle>Number of groups:</OptionTitle>
                  <OptionRow>
                    <NumGroups name="numGroups" value={this.state.numGroups} onChange={this.handleChange} type="text"></NumGroups>
                  </OptionRow>
              </Option>
              </Column>
            </Row>
            <Button onClick={this.state.byGender === "yes" ? this.makeGroupsByGender : this.makeGroups}>Make Groups</Button>
            </>
          : 
          <>
          {this.mapGroups()}
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
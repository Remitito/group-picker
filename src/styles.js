import styled from 'styled-components'

export const Main = styled.div `
    display: flex;
    width: 600px;
    flex-direction: column;
    text-align: center;
`

export const Info = styled.p `
    font-size: larger;
`

export const Student = styled.div `
    display: flex;
    height: 40px;
    line-height: 2;
    flex-direction: row;
    border-style: solid;
`

export const GenderCont = styled.div `
    display: flex;
    width: 50%;
    flex-direction: row;
`

export const Option = styled.div `
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`

export const OptionTitle = styled.h4 `
    
`

export const OptionLabel = styled.label `

`

export const ByGender = styled.input `

`

export const NumGroups = styled.input `
    width: 30%;
    height: 40px;
    font-size: xx-large;
    margin: auto;
    text-align: center;
`

export const Gender = styled.button `
    border-style: solid;
    width: 50%;
    color: ${({gender}) => gender == "m" ? 'red' : 'purple'};
    background-color: ${({selected}) => selected ? 'blue' : ''};
`
export const Name = styled.label `
    width: 40%;
`

export const TextBox = styled.textarea `
    min-height: 300px;
    resize: vertical;
`

export const Button = styled.button `
    width: 40%;
    margin: auto;
    height: 30px;
`

export const Row = styled.div `
    display: flex;
    flex-direction: row;
`

export const OptionRow = styled.div `
    display: flex;
    flex-direction: row;
    margin: auto;
`

export const Column = styled.div `
    display: flex;
    min-height: 300px;
    flex-direction: column;
    width: 50%;
`

export const Member = styled.div `
    display: flex;
    height: 40px;
    line-height: 2;
    flex-direction: row;
    width: 25%;
    border-style: solid;
    display:table-cell;
`

export const Group = styled.div `
    display: flex;
    width: 500px;
    flex-direction: row;
    border-style: solid;
`

export const GroupName = styled.label `
    width: 20%;
    line-height: 3;
`

export const StudentCont = styled.div `
    display: flex;
    width: 80%;
    flex-direction: row;
`

export const Change = styled.button `

`


// not a styled component, used for inline styling
export const IconStyleMan = {
    color: "white",
    backgroundColor: "red" 
}

export const IconStyleWoman = {
    color: "white",
    backgroundColor: "pink",
}
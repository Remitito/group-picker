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

export const Notice = styled.label `
    max-width: 80%;
    margin: auto;
    background-color: #ef9273;
    font-size: 1.2rem;
    border-radius: 2rem;
    padding: 10px;
`

export const RadioButton = styled.input `

`

export const ToAvoid = styled.button `
    background-color: red;
    color: white;
` 

export const NumGroups = styled.input `
    width: 30%;
    height: 40px;
    font-size: xx-large;
    margin: auto;
    text-align: center;
`

export const GenderLogo = styled.img `
    height: 80%;
    margin-top: 5%;
    width: 20px;
`

export const Gender = styled.a `
    width: 50%;
    background-color: ${({selected}) => selected ? 'lightblue' : 'white'};
`
export const Name = styled.label `
    width: 40%;
`

export const TextBox = styled.textarea `
    min-height: 300px;
    resize: vertical;
`

export const Title = styled.h1 `
   

`

export const Button = styled.button `
    width: 40%;
    margin: auto;
    margin-top: 10px;
    background-color: #ef9273;
    font-size: 1.5rem;
    height: 70px;
    border-radius: 2rem;
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
    padding: 10px;
    flex-direction: row;
    margin: auto;
    display:table-cell;
`

export const Group = styled.div `
    display: flex;
    width: ${({width}) => width};
    margin: auto;
    margin-bottom: 30px;
    border-style: solid;
`

export const GroupName = styled.label `
    width: 30%;
    margin: auto;
`

export const Important = styled.label `
    font-weight: bolder;
    color: red;
`

export const StudentCont = styled.div `
    display: flex;
    width: 80%;
    flex-direction: row;
`

export const Change = styled.button `

`

export const ChangeCont = styled.div `
    display: flex;
    flex-direction: row;
`


// not a styled component, used for inline styling
export const IconStyleMan = {
    color: "white",
    backgroundColor: "red", 
    height: "100%"
}

export const IconStyleWoman = {
    color: "white",
    backgroundColor: "pink",
    height: "100%"
}
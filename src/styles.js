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
    padding: 5px;
    margin-bottom: 2px;
    border-radius: 1rem;
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
    background-color: #5bccf6;
    font-size: 1.2rem;
    border-radius: 2rem;
    padding: 10px;
`

export const RadioButton = styled.input `

`

export const ToAvoid = styled.a `
    background-color: #fcde67;
` 
export const ToAvoidLogo = styled.img `
    height: 40px;
    width: 40px;
    margin-left: 5px;
    line-height: 1;
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
    background-color: ${({selected}) => selected ? '#5bccf6' : '#fcde67'};
`
export const Name = styled.label `
    width: 40%;
`

export const TextBox = styled.textarea `
    min-height: 300px;
    resize: vertical;
`

export const Title = styled.h1 `
    margin-bottom: 50px;
`

export const Button = styled.button `
    width: 40%;
    margin: auto;
    margin-top: 10px;
    background-color: #5bccf6;
    font-size: 1.5rem;
    height: 70px;
    border-radius: 2rem;
`

export const Row = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    width: 45%;
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
    margin: auto;
    padding: 20px;
    visibility: ${({hide}) => hide ? 'hidden' : ''};
    margin-bottom: 30px;
    border-style: solid;
    border-radius: 1rem;
`

export const GroupName = styled.label `
    margin: auto;
`

export const Important = styled.label `
    font-weight: bolder;
    color: red;
`

export const StudentCont = styled.div `
    display: flex;
    flex-direction: row;
`

export const Change = styled.a `

`

export const ChangeLogo = styled.img `
    height: 20px;
    padding: 5px;
    background-color: ${({background}) => background ? 'red' : ''};
    &:hover {
        background-color: #ef9273;
    }
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
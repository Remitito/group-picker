import styled from 'styled-components'

export const Main = styled.div `
    display: flex;
    width: 600px;
    flex-direction: column;
    text-align: center;
`

export const Info = styled.div `
    font-size: larger;
    background-color: #5bccf6;
    padding: 10px;
    border: solid;
    border-radius: 1rem;
    margin-bottom: 5px;
`

export const InfoSection = styled.label `
    background-color: ${({selected}) => selected ? '#fcde67' : '#5bccf6'};
    border-radius: 1rem;
    padding: 10px;
    font-weight: ${({selected}) => selected ? 'bolder' : ''};
    font-size: ${({selected}) => selected ? '1.3rem' : ''};
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


export const OptionLabel = styled.label `
`

export const Notice = styled.label `
    max-width: 80%;
    margin: auto;
    background-color: #5bccf6;
    font-size: 1.2rem;
    border: solid;
    border-radius: 2rem;
    padding: 10px;
`

export const RadioButton = styled.input `

`

export const ToAvoid = styled.a `
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: ${({selected}) => selected ? '#5bccf6' : '#fcde67'};
    &:hover {
        background-color: #ef9273;
    }
` 

export const ToAvoidLogo = styled.img `
    height: 100%;
    width: 100%;
    line-height: 1;
` 

export const YesCont = styled.a `
    border-radius: 60%;
    border: solid;
    width: 30%;
    margin: 5px;
    background-color: ${({selected}) => selected ? '#39e600' : '#fcde67'};
    &:hover {
        background-color: #39e600;
    }
`

export const YesLogo = styled.img `
    height: 80%;
    padding-top: 5%;
    width: 80%;
    vertical-align: middle;
    margin: auto;
`

export const NoCont = styled.a `
    border-radius: 60%;
    border: solid;
    margin: 5px;
    width: 30%;
    background-color: ${({selected}) => selected ? '#ff3333' : '#fcde67'};
    &:hover {
        background-color: #ff3333;
    }
`

export const NoLogo = styled.img `
    height: 80%;
    padding-top: 5%;
    width: 80%;
    vertical-align: middle;
    margin: auto;
`

export const AvoidStudent = styled.button `
    padding: 10px;
    margin-bottom: 5px;
    width: 200px;
    font-size: 15px;
    border: solid;
    border-radius: 2rem;
    border-width: 5px;
    border-color: black;
    background-color: ${({selected}) => selected ? '#5bccf6' : '#fcde67'};
    &:hover {
        background-color: #ef9273;
    }
`

export const AvoidCont = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 400px;
`



export const GenderLogo = styled.img `
    height: 80%;
    margin-top: 5%;
    width: 20px;
    
`

export const Gender = styled.a `
    width: 40%;
    border-radius: 50%;
    background-color: ${({selected}) => selected ? '#5bccf6' : '#fcde67'};
    &:hover {
        background-color: #ef9273;
    }
`
export const Name = styled.label `
    width: 40%;
`


export const TextBox = styled.textarea `
    min-height: 300px;
    resize: vertical;
    width: 300px;
    border-radius: 0.5rem;
`

export const Title = styled.h1 `
    margin-bottom: 20px;
`

export const Button = styled.button `
    width: 40%;
    margin: auto;
    margin-top: 10px;
    background-color: #5bccf6;
    border: solid;
    font-size: 1.5rem;
    height: 70px;
    border-radius: 2rem;
    &:hover {
        background-color: #ef9273;
    }
`

export const Row = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const OptionRow = styled.div `
    display: flex;
    flex-direction: row;
    height: 100px;
    margin: auto;
`

export const GroupButton = styled.button `
    margin: auto;
    height: 65%;
    width: 60%;   
`

export const NumGroups = styled.input `
    width: 25%;
    font-size: xx-large;
    margin: 7%;
    text-align: center;
`

export const OptionTitle = styled.h4 `
    width: 30%;
`

export const Column = styled.div `
    display: flex;
    min-height: 300px;
    flex-direction: column;
    width: 45%;
`


export const Member = styled.div `
    display: flex;
    padding: 5px 5px 5px 5px;
    flex-direction: row;
    background-color: #fcde67;
    border-radius: 3rem;
    border: solid;
    margin: auto;
    font-size: 1.1rem;
    display:table-cell;
`



export const Group = styled.div `
    margin: auto;
    padding: 20px;
    background-color: #5bccf6;
    visibility: ${({hide}) => hide ? 'hidden' : ''};
    
    border-style: solid;
    border-radius: 1rem;
`

export const GroupName = styled.label `
    font-size: 1.5rem;
`

export const StudentCont = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 600px;
`

export const Change = styled.a `
    
`

export const ChangeLogo = styled.img `
    height: 20px;
    padding: 5px;
    border-radius: 50%;
    background-color: ${({background}) => background ? 'red' : ''};
    &:hover {
        background-color: #ef9273;
    }
`

export const ChangeCont = styled.div `
    display: flex;
    flex-direction: row;
`
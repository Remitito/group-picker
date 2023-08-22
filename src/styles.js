import styled from 'styled-components'

export const Main = styled.div `
    display: flex;
    filter: none;
    width: 800px;
    background-color: #fcde67;
    flex-direction: column;
    text-align: center;
    color: black;
    margin: auto;
    margin-top: 15px;
    padding: 50px;
    @media screen and (max-width: 800px) {
        width: 500px;
    }

`

export const Info = styled.div `
    margin-top: 40px;
    font-size: large;
    background-color: #5bccf6;
    padding: 20px;
    border-radius: 1rem;
    margin-bottom: 20px;
`

export const InfoSection = styled.label `
    background-color: ${({selected}) => selected ? 'red' : '#5bccf6'};
    color: ${({selected}) => selected ? 'white' : 'black'};
    font-weight: ${({selected}) => selected ? 'bolder' : ''};
    padding: 10px;
    border-radius: 1rem;

`

export const Student = styled.div `
    display: flex;
    height: 40px;
    line-height: 2;
    flex-direction: row;
    border-style: solid;
    border-width: 2px;
    padding: 5px;
    margin-bottom: 2px;
    border-radius: 1rem;
`

export const GenderCont = styled.div `
    display: flex;
    width: 30%;
    flex-direction: row;
`

export const MemberCount = styled.label `
    font-size: 1.3rem;
    margin: auto;
    margin-top: 10px;
`

export const AvoidNotice = styled.label `
    text-align: center;
    font-size: 1.6rem;
    padding: 5px;
    margin-bottom: 20px;
    margin-top: 60px;
`
export const Notice = styled.label `
    max-width: 80%;
    padding: 5px;
    background-color: ${({error}) => error ? 'red' : '#5bccf6'};
    color: ${({error}) => error ? 'white' : ''};
    font-size: 1.3rem;
    border-radius: 2rem;
    margin-top: 50px;
`

export const ToAvoid = styled.a `
    border-radius: 50%;
    height: 40px;
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
    padding: 15px;
    margin: auto;
    margin-bottom: 15px;
    width: 200px;
    font-size: 15px;
    border: solid;
    border-radius: 2rem;
    border-width: 2px;
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
    max-width: 430px;
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
    font-size: 1.3rem;
    margin: auto;
    font-weight: bolder;
`


export const TextBox = styled.textarea `
    min-height: 400px;
    resize: vertical;
    font-size: 1.2rem;
    width: 300px;
    border-radius: 0.5rem;
`

export const Title = styled.h1 `
    font-size: 50px;
    font-weight: 500;
    color: black;
    border-right: 4px solid black;
    animation: cursor infinite, typing 7s infinite steps(16);
    white-space: nowrap;
    overflow: hidden;
    margin: auto;
    margin-top: 20px;
    padding-top: 15px;

    @keyframes cursor{
        0%, 100%{border-color: black;}
        50%{border-color: black;}
    }

    @keyframes typing{
        0%{ width: 0ch}
        30%{ width: 11ch;} 
        80%{ width: 11ch;} 
        90%{ width: 0ch;} 
        100%{ width: 0ch;} 
    }
`

export const Button = styled.button `
    width: 40%;
    margin-top: ${({noMargin}) => noMargin ? '' : '10px'};;
    border: solid;
    border-width: 2px;
    font-weight: bolder;
    margin: auto;
    background-color: #5bccf6;
    font-size: ${({size}) => size ? size : '1.5rem'};
    height: 70px;
    border-radius: 2rem;
    visibility: ${({hideInitially}) => hideInitially ? "hidden" : ""};
    &:hover {
        background-color: #ef9273;
    }
    @media screen and (max-width: 800px) {
        visibility: ${({mobile}) => mobile ? mobile : ""};
    }
`

export const StyledNavContainer = styled.div `
    width: 100%;
    height: 105px;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #5bccf6;
    border-bottom: solid 3px;
    margin-bottom: 30px;
`

export const MainButton = styled.button `    
    width: 70%;
    height: 70%;
    font-size: 1.5rem;
    border-radius: 1rem;
    margin-top: 10px;
    color: white;
    font-weight: bolder;
    background-color: green;
    border-radius: 2rem;
    &:hover {
        background-color: #ef9273;
    }
    @media screen and (max-width: 800px) {
        height: 85%;
        width: 80%;
    }
`




export const Row = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({bottom}) => bottom ? bottom : ''};

`

export const GroupButton = styled.button `
    height: 70%;
    width: 70%;
    border: solid;
    font-size: 1.2rem;
    border-width: 2px;
    font-weight: bolder;
    border-radius: 1rem;
    margin-top: 10px;
    background-color: #5bccf6;
    border-radius: 2rem;
    &:hover {
        background-color: #ef9273;
    }
    @media screen and (max-width: 800px) {
        height: 85%;
        width: 80%;
    }

`

export const NumGroups = styled.input `
    width: 20%;
    font-size: xx-large;
    margin: 7%;
    text-align: center;
`

export const OptionTitle = styled.h3 `
    width: 40%;
`

export const OptionRow = styled.div `
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    height: 120px;
`

export const Column = styled.div `
    display: flex;
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
    border-width: 2px;
    margin: auto;
    margin-bottom: 10px;
    font-size: 1.1rem;
    display:table-cell;
`

export const Group = styled.div `
    margin: auto;
    padding: 20px;
    border-width: 2px;
    margin-bottom: 5px;
    width: 300px;
    background-color: #5bccf6;
    visibility: ${({hide}) => hide ? 'hidden' : ''};
    border-style: solid;
    border-radius: 1rem;
`

export const GroupCont = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin-right: 50px;
    min-width: 700px;
    @media screen and (max-width: 700px) {
        flex-wrap: nowrap;
        min-width: 0px;
        margin-right: 250px;
        flex-direction: column;
    }
`

export const StudentCont = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    width: 300px;
`

export const GroupName = styled.label `
    font-size: 1.5rem;
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



import styled from 'styled-components'

const Log = styled.div`
    background: #EEF0F1;
    height: 100vh;
    width: 100%;
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    & > h3 {
        font-size: 1.5rem;
        color: grey;
        font-weight: 400;
        text-align: center;
        margin-top: 4rem;
    }
`

const Box = styled.div`
    margin: 0rem auto;
    width: 50%;
    height: max-content;
    padding: 3rem 2rem;
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    text-align: center;
    position: relative;

    @media (max-width: 768px) {
        width: 90%;
    }

    & > h1 {
        font-size: 3rem;
    }

    & > h2 {
        font-weight: 300;
    }
`

const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    margin: 2rem auto;

    & > label {
        font-size: 1.5rem;
        margin: 1rem 0;
    }

    & > input {
        padding: 1rem;
        width: 100%;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #191919;
    }

    & > .create {
        font-size: 1.5rem;
        border: none;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        margin-top: 2rem;
        width: 100%;
        cursor: pointer;
    }
`
export  {Log, Container, Box, Form};
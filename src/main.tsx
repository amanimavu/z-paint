import './style.css'

export default function Component() { 
    return <h1>Hello there</h1>    
}

const main = <Component />
const root = document.getElementById("app")
root?.appendChild(main)

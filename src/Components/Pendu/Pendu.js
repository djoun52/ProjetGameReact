
import "./pendu.css"
import { useState , useEffect } from "react";


export default function Pendu(props) {

    const [MotToFind, setmotsATrouver] = useState("test")
    const [motsArr, setmotsArr] = useState([])
    const [motsDisplay, setmotsDisplay] = useState([])
    const [input, setinput] = useState('')
    const [useLettre, setuseLettre] = useState([])
    const [error, setError] = useState("")
    const [stateGame, setStateGame] = useState(undefined)
    const [nbImage, setnbImage] = useState(1)
    const [image, setimage] = useState("")

    let regexAZ = /[a-z]/
    useEffect(() => {
        const newArr =[]
        let newMotsDis = []
        for (const key in MotToFind) {
            newArr.push(MotToFind[key])
            newMotsDis.push("_ ")
            
        }
        setimage('/penduImage/' +  nbImage + '.png')
        setmotsArr(newArr)
        setmotsDisplay(newMotsDis)
        return () => {
            
        }
    }, [])

    const linkInput = e=>{
        setinput(e)
    }
    const verifLose = (param)=>{
        if (param === false){
            setnbImage(nbImage + 1)
        }
    }

    useEffect(() => {
        setimage('/penduImage/' +  nbImage + '.png')
        if(nbImage === 8){
            setStateGame(false)
        }
        return () => {
            
        }
    }, [nbImage])




    const checkWin = ()=>{
        let checkwin = true
        for (const key in motsDisplay) {
            if (motsDisplay[key] === '_ '){
                checkwin = false
            }
        }
        if (checkwin == true){
            setStateGame(true)
        }
    }
    const play = e=>{
        e.preventDefault();
        // console.log(input);
        let bw = false;
        if(regexAZ.test(input) === false || input.length === 0){
            setError("erreur : Vous devez proposez une lettre de l'alphabet")
            return null
        }else if (input.length > 1 ){
            setError("erreur : Vous devez proposez UNE lettre de l'alphabet")
            return null
        }


        const newArrMotToFind = motsDisplay
        const newArrLettreUse = [...useLettre]

        if (newArrLettreUse.find(e => e === input + " ") === undefined){
            newArrLettreUse.push(input + " ")
            for (const key in MotToFind) {
                
                if (MotToFind[key] === input ) {
                    newArrMotToFind[key] = input
                    bw = true
                }
            }
            verifLose(bw)
            setmotsDisplay(newArrMotToFind)
            setuseLettre(newArrLettreUse)
        }

        checkWin()
        setError("")
        setinput('')
        
    }
    let contenue
    if (stateGame === undefined){
        contenue = <form onSubmit={e=>play(e)}>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label htmlFor="mots" className="form-label">Choisisser une lettre : </label>
                    </div>
                    <div class="col-auto">
                        <input 
                        value={input}
                        onInput={e => linkInput(e.target.value)}
                        className="form-control"
                        type="text" name="lettre" id="lettre" maxlength="1"/>
                    </div>
                    <div class="col-auto">
                        <button className=" " id="submit">jouer</button>
                    </div>
                </div>
            </form>

    }else if (stateGame === true){

        contenue = 
        <div>
            <p>Vous avez gagnié</p>
            <form action="">
                    <button className="">rejouer</button>
            </form>
        </div>
    }else if(stateGame === false){
        contenue = 
            <div>
                <p>Vous avez perdue</p>
                <form action="">
                    <button className="">rejouer</button>
                </form>
            </div>
    }


    return(
        <>
            <section id="game">
                <img src={image} alt="" className="img-thumbnail" />
                <p id="mot-a-trouver">{motsDisplay}</p>
                <p id="lettreUse">Lettre déja utilisé : {useLettre} </p>
                {contenue}
                
                
                <p id="erreur">{error}</p>
            </section> 
        </>
    )
}




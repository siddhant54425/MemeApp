import React from "react";

function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
           .then(res => res.json()) 
           .then(data => setAllMemes(data.data.memes))
    }, [])

    console.log(allMemes)

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        console.log(url);
        setMeme(prevMeme => ({
            ...prevMeme, randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target

        setMeme(prevMeme => ({
            ...prevMeme, 
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    className="form--input" 
                    type="text" 
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    className="form--input" 
                    type="text" 
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}    
                    />
                <button className="form--button" onClick={getMemeImage}>
                <div className="inside--button">
                    Get the new Meme
                    <img src="images/memeimg.png" alt="memeimage" className="memeimg"/>
                </div>
                </button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} alt="memeimage" className="meme--image"/>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme;
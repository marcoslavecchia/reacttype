import React, { useEffect, useState } from 'react';

import LoadGif from '../../img/giphy.gif';
import { HomeContainer } from './style';
import api from '../../service/api';

interface IJoke{
    id: string;
    icon_url: string;
    value: string;
}

const Home: React.FC = () => {
    const [ categoriesJoke, setCategoriesJoke ] = useState([]);
    const [ categorySelected, setCategorySelected ] = useState<IJoke>()
    const [ searchJoke, setSearchJoke ] = useState('')
    const [ isLoad, setIsLoad ] = useState(false)
    const [ resultSearch, setResultSearch ] = useState<IJoke[]>([])


    useEffect( () => {
        api.get('jokes/categories').then(
            response => {
                setCategoriesJoke(response.data)
            }
        )
    }, [])

    async function handleJokes(){
        setIsLoad(true)
        const response = await api.get(`jokes/search?query=${searchJoke}`)
        setResultSearch(response.data.result)
        if(response.status === 200 ){
            setIsLoad(false)
        } 
    }

    async function handleJokeByCategory(e: string){
        setIsLoad(true)
        const response = await api.get(`jokes/random?category=${e}`)
        setCategorySelected(response.data)
        if( response.status === 200 ){ 
            setIsLoad(false)
        } 



    }


    return (
        <HomeContainer>
            <div className="categories">
                
                { categoriesJoke.map( (joke, index) => (
                    <span className="individual" key={index} onClick={ () => handleJokeByCategory(joke) }>{joke}</span>
                ))}
                
            </div>
            <div>
                <img src={categorySelected?.icon_url} alt={categorySelected?.value}/>
                <h3>{categorySelected?.value}</h3>
            </div>

            <h1>Chuck 1.0</h1>

            <div className="input-group">
                <input type="text" placeholder="Insira um tema" onChange={ e => setSearchJoke(e.target.value)} />
                <button type="submit" onClick={handleJokes}> Procurar</button>
            </div>


            <p><h1>Resultados encontrados para <span className="span-search">{searchJoke}</span></h1> </p>
            <div className="joker">
                { isLoad ? <img src={LoadGif} alt="load"/> : resultSearch.map( result => (
                    <div className="jokerCard" key={result.id}>
                        <img src={result.icon_url} alt={result.value}/>
                        <h3>{result.value}</h3>
                        
                    </div>
                )) }

            </div>
            
            

        </HomeContainer>
    );
}

export default Home;
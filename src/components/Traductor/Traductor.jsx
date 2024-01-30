import React, { useState, useEffect } from 'react';
import "./Traductor.css";

const Traductor = () => {
    const [languages, setLanguages] = useState([]);
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    useEffect(() => {
        // Función para obtener idiomas disponibles
        const fetchLanguages = async () => {
            const url = process.env.REACT_APP_API_URL;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_X_RAPIDAPI_HOTS,
                }
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error al obtener idiomas disponibles: ${response.status}`);
                }
                const objeto = await response.json();
                let languages = objeto.data.languages;
                console.log(languages); // Imprime los idiomas en la consola
                setLanguages(languages);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchLanguages();
    }, []);

    const handleTranslateClick = async () => {
        const url = process.env.REACT_APP_API_URL;;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_X_RAPIDAPI_HOTS,
            },
            body: new URLSearchParams({
                source_language: fromLanguage,
                target_language: toLanguage,
                text: text, 
            })
        };

        try {
            const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error al obtener idiomas disponibles: ${response.status}`);
                }
                const result = await response.json();
                let success = result.data.translatedText;
            setTranslatedText(success);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='container-traslate'>
                <label className='from-label' htmlFor='from'>Traducir del:</label>
                <select name='' id='from' value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                    {languages.map((language) => (
                        <option key={language.code} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>

                <label className='to-label' htmlFor='to'>Al:</label>
                <select name='' id='to' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    {languages.map((language) => (
                        <option key={language.code} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='result'>
                <div className='container-cuadros'>
                    <label className='label-cuadros' htmlFor='inputTranslateFrom'>Que quieres traducir:</label>
                    <textarea className='cuadrado' name='' id='inputTranslateFrom' cols='10' rows='10' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>

                <div className='button'>
                <button onClick={handleTranslateClick}>Traducir</button>
                </div>

                <div className='container-cuadros'>
                    <label className='label-cuadros' htmlFor='outputTranslate'>Traducción:</label>
                    <textarea className='cuadrado' name='' id='outputTranslate' cols='10' rows='10' value={translatedText} readOnly></textarea>
                </div>
            </div>
        </>
    );
};

export default Traductor;

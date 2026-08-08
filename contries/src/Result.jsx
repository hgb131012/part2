const Result = (props) => {
    if(props.countryName.trim() === '') return null;

    const result = props.countries.filter((country) => {
        return country.name.common.toLowerCase().includes(props.countryName.toLowerCase())
    });

    if(result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if(result.length <= 10 && result.length > 1) {
        return (
            <div>
                {result.map((country) => <p key={country.name.official}>{country.name.common}</p>)}
            </div>
        )
    }

    if(result.length === 1) {
        const countryLanguages = result[0].languages ? Object.values(result[0].languages):[];
        return (
            <div>
                <h2>{result[0].name.common}</h2>
                <p>{result[0].area}</p>
                {result[0].capital.map(cap => <p key={cap}>{cap}</p>)}
                <h2>Languages</h2>
                {countryLanguages.map(lang => <p key={lang}>{lang}</p>)}
                <img style={{objectFit: 'contain', borderRadius: '12px', margin: 'none'}} width="250" height="150" src={result[0].flags.svg} alt={result[0].flags.alt} />
            </div>
        )
    }
    return null;
}

export default Result;
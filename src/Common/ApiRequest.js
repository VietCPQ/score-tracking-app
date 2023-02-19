const ApiRequest = async (url) => {
    const res = await fetch(url, {
        headers: {
            'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    });
    return await res.json();
}

export default ApiRequest
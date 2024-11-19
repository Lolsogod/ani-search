export const searchAnime = async (query: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();
    console.log(data);
    return data;
}
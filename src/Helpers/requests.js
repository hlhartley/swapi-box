export const fetchService = async ({ path, url }) => {
    const endpoint = url ? url : `https://swapi.co/api/${path}`;
    const response = await fetch(endpoint);
    return await response.json();
}

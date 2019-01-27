export const fetchService = async ({ path, url }) => {
    const endpoint = url ? url : `https://swapi.co/api/${path}`;
    const response = await fetch(endpoint);

    if (response.status >= 300) {
        throw new Error('Failed network request');
    } else {
        return await response.json();
    }
}

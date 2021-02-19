import fetch from 'node-fetch';

export async function fetchService(url: string) {
    return await fetch(url).then(data => data.json()).then((data => data))
}
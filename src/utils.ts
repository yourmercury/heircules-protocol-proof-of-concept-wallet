export function parseIpfs(url: string) {
    if(!url) return url;
    if (url.startsWith('http')) return url;
    else if (url.startsWith('ipfs')) {
        let cid = url.split('//')[1];
        return `https://${cid}.ipfs.w3s.link/`;
    }
}
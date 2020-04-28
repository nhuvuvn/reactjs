export const defaultAvatar =
    'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png';

export function ServerDataUrl() {
    return {
        transactionUrl: 'http://localhost:3000/transactions',
        profileUrl: 'http://localhost:3000/profile',
        analysisUrl: 'http://localhost:3000/analysis',

    };
}
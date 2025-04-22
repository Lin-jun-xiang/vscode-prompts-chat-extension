import axios from 'axios';

const API_URL = 'https://prompts.chat/api/prompts';

export async function fetchPrompts() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching prompts:', error);
        throw new Error('Could not fetch prompts from prompts.chat');
    }
}
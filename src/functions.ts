import { FunctionTool } from 'openai/resources/responses/responses.mjs';

export const getWeatherFunctionDefinition: FunctionTool = {
    type: 'function',
    name: 'getWeather',
    description: 'Gets the weather for a given city.',
    parameters: {
        type: 'object',
        properties: {
            city: { type: 'string', description: 'The city to get the weather for.' },
        },
        required: ['city'],
        additionalProperties: false
    },
    strict: true
};

export type GetWeatherParameters = {
    city: string;
};

export type Weather = {
    city: string;
    temperature: number;
    weather: string;
};

export async function getWeather(filter: GetWeatherParameters): Promise<Weather> {
    return {
        city: filter.city,
        temperature: 20,
        weather: 'sunny'
    };
}
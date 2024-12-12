export const config = {
  apiUrl: 'https://models.inference.ai.azure.com/chat/completions',
  // The token will be injected at runtime
  getApiToken: () => window.ENV?.GITHUB_API_TOKEN || ''
}; 
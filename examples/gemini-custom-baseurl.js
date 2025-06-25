/**
 * Example: Using Gemini with Custom Base URL and Headers
 *
 * This example demonstrates how to use the Gemini handler with a custom base URL
 * and additional headers. This is useful when you need to route requests through
 * a proxy, use a different endpoint, add authentication headers, or work with
 * custom Gemini API deployments.
 */

import { LLM } from '../src/index.js'

// Example 1: Using custom base URL with Gemini
const llmWithCustomBaseURL = new LLM({
  provider: 'gemini',
  apiKey: process.env.GEMINI_API_KEY || 'your-api-key-here',
  baseURL: 'https://custom-gemini-proxy.example.com/v1', // Custom endpoint
})

// Example 2: Using custom headers for authentication/tracking
const llmWithHeaders = new LLM({
  provider: 'gemini',
  apiKey: process.env.GEMINI_API_KEY || 'your-api-key-here',
  defaultHeaders: {
    'X-Custom-Auth': 'Bearer custom-token',
    'X-Request-ID': 'unique-request-id',
    'User-Agent': 'MyApp/1.0'
  }
})

// Example 3: Using both custom baseURL and headers
const llmWithBoth = new LLM({
  provider: 'gemini',
  apiKey: process.env.GEMINI_API_KEY || 'your-api-key-here',
  baseURL: 'https://custom-gemini-proxy.example.com/v1',
  defaultHeaders: {
    'X-API-Version': '2024-01',
    'X-Client-ID': 'my-client-id'
  }
})

// Example 4: Using default Gemini endpoint (for comparison)
const llmDefault = new LLM({
  provider: 'gemini',
  apiKey: process.env.GEMINI_API_KEY || 'your-api-key-here',
  // No baseURL or headers specified - uses default Google AI endpoint
})

const demonstrateCustomBaseURL = async () => {
  try {
    console.log('🔧 Demonstrating Gemini with Custom Base URL\n')

    // Test with custom base URL
    console.log('📡 Making request with custom base URL...')
    console.log('Base URL:', 'https://custom-gemini-proxy.example.com/v1')

    // Note: This will fail unless you have an actual custom endpoint
    // but it demonstrates how the baseURL is passed to the underlying SDK
    try {
      const customResponse = await llmWithCustomBaseURL.chat.completions.create({
        model: 'gemini-1.5-pro',
        messages: [
          {
            role: 'user',
            content: 'Hello! Can you confirm you received this via the custom endpoint?'
          }
        ],
        max_tokens: 100,
      })

      console.log('✅ Custom endpoint response:', customResponse.choices[0].message.content)
    } catch (error) {
      console.log('❌ Custom endpoint failed (expected if no custom endpoint exists):', error.message)
    }

    console.log('\n📡 Making request with default endpoint...')

    // Test with default endpoint
    const defaultResponse = await llmDefault.chat.completions.create({
      model: 'gemini-1.5-pro',
      messages: [
        {
          role: 'user',
          content: 'Hello! This should work with the default Google AI endpoint.'
        }
      ],
      max_tokens: 100,
    })

    console.log('✅ Default endpoint response:', defaultResponse.choices[0].message.content)

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Common use cases for custom base URLs:

console.log(`
🎯 Common Use Cases for Custom Base URL and Headers:

**Base URL Use Cases:**
1. **Corporate Proxy**: Route through company firewall
   baseURL: 'https://proxy.company.com/gemini-api'

2. **Regional Endpoint**: Use region-specific deployment
   baseURL: 'https://gemini-eu.example.com/v1'

3. **Development/Testing**: Point to staging environment
   baseURL: 'https://staging-gemini.example.com'

4. **Custom Wrapper**: Use your own API wrapper
   baseURL: 'https://api.yourservice.com/gemini'

5. **Load Balancer**: Distribute requests across multiple endpoints
   baseURL: 'https://lb.example.com/gemini'

**Header Use Cases:**
1. **Authentication**: Add custom auth tokens
   defaultHeaders: { 'Authorization': 'Bearer custom-token' }

2. **Request Tracking**: Add correlation IDs
   defaultHeaders: { 'X-Request-ID': 'unique-id', 'X-Trace-ID': 'trace-123' }

3. **API Versioning**: Specify API version
   defaultHeaders: { 'X-API-Version': '2024-01' }

4. **Client Identification**: Identify your application
   defaultHeaders: { 'User-Agent': 'MyApp/1.0', 'X-Client-ID': 'client-123' }

5. **Custom Metadata**: Pass additional context
   defaultHeaders: { 'X-Environment': 'production', 'X-Region': 'us-east-1' }

📝 Implementation Details:
- Both baseURL and headers are passed via HttpOptions to the Google GenAI SDK
- baseURL is mapped to HttpOptions.baseUrl
- defaultHeaders are mapped to HttpOptions.headers
- This leverages the new unified Google GenAI SDK's built-in support
- All other functionality (streaming, tools, etc.) works normally
- Custom settings apply to all requests made by that LLM instance
`)

// Run the demonstration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateCustomBaseURL()
}

export { llmWithCustomBaseURL, llmDefault }
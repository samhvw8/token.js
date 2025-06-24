# Gemini

[Get a Gemini API key](https://ai.google.dev/gemini-api/docs/api-key)

## Usage

{% code title=".env" %}
```bash
GEMINI_API_KEY=
```
{% endcode %}

```typescript
import { TokenJS } from 'token.js'

// Create the Token.js client
const tokenjs = new TokenJS()

async function main() {
  // Create a model response
  const completion = await tokenjs.chat.completions.create({
    // Specify the provider and model
    provider: 'gemini',
    model: 'gemini-1.5-pro',
    // Define your message
    messages: [
      {
        role: 'user',
        content: 'Hello!',
      },
    ],
  })
  console.log(completion.choices[0])
}
main()
```

## Custom Base URL

Gemini now supports custom base URLs, allowing you to route requests through proxies, use regional endpoints, or connect to custom Gemini API deployments.

```typescript
import { TokenJS } from 'token.js'

// Using a custom base URL
const tokenjs = new TokenJS({
  apiKey: 'your-gemini-api-key',
  baseURL: 'https://custom-gemini-proxy.example.com/v1'
})

async function main() {
  const completion = await tokenjs.chat.completions.create({
    provider: 'gemini',
    model: 'gemini-1.5-pro',
    messages: [
      {
        role: 'user',
        content: 'Hello via custom endpoint!',
      },
    ],
  })
  console.log(completion.choices[0])
}
main()
```

### Common Use Cases

- **Corporate Proxy**: Route through company firewall
- **Regional Endpoints**: Use region-specific deployments
- **Development/Testing**: Point to staging environments
- **Custom Wrappers**: Use your own API wrapper service
- **Load Balancing**: Distribute requests across multiple endpoints

<!-- compatibility -->
## Supported Models

| Model                               | Chat Completion | Streaming | JSON Output | Image Input | Function Calling | N > 1 |
| ----------------------------------- | --------------- | --------- | ----------- | ----------- | ---------------- | ----- |
| gemini-2.0-flash-001                | ✅               | ✅         | ✅           | ✅           | ✅                | ✅     |
| gemini-2.0-flash-lite-preview-02-05 | ✅               | ✅         | ✅           | ✅           | ➖                | ✅     |
| gemini-1.5-pro                      | ✅               | ✅         | ✅           | ✅           | ✅                | ✅     |
| gemini-1.5-flash                    | ✅               | ✅         | ✅           | ✅           | ✅                | ✅     |
| gemini-1.5-flash-8b                 | ✅               | ✅         | ✅           | ✅           | ✅                | ✅     |
| gemini-1.0-pro                      | ✅               | ✅         | ➖           | ➖           | ✅                | ✅     |

### Legend
| Symbol             | Description                           |
|--------------------|---------------------------------------|
| :white_check_mark: | Supported by Token.js                 |
| :heavy_minus_sign: | Not supported by the LLM provider, so Token.js cannot support it     |
<!-- end compatibility -->

## Additional Resources

* [Gemini Documentation](https://ai.google.dev/gemini-api/docs)

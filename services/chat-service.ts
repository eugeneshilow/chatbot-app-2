const CHAT_URL = "https://eugeneshilow.app.n8n.cloud/webhook/858ee754-ada1-41d8-9db1-30dd3bf2d40f/chat"

export async function sendMessage(message: string) {
  try {
    const response = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: message,
        systemPrompt: `You are an AI assistant specialized in Markirovka (https://markirovka.ismet.kz/). 
Your role is to help users understand and navigate Markirovka-related topics.
Always provide accurate, helpful information about Markirovka processes, requirements, and features.
If you're not sure about something, say so rather than making assumptions.`
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(`Failed to send message: ${errorData ? JSON.stringify(errorData) : response.statusText}`)
    }

    const data = await response.json()
    return data.text || data.output || data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
} 
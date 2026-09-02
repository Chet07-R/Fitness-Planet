// Global Chatbot Toggle Function callable directly from HTML or JS
window.toggleGlobalChatbot = function() {
  let chatbox = document.querySelector('.chatbox');

  // If no chatbox exists on page, dynamically create floating widget
  if (!chatbox) {
    chatbox = document.createElement('div');
    chatbox.className = 'chatbox glass-card chatbox-popup active';
    chatbox.innerHTML = `
      <div class="chat-header">
        <div class="bot-info">
          <div class="bot-avatar-badge">FP</div>
          <div>
            <h3>Fitness Planet AI</h3>
            <span class="status-online">Online</span>
          </div>
        </div>
        <button type="button" class="chat-close-btn" style="background:none; border:none; color:#ffffff; font-size:1.5rem; cursor:pointer; padding:4px 8px;">&times;</button>
      </div>
      <div class="chat-container">
        <div class="h1">How can I assist your fitness journey today?</div>
        <div class="quick-prompts">
          <button type="button" class="prompt-chip">Suggest a Leg Workout</button>
          <button type="button" class="prompt-chip">Healthy Meal Ideas</button>
        </div>
      </div>
      <div class="input-area">
        <input type="text" class="prompt" placeholder="Ask about workouts or nutrition...">
        <button type="button" class="arrow" aria-label="Send Message">&rarr;</button>
      </div>
    `;
    document.body.appendChild(chatbox);

    // Bind inner widget handlers
    bindChatboxEvents(chatbox);
  } else {
    // If chatbox exists, ensure popup styling & toggle active class
    chatbox.classList.add('chatbox-popup');
    chatbox.classList.toggle('active');
    
    // Smooth scroll into view if static section
    if (!chatbox.classList.contains('chatbox-popup')) {
      chatbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  const promptInput = chatbox.querySelector('.prompt');
  if (promptInput && chatbox.classList.contains('active')) {
    setTimeout(() => promptInput.focus(), 100);
  }
};

function bindChatboxEvents(chatbox) {
  const closeBtn = chatbox.querySelector('.chat-close-btn');
  const chatContainer = chatbox.querySelector('.chat-container');
  const h1 = chatbox.querySelector('.h1');
  const prompt = chatbox.querySelector('.prompt');
  const chatbtn = chatbox.querySelector('.input-area button');
  const promptChips = chatbox.querySelectorAll('.prompt-chip');

  if (closeBtn) {
    closeBtn.onclick = () => chatbox.classList.remove('active');
  }

  let userMessage = '';

  function createChatBox(html, className) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.innerHTML = html;
    return div;
  }

  function scrollToBottom() {
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector('.text');
    try {
      if (typeof Api_url !== 'undefined') {
        const response = await fetch(Api_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ "role": "user", "parts": [{ text: userMessage }] }]
          })
        });
        const data = await response.json();
        const apiResponse = data?.candidates[0]?.content?.parts[0]?.text?.trim();
        if (textElement) textElement.innerText = apiResponse || "I am here to help you reach your fitness goals!";
      } else {
        setTimeout(() => {
          if (textElement) {
            textElement.innerText = `Thanks for asking! For "${userMessage}", consistency is key. Combine structured resistance training with balanced nutrition for optimal results!`;
          }
          const loadingImg = aiChatBox.querySelector('.loading');
          if (loadingImg) loadingImg.style.display = 'none';
          scrollToBottom();
        }, 500);
        return;
      }
    } catch (error) {
      if (textElement) textElement.innerText = "Sorry, I couldn't process that. Please try again!";
    } finally {
      const loadingImg = aiChatBox.querySelector('.loading');
      if (loadingImg) loadingImg.style.display = 'none';
      scrollToBottom();
    }
  }

  function showLoading() {
    const html = `<p class="text"></p><span class="loading" style="font-size:0.8rem; color:#ff6b00;">Thinking...</span>`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    scrollToBottom();
    generateApiResponse(aiChatBox);
  }

  function sendMessage(msgText) {
    if (!msgText.trim()) return;
    if (h1) h1.style.display = 'none';
    const promptChipsContainer = chatbox.querySelector('.quick-prompts');
    if (promptChipsContainer) promptChipsContainer.style.display = 'none';

    userMessage = msgText;
    const html = `<p class="text"></p>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector('.text').innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    if (prompt) prompt.value = '';
    scrollToBottom();
    setTimeout(showLoading, 300);
  }

  if (chatbtn && prompt) {
    chatbtn.onclick = () => sendMessage(prompt.value);
    prompt.onkeypress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage(prompt.value);
      }
    };
  }

  promptChips.forEach(chip => {
    chip.onclick = () => sendMessage(chip.innerText);
  });
}

function initializeChatbot() {
  const chatbotIcon = document.querySelector('.chatboticon');
  const existingChatbox = document.querySelector('.chatbox');

  if (chatbotIcon) {
    chatbotIcon.onclick = window.toggleGlobalChatbot;
  }

  if (existingChatbox) {
    bindChatboxEvents(existingChatbox);
  }
}

// Auto Attach Event Listener to Document Body (Delegation)
document.addEventListener('click', function(e) {
  if (e.target && (e.target.classList.contains('chatboticon') || e.target.closest('.chatboticon'))) {
    e.preventDefault();
    window.toggleGlobalChatbot();
  }
});

// Run initializer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

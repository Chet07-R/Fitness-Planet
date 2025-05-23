// Fetch and insert navbar
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
    initializeChatbot();
  })
  .catch(error => console.error('Error loading navbar:', error));

function initializeChatbot() {
  const chatbotIcon = document.querySelector('img.navbar[alt="chatbot-png"]');
  const chatbox = document.querySelector('.chatbox');
  const chatContainer = document.querySelector('.chat-container');
  const h1 = document.querySelector('.h1');
  const prompt = document.querySelector('.prompt');
  const chatbtn = document.querySelector('.input-area button');

  if (chatbotIcon && chatbox && chatContainer && h1 && prompt && chatbtn) {
    // Toggle chatbox visibility
    chatbotIcon.addEventListener('click', () => {
      chatbox.classList.toggle('active');
      if (chatbox.classList.contains('active')) {
        h1.style.display = 'block';
      }
    });

    // Chatbot functionality (rest of the code remains the same)
    let userMessage = '';
    

    function createChatBox(html, className) {
      const div = document.createElement('div');
      div.classList.add(className);
      div.innerHTML = html;
      return div;
    }

    async function generateApiResponse(aiChatBox) {
      const textElement = aiChatBox.querySelector('.text');
      try {
        const response = await fetch(Api_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ "role": "user", "parts": [{ text: `${userMessage}` }] }]
          })
        });
        const data = await response.json();
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse;
      } catch (error) {
        console.log(error);
      } finally {
        aiChatBox.querySelector('.loading').style.display = 'none';
      }
    }

    function showLoading() {
      const html = `<p class="text"></p><img src="pictures/load.gif" class="loading" width="50px">`;
      let aiChatBox = createChatBox(html, "ai-chat-box");
      chatContainer.appendChild(aiChatBox);
      generateApiResponse(aiChatBox);
    }

    chatbtn.addEventListener('click', () => {
      h1.style.display = 'none';
      userMessage = prompt.value;
      const html = `<p class="text"></p>`;
      let userChatBox = createChatBox(html, "user-chat-box");
      userChatBox.querySelector('.text').innerText = userMessage;
      chatContainer.appendChild(userChatBox);
      prompt.value = '';
      setTimeout(showLoading, 500);
    });

    prompt.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (prompt.value.trim() !== '') {
          h1.style.display = 'none';
          userMessage = prompt.value;
          const html = `<p class="text"></p>`;
          let userChatBox = createChatBox(html, "user-chat-box");
          userChatBox.querySelector('.text').innerText = userMessage;
          chatContainer.appendChild(userChatBox);
          prompt.value = '';
          setTimeout(showLoading, 500);
        }
      }
    });
  } else {
    console.error('One or more chatbot elements not found in DOM');
  }
}

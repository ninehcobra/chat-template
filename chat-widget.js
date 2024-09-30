(function () {
    let container;
    let toggleBtn;

    // CONFIGURATION
    // Configuration call form api
    const chatWidgetConfigFromApi = {
        button: {
            backgroundColor: "#3B81F6",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc:
                "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
        },
        chatWindow: {
            welcomeMessage: "Hello! This is custom welcome message",
            backgroundColor: "#ffffff",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#303235",
            botMessage: {
                backgroundColor: "#f7f8ff",
                textColor: "#303235",
                showAvatar: true,
                avatarSrc:
                    "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
            },
            userMessage: {
                backgroundColor: "#3B81F6",
                textColor: "#ffffff",
                showAvatar: true,
                avatarSrc:
                    "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
                placeholder: "Type your question",
                backgroundColor: "#ffffff",
                textColor: "#303235",
                sendButtonColor: "#3B81F6",
            },
        },
    };

    // Configuration defaults
    const chatWidgetConfigDefault = {
        button: {
            backgroundColor: "#3B81F6",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc:
                "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
        },
        chatWindow: {
            welcomeMessage: "Hello! This is custom welcome message",
            backgroundColor: "#ffffff",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#303235",
            botMessage: {
                backgroundColor: "#f7f8ff",
                textColor: "#303235",
                showAvatar: true,
                avatarSrc:
                    "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
            },
            userMessage: {
                backgroundColor: "#3B81F6",
                textColor: "#ffffff",
                showAvatar: true,
                avatarSrc:
                    "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
                placeholder: "Type your question",
                backgroundColor: "#ffffff",
                textColor: "#303235",
                sendButtonColor: "#3B81F6",
            },
        },
    };

    // Summary of configs

    const chatWidgetConfigFinal = {};

    // Function to summarize configs
    function mergeConfigs(target, source, fallback) {
        for (const key in fallback) {
            if (fallback.hasOwnProperty(key)) {
                if (
                    typeof fallback[key] === "object" &&
                    !Array.isArray(fallback[key])
                ) {
                    target[key] = source[key] || {};
                    mergeConfigs(target[key], source[key] || {}, fallback[key]);
                } else {
                    target[key] =
                        source[key] !== undefined ? source[key] : fallback[key];
                }
            }
        }
    }

    // Merge config
    mergeConfigs(
        chatWidgetConfigFinal,
        chatWidgetConfigFromApi,
        chatWidgetConfigDefault
    );

    console.log(chatWidgetConfigFinal);

    function initChatWidget() {
        // Create style for chat widget
        const style = document.createElement("style");
        style.textContent = `
      #chat-widget-container {
        position: fixed;
        z-index: 9999;
        width:${chatWidgetConfigFinal.chatWindow.width}px;
        height: ${chatWidgetConfigFinal.chatWindow.height}px;
        right:20px;
        bottom: ${
            chatWidgetConfigFinal.button.size == "medium" ? "80px" : "96px"
        };
        font-size:${chatWidgetConfigFinal.chatWindow.fontSize}px;
      }

      @media screen and (max-width: 768px) {
        #chat-widget-container {
          width: 100% !important;
          height: 100% !important;
          right: 0 !important;
          bottom: 0 !important;
          border-radius: 0 !important;
        }

        #chat-widget-toggle.open{
        top:10px !important;
        right:20px !important;
        }

        .ai-chat-container {
          width: 100% !important;
          height: 100% !important;
          border-radius: 0 !important;
        }

        .ai-chat-header {
          border-radius: 0 !important;
        }

        .ai-chat-input {
          border-radius: 0 !important;
        }
      }

      #chat-widget-container {
      transition: transform 0.3s ease-out, opacity 0.3s ease-out;
      transform: translate(20px, 20px);
      opacity: 0;
      }

      #chat-widget-container.visible {
        transform: translate(0, 0);
        opacity: 1;
      }

      #chat-widget-toggle {
        position: fixed;
        z-index: 10000;
        width:${
            chatWidgetConfigFinal.button.size == "medium" ? "48px" : "64px"
        };
        height: ${
            chatWidgetConfigFinal.button.size == "medium" ? "48px" : "64px"
        };
        border-radius:100%;
        background-color: ${chatWidgetConfigFinal.button.backgroundColor};
        right: ${chatWidgetConfigFinal.button.right}px;
        bottom: ${chatWidgetConfigFinal.button.bottom}px;
       }

        #chat-widget-toggle {
        transition: transform 0.3s ease-out;
        }

        #chat-widget-toggle.open {
          transform: rotate(180deg);
        }

       .ai-chat-toggle{
       display:flex;
       align-items:center;
       justify-content:center;
       color:white;
       }

      .ai-chat-toggle-icon{
      fill:${chatWidgetConfigFinal.button.iconColor};
      }

      .ai-chat-toggle-icon-wrapper{
      height:${chatWidgetConfigFinal.button.size == "medium" ? "30px" : "40px"};
      width:${chatWidgetConfigFinal.button.size == "medium" ? "30px" : "40px"};
      border-radius:100%;
      }

      .ai-chat-container {
        width: ${chatWidgetConfigFinal.chatWindow.width}px;
        height: ${chatWidgetConfigFinal.chatWindow.height}px;
        background-color: white;
        font-family: "Poppins", system-ui;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 10px;
      }

      .ai-chat-main {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .ai-chat-header {
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:${chatWidgetConfigFinal.button.backgroundColor};
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

     
      .ai-chat-header-user {
        display: flex;
        align-items: center;
      }

      .ai-chat-header-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 0.75rem;
      }

      .ai-chat-header-name {
        margin: 0;
        font-size: 1.25rem;
      }

      .ai-chat-dropdown {
        cursor: pointer;
        position: relative;
      }

      .ai-chat-dropdown-menu {
        display: none;
        position: absolute;
        right: 0;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
        padding: 0.5rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        list-style: none;
      }

      .ai-chat-dropdown-item {
        display: block;
        padding: 0.25rem 1rem;
        text-decoration: none;
        color: #212529;
      }

      .ai-chat-dropdown-item:hover {
        background-color: #f8f9fa;
      }

      .ai-chat-messages {
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1rem;
        background-color:${chatWidgetConfigFinal.chatWindow.backgroundColor};
      }

      .ai-chat-messages::-webkit-scrollbar {
          display: none;
      }

      .ai-chat-message {
        margin-bottom: 1rem;
      }

      .ai-chat-message-incoming {
        display: flex;
        justify-content: flex-start;
       
      }

      .ai-chat-message-outgoing {
        display: flex;
        justify-content: flex-end;
       
      }

      .ai-chat-message-content {
        display: inline-block;
        padding: 0.5rem;
        border-radius: 0.25rem;
        max-width: 80%;
         word-break: break-word;
      }

      .ai-chat-message-incoming .ai-chat-message-content {
         background-color:${
             chatWidgetConfigFinal.chatWindow.botMessage.backgroundColor
         };
        color:${chatWidgetConfigFinal.chatWindow.botMessage.textColor};
      }

      .ai-chat-message-outgoing .ai-chat-message-content {
       background-color:${
           chatWidgetConfigFinal.chatWindow.userMessage.backgroundColor
       };
        color:${chatWidgetConfigFinal.chatWindow.userMessage.textColor};
      }

      .ai-chat-message-text {
        margin: 0;
      }

      .ai-chat-message-time {
        font-size: 0.75rem;
        color: #6c757d;
      }

      .ai-chat-message-outgoing .ai-chat-message-time {
        color: rgba(255, 255, 255, 0.75);
      }

      .ai-chat-input {
        padding: 1rem;
        border-top: 1px solid #dee2e6;
        background-color:${chatWidgetConfigFinal.chatWindow.backgroundColor};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 0 0 10px 10px;
      }

      .ai-chat-input-form {
        display: flex;
        width: 100%;
      }

      .ai-chat-input-field {
        flex-grow: 1;
        padding: 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem 0 0 0.25rem;
        font-size:${chatWidgetConfigFinal.chatWindow.fontSize}px;
        background-color:${
            chatWidgetConfigFinal.chatWindow.textInput.backgroundColor
        };
        color:${chatWidgetConfigFinal.chatWindow.textInput.textColor};
      }

      .ai-chat-input-button {
        background-color: ${chatWidgetConfigFinal.button.backgroundColor};
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0 0.25rem 0.25rem 0;
        cursor: pointer;
      }

      .ai-chat-powered{
      margin-top: 10px;
      font-size: 12px;
      color:${chatWidgetConfigFinal.chatWindow.poweredByTextColor};
      }

      .ai-chat-company{
      font-weight: 700;
      }

      .ai-chat-send-btn{
      fill:${chatWidgetConfigFinal.chatWindow.textInput.sendButtonColor}
      }

      .ai-chat-bot-avatar{
      height: 36px;
      width: 36px;
      border-radius: 50%;
      margin-right: 4px;
      }

      .ai-chat-user-avatar{
         height: 36px;
      width: 36px;
      border-radius: 50%;
      margin-left: 4px;
      }

    `;
        document.head.appendChild(style);

        // Create the container element
        container = document.createElement("div");
        container.id = "chat-widget-container";
        container.style.display = "none";

        // Create Icon for toggle button
        let toggleBtnIconOpen = chatWidgetConfigFinal.button.customIconSrc
            ? `<img src=${chatWidgetConfigFinal.button.customIconSrc} class="ai-chat-toggle-icon-wrapper" alt="icon"/>`
            : '<svg class="ai-chat-toggle-icon-wrapper" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="ai-chat-toggle-icon" d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"/></svg>';

        let toggleBtnIconClose =
            '<svg class="ai-chat-toggle-icon-wrapper" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="ai-chat-toggle-icon" fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"/></svg>';

        // Create the toggle button
        toggleBtn = document.createElement("div");
        toggleBtn.id = "chat-widget-toggle";
        toggleBtn.className = "ai-chat-toggle";
        toggleBtn.innerHTML = toggleBtnIconOpen;

        const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        // Add content to the container
        container.innerHTML = `
    <!DOCTYPE html>
      <html lang="en">
        <body>
          <div class="ai-chat-container">
            <div class="ai-chat-main">
              <div class="ai-chat-header">
                <div class="ai-chat-header-user">
                ${
                    chatWidgetConfigFinal.chatWindow.botMessage.showAvatar
                        ? `<img
                        src="${chatWidgetConfigFinal.chatWindow.botMessage.avatarSrc}"
                        class="ai-chat-header-avatar"
                        alt="Contact"
                      >`
                        : ""
                }
                  <h5 class="ai-chat-header-name">CaoNiMa</h5>
                </div>
                <div class="ai-chat-dropdown">
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,10a2,2,0,1,1-2,2A2,2,0,0,1,12,10ZM4,14a2,2,0,1,0-2-2A2,2,0,0,0,4,14Zm16-4a2,2,0,1,0,2,2A2,2,0,0,0,20,10Z"/></svg>
                  <ul class="ai-chat-dropdown-menu">
                    <li>
                      <a class="ai-chat-dropdown-item" href="#">Contact</a>
                    </li>
                    <li><a class="ai-chat-dropdown-item" href="#">Refresh</a></li>
                    <li><a class="ai-chat-dropdown-item" href="#">Delete</a></li>
                  </ul>
                </div>
              </div>

              <div class="ai-chat-messages " id="chatBox">
                           <div class="ai-chat-message  ai-chat-message-incoming" >
              ${
                  chatWidgetConfigFinal.chatWindow.welcomeMessage
                      ? `
              
                  ${
                      chatWidgetConfigFinal.chatWindow.botMessage.showAvatar
                          ? `<img
                  src="${chatWidgetConfigFinal.chatWindow.botMessage.avatarSrc}"
                  class="ai-chat-bot-avatar"
                  alt="Contact"
                >`
                          : ""
                  }
                  <div class="ai-chat-message-content">
                    <p class="ai-chat-message-text">
                      ${chatWidgetConfigFinal.chatWindow.welcomeMessage}
                    </p>
                    <small class="ai-chat-message-time">${currentTime}</small>
              
                </div>
              `
                      : ""
              }
              </div>

                
              </div>

              <div class="ai-chat-input">
                <form id="chatForm" class="ai-chat-input-form">
                  <input
                    id="chatInput"
                    type="text"
                    class="ai-chat-input-field"
                    placeholder=${
                        chatWidgetConfigFinal.chatWindow.textInput.placeholder
                    }
                  />
                  <button class="ai-chat-input-button" type="submit">            
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="ai-chat-send-btn" d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </form>
                <div class="ai-chat-powered">
                Powered by <span class="ai-chat-company">QKIT Software</span>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>


    `;

        // Add elements to the body
        document.body.appendChild(container);
        document.body.appendChild(toggleBtn);

        // Handle toggle button click event
        let isVisible = false;
        toggleBtn.addEventListener("click", () => {
            isVisible = !isVisible;
            container.style.display = "block";
            setTimeout(() => {
                container.classList.toggle("visible", isVisible);
            }, 10);
            toggleBtn.classList.toggle("open", isVisible);
            toggleBtn.innerHTML = !isVisible
                ? toggleBtnIconOpen
                : toggleBtnIconClose;

            if (!isVisible) {
                setTimeout(() => {
                    container.style.display = "none";
                }, 300);
            }
        });

        // Handle click event on the dropdown
        const dropdown = document.querySelector(".ai-chat-dropdown");
        const dropdownMenu = document.querySelector(".ai-chat-dropdown-menu");

        dropdown.addEventListener("click", () => {
            dropdownMenu.style.display =
                dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // Handle send button click event
        document
            .getElementById("chatForm")
            .addEventListener("submit", async function (event) {
                event.preventDefault(); // Ngăn không cho form reload trang

                const chatInput = document.getElementById("chatInput");
                const message = chatInput.value.trim();

                if (message !== "") {
                    // Thêm tin nhắn của người dùng vào chat box
                    addMessageToChat(message, "user-message");

                    // Xóa input sau khi gửi
                    chatInput.value = "";

                    // Giả sử hệ thống tự động trả lời (có thể thay bằng API AI chatbot)
                    setTimeout(async function () {
                        const apiResponse = await callPredictionAPI(message);
                        addMessageToChat(apiResponse, "bot-message");
                    }, 100);
                }
            });

        function addMessageToChat(message, className) {
            const chatBox = document.getElementById("chatBox");

            const currentTime = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            let messageHtml;

            if (className === "user-message") {
                messageHtml = `        
                        <div class="ai-chat-message ai-chat-message-outgoing">
                          <div class="ai-chat-message-content">
                            <p class="ai-chat-message-text">
                              ${message}                
                            </p>
                            <small class="ai-chat-message-time">${currentTime}</small>
                          </div>
                           ${
                               chatWidgetConfigFinal.chatWindow.userMessage
                                   .showAvatar
                                   ? `<img
                                    src="${chatWidgetConfigFinal.chatWindow.userMessage.avatarSrc}"
                                    class="ai-chat-user-avatar"
                                    alt="Contact"
                                  >`
                                   : ""
                           }
                        </div>
                  `;
            } else {
                messageHtml = `
                        <div class="ai-chat-message ai-chat-message-incoming">
                        ${
                            chatWidgetConfigFinal.chatWindow.botMessage
                                .showAvatar
                                ? `<img
                              src="${chatWidgetConfigFinal.chatWindow.botMessage.avatarSrc}"
                              class="ai-chat-bot-avatar"
                              alt="Contact"
                            >`
                                : ""
                        }
                          <div class="ai-chat-message-content">
                            <p class="ai-chat-message-text">${message}</p>
                            <small class="ai-chat-message-time">${currentTime}</small>
                          </div>
                        </div>`;
            }

            chatBox.innerHTML += messageHtml;

            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    // Function to call the API with the user question
    async function callPredictionAPI(question) {
        const requestBody = {
            question: question,
            overrideConfig: {
                returnSourceDocuments: "",
                rephrasePrompt: "",
                responsePrompt: "",
                openAIApiKey: "api-key",
            },
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data?.answer; // return the API response
        } catch (error) {
            console.error("Error calling the API:", error);
            return null; // return null in case of error
        }
    }

    // Call the initChatWidget function when the DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initChatWidget);
    } else {
        initChatWidget();
    }
})();

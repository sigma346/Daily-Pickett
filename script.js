async function register() {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    });

    if (error) {
        alert(error.message)
    } else {
        alert("Account created — check your email to verify.")

        await db.from("users").insert({
            username: username,
            email: email
        });
    }
}


async function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const { data, error } = await db.auth.signInWithPassword({ email, password })
    if (error) {
        alert(error.message)
    } else {
        alert("Logged in. You’re him.")
    }
}

async function loadLayout() {
  document.getElementById("navbar").innerHTML =
    await (await fetch("components/navbar.html")).text();

  document.getElementById("footer").innerHTML =
    await (await fetch("components/footer.html")).text();
}

document.addEventListener("DOMContentLoaded", loadLayout);

// listen for new messages (realtime)
db.channel('chat')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'chat_messages' },
    (payload) => {
      const msg = payload.new;
      addMessage(msg.username, msg.message);
    }
  )
  .subscribe();

async function sendMessage() {
  const username = document.getElementById("chat-username").value || "Anonymous";
  const text = document.getElementById("chat-input").value;
  if (!text.trim()) return;

  await db.from("chat_messages").insert([{ username, message: text }]);

  document.getElementById("chat-input").value = "";
}

function addMessage(username, text) {
  const messagesDiv = document.getElementById("messages");

  const el = document.createElement("div");
  el.textContent = `[${username}] ${text}`;

  messagesDiv.appendChild(el);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // auto scroll
}

async function loadMessages() {
  const { data } = await db
    .from("chat_messages")
    .select("*")
    .order("created_at", { ascending: true });

  data.forEach(msg => addMessage(msg.username, msg.message));
}

document.addEventListener("DOMContentLoaded", loadMessages);


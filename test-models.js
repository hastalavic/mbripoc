// final_verification.js
const apiKey = 'AIzaSyCMszagaPBOhNRZbQnY5CMOCOqMYp5S97k'; // 你的密钥
const modelName = 'gemini-2.5-flash'; // 使用上面确定的新模型

async function finalVerify() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "请用中文回复：你好" }] }],
          generationConfig: { temperature: 0.1 }
        })
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(`🎉 成功！模型 "${modelName}" 工作正常。`);
      console.log(`AI回复: ${data.candidates?.[0]?.content?.parts?.[0]?.text}`);
    } else {
      console.log(`验证失败: ${data.error?.message}`);
    }
  } catch (error) {
    console.error(`请求出错: ${error.message}`);
  }
}

finalVerify();
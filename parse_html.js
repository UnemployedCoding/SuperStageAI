const fs = require('fs');
const path = require('path');
function extractText(file, output) {
  let content = fs.readFileSync(file, 'utf-8');
  let match = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (match) {
    let mainHtml = match[1];
    mainHtml = mainHtml.replace(/StagingGPT/g, "StageLumen");
    mainHtml = mainHtml.replace(/staginggpt/g, "stagelumen");
    mainHtml = mainHtml.replace(/james@stagelumen\.com/g, "support@stagelumen.com");
    // Generate a simple TSX file
    let tsx = `export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      ${mainHtml}
    </main>
  );
}`;
    // Replace class= with className=
    tsx = tsx.replace(/class=/g, "className=");
    // Replace charSet with charSet
    // Some tags might need self-closing like <hr> -> <hr /> but mainHtml might be valid HTML. Let's hope it parses as JSX.
    // If not we will fix it.
    
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, tsx);
  }
}

extractText('/Users/remi/.gemini/antigravity/brain/3b24dfd1-4d00-46e5-bc18-93cd83976bb8/.system_generated/steps/1022/content.md', 'src/app/privacy/page.tsx');
extractText('/Users/remi/.gemini/antigravity/brain/3b24dfd1-4d00-46e5-bc18-93cd83976bb8/.system_generated/steps/1025/content.md', 'src/app/terms/page.tsx');

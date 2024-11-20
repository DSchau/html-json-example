import { serve } from "bun";

let toggle = true; // A flag to alternate responses

// Generate a long JSON object (5 KB of data)
const longJson = {
  title: "This is a JSON response",
  description: "This response contains a lot of data to simulate a 5 KB payload.",
  content: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    text: `This is item number ${i + 1}`,
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  })),
};

const server = serve({
  port: 3000,
  fetch(req) {
    if (toggle) {
      // Return HTML
      toggle = false;
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HTML Response</title>
        </head>
        <body>
          <h1>This is an HTML response!</h1>
          <p>The next request will return a long JSON response.</p>
        </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    } else {
      // Return JSON
      toggle = true;
      return new Response(JSON.stringify(longJson), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});

console.log(`Server is running at http://localhost:3000/`);

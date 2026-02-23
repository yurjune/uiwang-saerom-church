import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  // Rest of the API logic
  console.log(req.body);
  fetch(
    "https://api.vercel.com/v1/integrations/deploy/prj_sEkzsWr1gl1n20SMMn07FUfWkDxK/mZI1kh4i2p",
    {
      method: "POST",
    },
  ).then((r) => res.json({ message: "Hello Everyone!" }));
}

export default handler;

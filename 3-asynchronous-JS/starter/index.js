const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`./dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file.");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// -------------------------------------

// Callback Hell
// fs.readFile(`./dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image saved to file.");
//       });
//     });
// });

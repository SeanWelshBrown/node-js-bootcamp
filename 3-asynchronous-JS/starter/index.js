const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😥");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file 😥");
      resolve("Success!");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file.");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: Ready!";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

/*
console.log("1: Will get dog pics!");
getDogPic()
  .then((x) => {
    console.log(x);
    console.log("3: Done getting dog pics!");
  })
  .catch((err) => {
    console.log("ERROR 💥");
  });
*/

// -------------------------------------

// Creating/Consuming Promises
/*
readFilePro(`./dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file.");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

// -------------------------------------

// Callback Hell
/*
fs.readFile(`./dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file.");
      });
    });
});
*/

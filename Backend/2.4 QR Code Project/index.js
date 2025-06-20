/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qrImage from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            name: "URL",
            message: "What URL would you like to generate a QR code for?",
        },
    ])
    .then((answers) => {
        const { URL } = answers;
        var qr_png = qrImage.image(URL, { type: "png" });
        qr_png.pipe(fs.createWriteStream("qr-img.png"));
        fs.writeFile("URL.txt", URL, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");
        } else {
            console.error("Something else went wrong:", error);
        }
    });
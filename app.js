//Gets PSNjs and file system modules
const PSNjs = require("PSNjs");
const fs = require("fs");

//Type in your own PSN account information
const psn = new PSNjs ({
    email: "xxxxxxxxxxx",
    password: "xxxxxxxxxxxxxx",
});

//Gets PSN info from API. Passes in PSN username as the parameter
function psnProfile(username) {
    psn.getProfile(username, (error, data) => {
        if (error) {
            console.log(error.message);
        }
    //Creates a profile object with the data retrieved from the PSN API    
    const profile = {
        id: data.onlineId,
        avatar: data.avatarUrl,
        region: data.region,
        level: data.trophySummary.level,
        progress: data.trophySummary.progress,
        platinum: data.trophySummary.earnedTrophies.platinum,
        gold: data.trophySummary.earnedTrophies.gold,
        silver: data.trophySummary.earnedTrophies.silver,
        bronze: data.trophySummary.earnedTrophies.bronze
    };
    //Creates the HTML to be written out 
    const contentHTML = `
        <!DOCTYPE html>
            <html>

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <title>PSN Gamer Card</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" type="text/css" href="style.css">
            </head>

            <body>
            
            <div id="profile">
                <div id="banner">
                    <a href="https://www.playstation.com/en-us/network/"><img src="images/psn.png" alt="Playstation Network" id="logo" /></a>
                </div>
            
            <h1 id="name">Real name (or any title you want) goes here</h1>

            <a href="https://my.playstation.com/${profile.id}"><img src="${profile.avatar}" alt="Avatar" id="avatar"></a>
        
            <a href="https://my.playstation.com/${profile.id}"><h3 id="username">${profile.id}</h3></a>

            <ul id="stats">
                <li>Level: ${profile.level}</li>
                <li>Progress: ${profile.progress}%</li> 
                <li>Region: ${profile.region.toUpperCase()}</li>
            </ul>
        
            <ul id="trophies">
                <li><img src="images/platinum.png" alt="Platinum Trophies" /><span>${profile.platinum} Platinum Trophies</span></li>
                <li><img src="images/gold.png" alt="Gold Trophies" /><span>${profile.gold} Gold Trophies</span></li>
                <li><img src="images/silver.png" alt="Silver Trophies" /><span>${profile.silver} Silver Trophies</span></li>
                <li><img src="images/bronze.png" alt="Bronze Trophies" /><span>${profile.bronze} Bronze Trophies</span></li>
            </ul>
            </div>

            </body>
        </html>
`;

    //Writes the HTML to index.html       
    fs.writeFile("index.html", contentHTML, error => {
        if (error) {
            console.log(error.message);
        };
        console.log("Finished!");
        });
    });
}

//Insert PSN username you want to get the profile of. It can be any username, not just your own.
psnProfile("xxxxxxxxxxxxxxxxxx");


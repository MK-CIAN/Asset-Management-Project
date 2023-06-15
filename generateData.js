// This package allows for user input via terminal
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Allows user to select what function they want to use
function main(){
    console.log("\n\nhint: you can either use full function name (GenerateAssets) OR number associated with that function (1). Use 'quit' or 'exit' to quit program.\n");
    console.log("1. GenerateAssets")

    console.log("\n");
    
    selectFunction();
}
function selectFunction(){
    rl.question("- ",(userChoice) => {
        userChoice = userChoice.toLowerCase();

        switch(userChoice) {
            case "1":
            case "generateassets":
                rl.question("Do you need to create tables as well? (yes/no): ", (userAnswer) => {
                    var uA = false;
                    userAnswer = userAnswer.toLowerCase();
                    if(userAnswer == "yes"){
                        uA = true;
                    }

                    rl.question("How many data points do you want to generate? (int): ", (amount) => {
                        console.log("\n\n");
                        generateAssets(amount, uA);
                        selectFunction();
                    });
                })

                break;

            case "quit":
            case "exit":
                rl.close();
                return;
            default:
                console.log("Invalid choice");
                selectFunction();
                break;
        }
    });
}
main();


/// Database Logic below ///
var employees;
var assets = "";

// Creates dummy data for assets
function generateAssets(amount, createTableChoice){
    if (amount == null) amount = 1;

    // Creates Assets Table if user selected 'yes'
    if(createTableChoice) {
    assets = 
        "CREATE TABLE `Assets` (`AssetID` int NOT NULL, \
        `SerialNum` varchar(20) NOT NULL, \
        `AssetStatus` varchar(30) NOT NULL, \
        `AssetType` varchar(20) NOT NULL, \
        `AssetName` varchar(40) NOT NULL, \
        `Keyboard` varchar(4) NOT NULL, \
        PRIMARY KEY (`AssetID`) \
        ); \n\n";
    }


    assets += 'INSERT INTO Assets (AssetID, SerialNum, AssetStatus, AssetType, AssetName, Keyboard) VALUES';

    // Creates data to be put into the assets table
    for(amount; amount > 0; amount--){
        var _id = generateID();
        var _serialNum = generateSerialNum();
        // var _assetStatus = generateAssetStatus();
        // var _assetType = generateAssetType();
        var _assetName = generateAssetName();
        var _keyboard = generateKeyboard();


        assets += "(" + _id + ", \'" + _serialNum + "\', 'Recycled', 'LAPTOP', \'" + _assetName + "\', '"+ _keyboard + "')";
        if(amount > 1){
            assets += ", "
        }
    }
    assets += ";";
    console.log(assets);
}

// Generates an ID for asset, range includes 1 to 999,999,999
function generateID(){
    return Math.floor(Math.random()*999999999);
}

// Generates a serial number with equal weights to letters and numbers (50% chance of having letters = numbers)
function generateSerialNum(){
    // 65 - 90 is  A to Z
    var result = "";

    for(i = 10; i > 0; i--){
        // Generates random number, either 0 or 1. If number is 0 then we append a Letter next, otherwise we append a Number
        var choice = Math.floor(Math.random()*2);    

        if(choice == 0) {
            result += Math.floor(Math.random()*10);
        } else {
            result += String.fromCharCode(Math.floor(Math.random()*25)+65);
        }
    }
    return result;
}

// Picks a random name from this list
function generateAssetName(){
    let  list = [
        "MACBOOK AIR M2",
        "DELL XPS 13 2019",
        "HP ENVY 2020",
        "LENOVO THINKPAD 2021",
        "DELL XPS 13 2020",
        "MACBOOK AIR 2019",
        "HP ENVY 2021",
        "LENOVO THINKPAD 2020",
        "DELL XPS 13 2021",
        "MACBOOK AIR 2021",
        "LENOVO THINKPAD 2019",
        "HP ENVY 2019",
        "MACBOOK AIR 2020",
        "LENOVO THINKPAD 2020",
        "DELL XPS 13 2020",
        "MACBOOK AIR M2",
        "LENOVO THINKPAD 2019",
        "DELL XPS 13 2019",
        "HP ENVY 2020",
        "LENOVO THINKPAD 2021",
        "DELL XPS 13 2020",
        "MACBOOK AIR 2019",
        "HP ENVY 2021",
        "LENOVO THINKPAD 2020",
        "DELL XPS 13 2021",
        "MACBOOK AIR 2021",
        "LENOVO THINKPAD 2019",
        "HP ENVY 2019",
        "MACBOOK AIR 2020",
        "LENOVO THINKPAD 2020"
      ];

    // Picks a random name from the list above
    var choice = Math.floor(Math.random() * list.length);

    return list[choice];
}

// Generates a random keyboard keycode associated with a language
function generateKeyboard() {
    var list = [
        "EN", "US", "FR", "DE", "ES", "IT", "PT", "RU", "CN", "JP", "KR"];
    
    // Picks a random keyboard from the list above
    var choice = Math.floor(Math.random() * list.length);

    return list[choice];
}
document.getElementById('randomChampionButton').addEventListener('click', getRandomChampion);

// Example champion-to-lane mapping (you'll need to expand and update this based on the current meta)
const laneChampionMapping = {
    'Top': [
        "Aatrox",
        "Akali",
        "Camille",
        "Cassiopeia",
        "Chogath",
        "Darius",
        'DrMundo',
        "Fiora",
        "Gangplank",
        "Garen",
        "Gnar",
        "Gwen",
        "Hecarim",
        "Heimerdinger",
        "Illaoi",
        "Irelia",
        "Jax",
        "Jayce",
        "Karma",
        "Kayle",
        "Kennen",
        "Kled",
        "Lillia",
        "Lucian",
        "Malphite",
        "Maokai",
        "Mordekaiser",
        "Nasus",
        "Nocturne",
        "Olaf",
        "Ornn",
        "Pantheon",
        "Poppy",
        "Quinn",
        "Renekton",
        "Rengar",
        "Riven",
        "Rumble",
        "Ryze",
        "Sett",
        "Shen",
        "Singed",
        "Sion",
        "Sylas",
        "Teemo",
        "Tryndamere",
        "Urgot",
        "Vayne",
        "Vladimir",
        "Volibear",
        "MonkeyKing", // Updated from "Wukong"
        "Yasuo",
        "Yorick",
        "Zac",
        'KSante'
    ],
    'Mid': [
        "Aatrox",
        'Ahri',
        "Akali",
        "Akshan",
        "Anivia",
        "Annie",
        "AurelionSol", // Updated from "Aurelion Sol"
        "Azir",
        "Camille",
        "Cassiopeia",
        "Chogath", // Updated from "Cho'Gath"
        "Corki",
        "Diana",
        "Ekko",
        "Fizz",
        "Galio",
        "Garen",
        "Heimerdinger",
        "Irelia",
        "Ivern",
        "Jayce",
        "Kassadin",
        "Katarina",
        "Leblanc", // Updated from "LeBlanc"
        "Lillia",
        "Lissandra",
        "Lucian",
        "Lux",
        "Malphite",
        "Malzahar",
        "Neeko",
        "Nocturne",
        "Nunu",
        "Orianna",
        "Pantheon",
        "Pyke",
        "Qiyana",
        "Ryze",
        "Renekton",
        "Rumble",
        "Swain",
        "Sylas",
        "Syndra",
        "Talon",
        "TwistedFate", // Updated from "Twisted Fate"
        "Veigar",
        "Velkoz", // Updated from "Vel'Koz"
        "Viktor",
        "Vladimir",
        "Xerath",
        "Yasuo",
        "Zed",
        "Ziggs",
        "Zilean",
        "Zoe",
        'Smolder',
        'Hwei',
        'Naafiri'
    ],
    'Adc': [
        "Aphelios",
        "Ashe",
        "Caitlyn",
        "Corki",
        "Draven",
        "Ezreal",
        "Graves",
        "Jhin",
        "Jinx",
        "Kaisa",
        "Kalista",
        "Kindred",
        "KogMaw", // Updated from "Kog'Maw"
        "Lucian",
        "MissFortune", // Updated from "Miss Fortune"
        "Samira",
        "Senna",
        "Quinn",
        "Sivir",
        "Tristana",
        "Twitch",
        "Varus",
        "Vayne",
        "Xayah",
        'Smolder',
        'Nilah'
    ],
    'Jungle': [
        "Amumu",
        "Diana",
        "DrMundo",
        "Ekko",
        "Elise",
        "Evelynn",
        "Fiddlesticks",
        "Gragas",
        "Graves",
        "Hecarim",
        "Ivern",
        "JarvanIV", // Updated to "JarvanIV"
        "Jax",
        "Karthus",
        "Kayn",
        "Khazix", // Updated to "Khazix"
        "Kindred",
        "Kled",
        "LeeSin", // Updated to "LeeSin"
        "Lillia",
        "MasterYi", // Updated to "MasterYi"
        "Nidalee",
        "Nocturne",
        "Nunu",
        "Olaf",
        "Poppy",
        "Rammus",
        "RekSai", // Updated to "RekSai"
        "Rengar",
        "Sejuani",
        "Sett",
        "Shaco",
        "Shyvana",
        "Skarner",
        "Sylas",
        "Taliyah",
        "Trundle",
        "Udyr",
        "Vi",
        "Viego",
        "Volibear",
        "Warwick",
        "MonkeyKing", // Added "MonkeyKing" for Wukong
        "XinZhao", // Updated to "XinZhao"
        "Zac",
        'Briar',
        'Naafiri',
        'Belveth'
    ], 
    'Support': [
        "Alistar",
        "Bard",
        "Blitzcrank",
        "Brand",
        "Braum",
        "Galio",
        "Janna",
        "Karma",
        "Leona",
        "Lulu",
        "Lux",
        "Malphite",
        "Maokai",
        "Morgana",
        "Nami",
        "Nautilus",
        "Pantheon",
        "Poppy",
        "Pyke",
        "Rakan",
        "Renata",
        "Senna",
        "Sett",
        "Shaco",
        "Shen",
        "Sona",
        "Soraka",
        "Swain",
        "TahmKench", // Updated to "TahmKench"
        "Taric",
        "Thresh",
        "Velkoz", // Updated to "Velkoz"
        "Xerath",
        "Yuumi",
        "Zac",
        "Zilean",
        "Zyra",
        'Hwei',
        'Seraphine',
        'Milio'
    ],
    'Test': [
        "KogMaw"
    ]
};

async function getRandomChampion() {
    const apiKey = 'RGAPI-47a944c2-5eb9-4130-b8d6-14b9f51be46f';
    const selectedLane = document.getElementById('laneSelect').value;
    const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions = await versionResponse.json();
    const currentVersion = versions[0]; // Get the latest version

    const championResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`);
    const championData = await championResponse.json();
    let champions = Object.values(championData.data); // Convert champion data to an array

    if (selectedLane !== "All") {
        const filteredChampionNames = laneChampionMapping[selectedLane];
        champions = champions.filter(champion => filteredChampionNames.includes(champion.id));
    }

    if (champions.length === 0) {
        alert("No champions found for the selected lane.");
        return;
    }

    const randomChampion = champions[Math.floor(Math.random() * champions.length)]; // Pick a random champion

    document.getElementById('championName').textContent = randomChampion.name; // Display the champion's name
    document.getElementById('championImage').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion.id}_0.jpg`; // Display the champion's image
    document.getElementById('championContainer').style.display = 'block'; // Show the container
}

// async function logAllChampionIDs() {
//     const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
//     const versions = await versionResponse.json();
//     const currentVersion = versions[0]; // Get the latest version

//     const championResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`);
//     const championData = await championResponse.json();
//     const champions = Object.values(championData.data); // Convert champion data to an array

//     // Log each champion ID
//     champions.forEach(champion => {
//         console.log(champion.id);
//     });

//     // Alternatively, you can store the IDs in an array or object for further processing
//     const championIDs = champions.map(champion => champion.id);
//     console.log(championIDs);
// }

// logAllChampionIDs();

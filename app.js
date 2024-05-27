document.getElementById('randomChampionButton').addEventListener('click', getRandomChampions);

const laneChampionMapping = {
    'Top': ["Aatrox", "Akali", "Camille", "Chogath", "Darius", 'DrMundo', "Fiora", "Gangplank", "Garen", "Gnar", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Kayle", "Kennen", "Kled", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Sett", "Shen", "Singed", "Sion", "Teemo", "Tryndamere", "Urgot", "Vayne", "Volibear", "Yorick", 'KSante'],
    'Mid': ['Ahri', "Akali", "Akshan", "Anivia", "Annie", "AurelionSol", "Azir", "Camille", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio", "Irelia","Jayce", "Kassadin", "Katarina", "Leblanc", "Lissandra", "Lucian", "Lux", "Malzahar", "Neeko", "Orianna", "Pantheon", "Qiyana", "Ryze", "Swain", "Sylas", "Syndra", "TwistedFate", "Veigar", "Velkoz", "Viktor", "Vladimir", "Xerath", "Yasuo", "Zed", "Ziggs", "Zoe", 'Smolder', 'Hwei', 'Naafiri', 'Yone', 'Vex'],
    'Adc': ["Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa", "Kalista", "KogMaw", "Lucian", "MissFortune", "Samira", "Senna", "Sivir", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", 'Smolder', 'Nilah', 'Zeri'],
    'Jungle': ["Amumu", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "JarvanIV", "Jax", "Kayn", "Khazix", "Kindred", "Kled", "LeeSin", "Lillia", "MasterYi", "Nidalee", "Nocturne", "Nunu", "Poppy", "Rammus", "RekSai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Sylas", "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "MonkeyKing", "XinZhao", "Zac", 'Briar', 'Naafiri', 'Belveth'],
    'Support': ["Alistar", "Bard", "Blitzcrank", "Brand", "Braum", "Galio", "Janna", "Karma", "Leona", "Lulu", "Lux", "Malphite", "Maokai", "Morgana", "Nami", "Nautilus", "Pantheon", "Poppy", "Pyke", "Rakan", "Renata", "Senna", "Sett", "Shaco", "Shen", "Sona", "Soraka", "Swain", "TahmKench", "Taric", "Thresh", "Velkoz", "Xerath", "Yuumi", "Zac", "Zilean", "Zyra", 'Hwei', 'Seraphine', 'Milio', 'Rell'],
};

async function getRandomChampions() {
    const selectedLanes = Array.from(document.querySelectorAll('#laneSelection input:checked')).map(checkbox => checkbox.value);
    const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions = await versionResponse.json();
    const currentVersion = versions[0];

    const championResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`);
    const championData = await championResponse.json();
    let champions = Object.values(championData.data);

    if (selectedLanes.length > 0) {
        const filteredChampions = [];
        selectedLanes.forEach(lane => {
            const laneChampions = laneChampionMapping[lane];
            filteredChampions.push(...champions.filter(champion => laneChampions.includes(champion.id)).map(champion => ({ ...champion, lane })));
        });
        champions = filteredChampions;
    }

    if (champions.length < 5) {
        alert("Not enough champions found for the selected lanes.");
        return;
    }

    const randomChampions = [];
    while (randomChampions.length < 5) {
        const randomChampion = champions[Math.floor(Math.random() * champions.length)];
        if (!randomChampions.find(champ => champ.id === randomChampion.id)) {
            randomChampions.push(randomChampion);
        }
    }

    randomChampions.forEach((champion, index) => {
        document.getElementById(`championName${index + 1}`).textContent = champion.name;
        document.getElementById(`championImage${index + 1}`).src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
        document.getElementById(`championLane${index + 1}`).textContent = `Lane: ${champion.lane}`;
        if (index === 0) {
            document.body.style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg')`;
        }
    });

    document.querySelectorAll('.championContainer').forEach(container => container.style.display = 'block');
}

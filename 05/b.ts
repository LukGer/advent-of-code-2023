const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

const seeds: { start: number, count: number }[] = [];
const seedsToSoil: { originStart: number, destStart: number, count: number }[] = [];
const soilToFertilizer: { originStart: number, destStart: number, count: number }[] = [];
const fertilizerToWater: { originStart: number, destStart: number, count: number }[] = [];
const waterToLight: { originStart: number, destStart: number, count: number }[] = [];
const lightToTemperature: { originStart: number, destStart: number, count: number }[] = [];
const temperatureToHumidity: { originStart: number, destStart: number, count: number }[] = [];
const humidityToLocation: { originStart: number, destStart: number, count: number }[] = [];

let currentArray = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 0) {
        const seedsLine = line.substring(line.indexOf(":") + 1, line.length).split(" ").filter((s) => s !== "").map(x => parseInt(x));

        for (let y = 0; y < seedsLine.length; y += 2) {
            seeds.push({ start: seedsLine[y], count: seedsLine[y + 1] });
        }

        continue;
    }

    if (line === "") {
        continue;
    }

    if (line.startsWith("seed-to-soil")) {
        currentArray = seedsToSoil;
        continue;
    } else if (line.startsWith("soil-to-fertilizer")) {
        currentArray = soilToFertilizer;
        continue;
    } else if (line.startsWith("fertilizer-to-water")) {
        currentArray = fertilizerToWater;
        continue;
    } else if (line.startsWith("water-to-light")) {
        currentArray = waterToLight;
        continue;
    } else if (line.startsWith("light-to-temperature")) {
        currentArray = lightToTemperature;
        continue;
    } else if (line.startsWith("temperature-to-humidity")) {
        currentArray = temperatureToHumidity;
        continue;
    } else if (line.startsWith("humidity-to-location")) {
        currentArray = humidityToLocation;
        continue;
    }

    const [destStart, originStart, count] = line.split(" ").filter((s) => s !== "").map(x => parseInt(x));

    currentArray.push({ originStart, destStart, count });
}

const seedToLocation: { seed: number, location: number }[] = [];

let minSeedToLocation = { seed: 0, location: 0 };

for (const { start, count } of seeds) {

    for (let i = 0; i < count; i++) {
        const seed = start + i;
        const soilMapEntry = seedsToSoil.find(x => x.originStart <= seed && x.originStart + x.count > seed);
        const soil = !soilMapEntry ? seed : seed - soilMapEntry.originStart + soilMapEntry.destStart;
        const fertilizerMapEntry = soilToFertilizer.find(x => x.originStart <= soil && x.originStart + x.count > soil);
        const fertilizer = !fertilizerMapEntry ? soil : soil - fertilizerMapEntry.originStart + fertilizerMapEntry.destStart;
        const waterMapEntry = fertilizerToWater.find(x => x.originStart <= fertilizer && x.originStart + x.count > fertilizer);
        const water = !waterMapEntry ? fertilizer : fertilizer - waterMapEntry.originStart + waterMapEntry.destStart;
        const lightMapEntry = waterToLight.find(x => x.originStart <= water && x.originStart + x.count > water);
        const light = !lightMapEntry ? water : water - lightMapEntry.originStart + lightMapEntry.destStart;
        const temperatureMapEntry = lightToTemperature.find(x => x.originStart <= light && x.originStart + x.count > light);
        const temperature = !temperatureMapEntry ? light : light - temperatureMapEntry.originStart + temperatureMapEntry.destStart;
        const humidityMapEntry = temperatureToHumidity.find(x => x.originStart <= temperature && x.originStart + x.count > temperature);
        const humidity = !humidityMapEntry ? temperature : temperature - humidityMapEntry.originStart + humidityMapEntry.destStart;
        const locationMapEntry = humidityToLocation.find(x => x.originStart <= humidity && x.originStart + x.count > humidity);
        const location = !locationMapEntry ? humidity : humidity - locationMapEntry.originStart + locationMapEntry.destStart;


        if (minSeedToLocation.location === 0 || location < minSeedToLocation.location) {
            console.log("New min location found: ", location);
            minSeedToLocation = { seed, location };
        }
    }
}

const minLocation = minSeedToLocation.location

console.log(minLocation);
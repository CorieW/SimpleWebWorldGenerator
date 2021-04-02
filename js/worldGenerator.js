class WorldGenerator
{
    constructor(width, height, settings)
    {
        this.width = width
        this.height = height
        this.settings = settings
    }

    generateWorldInfo()
    {
        const heightMap = WorldGenMath.advNoise(this.settings.heightSettings)
        const climate = new Climate(this.settings.climateSettings)
        const biomeMap = WorldGenMath.advNoise(this.settings.biomeSettings)
        
        return {
            heightMap: heightMap,
            climate: climate,
            biomeMap: biomeMap
        }
    }

    generateWorld()
    {
        const {heightMap, climate, biomeMap} = this.generateWorldInfo()

        const climateMap = climate.generateClimateMap()
        const pixels = new Array(this.width)

        for (let x = 0; x < this.width; x++)
        {
            pixels[x] = new Array(this.height)

            for (let y = 0; y < this.height; y++)
            {
                // Apply the fadeoff to the height map noise.
                heightMap[x][y] = this.getFadeoffValue(x, y, 0.5) * heightMap[x][y]

                climateMap[x][y] = climate.getAltitudeTemp(heightMap[x][y], climateMap[x][y])
        
                for (let biomeIndice in this.settings.biomes) 
                {
                    let biome = this.settings.biomes[biomeIndice]
                
                    // Height is too low or too high.
                    if (heightMap[x][y] < biome.minHeight || heightMap[x][y] > biome.maxHeight) continue
                    // Biome value is too low or too high.
                    if (biomeMap[x][y] < biome.minBiomeVal || biomeMap[x][y] > biome.maxBiomeVal) continue
                    // Climate value is too low or too high.
                    if (climateMap[x][y] < biome.minClimate || climateMap[x][y] > biome.maxClimate) continue
        
                    for (let layerIndice in biome.layers)
                    {
                        let layer = biome.layers[layerIndice]
        
                        let minHeight = layerIndice > 0 ? biome.layers[layerIndice - 1].maxHeight : 0
                        let maxHeight = layer.maxHeight
        
                        if (heightMap[x][y] < minHeight || heightMap[x][y] > maxHeight) continue
        
                        let lerpedClimate = 1 - WorldGenMath.invLerp(biome.minClimate, biome.maxClimate, climateMap[x][y])
                        let lerpedBiome = 1 - WorldGenMath.invLerp(biome.minBiomeVal, biome.maxBiomeVal, biomeMap[x][y])
                        let lerpedHeight = WorldGenMath.invLerp(minHeight, maxHeight, heightMap[x][y])
        
                        layer.heightShaded = layer.heightShaded === undefined ? true : layer.heightShaded
        
                        let lowestLerpedValue = 1
                        if (layer.heightShaded && lerpedHeight < lowestLerpedValue)
                            lowestLerpedValue = lerpedHeight
                        if (layer.climateShaded && lerpedClimate < lowestLerpedValue)
                            lowestLerpedValue = lerpedClimate
                        if (layer.biomeShaded && lerpedBiome < lowestLerpedValue)
                            lowestLerpedValue = lerpedBiome
            
                        pixels[x][y] = (x, y, Utils.getLerpedColor(0, 1, lowestLerpedValue, layer.minColor, layer.maxColor))            
                        break;
                    }
                    break;
                }
            }
        }

        return pixels
    }

    getFadeoffValue(x, y, startPerc)
    {
        // Middle of map.
        let midX = this.width / 2
        let midY = this.height / 2
    
        // Distance from middle of map.
        let xDist = Math.abs(x - midX)
        let yDist = Math.abs(y - midY)
    
        // Get the fadeoff value.
        let xFadeOffVal = xDist / midX //clamp01(invLerp(startPerc, 1, xDist / midX))
        let yFadeOffVal = yDist / midY //clamp01(invLerp(startPerc, 1, yDist / midY))
        let totFadeOffVal = WorldGenMath.invLerp(startPerc, 1, (xFadeOffVal * xFadeOffVal) + (yFadeOffVal * yFadeOffVal))
    
        return WorldGenMath.clamp01(1 - totFadeOffVal)
    }
}
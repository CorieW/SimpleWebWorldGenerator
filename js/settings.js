// Settings
//      Biomes
//          Layers:
//              minColor : The minimum color that the layer will be represented as.
//              maxColor : The maximum color that the layer will be represented as.
//              heightShaded (true by default) : Determines whether the color is effected by the height value. For example, the higher, the nearer the the color be to maxColor.
//              climateShaded : Determines whether the color is effected by the climate value. For example, near the edge the color will fade.
//              biomeShaded : Same as climateShaded but for the biome value.
function getSettings() 
{
    return (
        {
            heightSettings: {
                width: Number.parseFloat($('#width-input')[0].value),
                height: Number.parseFloat($('#height-input')[0].value),
                offset: { 
                    x: Number.parseFloat($('#xOffset-input')[0].value),
                    y: Number.parseFloat($('#yOffset-input')[0].value)
                },
                seed: Number.parseInt($('#height-seed-input')[0].value),
                scale: Number.parseFloat($('#height-scale-input')[0].value),
                octaves: Number.parseFloat($('#height-octaves-input')[0].value),
                multiplier: Number.parseFloat($('#height-multiplier-input')[0].value),
                persistence: Number.parseFloat($('#height-persistence-input')[0].value),
                lacunarity: Number.parseFloat($('#height-lacunarity-input')[0].value)
            },
            climateSettings: {
                width: Number.parseFloat($('#width-input')[0].value),
                height: Number.parseFloat($('#height-input')[0].value),
                eqY: Number.parseFloat($('#climate-eqY-input')[0].value),
                eqSize: Number.parseFloat($('#climate-eqSize-input')[0].value),
                tempMultiplier: Number.parseFloat($('#climate-tempMultiplier-input')[0].value),
                tempDropRate: Number.parseFloat($('#climate-tempDropRate-input')[0].value),
                tempHeightDropRate: Number.parseFloat($('#climate-tempHeightDropRate-input')[0].value)
            },
            biomeSettings: {
                width: Number.parseFloat($('#width-input')[0].value),
                height: Number.parseFloat($('#height-input')[0].value),
                offset: { 
                    x: Number.parseFloat($('#xOffset-input')[0].value),
                    y: Number.parseFloat($('#yOffset-input')[0].value)
                },
                seed: Number.parseFloat($('#biome-seed-input')[0].value),
                scale: Number.parseFloat($('#biome-scale-input')[0].value),
                octaves: Number.parseFloat($('#biome-octaves-input')[0].value),
                multiplier: Number.parseFloat($('#biome-multiplier-input')[0].value),
                persistence: Number.parseFloat($('#biome-persistence-input')[0].value),
                lacunarity: Number.parseFloat($('#biome-lacunarity-input')[0].value)
            },    
            biomes: [
                { // Sea
                    minHeight: 0,
                    maxHeight: 0.6,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0.1,
                    maxClimate: 1,
                    layers: [
                        { // Deep Sea
                            maxHeight: 0.3,
                            minColor: { r: 0, g: 110, b: 168, a: 255 }, // { r: 0, g: 90, b: 138, a: 255 }
                            maxColor: { r: 0, g: 110, b: 168, a: 255 }
                        },
                        { // Sea
                            maxHeight: 0.57,
                            minColor: { r: 0, g: 133, b: 204, a: 255 },
                            maxColor: { r: 0, g: 133, b: 204, a: 255 }
                        },
                        { // Shallow Water
                            maxHeight: 0.6,
                            minColor: { r: 0, g: 162, b: 216, a: 255 },
                            maxColor: { r: 0, g: 162, b: 216, a: 255 }
                        }
                    ]
                },
                { // Desert
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0.9,
                    maxClimate: 1,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 232, g: 224, b: 132, a: 255 },
                            maxColor: { r: 232, g: 224, b: 132, a: 255 }
                        }
                    ]
                },
                { // Desert
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0.5,
                    maxBiomeVal: 1,
                    minClimate: 0.8,
                    maxClimate: 1,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 232, g: 224, b: 132, a: 255 },
                            maxColor: { r: 232, g: 224, b: 132, a: 255 }
                        }
                    ]
                },
                { // Desert
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0.7,
                    maxBiomeVal: 1,
                    minClimate: 0.7,
                    maxClimate: 1,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 232, g: 224, b: 132, a: 255 },
                            maxColor: { r: 232, g: 224, b: 132, a: 255 }
                        }
                    ]
                },
                { // Tropical
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 0.5,
                    minClimate: 0.7,
                    maxClimate: 0.9,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 26, g: 159, b: 0, a: 255 },
                            maxColor: { r: 26, g: 159, b: 0, a: 255 }
                        }
                    ]
                },
                { // Temperate
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0.4,
                    maxClimate: 0.8,
                    layers: [
                        { // Grassland
                            maxHeight: 1,
                            minColor: { r: 118, g: 200, b: 53, a: 255 },
                            maxColor: { r: 118, g: 200, b: 53, a: 255 }
                        }
                    ]
                },
                { // Boreal
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0.2,
                    maxClimate: 0.4,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 0, g: 107, b: 75, a: 255 },
                            maxColor: { r: 0, g: 107, b: 75, a: 255 }
                        }
                    ]
                },
                { // Tundra
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0.1,
                    maxClimate: 0.2,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 208, g: 235, b: 243, a: 255 },
                            maxColor: { r: 208, g: 235, b: 243, a: 255 }
                        }
                    ]
                },
                { // Arctic Ice
                    minHeight: 0,
                    maxHeight: 0.6,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0,
                    maxClimate: 0.1,
                    layers: [
                        { // Deep Sea
                            maxHeight: 0.3,
                            minColor: { r: 0, g: 110, b: 168, a: 255 },
                            maxColor: { r: 0, g: 110, b: 168, a: 255 }
                        },
                        { // Sea
                            maxHeight: 0.57,
                            minColor: { r: 0, g: 133, b: 204, a: 255 },
                            maxColor: { r: 0, g: 133, b: 204, a: 255 }
                        },
                        { // Near Shore
                            maxHeight: 0.6,
                            minColor: { r: 0, g: 208, b: 255, a: 255 },
                            maxColor: { r: 0, g: 208, b: 255, a: 255 }
                        }
                    ]
                },
                { // Arctic
                    minHeight: 0.6,
                    maxHeight: 1,
                    minBiomeVal: 0,
                    maxBiomeVal: 1,
                    minClimate: 0,
                    maxClimate: 0.1,
                    layers: [
                        { // Land
                            maxHeight: 1,
                            minColor: { r: 255, g: 255, b: 255, a: 255 },
                            maxColor: { r: 255, g: 255, b: 255, a: 255 }
                        }
                    ]
                }
            ]
        }
    )
}
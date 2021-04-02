class Climate
{
    // Params:
    // width - The width of the climate map.
    // height - The height of the climate map.
    // eqY - The Y of the equator, measured in percentage.
    // eqSize - The size of equator.
    // tempMultiplier - Increases or decreases the global temperature. Higher the value, the higher the temperature.
    // tempDropRate - The rate at which the temperature drops off.
    // tempHeightDropRate - The rate at which the temperature drops as the altitude increases.
    // tempVar - The temperatures variability. The higher the value, the faster the temperature changes below or above the equator.
    // Todo: Add tilt.
    constructor(settings)
    {
        this.width = settings.width
        this.height = settings.height
        this.eqY = settings.eqY
        this.eqSize = settings.eqSize
        this.tempMultiplier = settings.tempMultiplier
        this.tempDropRate = settings.tempDropRate
        this.tempHeightDropRate = settings.tempHeightDropRate
        //this.tempVar = settings.tempVar // Todo: Use this with noise.
    }

    generateClimateMap()
    {
        let climateMap = new Array(this.width)

        for (let x = 0; x < this.width; x++)
        {
            climateMap[x] = new Array(this.height)

            for (let y = 0; y < this.height; y++)
            {
                climateMap[x][y] = this.getClimate1D(y)
            }
        }

        return climateMap
    }

    // This function gets the temperature for a Y coordinate.
    // Params:
    // y - The Y coordinate to get the value for.
    getClimate1D(y)
    {
        let yDist = Math.abs(y - WorldGenMath.lerp(0, this.height, this.eqY))

        let eqSize = WorldGenMath.lerp(0, this.height, this.eqSize)

        let temp = WorldGenMath.invLerp(eqSize / 2, this.height / 2, yDist)
        temp = temp * this.tempDropRate
        temp = 1 - WorldGenMath.clamp01(temp)
        temp = temp * this.tempMultiplier
        
        return WorldGenMath.clamp01(temp)
    }

    getAltitudeTemp(height, climate)
    {
        return WorldGenMath.clamp01(climate - (height * this.tempHeightDropRate))
    }
}
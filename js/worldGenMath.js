class WorldGenMath
{
    static clamp(min, max, val)
    {
        return Math.max(min, Math.min(val, max));
    }

    static clamp01(val)
    {
        return this.clamp(0, 1, val)
    }

    static lerp(min, max, perc)
    {
        return (1 - perc) * min + max * perc
    }

    static invLerp(min, max, val)
    {
        return (val - min) / (max - min)
    }

    static advNoise(settings)
    {
        let { seed, width, height, scale, octaves, multiplier, persistence, lacunarity, offset = { x: 0, y: 0 }, normalizeMode } = settings

        if (scale <= 0) scale = 0.0001
        
        if (normalizeMode === String) normalizeMode = normalizeMode.toLowerCase()
        if (normalizeMode !== 'global' || normalizeMode !== 'local') normalizeMode = 'local'

        let octaveOffsets = new Array(octaves)

        let maxVal = 0
        let frequency = 1
        let amplitude = 1

        for (let i = 0; i < octaves; i++) 
        {
            let offsetX = seed + offset.x
            let offsetY = seed + offset.y
            octaveOffsets[i] = { x: offsetX, y: offsetY }

            maxVal += amplitude
            amplitude *= persistence
        }

        let noiseMap = new Array(width);

        let minLocalVal = 9999999
        let maxLocalVal = -9999999

        let halfWidth = width / 2
        let halfHeight = height / 2

        for (let x = 0; x < width; x++)
        {
            noiseMap[x] = new Array(height)

            for (let y = 0; y < height; y++)
            {
                let noiseHeight = 0
                frequency = 1
                amplitude = 1

                for (let i = 0; i < octaves; i++) 
                {
                    let sampleX = (x - halfWidth + octaveOffsets[i].x) / scale * frequency
                    let sampleY = (y - halfHeight + octaveOffsets[i].y) / scale * frequency

                    let pNoise = noise.perlin2(sampleX, sampleY) * 2 - 1
                    noiseHeight += pNoise * amplitude
                            
                    amplitude *= persistence
                    frequency *= lacunarity
                }

                noiseMap[x][y] = noiseHeight

                if (minLocalVal > noiseMap[x][y]) minLocalVal = noiseMap[x][y]
                if (maxLocalVal < noiseMap[x][y]) maxLocalVal = noiseMap[x][y]
            }
        }

        for (let x = 0; x < width; x++)
        {
            for (let y = 0; y < height; y++)
            {
                if (normalizeMode === 'local')
                    noiseMap[x][y] = this.invLerp(minLocalVal, maxLocalVal, noiseMap[x][y])
                else 
                    noiseMap[x][y] = (noiseMap[x, y] + 1) / (2 * maxValue / 2)
                //noiseMap[x][y] = clamp(min ? min : 0, max ? max : 1, noiseMap[x][y])

                noiseMap[x][y] = this.clamp01(noiseMap[x][y] * multiplier)
            }
        }

        return noiseMap
    }

    // Returns a value between A and B.
    static mergeValues(a, b)
    {
        return (a + b) / 2
    }
}
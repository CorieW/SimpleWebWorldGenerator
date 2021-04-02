class Utils 
{
    static setPixel(id, x, y, colorObj)
    {
        var pixels = id.data

        var off = 4 * (x + y * id.width);
        pixels[off] = colorObj.r
        pixels[off + 1] = colorObj.g
        pixels[off + 2] = colorObj.b
        pixels[off + 3] = colorObj.a
    }

    static getLerpedColor(minVal, maxVal, val, minColor, maxColor)
    {
        let lerpVal = WorldGenMath.invLerp(minVal, maxVal, val)
    
        return {
            r: WorldGenMath.lerp(minColor.r, maxColor.r, lerpVal),
            g: WorldGenMath.lerp(minColor.g, maxColor.g, lerpVal),
            b: WorldGenMath.lerp(minColor.b, maxColor.b, lerpVal),
            a: 255
        }
    }
}
function submitDrawWorld(e)
{
    e.preventDefault()
    drawWorld()
}

function drawWorld() 
{
    const width = $('#width-input')[0].value
    const height = $('#height-input')[0].value
    console.log(getSettings())
    const settings = getSettings()

    // Make an instance of two and place it on the page.
    let canvas = document.getElementById('worldCanvas')
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    var id = ctx.getImageData(0, 0, width, height)

    const worldGenerator = new WorldGenerator(width, height, settings)
    const worldPixels = worldGenerator.generateWorld()

    for (let x = 0; x < width; x++) 
    {
        for (let y = 0; y < height; y++)
        {
            Utils.setPixel(id, x, y, worldPixels[x][y])
        }
    }

    ctx.putImageData(id, 0, 0)
}

drawWorld()

// Ideas
// - Merge the climate map and height map to get an accurate temperature at every elevation.
// - Those height marking things can be created by getting a height and checking to see if it's a specific distance away from a number. 
//   The distance will be filled in with the a 0.5 opacity black pixel to mark elevation change. (Issue is that this will have it's 
//   problems if the noise drops off too fast or slowly, resulting in no line or thick lines.)


// Todo
// - Fix the colours before production.
// - Fade biomes into each other.
// - Don't generate all at one time, as it will lag the page and it's a bad UX. Instead load gradually and show a loading screen.
// - Ability to use both Perlin Noise and Simplex Noise, which ever is chosen.
// - Different ways of drawing the maps, with lines and polygons and such.

// ! Issues
// - Seed just changes offset slightly.
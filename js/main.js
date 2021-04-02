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
# SimpleWebWorldGenerator
Available at: https://web-worldgenerator.netlify.app/

Ideas:
- Merge the climate map and height map to get an accurate temperature at every elevation.
- Those height marking things can be created by getting a height and checking to see if it's a specific distance away from a number. 
The distance will be filled in with the a 0.5 opacity black pixel to mark elevation change. (Issue is that this will have it's 
problems if the noise drops off too fast or slowly, resulting in no line or thick lines.)


Future improvements:
- Fade biomes into each other.
- Don't generate all at one time, as it will lag the page and it's a bad UX. Instead load gradually and show a loading screen.
- Ability to use both Perlin Noise and Simplex Noise, which ever is chosen.
- Different ways of drawing the maps, with lines and polygons and such.
- Responsive to screen sizes or prevent use for specific screen sizes.

Issues:
- Seed just changes offset slightly.

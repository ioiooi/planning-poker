# Card Face Image Generation Brief

Prompt reference for generating 9 animal card face images for a planning poker app.

## Visual style: "Vibrant Minimalist"

- **Art style:** Stylized vector or smooth low-poly 3D. Minimalist, clean, and premium -- think clay/plastic toy render, not realistic fur or skin.
- **Form language:** Geometric and rounded. No sharp edges, no messy textures.
- **Lighting:** Soft global illumination. No harsh black shadows -- objects look like they're lit by soft ambient neon light.
- **Depth:** Subtle 3D feel with soft outer glow, not flat clip-art.
- **Background:** Transparent (PNG). The image floats on the card surface, which changes between light and dark themes.
- **Color approach:** Each animal uses its tier accent as the dominant hue, with subtle gradients for depth. Keep to 2-3 tones per animal -- the primary tier color, a lighter highlight, and a darker shadow tone.
- **Mood:** Friendly, confident, slightly playful. Not cartoonish, not hyper-realistic.

## Tier colors

| Tier   | Hex       | Animals                     |
|--------|-----------|-----------------------------|
| Small  | `#5a9bf0` | Hamster, Cat, Meerkat       |
| Medium | `#9b7fff` | Fox, Wolf, Polar Bear       |
| Large  | `#d070e8` | Hippo, Elephant, Blue Whale |

## Image spec

| Property      | Value                                         |
|---------------|-----------------------------------------------|
| Format        | PNG, transparent background                   |
| Resolution    | 800 x 940 px                                  |
| Safe ratio    | ~5:6 (w:h) -- image content should fit within |
| Max file size | 80 KB per image                               |
| Color space   | sRGB                                          |

The same image is used on both the small grid card (~94px wide at minimum) and the large flip card (~400px wide at maximum). The image must read clearly at thumbnail size -- bold silhouette, high contrast, no fine detail that disappears when small.

## Per-animal prompts

### Small tier -- Blue (`#5a9bf0`)

**1 -- Hamster**
Tiny, round, sitting upright with paws together. Exaggerated cheek poufs. Simple, compact silhouette that reads well even at icon size. Dominant color: soft blue with lighter belly highlight.

**2 -- Cat**
Sitting cat, relaxed posture, tail wrapped around body. Sleek, minimal features -- suggested eyes and ears, not detailed whiskers. Slightly larger presence than the hamster. Dominant color: blue with subtle lavender undertones.

**3 -- Meerkat**
Standing upright on hind legs, alert pose, looking slightly to the side. Tall narrow silhouette -- naturally portrait-oriented, fits the card well. Dominant color: blue with warm sandy highlight on the chest.

### Medium tier -- Purple (`#9b7fff`)

**5 -- Fox**
Three-quarter view, standing or sitting with tail visible. Pointed ears and a bushy tail give it a distinctive silhouette. Confident expression. Dominant color: electric purple with lighter muzzle/chest.

**8 -- Wolf**
Standing proud, head slightly raised. Broader and more muscular than the fox. Fur suggested with smooth gradient zones, not individual strands. Dominant color: deep purple with lighter underside.

**13 -- Polar Bear**
Seated or standing on all fours, facing forward. Massive rounded form. The lightest animal in this tier -- use near-white/ice tones with purple-tinted shadows to tie it to the tier color.

### Large tier -- Magenta (`#d070e8`)

**21 -- Hippo**
Front-facing, slightly open mouth. Wide, heavy, planted silhouette. Rounded and smooth -- the low-poly/clay style suits this animal especially well. Dominant color: soft magenta with darker purple shadows.

**34 -- Elephant**
Side or three-quarter view, trunk slightly raised. Tall silhouette that fills the vertical space well. Large ears and tusks as identifying features, kept geometric. Dominant color: magenta with warm pink highlights on ears.

**55 -- Blue Whale**
Angled view from slightly below, showing the full body arc. The largest animal should feel like it fills the entire safe zone. Smooth, streamlined form with subtle belly grooves. Dominant color: deep magenta-violet with lighter underbelly. A faint bioluminescent glow along the body edges ties it to the neon aesthetic.

## Consistency rules

- All 9 animals should look like they belong to the same set -- same rendering style, same level of detail, same lighting direction.
- Animals face right or forward, never facing away from the viewer.
- No ground plane, no props, no environmental elements. Just the animal, floating.
- Maintain visual size progression: the hamster should feel small and light; the whale should feel massive and heavy -- even though they occupy the same image canvas.

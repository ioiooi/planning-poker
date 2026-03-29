# Card Face Image Requirements

One image per card, reused across the small grid card and the big flip card.

## How it fits

The image replaces the center number. Corner pips (small text showing the card value) stay as overlays.

Both card types share a **5:7 aspect ratio**. The image safe zone -- clear of borders, decorative inset, and pip corners -- is consistently about **5:6 (w:h)** across all viewport sizes.

```
+------------------------------------------+
|  border                                  |
|  +--------------------------------------+|
|  | decorative inset                     ||
|  |  [pip]                               ||
|  |                                      ||
|  |       +------------------------+     ||
|  |       |                        |     ||
|  |       |    SAFE IMAGE ZONE     |     ||
|  |       |      ~ 5:6 ratio      |     ||
|  |       +------------------------+     ||
|  |                                      ||
|  |                            [pip]     ||
|  +--------------------------------------+|
+------------------------------------------+
```

The smallest this zone ever renders is **~94 x 106 px** (small card, 375px mobile viewport).
The largest is **~400 x 470 px** (big card, desktop).

## Image spec

| Property          | Requirement                                              |
|-------------------|----------------------------------------------------------|
| Format            | SVG or PNG with transparency (JPEG acceptable)           |
| Resolution        | 800 x 940 px minimum (covers 2x retina on the big card) |
| Max file size     | 80 KB (all 9 cards load at once in the grid)             |
| Background        | Transparent -- the card surface color varies by theme    |
| Aspect ratio      | Between **1:1 and 3:4 portrait** for best fill           |

Images outside the 1:1 to 3:4 range still work (rendered with `object-fit: contain`, centered), but wider landscapes will appear small with visible padding above and below.

## Key constraints

- **Readability at thumbnail size.** The image must be recognizable at ~94px wide. Favor bold shapes and high contrast over fine detail.
- **Works on light and dark surfaces.** The app has both themes; transparent images sit on `--surface` which changes. Avoid images that rely on a white or dark background to read correctly.
- **No layout shift.** The image container is percentage-based and aspect-ratio locked. The image scales with the card automatically -- no fixed pixel sizes needed.

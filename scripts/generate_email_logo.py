"""Generate the FWP animated email logo from BrandMark.tsx geometry.

The first GIF frame is the complete mark so clients that only display the
first frame still show a useful, branded image. The animation then rebuilds
the mark in the same four phases as the homepage component.
"""

from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "logo"
GIF_PATH = OUT_DIR / "fwp-signature.gif"
EMAIL_GIF_PATH = OUT_DIR / "fwp-signature-transparent-v2.gif"
PNG_PATH = OUT_DIR / "fwp-signature-static.png"

SIZE = 144
SUPERSAMPLE = 4
FPS = 15
FRAME_MS = round(1000 / FPS)

TRANSPARENT = (0, 0, 0, 0)
TEAL = (0, 229, 199)
MID_TEAL = (0, 166, 145)
LOW_TEAL = (0, 105, 93)

# Geometry and opacity values are copied from src/components/BrandMark.tsx.
BLOCKS = [
    (26, 26, 1.00, 1, 0),
    (26, 0, 0.50, 2, 0),
    (0, 26, 0.50, 2, 0),
    (52, 26, 0.50, 2, 0),
    (26, 52, 0.50, 2, 0),
    (0, 0, 1.00, 3, 0),
    (52, 0, 0.22, 3, 2),
    (0, 52, 0.22, 3, 1),
]

STEP_DELAY = 0.56
BLOCK_DURATION = 0.9
BREAKOUT_DURATION = 1.2

INTRO_HOLD = 1.0
INTRO_FADE = 0.27
BLANK_HOLD = 0.20
BUILD_DURATION = 3.05
FINAL_HOLD = 2.5
TOTAL_DURATION = INTRO_HOLD + INTRO_FADE + BLANK_HOLD + BUILD_DURATION + FINAL_HOLD


def cubic_bezier_y(progress: float) -> float:
    """Evaluate Framer Motion's [0.16, 1, 0.3, 1] easing curve."""

    progress = min(1.0, max(0.0, progress))
    x1, y1, x2, y2 = 0.16, 1.0, 0.3, 1.0

    def sample(t: float, a: float, b: float) -> float:
        inv = 1.0 - t
        return 3 * inv * inv * t * a + 3 * inv * t * t * b + t**3

    lo, hi = 0.0, 1.0
    for _ in range(18):
        mid = (lo + hi) / 2
        if sample(mid, x1, x2) < progress:
            lo = mid
        else:
            hi = mid
    return sample((lo + hi) / 2, y1, y2)


def view_to_px(value: float) -> float:
    # BrandMark uses viewBox="-6 -6 108 108".
    return (value + 6) * (SIZE * SUPERSAMPLE / 108)


def draw_square(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    scale: float,
    opacity: float,
    rotation: float = 0.0,
) -> None:
    if opacity <= 0.002 or scale <= 0.002:
        return

    center_x = x + 10
    center_y = y + 10
    half = 10 * scale
    angle = math.radians(rotation)
    cos_a, sin_a = math.cos(angle), math.sin(angle)
    points = []
    for dx, dy in [(-half, -half), (half, -half), (half, half), (-half, half)]:
        rx = center_x + dx * cos_a - dy * sin_a
        ry = center_y + dx * sin_a + dy * cos_a
        points.append((view_to_px(rx), view_to_px(ry)))
    draw.polygon(points, fill=(*TEAL, round(255 * min(1.0, opacity))))


def render_final() -> Image.Image:
    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)
    for x, y, opacity, _step, _stagger in BLOCKS:
        draw_square(draw, x, y, 1.0, opacity)
    draw_square(draw, 64, 64, 1.0, 1.0, 45)
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_build(local_time: float) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)

    for x, y, target_opacity, step, stagger in BLOCKS:
        delay = (step - 1) * STEP_DELAY
        if step == 3:
            delay += stagger * 0.14
        eased = cubic_bezier_y((local_time - delay) / BLOCK_DURATION)
        draw_square(
            draw,
            x,
            y,
            0.6 + 0.4 * eased,
            target_opacity * eased,
        )

    breakout_delay = 3 * STEP_DELAY
    eased = cubic_bezier_y((local_time - breakout_delay) / BREAKOUT_DURATION)
    draw_square(
        draw,
        52 + 12 * eased,
        52 + 12 * eased,
        0.6 + 0.4 * eased,
        eased,
        45 * eased,
    )
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_gif_build(local_time: float) -> Image.Image:
    """Render a cumulative build that works with GIF disposal mode 1.

    Gmail's image proxy collapses transparent animations when every frame asks
    the decoder to clear the canvas. These frames only add or repaint pixels,
    so previous frames can safely remain in place while the mark builds.
    """

    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)

    for x, y, target_opacity, step, stagger in BLOCKS:
        delay = (step - 1) * STEP_DELAY
        if step == 3:
            delay += stagger * 0.14
        eased = cubic_bezier_y((local_time - delay) / BLOCK_DURATION)
        if eased > 0:
            draw_square(draw, x, y, 0.6 + 0.4 * eased, target_opacity)

    breakout_delay = 3 * STEP_DELAY
    eased = cubic_bezier_y((local_time - breakout_delay) / BREAKOUT_DURATION)
    if eased > 0:
        # Grow the final diamond in place. Moving it from the grid would require
        # clearing pixels on every frame, which Gmail's proxy handles poorly.
        draw_square(draw, 64, 64, 0.6 + 0.4 * eased, 1.0, 45)

    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_frame(time_s: float, final_image: Image.Image) -> Image.Image:
    if time_s < INTRO_HOLD:
        return final_image.copy()

    if time_s < INTRO_HOLD + INTRO_FADE:
        fade = 1 - (time_s - INTRO_HOLD) / INTRO_FADE
        faded = final_image.copy()
        faded.putalpha(faded.getchannel("A").point(lambda alpha: round(alpha * fade)))
        return faded

    build_start = INTRO_HOLD + INTRO_FADE + BLANK_HOLD
    if time_s < build_start:
        return Image.new("RGBA", (SIZE, SIZE), TRANSPARENT)

    if time_s < build_start + BUILD_DURATION:
        return render_build(time_s - build_start)

    return final_image.copy()


def rgba_to_transparent_gif_frame(frame: Image.Image) -> Image.Image:
    """Convert RGBA to a clean, transparent GIF-safe brand palette.

    GIF cannot store partial alpha. Mapping the three BrandMark opacity levels
    to solid brand teals keeps the background truly transparent without the
    visible checker/dither pattern that alpha simulation would introduce.
    """

    alpha = frame.getchannel("A")
    indexed = Image.new("P", frame.size, 0)
    indexed.putpalette(
        [0, 0, 0, *LOW_TEAL, *MID_TEAL, *TEAL] + [0, 0, 0] * 252
    )
    source = alpha.load()
    target = indexed.load()
    for y in range(frame.height):
        for x in range(frame.width):
            value = source[x, y]
            if value >= 192:
                target[x, y] = 3
            elif value >= 88:
                target[x, y] = 2
            elif value >= 14:
                target[x, y] = 1
    indexed.info["transparency"] = 0
    return indexed


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    final_image = render_final()
    final_image.save(PNG_PATH, optimize=True)

    build_frame_count = math.ceil(BUILD_DURATION * FPS)
    frames = [
        final_image,
        Image.new("RGBA", (SIZE, SIZE), TRANSPARENT),
        *[
            render_gif_build(i / FPS)
            for i in range(build_frame_count)
        ],
        final_image,
    ]
    gif_frames = [rgba_to_transparent_gif_frame(frame) for frame in frames]
    durations = [1000, 200, *([FRAME_MS] * build_frame_count), 2500]
    # Only the first and last frames clear the canvas. Build frames accumulate,
    # which survives Gmail's GIF proxy instead of being reduced to a blink.
    disposals = [2, 1, *([1] * build_frame_count), 2]

    gif_frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=gif_frames[1:],
        duration=durations,
        loop=0,
        optimize=False,
        transparency=0,
        disposal=disposals,
    )
    # Vercel serves public assets with long-lived caching. Keep a cache-safe
    # filename for the Gmail signature whenever the GIF encoding changes.
    shutil.copyfile(GIF_PATH, EMAIL_GIF_PATH)

    print(f"Created {GIF_PATH} ({GIF_PATH.stat().st_size / 1024:.1f} KiB)")
    print(
        f"Created {EMAIL_GIF_PATH} "
        f"({EMAIL_GIF_PATH.stat().st_size / 1024:.1f} KiB)"
    )
    print(f"Created {PNG_PATH} ({PNG_PATH.stat().st_size / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()

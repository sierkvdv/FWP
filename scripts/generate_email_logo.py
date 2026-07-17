"""Generate the FWP animated email logo from BrandMark.tsx geometry.

The first GIF frame is the complete mark so clients that only display the
first frame still show a useful, branded image. The animation then rebuilds
the mark in the same four phases as the homepage component.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "logo"
GIF_PATH = OUT_DIR / "fwp-signature.gif"
PNG_PATH = OUT_DIR / "fwp-signature-static.png"

SIZE = 144
SUPERSAMPLE = 4
FPS = 15
FRAME_MS = round(1000 / FPS)

BACKGROUND = (10, 10, 12)
TEAL = (0, 229, 199)

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


def mix_color(opacity: float) -> tuple[int, int, int]:
    opacity = min(1.0, max(0.0, opacity))
    return tuple(round(bg + (fg - bg) * opacity) for bg, fg in zip(BACKGROUND, TEAL))


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
    draw.polygon(points, fill=mix_color(opacity))


def render_final() -> Image.Image:
    canvas = Image.new("RGB", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), BACKGROUND)
    draw = ImageDraw.Draw(canvas)
    for x, y, opacity, _step, _stagger in BLOCKS:
        draw_square(draw, x, y, 1.0, opacity)
    draw_square(draw, 64, 64, 1.0, 1.0, 45)
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_build(local_time: float) -> Image.Image:
    canvas = Image.new("RGB", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), BACKGROUND)
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


def render_frame(time_s: float, final_image: Image.Image) -> Image.Image:
    if time_s < INTRO_HOLD:
        return final_image.copy()

    if time_s < INTRO_HOLD + INTRO_FADE:
        fade = 1 - (time_s - INTRO_HOLD) / INTRO_FADE
        blank = Image.new("RGB", (SIZE, SIZE), BACKGROUND)
        return Image.blend(blank, final_image, fade)

    build_start = INTRO_HOLD + INTRO_FADE + BLANK_HOLD
    if time_s < build_start:
        return Image.new("RGB", (SIZE, SIZE), BACKGROUND)

    if time_s < build_start + BUILD_DURATION:
        return render_build(time_s - build_start)

    return final_image.copy()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    final_image = render_final()
    final_image.save(PNG_PATH, optimize=True)

    frame_count = math.ceil(TOTAL_DURATION * FPS)
    frames = [render_frame(i / FPS, final_image) for i in range(frame_count)]

    # A shared palette keeps the GIF compact and prevents color flicker.
    samples = frames[:: max(1, len(frames) // 24)]
    contact_sheet = Image.new("RGB", (SIZE, SIZE * len(samples)), BACKGROUND)
    for index, frame in enumerate(samples):
        contact_sheet.paste(frame, (0, index * SIZE))
    palette = contact_sheet.quantize(colors=96, method=Image.Quantize.MEDIANCUT)
    gif_frames = [
        frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames
    ]

    gif_frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=gif_frames[1:],
        duration=FRAME_MS,
        loop=0,
        optimize=True,
        disposal=1,
    )

    print(f"Created {GIF_PATH} ({GIF_PATH.stat().st_size / 1024:.1f} KiB)")
    print(f"Created {PNG_PATH} ({PNG_PATH.stat().st_size / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()

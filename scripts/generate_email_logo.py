"""Generate the FWP animated email logo from BrandMark.tsx geometry.

The first GIF frame is the complete mark so clients that only display the
first frame still show a useful, branded image. The animation then rebuilds
the mark in the same four phases as the homepage component.
"""

from __future__ import annotations

import math
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "logo"
GIF_PATH = OUT_DIR / "fwp-signature.gif"
EMAIL_GIF_PATH = OUT_DIR / "fwp-signature-transparent-v3.gif"
APNG_PATH = OUT_DIR / "fwp-signature-animated.png"
WEBP_PATH = OUT_DIR / "fwp-signature-animated.webp"
FFMPEG_GIF_PATH = OUT_DIR / "fwp-signature-transparent-v4.gif"
PINGPONG_GIF_PATH = OUT_DIR / "fwp-signature-transparent-v7.gif"
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
    color: tuple[int, int, int] = TEAL,
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
    draw.polygon(points, fill=(*color, round(255 * min(1.0, opacity))))


def opacity_color(opacity: float) -> tuple[int, int, int]:
    if opacity >= 0.75:
        return TEAL
    if opacity >= 0.35:
        return MID_TEAL
    return LOW_TEAL


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
    """Render a Gmail-safe highlight build with fixed opaque footprints.

    Every frame paints the complete mark footprint, first in low teal and then
    in the four BrandMark phases. Frames never need to erase pixels, so the GIF
    can use the same simple disposal mode as the original black-background GIF.
    """

    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)

    # A low-teal silhouette stays present throughout the loop. Brighter blocks
    # then build over it in the same order as the website animation.
    for x, y, _target_opacity, _step, _stagger in BLOCKS:
        draw_square(draw, x, y, 1.0, 0.22)
    draw_square(draw, 64, 64, 1.0, 0.22, 45)

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
        draw_square(draw, 64, 64, 0.6 + 0.4 * eased, 1.0, 45)

    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_solid_gif_final() -> Image.Image:
    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)
    for x, y, opacity, _step, _stagger in BLOCKS:
        draw_square(draw, x, y, 1.0, 1.0, color=opacity_color(opacity))
    draw_square(draw, 64, 64, 1.0, 1.0, 45, TEAL)
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_solid_gif_build(local_time: float) -> Image.Image:
    """Render the original build on transparency with solid brand shades."""

    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)
    for x, y, target_opacity, step, stagger in BLOCKS:
        delay = (step - 1) * STEP_DELAY
        if step == 3:
            delay += stagger * 0.14
        eased = cubic_bezier_y((local_time - delay) / BLOCK_DURATION)
        if eased > 0:
            draw_square(
                draw,
                x,
                y,
                0.6 + 0.4 * eased,
                1.0,
                color=opacity_color(target_opacity),
            )

    breakout_delay = 3 * STEP_DELAY
    eased = cubic_bezier_y((local_time - breakout_delay) / BREAKOUT_DURATION)
    if eased > 0:
        draw_square(
            draw,
            52 + 12 * eased,
            52 + 12 * eased,
            0.6 + 0.4 * eased,
            1.0,
            45 * eased,
            TEAL,
        )
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def render_solid_gif_core(scale: float) -> Image.Image:
    """Render only the centre tile for a smooth zero-to-build transition."""

    canvas = Image.new("RGBA", (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), TRANSPARENT)
    draw = ImageDraw.Draw(canvas)
    if scale > 0:
        draw_square(draw, 26, 26, scale, 1.0, color=TEAL)
    return canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def generate_ffmpeg_gif() -> None:
    """Create a broadly compatible transparent GIF with FFmpeg."""

    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        print("Skipped FFmpeg GIF: ffmpeg not found")
        return

    solid_final = render_solid_gif_final()
    frame_sequence = [solid_final.copy() for _ in range(round(INTRO_HOLD * FPS))]
    frame_sequence += [
        Image.new("RGBA", (SIZE, SIZE), TRANSPARENT)
        for _ in range(round((INTRO_FADE + BLANK_HOLD) * FPS))
    ]
    frame_sequence += [
        render_solid_gif_build(i / FPS)
        for i in range(math.ceil(BUILD_DURATION * FPS))
    ]
    frame_sequence += [
        solid_final.copy() for _ in range(round(FINAL_HOLD * FPS))
    ]

    with tempfile.TemporaryDirectory(prefix="fwp-email-gif-") as tmp:
        tmp_dir = Path(tmp)
        for index, frame in enumerate(frame_sequence):
            frame.save(tmp_dir / f"frame-{index:03d}.png", optimize=True)
        subprocess.run(
            [
                ffmpeg,
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-framerate",
                str(FPS),
                "-i",
                str(tmp_dir / "frame-%03d.png"),
                "-filter_complex",
                "[0:v]split[a][b];"
                "[a]palettegen=reserve_transparent=1:transparency_color=ffffff[p];"
                "[b][p]paletteuse=dither=none:alpha_threshold=128",
                "-loop",
                "0",
                str(FFMPEG_GIF_PATH),
            ],
            check=True,
        )


def generate_ffmpeg_pingpong_gif() -> None:
    """Create a Gmail-safe transparent GIF that loops forward and backward.

    The complete mark remains the first frame so clients that only render a
    still image show the finished FWP logo. Animated clients first dissolve
    the mark in reverse, then rebuild it with the original timing. The final
    and first frames are identical, so the loop boundary is invisible.
    """

    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        print("Skipped ping-pong GIF: ffmpeg not found")
        return

    solid_final = render_solid_gif_final()
    transparent = Image.new("RGBA", (SIZE, SIZE), TRANSPARENT)
    first_build_ease = cubic_bezier_y((1 / FPS) / BLOCK_DURATION)
    first_build_scale = 0.6 + 0.4 * first_build_ease
    core_step_count = round(0.4 * FPS)
    core_frames = []
    for index in range(1, core_step_count + 1):
        progress = index / core_step_count
        smooth_progress = progress * progress * (3 - 2 * progress)
        core_frames.append(
            render_solid_gif_core(first_build_scale * smooth_progress)
        )

    # The old Gmail-safe build began with the core already at 60% scale. Add
    # a true zero-to-core transition so the last tile never pops to white.
    build_frames = [transparent, *core_frames]
    build_frames += [
        render_solid_gif_build(i / FPS)
        for i in range(2, math.ceil(BUILD_DURATION * FPS))
    ]
    build_frames.append(solid_final)

    frame_sequence = [
        solid_final.copy() for _ in range(round(1.0 * FPS))
    ]
    frame_sequence += [frame.copy() for frame in reversed(build_frames[:-1])]
    # Keep only the single transparent endpoint already present in the reverse
    # path. A longer blank hold reads as a white flash on light email clients.
    frame_sequence += [frame.copy() for frame in build_frames[1:]]
    frame_sequence += [
        solid_final.copy() for _ in range(round(1.6 * FPS))
    ]

    with tempfile.TemporaryDirectory(prefix="fwp-email-pingpong-") as tmp:
        tmp_dir = Path(tmp)
        for index, frame in enumerate(frame_sequence):
            frame.save(tmp_dir / f"frame-{index:03d}.png", optimize=True)
        subprocess.run(
            [
                ffmpeg,
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-framerate",
                str(FPS),
                "-i",
                str(tmp_dir / "frame-%03d.png"),
                "-filter_complex",
                "[0:v]split[a][b];"
                "[a]palettegen=reserve_transparent=1:transparency_color=ffffff[p];"
                "[b][p]paletteuse=dither=none:alpha_threshold=128",
                "-loop",
                "0",
                str(PINGPONG_GIF_PATH),
            ],
            check=True,
        )


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

    # APNG preserves true per-pixel alpha, unlike GIF's one-bit transparency.
    # The first frame is the complete mark for clients that show only a still.
    apng_frame_count = math.ceil(TOTAL_DURATION * FPS)
    apng_frames = [
        render_frame(i / FPS, final_image) for i in range(apng_frame_count)
    ]
    apng_frames[0].save(
        APNG_PATH,
        save_all=True,
        append_images=apng_frames[1:],
        duration=FRAME_MS,
        loop=0,
        disposal=0,
        blend=0,
        optimize=True,
    )
    apng_frames[0].save(
        WEBP_PATH,
        save_all=True,
        append_images=apng_frames[1:],
        duration=FRAME_MS,
        loop=0,
        lossless=True,
        quality=100,
        method=6,
    )

    build_frame_count = math.ceil(BUILD_DURATION * FPS)
    frames = [
        final_image,
        *[render_gif_build(i / FPS) for i in range(build_frame_count)],
        final_image,
    ]
    gif_frames = [rgba_to_transparent_gif_frame(frame) for frame in frames]
    durations = [1000, *([FRAME_MS] * build_frame_count), 2500]

    gif_frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=gif_frames[1:],
        duration=durations,
        loop=0,
        optimize=False,
        transparency=0,
        disposal=1,
    )
    # Vercel serves public assets with long-lived caching. Keep a cache-safe
    # filename for the Gmail signature whenever the GIF encoding changes.
    shutil.copyfile(GIF_PATH, EMAIL_GIF_PATH)
    generate_ffmpeg_gif()
    generate_ffmpeg_pingpong_gif()

    print(f"Created {GIF_PATH} ({GIF_PATH.stat().st_size / 1024:.1f} KiB)")
    print(
        f"Created {EMAIL_GIF_PATH} "
        f"({EMAIL_GIF_PATH.stat().st_size / 1024:.1f} KiB)"
    )
    print(f"Created {APNG_PATH} ({APNG_PATH.stat().st_size / 1024:.1f} KiB)")
    print(f"Created {WEBP_PATH} ({WEBP_PATH.stat().st_size / 1024:.1f} KiB)")
    if FFMPEG_GIF_PATH.exists():
        print(
            f"Created {FFMPEG_GIF_PATH} "
            f"({FFMPEG_GIF_PATH.stat().st_size / 1024:.1f} KiB)"
        )
    if PINGPONG_GIF_PATH.exists():
        print(
            f"Created {PINGPONG_GIF_PATH} "
            f"({PINGPONG_GIF_PATH.stat().st_size / 1024:.1f} KiB)"
        )
    print(f"Created {PNG_PATH} ({PNG_PATH.stat().st_size / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()

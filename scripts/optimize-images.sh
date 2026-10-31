#!/usr/bin/env bash
# Converts source photos in src/assets to compressed WebP (800w + 1600w)
# in src/assets/img, and builds the 1200x630 social share image.
# Requires: cwebp (brew install webp) and sips (macOS).
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=src/assets
OUT=src/assets/img
mkdir -p "$OUT"

# output-name|source-file
MAP=(
  "training-space-group|WhatsApp Image 2026-08-26 at 15.35.03.jpeg"
  "planche-on-parallettes|WhatsApp Image 2026-08-26 at 22.19.23.jpeg"
  "group-warm-up-stretch|WhatsApp Image 2026-08-26 at 22.19.24.jpeg"
  "straddle-planche-parallettes|WhatsApp Image 2026-08-26 at 22.19.25.jpeg"
  "group-workshop-indoor|WhatsApp Image 2026-08-27 at 03.06.54.jpeg"
  "coach-spotting-handstand-kids|WhatsApp Image 2026-08-27 at 03.18.28.jpeg"
  "pull-up-rig-group|WhatsApp Image 2026-08-27 at 03.18.29.jpeg"
  "community-group-photo|groupThree.jpeg"
  "coach-spotting-handstand|imageOne.jpeg"
  "kids-handstand-coaching|kidsBatch.jpeg"
)

for entry in "${MAP[@]}"; do
  name="${entry%%|*}"; file="$SRC/${entry#*|}"
  w=$(sips -g pixelWidth "$file" | awk '/pixelWidth/{print $2}')
  for target in 800 1600; do
    rw=$(( w < target ? w : target ))
    cwebp -quiet -q 72 -m 6 -resize "$rw" 0 "$file" -o "$OUT/$name-$target.webp"
  done
done

cwebp -quiet -q 85 -resize 96 0 "$SRC/mainLogo.jpeg" -o "$OUT/logo-96.webp"

# Social share image: 1200x630 crop of the straddle planche photo (no third-party branding)
sips -Z 1600 "$SRC/WhatsApp Image 2026-08-26 at 22.19.25.jpeg" --out /tmp/ics-og.jpg >/dev/null
sips --resampleWidth 1200 /tmp/ics-og.jpg >/dev/null
sips --cropToHeightWidth 630 1200 /tmp/ics-og.jpg --out public/og-image.jpg -s format jpeg -s formatOptions 70 >/dev/null
rm -f /tmp/ics-og.jpg

# Print dimensions for src/data/images.ts
for f in "$OUT"/*.webp; do
  echo "$(basename "$f") $(webpinfo "$f" 2>/dev/null | awk '/Width:/{w=$2}/Height:/{h=$2}END{print w"x"h}')"
done

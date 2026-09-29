#!/bin/bash
# Burn "https://vfx.productions" into assets/$1 (bottom centre, 50%). Works for mp4/webm/jpg/png/webp.
# The clean original is kept in assets/_orig/clean/ (gitignored); re-running always starts from it.
# usage: bash tools/watermark.sh speedboat.mp4
FF=/d/Software/ffmpeg-7.1.1/ffmpeg-2025-06-28-git-cfd1f81e7d-full_build/ffmpeg-2025-06-28-git-cfd1f81e7d-full_build/bin
cd /d/3D/Projects/VisionForExperiences/Html/assets
f=$1
[ -f "_orig/clean/$f" ] || cp "$f" "_orig/clean/$f"
W=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "_orig/clean/$f" | tr -dc 0-9)
H=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "_orig/clean/$f" | tr -dc 0-9)
ROT=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream_side_data=rotation -of csv=p=0 "_orig/clean/$f" | tr -dc 0-9)
case "$ROT" in 90|270) T=$W; W=$H; H=$T;; esac
# size + margin scale from min(W, H*16/9): same look on 16:9, ultrawide and portrait.
# Bottom margin is generous so cover-cropped tiles and wide screens still show it.
R=$(( W < H*16/9 ? W : H*16/9 )); WW=$(( R*19/100 )); M=$(( R*4/100 ))
case "${f##*.}" in
  mp4)  ENC="-map 0:a? -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart" ;;
  webm) ENC="-map 0:a? -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -c:a copy" ;;
  jpg)  ENC="-q:v 2 -frames:v 1 -update 1" ;;
  webp) ENC="-c:v libwebp -quality 90 -frames:v 1 -update 1" ;;
  png)  ENC="-frames:v 1 -update 1" ;;
esac
"$FF/ffmpeg" -v error -y -i "_orig/clean/$f" -i ../tools/watermark.png -filter_complex \
 "[1]scale=$WW:-1:flags=lanczos,format=rgba,colorchannelmixer=aa=0.5[w];[0:v:0][w]overlay=(W-w)/2:H-h-$M[out]" \
 -map "[out]" $ENC "_orig/wm_tmp_$f" && mv "_orig/wm_tmp_$f" "$f" \
 && echo "done $f ${W}x$H mark=$WW margin=$M" || echo "FAIL $f"

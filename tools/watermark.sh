#!/bin/bash
# Burn "https://vfx.productions" into a file (bottom centre, 10%). Works for mp4/webm/jpg/png/webp.
# The clean original is kept in assets/_orig/clean/ (gitignored); re-running always starts from it.
# usage: bash tools/watermark.sh speedboat.mp4            (a file in assets/)
#        bash tools/watermark.sh news/img/some-post.webp  (any other path, relative to the repo root)
FF=/d/Software/ffmpeg-7.1.1/ffmpeg-2025-06-28-git-cfd1f81e7d-full_build/ffmpeg-2025-06-28-git-cfd1f81e7d-full_build/bin
cd /d/3D/Projects/VisionForExperiences/Html/assets
f=$1; case "$f" in */*) f=../$f;; esac
C="_orig/clean/$(echo "${f#../}" | tr / '~')"; TMP="_orig/wm_tmp_$(basename "$f")"
[ -f "$C" ] || cp "$f" "$C"
W=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$C" | tr -dc 0-9)
H=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$C" | tr -dc 0-9)
ROT=$("$FF/ffprobe" -v error -select_streams v:0 -show_entries stream_side_data=rotation -of csv=p=0 "$C" | tr -dc 0-9)
case "$ROT" in 90|270) T=$W; W=$H; H=$T;; esac
# size + margin scale from min(W, H*16/9): same look on 16:9, ultrawide and portrait.
R=$(( W < H*16/9 ? W : H*16/9 )); WW=$(( R*15/100 )); M=$(( R*2/100 ))
case "${f##*.}" in
  mp4)  ENC="-map 0:a? -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart" ;;
  webm) ENC="-map 0:a? -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -c:a copy" ;;
  jpg)  ENC="-q:v 2 -frames:v 1 -update 1" ;;
  webp) ENC="-c:v libwebp -quality 90 -frames:v 1 -update 1" ;;
  png)  ENC="-frames:v 1 -update 1" ;;
esac
"$FF/ffmpeg" -v error -y -i "$C" -i ../tools/watermark.png -filter_complex \
 "[1]scale=$WW:-1:flags=lanczos,format=rgba,colorchannelmixer=aa=0.1[w];[0:v:0][w]overlay=(W-w)/2:H-h-$M[out]" \
 -map "[out]" $ENC "$TMP" && mv "$TMP" "$f" \
 && echo "done $f ${W}x$H mark=$WW margin=$M" || echo "FAIL $f"

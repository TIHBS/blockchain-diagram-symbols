# An Empirical Study of Symbols Commonly Used in Blockchain Diagrams

## Data Sources

The data sources can be found in the folders `duckDuckGo`, `metaGer` and `googleScholar` as well as `overview.md`.
Due to copyright restrictions all images and pdfs that are part of the source data are excluded from this repository.
The original image links can be reconstructed from the data.

## Process

This repository contains all scripts used during the study.

Image extraction:
* `google-scholar/images/extract-pdf-images.sh` reads all pdfs and outputs all images contained in the pdf
* `extract-pictures.py` reads all image sources and outputs `annotations.md` (for requirements see `Pipfile`)
* `update-result-html.sh` reads `annotations.md` and outputs `results.html` (needs pandoc, also uses `result-header.html`)
* `result-explorer.js` runs in the browser and provides basic filtering and statistics in `results.html`

## Results

The results can be viewed in the `results.html` webpage.

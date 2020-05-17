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

The scripts `extract-pictures.py` and `result-explorer.js` are released under the MIT License.

## Results

The results can be viewed in the `results.html` webpage ([direct link](https://tihbs.github.io/blockchain-diagram-symbols/results)).

The documentation for the tags used can be found in [tag-documentation.md](tag-documentation.md).

The resulting shapes can be found in [shapes.md](shapes.md).

### Explanations for the filters:

The search filters and the image type filters work subtractive.
If a tag (or search text/source) is deselected then any image with that tag (or from that search) gets excluded.

The elements and elements specific filters work differently.
If one or more tags are selected then only images with **all** selected tags are included.
The element specific tags are provided as standalone filter and as tag bigrams.
The tag bigrams can be used to target only elements with that specific tag.

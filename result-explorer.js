'esversion: 6';

function prepareHtml() {
    d3.select('div#TOC').append('h1').text('Table of Contents').lower();
    const resultsContainer = d3.select('body').append('div').attr('id', 'results');
    resultsContainer.append('h1').text('Results');

    const result = parseResults();

    const resultJson = result.json;
    const selectors = result.selectors;
    const selectorsOfImage = result.selectorsOfImage;

    const jsonContainer = resultsContainer.append('details').classed('json', true);
    jsonContainer.append('summary').text('Results in a handy json format:');
    const json = JSON.stringify(resultJson, undefined, 4);
    jsonContainer.append('code').text(json).style('display', 'none');
    jsonContainer.append('code').classed('preview', true).text(json.substr(0, 1000) + '…').on('click', () => {
        navigator.clipboard.writeText(json).then(() => {
            const message = jsonContainer.append('p').text('Copied json to clipboard');
            window.setTimeout(() => message.remove(), 5000);
        });
    });
    jsonContainer.append('p').text('Click on the json preview to copy the whole json into the clipboard.');

    const filtersContainer = resultsContainer.append('div').classed('filters', true);
    const statisticsContainer = resultsContainer.append('div').classed('statistics', true);

    setupStatistics(statisticsContainer);
    setupFilters(filtersContainer, resultJson, selectors, selectorsOfImage);
    fixImageLinks();
}

function fixImageLinks() {
    d3.select('#annotations').selectAll('.level2').each(function () {
        const searchProvider = d3.select(this);
        if (searchProvider.attr('id') == 'duckduckgo') {
            // let the image source be the original image link
            searchProvider.selectAll('a').datum(function () {
                return d3.select(this).attr('href');
            }).select('img').attr('src', function(d) {return d;});
        }
        if (searchProvider.attr('id') == 'metager') {
            // let the image source be the original image link
            searchProvider.selectAll('a').datum(function () {
                return d3.select(this).attr('href');
            }).select('img').attr('src', function(d) {return d;});
        }
        if (searchProvider.attr('id') == 'google-scholar') {
            // let the link point to the overview containing all paper references
            searchProvider.selectAll('a').attr('href', 'overview.md');
        }
    });
}

function createId(someString) {
    return someString.toLowerCase().trim().replace(/\s+/g, '-').replace(/\W/g, '-');
}

function parseResults() {
    const result = {};
    const selectors = new Map();
    const selectorsOfImage = new Map();
    d3.select('#annotations').selectAll('.level2').call(parseSearchIds, result, selectors, selectorsOfImage);
    return {
        json: result,
        selectors: selectors,
        selectorsOfImage: selectorsOfImage,
    };
}

function parseSearchIds(selection, result, selectors, selectorsOfImage) {
    selection.each(function () {
        const sel = d3.select(this);
        const searchProviderId = sel.attr('id');
        const searches = {};
        result[searchProviderId] = searches;
        selectors.set(searchProviderId, { type: 'searchProvider', selector: '#' + searchProviderId });
        sel.selectAll('.level3').call(parseSearchtexts, searchProviderId, searches, selectors, selectorsOfImage);
    });
}

function parseSearchtexts(selection, searchProviderId, searches, selectors, selectorsOfImage) {
    selection.each(function () {
        const sel = d3.select(this);
        const searchId = sel.attr('id');
        const headline = sel.select('h3').text();
        const searchtext = headline.match(/[\"“”](.+)[\"“”]/)[1];
        const search = {
            searchProviderId: searchProviderId,
            searchId: searchId,
            headline: headline,
            searchtext: searchtext,
            searchResults: [],
        };
        searches[searchtext] = search;

        sel.classed(createId(searchtext), true);
        if (!selectors.has(searchtext)) {
            selectors.set(searchtext, { type: 'searchText', count: 0, selector: '.' + createId(searchtext) });
        }
        const selector = selectors.get(searchtext);
        selector.count = selector.count + 1;

        sel.selectAll('.level4').call(parseSearchResults, search, selectors, selectorsOfImage);
    });
}

function parseSearchResults(selection, search, selectors, selectorsOfImage) {
    selection.each(function () {
        const sel = d3.select(this);
        const resultId = sel.attr('id');
        const image = sel.select('img');
        const headline = image.attr('alt');
        const sourceFile = image.attr('src');
        const originLink = sel.select('a').attr('href');

        const imageSelectors = new Set();
        imageSelectors.add(search.searchProviderId);
        imageSelectors.add(search.searchtext);

        let elements = {};
        let type = 'unknown';
        const annotations = sel.selectAll('li');
        annotations.each(function (d, i) {
            const annotation = d3.select(this);
            if (i === 0) {
                type = annotation.text();
                return;
            }
            const annotationSplit = annotation.text().split(/:\s*/);
            const elementType = annotationSplit[0].trim();
            const elementSpecifics = [];
            if (annotationSplit.length > 1) {
                annotationSplit[1].split(/\s*,\s+/g).forEach(specific => {
                    specific = specific.trim();
                    if (specific) {
                        elementSpecifics.push(specific);
                    }
                });
            }
            elements[elementType] = elementSpecifics;
        });

        let duplicateFrom;

        if (type.startsWith('duplicate: ')) {
            const duplicateNr = parseInt(type.substr(11)) - 1;
            sel.classed('duplicate', true);

            if (!selectors.has('duplicate')) {
                selectors.set('duplicate', { type: 'type', count: 0, selector: '.duplicate'});
            }
            selector = selectors.get('duplicate');
            selector.count = selector.count + 1;
            imageSelectors.add('duplicate');

            type = 'duplicate';
            if (duplicateNr < search.searchResults.length) {
                duplicateFrom = search.searchResults[duplicateNr];
                type = duplicateFrom.type;
                elements = duplicateFrom.elements;
            }
        }

        sel.classed('searchresult', true);

        const typeClass = createId(type);
        sel.classed(typeClass, true);

        if (!selectors.has(type)) {
            selectors.set(type, { type: 'type', count: 0, selector: '.' + typeClass});
        }
        selector = selectors.get(type);
        selector.count = selector.count + 1;
        imageSelectors.add(type);

        for (const element in elements) {
            const elementClass = createId(element);
            sel.classed(elementClass, true);

            if (!selectors.has(element)) {
                selectors.set(element, { type: 'element', count: 0, selector: '.' + elementClass});
            }
            selector = selectors.get(element);
            selector.count = selector.count + 1;
            imageSelectors.add(element);

            elements[element].forEach(specific => {
                const specificClass = elementClass + '--' + createId(specific);
                sel.classed(specificClass, true);

                if (!selectors.has(element + ': ' + specific)) {
                    selectors.set(element + ': ' + specific, { type: 'bound-specific', element: element, specific: specific, count: 0, selector: '.' + specificClass});
                }
                selector = selectors.get(element + ': ' + specific);
                selector.count = selector.count + 1;
                imageSelectors.add(element + ': ' + specific);

                sel.classed(createId(specific), true);

                if (!selectors.has(specific)) {
                    selectors.set(specific, { type: 'unbound-specific', count: 0, selector: '.' + createId(specific)});
                }
                selector = selectors.get(specific);
                selector.count = selector.count + 1;
                imageSelectors.add(specific);
            });
        }

        selectorsOfImage.set(resultId, imageSelectors);

        const searchResult = {
            resultId: resultId,
            headline: headline,
            sourceFile: sourceFile,
            originLink: originLink,
            type: type,
            elements: elements,
        };

        if (duplicateFrom) {
            searchResult.duplicateFrom = duplicateFrom.resultId;
        }

        search.searchResults.push(searchResult);
    });
}

function setupFilters(filtersContanier, resultJson, selectors, selectorsOfImage) {
    const allImages = [];
    const imageToSearchMap = new Map();

    for (const sp in resultJson) {
        const searchProvider = resultJson[sp];
        for (const st in searchProvider) {
            const search = searchProvider[st];
            search.searchResults.forEach(image => {
                allImages.push(image);
                imageToSearchMap.set(image.resultId, search);
            });
        }
    }

    const activeSelectors = new Set();
    const searchProviderSelectors = [];
    const searchTextSelectors = [];
    const imageTypeSelectors = [];
    const elementSelectors = [];
    const boundSpecificSelectors = [];
    const unboundSpecificSelectors = [];
    selectors.forEach((value, key) => {
        value.name = key;
        if (value.type === 'searchProvider') {
            searchProviderSelectors.push(value);
            activeSelectors.add(key);
        } else if (value.type === 'searchText') {
            searchTextSelectors.push(value);
            activeSelectors.add(key);
        } else if (value.type === 'type') {
            imageTypeSelectors.push(value);
            if (key !== 'unknown' && key !== 'ignore') {
                activeSelectors.add(key);
            } else {
                d3.selectAll(value.selector).style('display', 'none');
            }
        } else if (value.type === 'element') {
            elementSelectors.push(value);
        } else if (value.type === 'bound-specific') {
            boundSpecificSelectors.push(value);
        } else if (value.type === 'unbound-specific') {
            unboundSpecificSelectors.push(value);
        }
    });

    function updateSelectedImages() {
        const selectedImages = [];
        const selectedImagesSet = new Set();
        allImages.forEach((image) => {
            const imageSelectors = selectorsOfImage.get(image.resultId);
            for (const selector of imageSelectors) {
                const selectorType = selectors.get(selector).type;
                if (selectorType === 'searchProvider') {
                    if (!activeSelectors.has(selector)) {
                        return;
                    }
                } else if (selectorType === 'searchText') {
                    if (!activeSelectors.has(selector)) {
                        return;
                    }
                } else if (selectorType === 'type') {
                    if (!activeSelectors.has(selector)) {
                        return;
                    }
                }
            }
            for (const selector of activeSelectors) {
                const selectorType = selectors.get(selector).type;
                if (selectorType === 'element') {
                    if (!imageSelectors.has(selector)) {
                        return;
                    }
                } else if (selectorType === 'bound-specific') {
                    if (!imageSelectors.has(selector)) {
                        return;
                    }
                } else if (selectorType === 'unbound-specific') {
                    if (!imageSelectors.has(selector)) {
                        return;
                    }
                }
            }
            selectedImages.push(image);
            selectedImagesSet.add(image.resultId);
        });
        d3.selectAll('.searchresult').data(allImages).style('display', image => {
            if (selectedImagesSet.has(image.resultId)) {
                return null;
            }
            return 'none';
        });
        updateStatistics(selectedImages, selectors, selectorsOfImage);
    }

    function select(selector) {
        if (activeSelectors.has(selector)) {
            activeSelectors.delete(selector);
        } else {
            activeSelectors.add(selector);
        }
        updateSelectedImages();
    }

    sortByname = (a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    }

    // sort all things
    searchProviderSelectors.sort(sortByname);
    searchTextSelectors.sort(sortByname);
    imageTypeSelectors.sort(sortByname);
    elementSelectors.sort(sortByname);
    boundSpecificSelectors.sort(sortByname);
    unboundSpecificSelectors.sort(sortByname);

    filtersContanier.append('h2').text('Filters');

    // search filters
    const searchfilters = filtersContanier.append('details');
    searchfilters.append('summary').text('Search Filters:');
    const searchProviders = searchfilters.append('div').style('max-width', '40em');

    searchProviders.append('p').text('Search Providers:')
    const searchProviderFiltersContainer = searchProviders.append('p').classed('filters', true);
    function updateSearchProviderFilters() {
        searchProviderFiltersContainer.selectAll('span').data(searchProviderSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                d3.select(d.selector).style('display', activeSelectors.has(d.name) ? null : 'none');
                updateSearchProviderFilters();
            });
    }
    updateSearchProviderFilters();

    searchProviders.append('p').text('Search Texts:')
    const searchTextFiltersContainer = searchProviders.append('p').classed('filters', true);
    function updateSearchTextFilters() {
        searchTextFiltersContainer.selectAll('span').data(searchTextSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                d3.selectAll(d.selector).style('display', activeSelectors.has(d.name) ? null : 'none');
                updateSearchTextFilters();
            });
    }
    updateSearchTextFilters();

    // image filters
    const imageFilters = filtersContanier.append('details');
    imageFilters.append('summary').text('Image Filters:');
    const imageFiltersContainer = imageFilters.append('div').style('max-width', '40em');

    imageFiltersContainer.append('p').text('Image Type:')
    const imageTypeFilters = imageFiltersContainer.append('p').classed('filters', true);
    function updateImageTypeFilters() {
        imageTypeFilters.selectAll('span').data(imageTypeSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                updateImageTypeFilters();
            });
    }
    updateImageTypeFilters();

    imageFiltersContainer.append('p').text('Image Elements: (if filter is active only results with that element are displayed)')
    const imageElementsFilters = imageFiltersContainer.append('p').classed('filters', true);
    function updateImageElementsFilters() {
        imageElementsFilters.selectAll('span').data(elementSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                updateImageElementsFilters();
            });
    }
    updateImageElementsFilters();

    // element specifications
    const elementSpecificationFilters = imageFiltersContainer.append('details')
    elementSpecificationFilters.append('summary').text('Element Specification Filters:');
    const elementSpecificationFiltersContainer = elementSpecificationFilters.append('div');

    elementSpecificationFiltersContainer.append('p').text('Image Element Specifications: (if filter is active only results with that element are displayed)')
    const imageElementSpecificationsFilters = elementSpecificationFiltersContainer.append('p').classed('filters', true);
    function updateImageElementSpecificationsFilters() {
        imageElementSpecificationsFilters.selectAll('span').data(boundSpecificSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                updateImageElementSpecificationsFilters();
            });
    }
    updateImageElementSpecificationsFilters();

    elementSpecificationFiltersContainer.append('p').text('Unbound Image Element Specifications: (if filter is active only results with that element are displayed)')
    const unboundImageElementSpecificationsFilters = elementSpecificationFiltersContainer.append('p');
    function updateUnboundImageElementSpecificationsFilters() {
        unboundImageElementSpecificationsFilters.selectAll('span').data(unboundSpecificSelectors)
            .join(enter => enter.append('span').style('white-space', 'nowrap'))
            .text((d) => '"' + d.name + '"')
            .classed('selected', (d) => activeSelectors.has(d.name))
            .on('click', function (d) {
                select(d.name);
                updateUnboundImageElementSpecificationsFilters();
            });
    }
    updateUnboundImageElementSpecificationsFilters();

    updateSelectedImages();
}

function setupStatistics(statisticsContainer) {
    statisticsContainer.append('h2').text('Statistics');

    const numberOfImages = statisticsContainer.append('p');
    numberOfImages.append('span').text('Number of Images: ');
    numberOfImages.append('span').classed('image-count', true);

    const typeStatistics = statisticsContainer.append('details');
    typeStatistics.append('summary').text('Image Type:');
    typeStatistics.append('ol').style('max-width', '40em').classed('type-statistic', true);

    const elementStatistics = statisticsContainer.append('details');
    elementStatistics.append('summary').text('Image Elements:');
    elementStatistics.append('ol').style('max-width', '40em').classed('element-statistic', true);

    const elementSpecificStatistics = statisticsContainer.append('details');
    elementSpecificStatistics.append('summary').text('Image Elements Specifics:');
    elementSpecificStatistics.append('dl').style('max-width', '40em').classed('element-specifics-statistic', true);

    const specificsStatistics = statisticsContainer.append('details');
    specificsStatistics.append('summary').text('Specifics:');
    specificsStatistics.append('ol').style('max-width', '40em').classed('specifics-statistic', true);
}

function updateStatistics(images, selectors, selectorsOfImage) {
    const numberOfImages = images.length;
    const selectorCounts = new Map();

    images.forEach((image) => {
        const imageSelectors = selectorsOfImage.get(image.resultId);
        imageSelectors.forEach(sel => {
            if (!selectorCounts.has(sel)) {
                selectorCounts.set(sel, 1);
            } else {
                selectorCounts.set(sel, selectorCounts.get(sel) + 1);
            }
        });
    });

    const typeSelectors = [];
    const elementSelectors = [];
    const boundSpecificSelectors = new Map();
    const specificSelectors = [];

    selectorCounts.forEach((count, sel) => {
        const selector = selectors.get(sel);
        if (selector.type === 'type') {
            typeSelectors.push(sel);
        } else if (selector.type === 'element') {
            elementSelectors.push(sel);
        } else if (selector.type === 'bound-specific') {
            const element = selector.element;
            if (!boundSpecificSelectors.has(element)) {
                boundSpecificSelectors.set(element, []);
            }
            boundSpecificSelectors.get(element).push(sel);
        } else if (selector.type === 'unbound-specific') {
            specificSelectors.push(sel);
        }
    });

    sortByCount = (a, b) => {
        const countA = selectorCounts.get(a);
        const countB = selectorCounts.get(b);
        if (countA > countB) {
            return -1;
        }
        if (countA < countB) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    typeSelectors.sort(sortByCount);
    elementSelectors.sort(sortByCount);
    boundSpecificSelectors.forEach(val => val.sort(sortByCount));
    specificSelectors.sort(sortByCount);

    const statisticsContainer = d3.select('.statistics');

    statisticsContainer.select('span.image-count').text(numberOfImages);

    function updateSelectorStatistic(selection, maxWidth, maxCount, isBoundSpecific) {
        selection.join(enter => {
            const li = enter.append('li');
            li.append('span').classed('selector-name', true).style('display', 'inline-block').style('min-width', maxWidth);
            li.append('span').classed('selector-count', true).style('display', 'inline-block').style('min-width', '4.5em').style('text-align', 'end');
            li.append('span').classed('selector-percent', true).style('display', 'inline-block').style('min-width', '4em').style('text-align', 'end');
            return li;
        })
        .call(s => {
            s.select('.selector-name').text(d => {
                if (isBoundSpecific) {
                    return selectors.get(d).specific;
                }
                return d;
            });
            s.select('.selector-count').text(d => {
                const count = selectorCounts.get(d);
                return count + '/' + maxCount;

            });
            s.select('.selector-percent').text(d => {
                const count = selectorCounts.get(d);
                const percent = (count / maxCount) * 100
                return percent.toFixed(1) + ' %';

            });
        });
    }

    updateSelectorStatistic(statisticsContainer.select('.type-statistic').selectAll('li').data(typeSelectors), '10em', numberOfImages);

    updateSelectorStatistic(statisticsContainer.select('.element-statistic').selectAll('li').data(elementSelectors), '11.5em', numberOfImages);

    const elementSpecifics = [];
    boundSpecificSelectors.forEach((v, k) => elementSpecifics.push({
        element: k,
        selectors: v,
        totalCount: selectorCounts.get(k),
    }));
    elementSpecifics.sort((a, b) => {
        if (a.totalCount > b.totalCount) {
            return -1;
        }
        if (a.totalCount < b.totalCount) {
            return 1;
        }
        if (a.element < b.element) {
            return -1;
        }
        if (a.element > b.element) {
            return 1;
        }
        return 0;
    });

    statisticsContainer.select('.element-specifics-statistic').selectAll('div').data(elementSpecifics)
        .join(enter => {
            const div = enter.append('div');
            div.append('dt').classed('element-name', true);
            div.append('dd').append('ol').classed('element-specific', true);
            return div;
        })
        .call(s => {
            s.select('.element-name').text(d => d.element + ' (' + d.totalCount + ')');
        })
        .each(function(d) {
            updateSelectorStatistic(d3.select(this).select('.element-specific').selectAll('li').data(d.selectors), '10em', d.totalCount, true);
        });

    updateSelectorStatistic(statisticsContainer.select('.specifics-statistic').selectAll('li').data(specificSelectors), '10em', numberOfImages);

}

prepareHtml();

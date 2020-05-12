from collections import namedtuple
from pathlib import Path
from subprocess import run, PIPE
from re import compile
from urllib.parse import unquote
from bs4 import BeautifulSoup as Soup
from typing import List, Dict


SOURCE_FOLDERS = [
    (Path('duckDuckGo'), 'DD'),
    (Path('metaGer'), 'MG'),
]

SOURCE_MD = Path('overview.md')

OUTPUT_MD = Path('annotations.md')

SOURCE_MAP = {
    'DD': ('DuckDuckGo', 'DuckDuckGo search "{}"'),
    'MG': ('MetaGer', 'MetaGer search "{}"'),
    'GS': ('Google-Scholar', 'Google-Scholar search "{}"'),
}

Searchresult = namedtuple('Searchresult', ['path', 'url', 'title'])

DD_URL_REGEX = compile(r'.*\?u=(http\S*)\&.*')


def parse_dd_url(url: str):
    match = DD_URL_REGEX.match(url)
    if match:
        return unquote(match.groups()[0])
    print(match)


def dd_extractor(html_file: Path):
    search = html_file.stem.replace(' at DuckDuckGo', '')
    soup = Soup(html_file.open(), 'html.parser')
    results = soup.select("img.tile--img__img")
    directory = html_file.parent
    searchresults: List[Searchresult] = []
    for result in results:
        path = directory / result['src']
        url = parse_dd_url(result['data-src'])
        title = result['alt']
        searchresults.append(Searchresult(path, url, title))
    return search, searchresults


def mg_extractor(html_file: Path):
    search = html_file.stem.replace('- MetaGer', '')
    if '(' in search:
        end = search.index(' (')
        search = search[:end]
    soup = Soup(html_file.open(), 'html.parser')
    results = soup.select("div.image")
    directory = html_file.parent
    searchresults: List[Searchresult] = []
    for result in results:
        url = result.a['href']
        img = result.a.div.img
        path = directory / img['src']
        title = img['alt']
        searchresults.append(Searchresult(path, url, title))
    return search.strip(), searchresults


def scholar_extractor(md_file: Path):
    html = run(['pandoc', '--section-divs', str(md_file)], stdout=PIPE, encoding='utf-8')
    soup = Soup(html.stdout, 'html.parser')
    searches = soup.select("div.level3")
    searches_dict = {}
    for search in searches:
        search_text = search.h3.text.split('"')[1]
        results = search.select('li')
        searchresults: List[Searchresult] = []
        for result in results:
            if result.p.a is None:
                continue
            paper_title = result.p.text
            paper_path = Path(result.p.a['href'])
            image_folder = paper_path.parent / 'images'
            images_in_paper = image_folder.glob(paper_path.stem + '*')
            for image_file in images_in_paper:
                page_nr = image_file.stem[-7:-4].lstrip('0')
                title = paper_title + ' (page {})'.format(page_nr)
                searchresults.append(Searchresult(str(image_file), str(paper_path), title))
        searches_dict[search_text] = searchresults
    return searches_dict


def get_searches():
    searches = {}

    for path, source in SOURCE_FOLDERS:
        if source not in searches:
            searches[source] = {}
        files = path.glob('*html')
        for html_file in files:
            search = ''
            links: List[Searchresult] = []
            if (source == 'DD'):
                search, links = dd_extractor(html_file)
            elif source == 'MG':
                search, links = mg_extractor(html_file)
            if search in searches[source]:
                searches[source][search].extend(links)
            else:
                searches[source][search] = links
    scholar_searches = scholar_extractor(SOURCE_MD)
    searches['GS'] = scholar_searches
    return searches


def generate_markdown(searches: Dict[str, Dict[str, List[Searchresult]]], output_path: Path):
    output = ['# Annotations']
    for source in ('DD', 'MG', 'GS'):
        output.append('## ' + SOURCE_MAP[source][0])
        for search in searches[source]:
            search_results = searches[source][search]
            output.append('### ' + SOURCE_MAP[source][1].format(search) + ' ({})'.format(len(search_results)))
            for i, result in enumerate(search_results):
                output.append('#### \<{index}\> [![{title}]({path})]({url})'.format(index=i+1, path=result.path, url=result.url, title=result.title))
    output.append('\n')
    if not output_path.is_dir() and not output_path.exists():
        with output_path.open(mode='w') as md:
            md.write('\n\n'.join(output))


generate_markdown(get_searches(), OUTPUT_MD)

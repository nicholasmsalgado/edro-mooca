import pymupdf, os
from PIL import Image

doc = pymupdf.open('book-edro-mooca.pdf')
folder = r'assets\ilovepdf_images-extracted (4)'
files = sorted(os.listdir(folder))

results = []
for f in files:
    path = os.path.join(folder, f)
    with Image.open(path) as img:
        w, h = img.size
    xref_str = f.replace('img', '').split('.')[0]
    xref = int(xref_str)
    
    found_pages = []
    for p_idx, page in enumerate(doc):
        imgs = page.get_images(full=True)
        for im in imgs:
            if im[0] == xref:
                found_pages.append(p_idx + 1)
    
    page_desc = ''
    if found_pages:
        p_num = found_pages[0]
        txt = doc[p_num - 1].get_text()
        first_lines = [l.strip() for l in txt.split('\n') if l.strip()][:3]
        page_desc = ' | '.join(first_lines)
    
    results.append({
        'file': f,
        'size': f'{w}x{h}',
        'pages': found_pages,
        'desc': page_desc
    })

results.sort(key=lambda x: x['pages'][0] if x['pages'] else 999)
with open('extracted_images_audit.txt', 'w', encoding='utf-8') as out:
    for r in results:
        p_str = str(r['pages'])
        line = f"{r['file']:<12} | {r['size']:<12} | Pag {p_str:<10} | {r['desc']}"
        print(line)
        out.write(line + '\n')
print("\nAuditoria concluída com sucesso! Verifique extracted_images_audit.txt")

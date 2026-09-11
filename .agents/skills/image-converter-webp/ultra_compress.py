import os
from PIL import Image

dirs = [
    r'c:\Trabalho\Antigravity\Projeto\Caminho Jaçanã oficial\IMAG\lazer',
    r'c:\Trabalho\Antigravity\Projeto\Caminho Jaçanã oficial\IMAG\Plantas'
]

total_after = 0

for target_dir in dirs:
    for fname in os.listdir(target_dir):
        if fname.lower().endswith(('.jpg', '.jpeg', '.png')) and not fname.endswith('_transparente.png'):
            fpath = os.path.join(target_dir, fname)
            base_name, _ = os.path.splitext(fname)
            out_path = os.path.join(target_dir, f"{base_name}.webp")
            
            img = Image.open(fpath)
            # Redimensionar fotos se excederem 1600px de largura (suficiente até para telas 4k)
            max_w = 1600
            if img.width > max_w:
                ratio = max_w / float(img.width)
                new_h = int(float(img.height) * ratio)
                img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
            
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img.save(out_path, "WEBP", quality=80, method=6)
            else:
                rgb_img = img.convert("RGB")
                rgb_img.save(out_path, "WEBP", quality=78, method=6)
            
            s = os.path.getsize(out_path)
            total_after += s
            print(f"[RE-OTIMIZADO] {base_name}.webp -> {s/1024:.1f} KB")

print(f"NOVO PESO TOTAL DA GALERIA: {total_after / (1024*1024):.2f} MB")

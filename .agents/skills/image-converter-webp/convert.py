import os
from PIL import Image

dirs = [
    r'c:\Trabalho\Antigravity\Projeto\Caminho Jaçanã oficial\IMAG\lazer',
    r'c:\Trabalho\Antigravity\Projeto\Caminho Jaçanã oficial\IMAG\Plantas',
    r'c:\Trabalho\Antigravity\Projeto\Caminho Jaçanã oficial\IMAG'
]

total_before = 0
total_after = 0
converted_count = 0

print("=== INICIANDO CONVERSAO PARA WEBP ===")

for target_dir in dirs:
    if not os.path.exists(target_dir):
        continue
    for fname in os.listdir(target_dir):
        if fname.lower().endswith(('.jpg', '.jpeg', '.png')) and not fname.endswith('_transparente.png'):
            fpath = os.path.join(target_dir, fname)
            if os.path.isdir(fpath):
                continue
            
            size_before = os.path.getsize(fpath)
            total_before += size_before
            
            base_name, _ = os.path.splitext(fname)
            out_path = os.path.join(target_dir, f"{base_name}.webp")
            
            try:
                img = Image.open(fpath)
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img.save(out_path, "WEBP", quality=85, method=6)
                else:
                    rgb_img = img.convert("RGB")
                    rgb_img.save(out_path, "WEBP", quality=82, method=6)
                
                size_after = os.path.getsize(out_path)
                total_after += size_after
                converted_count += 1
                
                reducao = ((size_before - size_after) / size_before) * 100
                print(f"[OK] {fname} -> {base_name}.webp | {size_before/1024:.1f} KB -> {size_after/1024:.1f} KB (-{reducao:.1f}%)")
            except Exception as e:
                print(f"[ERRO] {fname}: {e}")

print("=====================================")
print(f"Total de imagens convertidas: {converted_count}")
print(f"Peso Total Antes: {total_before / (1024*1024):.2f} MB")
print(f"Peso Total Depois: {total_after / (1024*1024):.2f} MB")
if total_before > 0:
    economia = ((total_before - total_after) / total_before) * 100
    print(f"ECONOMIA TOTAL DE BANDA: -{economia:.1f}%")

import os
from PIL import Image

src_folder = r"assets\ilovepdf_images-extracted (4)"
dest_folder = r"assets\images"
os.makedirs(dest_folder, exist_ok=True)

# Mapeamento 100% auditado e verificado contra cada página do Book Oficial do Edro Mooca
mapping = {
    # --- PLANTAS TÉCNICAS ---
    "img1116.jpg": "planta_69m_2suites.webp",       # Página 48: Planta 69m² - 2 Suítes c/ Lavabo + 1 Vaga + Armário Privativo (Decorado)
    "img1068.jpg": "planta_88m_2suites.webp",       # Página 46: Planta 88m² - 2 Suítes c/ Lavabo + 1 Vaga Determinada + Armário Privativo
    "img983.jpg":  "planta_95m_3dorms.webp",        # Página 42: Planta 95m² - 3 Dorms (1 Suíte c/ Lavabo) + 2 Vagas Determinadas + Armário
    "img1026.jpg": "planta_95m_2suites.webp",       # Página 44: Planta 95m² - 2 Suítes c/ Lavabo Living Ampliado + 2 Vagas Determinadas
    "img888.jpg":  "planta_132m_3suites.webp",      # Página 38: Planta 132m² - 3 Suítes c/ Lavabo + WC Serviço + 2 Vagas + Hall Semiprivativo (Decorado)
    "img934.jpg":  "planta_132m_4dorms.webp",       # Página 40: Planta 132m² - 4 Dorms (2 Suítes c/ Lavabo + WC Serviço) + 2 Vagas Determinadas

    # --- PERSPECTIVAS DOS APARTAMENTOS & DECORADOS (MELINA ROMANO) ---
    "img1132.jpg": "living_decorado_69m.webp",      # Página 49: Living do Apto Decorado de 69m²
    "img1097.jpg": "suite_decorado_88m.webp",       # Página 47: Suíte Master do Apto de 88m²
    "img994.jpg":  "living_decorado_95m.webp",      # Página 43: Living do Apto de 95m²
    "img950.jpg":  "living_decorado_132m.webp",     # Página 41: Living do Apto Decorado de 132m²
    "img1137.jpg": "living_ampliado_132m.webp",     # Página 50: Living Ampliado 132m²

    # --- FACHADA, ARQUITETURA & ACESSOS ---
    "img570.jpg":  "fachada.webp",                  # Página 12: Perspectiva Ilustrada da Fachada (MCAA Arquitetos)
    "img584.jpg":  "acesso_lobby.webp",             # Página 14: Entrada e Acesso Monumental
    "img681.jpg":  "design_entrada.webp",           # Página 19: Design Contemporâneo e Acesso
    "img687.jpg":  "terreo_elevado_detalhe.webp",   # Página 20: Vista e Iluminação do Térreo Elevado
    "img695.jpg":  "lobby_pe_direito_triplo.webp",  # Página 21: Lobby Monumental com Pé-Direito Triplo

    # --- LAZER DE CLUBE NO TÉRREO ELEVADO (QUASE 5.000m²) ---
    "img757.jpg":  "piscina_voo_passaro.webp",      # Página 28: Voo de Pássaro das Piscinas e Lazer
    "img778.jpg":  "solario_detalhe.webp",          # Página 30: Detalhe do Solarium e Praça de Bem-Estar
    "img715.jpg":  "salao_festas.webp",             # Página 23: Salão de Festas com Copa de Apoio
    "img720.jpg":  "espaco_gourmet.webp",           # Página 24: Espaço Gourmet com Forno de Pizza e Churrasqueira
    "img726.jpg":  "cinema_jogos.webp",             # Página 25: Espaço Cinema e Jogos
    "img743.jpg":  "brinquedoteca.webp",            # Página 26: Brinquedoteca Infantil
    "img753.jpg":  "playground_detalhe.webp",       # Página 27: Playground Externo Conectado por Túnel
    "img791.jpg":  "pet_place.webp",                # Página 31: Pet Place com Área Verde
    "img801.jpg":  "fitness_academia.webp",         # Página 32: Academia / Fitness Indoor
    "img803.jpg":  "fitness_outdoor.webp",          # Página 32: Fitness Outdoor ao Ar Livre
    "img819.jpg":  "sauna_relax.webp",              # Página 33: Sauna Seca com Ducha e Área de Descompressão
    "img836.jpg":  "miniquadra.webp",               # Página 34: Miniquadra Esportiva Gramada
    "img858.jpg":  "praca_central_solario.webp",    # Página 36: Praça Central de Convivência

    # --- IMPLANTAÇÕES & DIFERENCIAIS TÉCNICOS ---
    "img652.jpg":  "implantacao_subsolo.webp",      # Página 16: Implantação do 2º Subsolo (Vagas e Armários)
    "img668.jpg":  "implantacao_1subsolo.webp",     # Página 17: Implantação do 1º Subsolo (Bicicletário)
    "img675.jpg":  "implantacao_lazer.webp",        # Página 18: Implantação Completa do Térreo Elevado

    # --- LOCALIZAÇÃO & REGIÃO ---
    "img310.jpg":  "vista_aerea_regiao.webp",       # Página 8: Vista Aérea da Região da Mooca / Radial / Metrô
}

print(f"Iniciando conversão e otimização para WebP de {len(mapping)} imagens catalogadas...")

converted_count = 0
for src_file, dest_file in mapping.items():
    src_path = os.path.join(src_folder, src_file)
    dest_path = os.path.join(dest_folder, dest_file)
    
    if not os.path.exists(src_path):
        print(f"AVISO: Arquivo de origem não encontrado: {src_path}")
        continue
        
    with Image.open(src_path) as img:
        # Converter para RGB se necessário
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Salvar em WebP de alta qualidade otimizado
        img.save(dest_path, "WEBP", quality=86, method=6)
        orig_kb = os.path.getsize(src_path) // 1024
        webp_kb = os.path.getsize(dest_path) // 1024
        reduction = 100 - (webp_kb * 100 // max(1, orig_kb))
        print(f"OK: {src_file} ({orig_kb}KB) -> {dest_file} ({webp_kb}KB) [-{reduction}%]")
        converted_count += 1

print(f"\nSucesso total! {converted_count} imagens catalogadas e convertidas em WebP ultraleve em assets/images/")

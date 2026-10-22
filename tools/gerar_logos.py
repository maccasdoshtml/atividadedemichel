#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera os ícones do PWA (PNG) a partir da foto oficial da escola.

    python3 tools/gerar_logos.py

Requer Pillow:  pip install pillow

A foto usada é assets/logo.jpg (mesmo arquivo exibido no cabeçalho dos
aplicativos). Os ícones são compostos assim:

    - fundo azul da escola
    - foto recortada em círculo
    - anel amarelo em volta da foto

Se você trocar a foto, basta substituir assets/logo.jpg e rodar o script.
"""

import math
import os
from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FOTO = os.path.join(RAIZ, "assets", "logo.jpg")

AZUL_ESCURO = (10, 61, 143, 255)
AZUL = (21, 101, 192, 255)
AMARELO = (255, 193, 7, 255)


def _fonte_vertical(fundo_topo, fundo_base, tam):
    """Cria um fundo azul com um leve brilho diagonal."""
    base = Image.new("RGBA", (tam, tam), fundo_base)
    draw = ImageDraw.Draw(base)
    brilho = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))
    brilho_draw = ImageDraw.Draw(brilho)
    brilho_draw.ellipse(
        [-tam * 0.35, -tam * 0.6, tam * 0.9, tam * 0.6],
        fill=fundo_topo,
    )
    base = Image.alpha_composite(base, brilho)
    return base


def _foto_circular(foto, lado):
    """Recorta a foto em um círculo do tamanho `lado`."""
    imagem = Image.open(foto).convert("RGBA")
    lado_orig = min(imagem.size)

    # recorta o centro (a foto é quadrada)
    x = (imagem.width - lado_orig) // 2
    y = (imagem.height - lado_orig) // 2
    imagem = imagem.crop((x, y, x + lado_orig, y + lado_orig))
    imagem = imagem.resize((lado, lado), Image.LANCZOS)

    mascara = Image.new("L", (lado, lado), 0)
    ImageDraw.Draw(mascara).ellipse((0, 0, lado - 1, lado - 1), fill=255)
    imagem.putalpha(mascara)
    return imagem


def desenha_icone(tam, fator_foto, fundo_azul=True):
    """Monta o ícone: fundo azul + foto circular com anel amarelo."""
    if fundo_azul:
        img = _fonte_vertical(AZUL, AZUL_ESCURO, tam)
    else:
        img = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))

    diametro = int(tam * fator_foto)
    x = (tam - diametro) // 2
    y = (tam - diametro) // 2

    foto = _foto_circular(FOTO, diametro)
    img.alpha_composite(foto, (x, y))

    # anel amarelo
    espessura = max(2, int(tam * 0.035))
    draw = ImageDraw.Draw(img)
    draw.ellipse(
        (
            x + espessura // 2,
            y + espessura // 2,
            x + diametro - espessura // 2,
            y + diametro - espessura // 2,
        ),
        outline=AMARELO,
        width=espessura,
    )
    return img


def principal():
    if not os.path.exists(FOTO):
        raise SystemExit("Foto não encontrada: " + FOTO)

    alvos = [
        RAIZ,
        os.path.join(RAIZ, "app", "cronicas-da-historia"),
        os.path.join(RAIZ, "app", "histor-em-foco"),
    ]

    for pasta in alvos:
        os.makedirs(os.path.join(pasta, "icons"), exist_ok=True)
        desenha_icone(192, 0.86).save(
            os.path.join(pasta, "icons", "icon-192.png"), "PNG", optimize=True
        )
        desenha_icone(512, 0.86).save(
            os.path.join(pasta, "icons", "icon-512.png"), "PNG", optimize=True
        )
        # "maskable": fundo cheio e foto bem dentro da área segura
        desenha_icone(512, 0.62).save(
            os.path.join(pasta, "icons", "icon-maskable-512.png"), "PNG", optimize=True
        )
        desenha_icone(180, 0.80).convert("RGB").save(
            os.path.join(pasta, "icons", "apple-touch-icon-180.png"), "PNG", optimize=True
        )
        for nome in (
            "icon-192.png",
            "icon-512.png",
            "icon-maskable-512.png",
            "apple-touch-icon-180.png",
        ):
            print("gerado:", os.path.relpath(os.path.join(pasta, "icons", nome), RAIZ))


if __name__ == "__main__":
    principal()

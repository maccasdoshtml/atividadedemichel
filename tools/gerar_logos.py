#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera os ícones do PWA (PNG) a partir do brasão da escola.

    python3 tools/gerar-logos.py

Requer Pillow:  pip install pillow

O brasão é o mesmo do arquivo assets/logo.svg — se trocar o SVG por um
desenho novo, ajuste este script (ou simplesmente substitua os PNGs
colocados em icons/).
"""

import math
import os
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

AZUL_ESCURO = (10, 61, 143, 255)
AZUL = (21, 101, 192, 255)
AMARELO = (255, 193, 7, 255)
BRANCO = (255, 255, 255, 255)

FONTE_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONTE = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


# ---------------------------------------------------------------- geometria
def bezier(p0, p1, p2, p3, passos=24):
    """Amostra uma curva cúbica de Bézier."""
    pontos = []
    for i in range(passos + 1):
        t = i / passos
        u = 1 - t
        x = u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1]
        pontos.append((x, y))
    return pontos


def escudo(raio):
    """Contorno do escudo (em coordenadas de 512x512) escalado por `raio`."""
    def esc(p):
        return (256 + (p[0] - 256) * raio, 256 + (p[1] - 256) * raio)

    pontos = [(256, 20), (462, 96), (462, 268)]
    pontos += bezier((462, 268), (462, 372), (376, 452), (256, 492))[1:]
    pontos += bezier((256, 492), (136, 452), (50, 372), (50, 268))[1:]
    pontos += [(50, 96)]
    return [esc(p) for p in pontos]


def livro(c=1.0, dy=0):
    """Contorno do livro aberto (em coordenadas de 512x512)."""
    base = [(256, 205), (236, 178), (186, 158), (132, 158),
            (132, 268), (186, 268), (236, 284), (256, 306)]
    esquerda = [(256 + (x - 256) * c, y + dy) for (x, y) in base]
    direita = [(512 - x, y) for (x, y) in esquerda]
    return esquerda, direita


def texto_cabecalho(draw, centro_x, y, texto, tamanho, cor, fonte=FONTE_BOLD):
    try:
        f = ImageFont.truetype(fonte, tamanho)
    except OSError:
        return
    caixa = draw.textbbox((0, 0), texto, font=f)
    largura = caixa[2] - caixa[0]
    draw.text((centro_x - largura / 2 - caixa[0], y), texto, font=f, fill=cor)


def desenha_brasao(tam, mascara=False):
    """Desenha o brasão num canvas quadrado de lado `tam`."""
    img = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    s = tam / 512

    if mascara:
        # Ícone "maskable": fundo azul cheio, brasão na área segura central.
        draw.rectangle([0, 0, tam - 1, tam - 1], fill=AZUL_ESCURO)
        fator = 0.74
    else:
        fator = 0.9

    # O desenho é feito em coordenadas de 512x512 e depois enquadrado no canvas.
    k = tam * fator / 512
    offset = (tam - tam * fator) / 2

    def escala(p):
        return (offset + p[0] * k, offset + p[1] * k)

    externo = [escala(p) for p in escudo(1.0)]
    interno = [escala(p) for p in escudo(0.895)]

    draw.polygon(externo, fill=AMARELO)
    draw.polygon(interno, fill=AZUL)

    # Livro aberto (branco) — duas páginas
    esquerda, direita = livro(1.0, dy=-34)
    draw.polygon([escala(p) for p in esquerda], fill=BRANCO)
    draw.polygon([escala(p) for p in direita], fill=BRANCO)
    # lombada
    draw.line([escala((256, 171)), escala((256, 272))], fill=AZUL, width=max(1, int(6 * k)))

    # Faixa amarela separando o livro do nome
    draw.line([escala((140, 300)), escala((372, 300))], fill=AMARELO, width=max(1, int(7 * k)))

    # Textos
    texto_cabecalho(draw, tam / 2, offset + 316 * k, "EEPAFC",
                    max(8, int(58 * k)), BRANCO)
    texto_cabecalho(draw, tam / 2, offset + 382 * k, "MOSSORÓ · RN",
                    max(6, int(23 * k)), AMARELO, FONTE)

    return img


def salva(img, caminho):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    img.save(caminho, "PNG", optimize=True)
    print("gerado:", os.path.relpath(caminho, RAIZ))


def principal():
    alvos = [RAIZ, os.path.join(RAIZ, "app", "cronicas-da-historia"),
             os.path.join(RAIZ, "app", "histor-em-foco")]

    for pasta in alvos:
        os.makedirs(os.path.join(pasta, "icons"), exist_ok=True)
        desenha_brasao(192).save(os.path.join(pasta, "icons", "icon-192.png"), "PNG", optimize=True)
        desenha_brasao(512).save(os.path.join(pasta, "icons", "icon-512.png"), "PNG", optimize=True)
        desenha_brasao(512, mascara=True).save(
            os.path.join(pasta, "icons", "icon-maskable-512.png"), "PNG", optimize=True)
        desenha_brasao(180).convert("RGB").save(
            os.path.join(pasta, "icons", "apple-touch-icon-180.png"), "PNG", optimize=True)
        for nome in ("icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon-180.png"):
            print("gerado:", os.path.relpath(os.path.join(pasta, "icons", nome), RAIZ))


if __name__ == "__main__":
    principal()

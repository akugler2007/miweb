
## Objetivo

Aplicar la campaña "Siéntete como en casa" a toda la web (excepto `/edeen-air`), tratando cada página/sección como una **estancia** de la casa EDEEN, con un anfitrión que recibe, acompaña y cuida. En paralelo, asegurar que todas las imágenes se vean nítidas en pantallas grandes.

## 1. Imágenes en máxima resolución (transversal)

Cambios técnicos en TODAS las páginas excepto `/edeen-air`:

- Quitar `loading="lazy"` y atributos `width`/`height` arbitrarios en imágenes hero/above-the-fold; añadir `fetchPriority="high"` y `decoding="async"`.
- En el resto de imágenes mantener `loading="lazy"` pero añadir `decoding="async"` y `sizes="100vw"` cuando ocupen ancho completo, para que el navegador no las downscale.
- Asegurar `object-cover` con contenedores que usen `min-h-[100svh]` o aspectos correctos para que el navegador renderice a resolución de retina (2×).
- En `ScenicBackdrop` añadir `fetchPriority="high"` a la primera imagen y `decoding="async"` al resto (ya cargan eager).
- Verificar que ninguna imagen importada esté limitada por Vite (ya carga el asset original — confirmado).

## 2. Reestructura conceptual: "La casa EDEEN"

Cada página = una estancia o gesto de anfitrión. Manteniendo el sistema visual `Scenic` ya existente.

### `/` (Home) — **El recibidor**
- Hero: "Pasa, estás en casa." Sustituye al copy actual.
- Nuevas secciones bajo metáfora de casa:
  1. **El recibidor** — bienvenida + qué es eDeen.
  2. **Las estancias** — los 5 servicios reformulados como habitaciones (Vivero=jardín, Macetería=el armario, Paisajismo=tu propia casa, Floristería=el salón de celebraciones, Es Berenar=la cocina).
  3. **Cómo te recibimos** — los 4 valores en clave de anfitrión (escuchamos, acompañamos, anticipamos, seguimos cerca).
  4. **Es Berenar** — teaser de "la cocina de la casa".
  5. **Testimonios** — voz de los invitados.
  6. **Mapa + CTA final** — "La puerta siempre abierta."

### `/sobre-nosotros` — **Quiénes te reciben**
- Hero: "Detrás de la puerta hay un equipo."
- Estructura: Quiénes somos → Por qué hacemos casa → Misión (acompañar) → Visión (ser casa de referencia) → Valores como gestos de anfitrión → Historia (desde 2012) → Eventos como "abrir la casa" → Cita.

### `/servicios` — **Las estancias de la casa**
- Hero: "Cinco estancias, un mismo cuidado."
- Cada uno de los 5 servicios reformulado con título de estancia + qué encuentras + cómo te acompañamos. Conserva el formato Scene actual.

### `/cafeteria` — **La cocina de la casa**
- Hero: "Pasa a la cocina." Mantiene la carta tal cual.
- Sub-secciones: La cocina · La mesa · El ritual · La carta · Te guardamos sitio.

### `/contacto` — **La puerta siempre abierta**
- Hero: "Toca el timbre."
- Info + formulario reformulados como "te abrimos" + "cuéntanos qué te trae". Mantiene mapa y datos.

## 3. Sin tocar

- `src/routes/edeen-air.tsx` — intacto.
- `src/components/scenic.tsx`, sistema de tokens, header/footer — intactos salvo añadir `decoding="async"` y `fetchPriority` en backdrop.
- `buyer-persona.tsx`, `creativos.tsx`, `cuida-tu-rinconcito.tsx`, `sientete-como-en-casa.tsx` — intactos (parecen ser docs internas; si quieres también las reestructuro, dímelo).

## 4. No se incluye

- No se generan imágenes nuevas (uso las existentes en `src/assets/edeen/`).
- No se modifica el sistema de diseño ni colores.
- No se añade backend ni formularios reales (el form sigue siendo demo).

## Archivos modificados

- `src/routes/index.tsx` (reescritura completa de copys + estructura)
- `src/routes/sobre-nosotros.tsx` (reescritura de copys + 1 sección extra)
- `src/routes/servicios.tsx` (reescritura de copys)
- `src/routes/cafeteria.tsx` (reescritura de copys de secciones, carta intacta)
- `src/routes/contacto.tsx` (reescritura de copys)
- `src/components/scenic.tsx` (añadir `fetchPriority`/`decoding` en imágenes de backdrop)

¿Lo apruebas tal cual o quieres que ajuste algo (más/menos secciones, tono, también las páginas de docs internas)?

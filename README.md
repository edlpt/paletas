# El De Las Paletas Universe

EL DE LAS PALETAS — PROMPT MAESTRO PARA LOVABLE

Quiero construir una aplicación web/mobile-first premium para una startup colombiana llamada “El De Las Paletas”, enfocada en un marketplace legal y regulado de productos de cannabis en Medellín, Colombia.

IMPORTANTE: esta aplicación debe funcionar como una plataforma comercial profesional y preparada para producción. No quiero una landing page estática ni un simple prototipo visual. Quiero construir la estructura completa de una aplicación real utilizando Lovable + Supabase, con autenticación, base de datos, catálogo, carrito, checkout, pedidos, perfiles, favoritos, seguimiento de pedidos y panel administrativo.

La aplicación debe estar diseñada para poder convertirse posteriormente en una aplicación móvil nativa/híbrida.

1. IDENTIDAD VISUAL

La identidad visual debe inspirarse directamente en el logo proporcionado de “El De Las Paletas”.

El estilo general debe ser:

Psicodélico

Urbano

Graffiti / street art

Geek

Futurista

Espacial

Muy premium

Oscuro

Divertido

Visualmente memorable

Con estética de sticker/cartoon

Inspiración cyberpunk + psychedelic + alien + skate/street culture

NO quiero que parezca una tienda médica tradicional.

NO quiero un diseño corporativo aburrido.

NO quiero un ecommerce genérico.

Debe sentirse como una marca cultural y tecnológica, con personalidad propia.

Paleta principal

Utilizar principalmente:

Negro casi absoluto: #080A08

Verde slime/neón: #B7FF00

Verde ácido: #72E000

Verde oscuro: #173D19

Morado psicodélico: #6E20FF

Morado oscuro: #24103D

Amarillo/lima: #D7FF35

Blanco: #F5F7EA

El verde neón debe ser el color principal de interacción.

El morado debe utilizarse para crear profundidad y elementos psicodélicos.

2. ESTILO VISUAL

Utilizar:

Bordes redondeados

Cards oscuras

Glow muy sutil

Sombras profundas

Gradientes verdes/morados

Elementos tipo sticker

Ilustraciones cartoon

Slime/gotas verdes

Estrellas

Planetas

Hongos psicodélicos

Alienígenas

Hojas estilizadas

Cohetes

Elementos espaciales

Texturas tipo graffiti

Los elementos decorativos deben aparecer principalmente en:

Hero sections

Headers

Banners

Empty states

Loading states

Categorías

Checkout

Tracking

Perfil

No saturar cada pantalla. La interfaz debe seguir siendo usable.

3. TIPOGRAFÍA

Usar una combinación:

Headings

Tipografía display gruesa, experimental y urbana.

Body

Una sans-serif moderna y altamente legible.

Los títulos pueden ser expresivos, pero la información de productos, precios, checkout y navegación debe ser extremadamente clara.

4. LOGO

El logo de “El De Las Paletas” debe ser el elemento principal de branding.

Debe aparecer en:

Splash

Login

Register

Header

Loading

Empty states

Checkout confirmation

El logo debe conservar su estética original.

Si existe un archivo de logo en Supabase Storage, utilizarlo.

No recrear el logo con texto HTML si existe el asset original.

5. EXPERIENCIA GENERAL

La app debe sentirse como:

“Entrar a un universo psicodélico de El De Las Paletas”

pero al mismo tiempo debe ser:

rápida

intuitiva

confiable

profesional

fácil de comprar

mobile-first

La experiencia debe estar optimizada principalmente para teléfonos.

6. SPLASH SCREEN

Crear una pantalla inicial con:

Logo grande de El De Las Paletas.

Fondo:

negro

manchas verdes

elementos espaciales

pequeñas estrellas

slime

ilustraciones psicodélicas

Animación:

logo aparece con un pequeño efecto scale/fade

partículas suaves

glow verde

Después llevar automáticamente al onboarding o home.

7. AGE / LEGAL GATE

Antes de permitir acceso al catálogo o compra, implementar una pantalla de verificación de edad y elegibilidad conforme a la normativa colombiana aplicable.

Debe ser visualmente coherente con la marca.

Ejemplo:

“Este espacio es exclusivo para adultos.”

Botón:

“Soy mayor de edad”

y opción:

“Salir”

No utilizar mecanismos de evasión de controles legales.

La aplicación debe estar diseñada para que las reglas regulatorias puedan configurarse desde el backend.

8. AUTENTICACIÓN

Utilizar Supabase Auth.

Crear:

Registro

Login

Logout

Recuperación de contraseña

Sesión persistente

Protección de rutas

Perfil de usuario

Campos iniciales del perfil:

nombre

apellido

email

teléfono

fecha de nacimiento

ciudad

dirección

avatar

preferencias

fecha de creación

Utilizar Supabase Auth para identidad y una tabla profiles relacionada con auth.users.

Proteger los datos mediante Row Level Security.

Nunca utilizar service_role keys en frontend.

9. ONBOARDING

Crear 3 pantallas:

Pantalla 1

“Bienvenido al universo de El De Las Paletas”

Alien + planeta + cannabis visual.

Pantalla 2

“Descubre productos”

Categorías flotantes.

Pantalla 3

“Recibe tus pedidos”

Cohete viajando sobre Medellín.

Botón:

“Empezar”

10. HOME

Crear un Home muy visual.

Header:

Logo pequeño.

Iconos:

búsqueda

favoritos

notificaciones

carrito

Saludo:

“¿Qué buscas hoy?”

Search bar:

“Buscar productos…”

Debajo:

categorías horizontales.

11. CATEGORÍAS

Crear categorías visuales con iconos/stickers:

Flores

Pre-rolls

Concentrados

Comestibles

Accesorios

Cada categoría debe tener su propia ilustración.

Diseño:

icono circular + glow + nombre.

Al seleccionar una categoría:

mostrar productos relacionados.

12. HOME BANNERS

Crear banners psicodélicos.

Ejemplo:

“Envíos rápidos en Medellín”

con:

skyline de Medellín

cohete

humo psicodélico

verde

morado

Otro banner:

“Explora nuevas experiencias”

Otro:

“Productos destacados”

13. PRODUCT CATALOG

Crear catálogo real conectado a Supabase.

Cada producto debe mostrar:

imagen

nombre

categoría

descripción corta

precio

disponibilidad

badge

favoritos

botón +

Ejemplo visual:

“Lemon Haze”

“Flor”

$60.000

Badge:

“Disponible”

14. PRODUCT DETAIL

Crear pantalla de producto premium.

Arriba:

imagen grande del producto.

Botón back.

Favorito.

Información:

Nombre

Categoría

Precio

Descripción

Características configurables.

Cantidad:

[-] 1 [+]

CTA:

“Agregar al carrito”

También:

“Comprar ahora”

No presentar afirmaciones médicas o de efectos terapéuticos sin respaldo y sin cumplir las reglas aplicables.

15. FILTROS

Crear filtros:

Categoría

Precio

Disponibilidad

Tipo

Ordenar por

Destacados

Nuevos

UI tipo bottom sheet en móvil.

16. SEARCH

Crear búsqueda instantánea.

Mostrar:

productos

categorías

búsquedas recientes

Estados:

Loading

No results

Results

17. FAVORITOS

Usuarios autenticados pueden guardar productos.

Crear tabla:

favorites

Relación:

user_id → product_id

Permitir:

agregar

eliminar

listar favoritos

18. CART

Crear carrito persistente.

Mostrar:

Producto

Imagen

Precio

Cantidad

[-] [1] [+]

Eliminar

Subtotal

Envío

Total

CTA:

“Proceder al pago”

El carrito debe persistir entre sesiones para usuarios autenticados.

19. CHECKOUT

Crear checkout dividido por pasos.

Paso 1

Información personal.

Paso 2

Dirección.

Paso 3

Método de entrega.

Paso 4

Método de pago.

Paso 5

Resumen.

Mostrar:

Productos

Subtotal

Envío

Total

CTA:

“Confirmar pedido”

La arquitectura debe permitir integrar posteriormente un proveedor de pagos autorizado.

No almacenar datos sensibles de tarjetas directamente en Supabase.

20. MÉTODOS DE PAGO

Preparar arquitectura para:

tarjeta

transferencia

métodos locales disponibles

pago contra entrega, solamente si legal y operacionalmente corresponde

Los métodos deben ser configurables desde administración.

Nunca guardar números completos de tarjetas.

21. ORDER SYSTEM

Crear sistema completo de pedidos.

Estados:

pending

confirmed

preparing

ready

in_transit

delivered

cancelled

Mostrar visualmente:

Disponible

Preparando

En camino

Entregado

Cancelado

Cada estado debe tener un icono propio.

22. ORDER TRACKING

Crear pantalla:

“Seguimiento”

Mostrar:

Pedido #42069

“En camino”

Mapa visual estilizado de Medellín.

No es necesario implementar GPS real inicialmente.

Crear arquitectura para posteriormente conectar tracking real.

Mostrar:

ubicación

repartidor, cuando corresponda

tiempo estimado

dirección

estado

CTA:

“Contactar”

23. MY ORDERS

Crear pantalla:

“Mis pedidos”

Tabs:

Todos

En camino

Entregados

Cancelados

Cada pedido:

Número

Fecha

Productos

Total

Estado

CTA:

“Ver pedido”

24. PROFILE

Crear:

“Mi Perfil”

Avatar estilo alien.

Nombre del usuario.

Ciudad.

Stats:

Compras

Favoritos

Direcciones

Opciones:

Mis pedidos

Favoritos

Direcciones

Métodos de pago

Notificaciones

Privacidad

Ayuda

Cerrar sesión

25. NOTIFICATIONS

Crear sistema de notificaciones.

Ejemplos:

“Tu pedido fue confirmado.”

“Tu pedido está en camino.”

“Tu pedido fue entregado.”

“Nuevo producto disponible.”

Las notificaciones deben estar almacenadas en Supabase.

26. ADMIN PANEL

Crear un panel administrativo separado.

Roles:

customer

staff

admin

El admin debe poder gestionar:

Productos

crear

editar

eliminar

activar/desactivar

precio

stock

categoría

imágenes

Categorías

crear

editar

eliminar

icono

orden

Pedidos

ver

cambiar estado

buscar

filtrar

visualizar cliente

Usuarios

ver

activar/desactivar según corresponda

visualizar pedidos

Inventario

stock

disponibilidad

Banners

crear

editar

activar/desactivar

Configuración

métodos de entrega

costos

zonas

horarios

métodos de pago

reglas de elegibilidad

27. DATABASE

Crear una estructura Supabase/Postgres limpia.

Tablas principales:

profiles

categories

products

product_images

favorites

cart_items

addresses

orders

order_items

payments

notifications

banners

inventory

delivery_zones

app_settings

audit_logs

user_roles

Utilizar UUIDs.

Agregar timestamps.

Agregar foreign keys.

Agregar índices donde corresponda.

28. SECURITY

Implementar Row Level Security en todas las tablas expuestas.

Reglas:

Un usuario únicamente puede:

ver su propio perfil

editar su propio perfil

ver sus propios pedidos

ver sus propios favoritos

editar su propio carrito

ver sus propias direcciones

ver sus propias notificaciones

Los productos y categorías publicados pueden ser visibles públicamente si la configuración del negocio lo permite.

Solamente usuarios con rol administrativo pueden modificar catálogo, pedidos, inventario y configuración.

No confiar únicamente en restricciones del frontend.

Usar RLS en Supabase.

Nunca exponer:

service_role key

secretos

credenciales de proveedores

claves privadas

29. SUPABASE STORAGE

Crear buckets para:

product-images

category-icons

brand-assets

avatars

banners

Aplicar políticas de acceso adecuadas.

Las imágenes deben almacenarse en Storage y la base de datos solamente debe almacenar sus referencias/URLs.

30. RESPONSIVE DESIGN

Mobile-first.

Prioridad:

iPhone

Android

Tablet

Desktop

En móvil utilizar bottom navigation.

Bottom navigation:

🏠 Inicio

🔎 Explorar

🛍 Carrito

📦 Pedidos

👽 Perfil

31. MICROINTERACTIONS

Agregar animaciones suaves:

botones con scale

cards con hover

favoritos con heart animation

agregar al carrito con pequeña animación

transitions entre páginas

skeleton loaders

toast notifications

modal transitions

slime animations muy sutiles

NO hacer animaciones excesivas que afecten rendimiento.

32. EMPTY STATES

Cada sección debe tener empty state.

Ejemplo favoritos:

Alien triste:

“Todavía no tienes favoritos”

“Explorar productos”

Carrito vacío:

“Tu carrito está flotando por el espacio”

“Explorar”

33. ERROR STATES

Diseñar errores visualmente.

Ejemplo:

“Houston, tenemos un problema.”

Pero debajo explicar claramente el error y ofrecer:

“Intentar nuevamente”

34. LOADING

Utilizar:

skeletons

logo animado

slime loader

pequeñas estrellas

Nunca mostrar una pantalla blanca durante cargas.

35. ACCESSIBILITY

Aunque la estética sea experimental:

textos legibles

buen contraste

botones grandes

navegación clara

labels accesibles

focus states

soporte para teclado

reduced motion cuando sea necesario

36. PERFORMANCE

Optimizar:

imágenes

lazy loading

queries

índices

componentes

caché cuando corresponda

No cargar todas las imágenes del catálogo al mismo tiempo.

37. COMPONENT SYSTEM

Crear componentes reutilizables:

NeonButton

ProductCard

CategoryBubble

ProductBadge

PsychedelicBanner

AlienIcon

SlimeDivider

BottomNav

QuantitySelector

OrderStatus

OrderCard

ProductGallery

SearchBar

EmptyState

LoadingState

Modal

Toast

AdminSidebar

38. DATA

No utilizar datos falsos hardcodeados como arquitectura final.

Crear seed data únicamente para desarrollo.

Crear algunos productos demo:

Lemon Haze

Galletas Cósmicas

Pre-rolls Cósmicos

Concentrados

Accesorios

Pero hacer que todo provenga de Supabase.

39. PRODUCT IMAGE STYLE

Las imágenes de productos deben tener:

fondo oscuro

glow verde/morado

iluminación dramática

estilo premium

composición tipo sticker

estética psicodélica

Los assets proporcionados del branding deben poder cargarse desde Supabase Storage.

40. BRAND ASSETS

Preparar el proyecto para utilizar los assets gráficos del branding proporcionados:

logo

alien

categorías

hongos

cohete

hojas

planetas

slime

iconos

stickers

No reemplazar estos assets por emojis cuando exista un asset gráfico real.

41. MEDELLÍN

La primera zona operacional será:

Medellín, Antioquia, Colombia.

Preparar arquitectura para zonas de entrega.

Ejemplo:

El Poblado

Laureles

Envigado

Sabaneta

Belén

Centro

Las zonas deben ser configurables desde admin.

No hardcodear costos de envío.

42. LEGAL / COMPLIANCE

La plataforma debe estar preparada para operar únicamente bajo el marco legal y regulatorio aplicable en Colombia.

No implementar funcionalidades destinadas a:

evadir controles de edad

ocultar transacciones

vender productos ilegales

falsificar documentos

eludir restricciones regulatorias

La disponibilidad de productos, límites de compra, zonas de entrega y requisitos de elegibilidad deben ser configurables.

Antes de producción, dejar claramente identificados los puntos que requieren validación jurídica y regulatoria local.

43. UX COPY

Utilizar español colombiano natural.

Ejemplos:

“¿Qué buscas hoy?”

“Explorar productos”

“Agregar al carrito”

“Proceder al pago”

“Tu pedido está en camino”

“Llegamos hasta Medellín”

“Todo listo, parce.”

“Tu pedido viene volando.”

Pero mantener información de checkout, pagos, privacidad y términos en lenguaje profesional.

44. DESIGN QUALITY BAR

Quiero que el resultado parezca diseñado por un equipo profesional de:

UX designer

UI designer

branding designer

product designer

frontend engineer

No quiero apariencia de template.

Debe sentirse como una startup tecnológica real.

Referencia conceptual:

psychedelic streetwear + premium ecommerce + alien sci-fi + Colombian urban culture.

45. IMPLEMENTACIÓN

Construir primero:

Design system

Layout

Supabase connection

Auth

Database schema

RLS

Home

Catalog

Product detail

Cart

Checkout

Orders

Profile

Admin

Notifications

Polish / animations

No construir todo como una sola página gigante.

Crear componentes y rutas limpias.

Mantener el código organizado y reutilizable.

46. REGLA IMPORTANTE

Antes de implementar una funcionalidad nueva, comprobar si debe existir en Supabase.

Si necesita persistencia:

→ crear tabla / relación / política RLS.

Si necesita archivos:

→ Supabase Storage.

Si necesita lógica sensible:

→ backend / Edge Function.

No colocar secretos en frontend.

47. RESULTADO FINAL

Quiero terminar con una aplicación que visualmente se parezca al universo de “El De Las Paletas”:

NEGRO + VERDE NEÓN + MORADO

ALIENS + PLANETAS + HONGOS + SLIME + GRAFFITI

pero con una experiencia de ecommerce moderna, rápida y profesional.

La sensación debe ser:

“¿Qué carajos es esta app? Está brutal.”

y después:

“Ah, es facilísima de usar.”

Priorizar siempre:

UX

Seguridad

Escalabilidad

Performance

Branding

Animaciones

Conversión

No sacrificar usabilidad por estética.

Empieza creando primero el design system + estructura de navegación + esquema Supabase + autenticación + RLS, y después construye las pantallas conectadas a datos reales.  Voy a proporcionarte DOS imágenes de referencia que debes utilizar directamente para construir la interfaz de esta aplicación.

IMAGEN 1 — ASSETS / ICONOS

La primera imagen contiene una colección de assets gráficos, iconos, ilustraciones y elementos visuales de la marca.

Quiero que analices esta imagen y extraigas visualmente cada asset individual que necesites para construir la interfaz.

No quiero que reemplaces estos elementos por emojis, iconos genéricos de Lucide, Font Awesome ni otros iconos predeterminados cuando exista un asset equivalente en la imagen.

Debes identificar y reutilizar:

Iconos de categorías

Iconos de navegación

Alien

Cohete

Hongos

Hojas

Planetas

Elementos de slime

Estrellas

Elementos decorativos

Iconos de productos

Estados de pedidos

Elementos de delivery

Iconos de pago

Badges

Botones gráficos

Cualquier otro elemento visual relevante

Si es posible técnicamente, recorta/separa los assets de la imagen y conviértelos en recursos reutilizables dentro del proyecto.

Cuando un elemento aparezca repetidamente en diferentes pantallas, debe utilizarse siempre el mismo asset para mantener consistencia visual.

NO redibujes los iconos con CSS si existe una versión gráfica en la imagen.

NO sustituyas los assets por aproximaciones genéricas.

IMAGEN 2 — MAQUETA / SCREENSHOT

La segunda imagen será una captura de pantalla de la maqueta visual de la aplicación.

Esta imagen es la referencia principal del diseño.

Quiero que reproduzcas la interfaz lo más fielmente posible.

No quiero que simplemente interpretes la imagen o hagas algo “parecido”.

Quiero que analices:

Layout

Espaciados

Tamaños

Jerarquía visual

Posición de elementos

Tipografía

Tamaño de títulos

Tamaño de botones

Bordes

Border radius

Sombras

Glow

Gradientes

Colores

Imágenes

Iconos

Navegación

Cards

Headers

Bottom navigation

Banners

Estados

Animaciones sugeridas por el diseño

y reproduzcas todo esto en código.

REGLA PRINCIPAL

LA IMAGEN DE LA MAQUETA ES LA FUENTE DE VERDAD VISUAL.

Si mi descripción escrita entra en conflicto con la maqueta, prioriza la maqueta.

No cambies el estilo por tu cuenta.

No simplifiques el diseño.

No conviertas el diseño en un ecommerce genérico.

No uses componentes visualmente genéricos cuando la maqueta muestra algo personalizado.

OBJETIVO

Quiero que cuando abra la aplicación en el navegador y la compare con la captura que te proporcioné, la interfaz sea visualmente prácticamente igual.

Debe conservar:

NEGRO + VERDE NEÓN + MORADO + SLIME + PSICODELIA + ALIENS + GRAFFITI + SCI-FI.

La aplicación debe sentirse como una marca real, no como una plantilla de ecommerce.

IMPLEMENTACIÓN

Utiliza los assets de la primera imagen y la maqueta de la segunda imagen para crear componentes reutilizables.

Por ejemplo:

Logo

CategoryIcon

ProductCard

AlienIllustration

PsychedelicBanner

SlimeDecoration

Rocket

OrderStatus

BottomNavigation

QuantitySelector

ProductDetail

CartItem

No dupliques código innecesariamente.

Si el mismo componente aparece en varias pantallas, debe ser el mismo componente.

RESPONSIVE

La referencia principal es una interfaz móvil.

Por lo tanto:

mobile-first.

En móvil quiero que la aplicación mantenga exactamente la composición visual de la maqueta.

En tablet y desktop puedes adaptar el layout, pero sin destruir la identidad visual.

FIDELIDAD VISUAL

Quiero que prestes especial atención a:

1. Colores

Extrae los colores directamente de la referencia.

2. Iconos

Utiliza los assets proporcionados.

3. Espaciado

No agrupes elementos simplemente porque haya espacio disponible.

Respeta la composición de la maqueta.

4. Tipografía

Busca una tipografía lo más cercana posible a la referencia.

5. Cards

Reproduce:

tamaño

padding

radius

borde

glow

sombra

6. Botones

Mantén:

color

forma

tamaño

tipografía

posición

7. Decoraciones

Las decoraciones psicodélicas no son opcionales.

Son parte fundamental de la identidad de la aplicación.

SI UN ASSET NO PUEDE EXTRAERSE DIRECTAMENTE

Si técnicamente no puedes recortar automáticamente un asset de la imagen:

Identifica exactamente qué asset necesitas.

Crea una versión equivalente manteniendo su diseño.

No lo sustituyas por un icono genérico.

Mantén el mismo estilo gráfico.

IMPORTANTE SOBRE LOS DATOS

La maqueta es la referencia visual, pero los datos deben estar preparados para funcionar con Supabase.

Por ejemplo:

Productos → Supabase

Categorías → Supabase

Usuarios → Supabase Auth

Favoritos → Supabase

Carrito → Supabase

Pedidos → Supabase

Imágenes → Supabase Storage

No hardcodear la arquitectura final.

Puedes utilizar datos de prueba inicialmente para reproducir exactamente la maqueta, pero posteriormente deben poder sustituirse por datos reales sin reconstruir la interfaz.

PROCESO

Primero analiza ambas imágenes.

Después:

Identifica todos los assets.

Identifica todos los componentes visuales.

Identifica las pantallas.

Identifica la navegación.

Identifica los elementos reutilizables.

Crea el design system.

Implementa los componentes.

Implementa las pantallas.

Conecta los componentes a Supabase.

Compara visualmente el resultado con la maqueta.

Corrige diferencias visuales.

No avances creando un diseño alternativo.

REPLICA LA REFERENCIA.

La prioridad es:

1. Fidelidad visual
2. UX
3. Performance
4. Arquitectura limpia
5. Integración con Supabase

Quiero que el resultado final se sienta como si la maqueta hubiera sido convertida directamente en una aplicación funcional.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://paletas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/42338ee8-42da-4236-950c-430d2f67d9de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

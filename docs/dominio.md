# Dominio: cuál comprar y dónde

Disponibilidad comprobada el 28 de octubre de 2026. El buscador del registrador te la confirmará en el momento de comprarlo.

## Qué dominio comprar

**Recomendación: `cleangreenmontsia.es`.** El negocio ya no es solo de parcelas: también hace limpieza de casas y pisos, jardinería, segundas residencias y mantenimiento. Un dominio con la marca y la comarca sirve para todo eso, transmite que eres un negocio de aquí y es el que espera la web.

- Si el presupuesto lo permite, compra también **`cleangreenparcelas.es`** y redirígelo a `cleangreenmontsia.es`. Así lo tienes protegido y aprovechas a quien lo escriba buscando el desbroce de parcelas.
- El `.com` (`cleangreenmontsia.com`) es opcional; si lo compras, redirígelo también al `.es`.
- Para un `.es` necesitas un **NIF o NIE**. Si eres persona física, el titular y el contacto administrativo deben ser la misma persona.

| Dominio | Estado | Cómo se ha comprobado |
|---|---|---|
| **cleangreenmontsia.es** | Parece libre | No existe en el DNS. El .es no tiene consulta pública RDAP |
| cleangreenmontsia.com | **Libre** | RDAP oficial de Verisign: no registrado |
| cleangreenparcelas.es | Parece libre | No existe en el DNS |
| cleangreenparcelas.com | **Libre** | RDAP oficial de Verisign: no registrado |
| cleangreenparcelas.net | **Libre** | RDAP oficial de Verisign: no registrado |
| cleangreenparcelas.cat | **Libre** | RDAP oficial de puntCAT: no registrado |
| cleangreenparcelas.eu | Parece libre | No existe en el DNS |

## Dónde comprarlo

Precios por año en euros. Ojo con las ofertas del primer año: lo que más cuenta es la renovación.

| Registrador | .es 1.er año | .es renovación | .com | IVA | Comprobado |
|---|---|---|---|---|---|
| [DonDominio](https://www.dondominio.com/en/products/domains/es/) (España) | 6,95 € | 6,95 € | 15,95 € | Sin IVA | Sí, en su web oficial |
| [Hostalia](https://www.hostalia.com/dominios/) (España) | 5,99 € | 6,99 € | 11,99 € (12,99 € renovación) | Sin IVA | Sí, en su web oficial |
| [IONOS](https://www.ionos.es/) | 1,00 € | 10,00 € | — | — | No: dato de una comparativa de [mejor.hosting](https://www.mejor.hosting/blog/cuanto-cuesta-un-dominio/) |
| [Dinahosting](https://dinahosting.com/) (España) | 9,75 € | 14,00 € | 10,99 € (15,99 € renovación) | — | No: misma comparativa; su web no respondía desde aquí |

**Mi recomendación es DonDominio.** Tiene el mismo precio el primer año y en la renovación, panel en español y transferencia gratuita. Con IVA, el .es sale por unos 8,41 € al año.

## Conectar el dominio con GitHub Pages

La web se publica con GitHub Actions, así que **no hace falta archivo `CNAME`** en el repositorio: el dominio se configura en GitHub. Datos de la [documentación de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site):

1. En GitHub, ve a **Settings → Pages → Custom domain**, escribe `cleangreenmontsia.es` y guarda. Hazlo **antes** de tocar el DNS.
2. En **Settings → Secrets and variables → Actions → Variables**, crea la variable `DOMINIO` con el valor `cleangreenmontsia.es`. Así la web genera todas sus URL, el sitemap y los datos estructurados con el dominio.
3. En el panel DNS del registrador, crea estos registros:

   | Tipo | Nombre | Valor |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | riuko97.github.io |

4. Vuelve a publicar desde **Actions → Publicar la web → Run workflow**.
5. Espera a que se propague, hasta 24 horas, y marca **Enforce HTTPS** en **Settings → Pages**.
6. GitHub recomienda **verificar el dominio** en la configuración de tu cuenta para evitar que otro lo use.
7. Da de alta la propiedad en Google Search Console y envía `https://cleangreenmontsia.es/sitemap.xml`.

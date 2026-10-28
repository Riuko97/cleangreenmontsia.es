# Dominio: dónde comprar «cleangreenparcelas»

Comprobado el 28 de octubre de 2026.

## ¿Está libre?

| Dominio | Estado | Cómo se ha comprobado |
|---|---|---|
| cleangreenparcelas.es | Parece libre | No existe en el DNS. El .es no tiene consulta pública RDAP |
| cleangreenparcelas.com | **Libre** | RDAP oficial de Verisign: no registrado |
| cleangreenparcelas.net | **Libre** | RDAP oficial de Verisign: no registrado |
| cleangreenparcelas.cat | **Libre** | RDAP oficial de puntCAT: no registrado |
| cleangreenparcelas.eu | Parece libre | No existe en el DNS |
| cleangreenmontsia.es | Parece libre | No existe en el DNS |
| cleangreenmontsia.com | **Libre** | RDAP oficial de Verisign: no registrado |

El buscador del registrador te confirmará la disponibilidad en el momento de comprarlo.

## Qué dominio comprar

**Recomendación: `cleangreenparcelas.es`.** Es el dominio que espera la web y el .es transmite que eres un negocio de aquí. Si el presupuesto lo permite, compra también el `.com` y redirígelo al `.es`, para que nadie lo registre por ti.

Para un .es necesitas un **NIF o NIE**. Si eres persona física, el titular y el contacto administrativo deben ser la misma persona.

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

Datos de la [documentación de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site):

1. En GitHub, ve a **Settings → Pages → Custom domain**, escribe `cleangreenparcelas.es` y guarda. Hazlo **antes** de tocar el DNS. GitHub creará el archivo `CNAME` en el repositorio.
2. En el panel DNS del registrador, crea estos registros:

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

3. Espera a que se propague, hasta 24 horas, y marca **Enforce HTTPS** en la misma pantalla de Pages.
4. GitHub recomienda **verificar el dominio** en la configuración de tu cuenta para evitar que otro lo use.
5. Da de alta la propiedad en Google Search Console y envía `https://cleangreenparcelas.es/sitemap.xml`, como hiciste en la tarea B07.

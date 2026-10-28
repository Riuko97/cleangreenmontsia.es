// MODELO · Guías (contenido informativo con fuentes).
// Los bloques se pintan con la vista «guia»: h2, p, resumen, lista, checklist, tabla, nota, aviso.

const GENCAT = 'https://tramits.gencat.cat/ca/tramits/tramits-temes/Autoritzacio-per-a-la-realitzacio-dactivitats-amb-risc-dincendi';
const DIBA = 'https://www.diba.cat/documents/d/incendis/diba_franges_web';
const BOE = 'https://www.boe.es/boe/dias/2003/05/27/pdfs/A20250-20253.pdf';
const ext = (url, texto) => `<a href="${url}" target="_blank" rel="noopener">${texto}</a>`;

export const GUIAS = [
  {
    id: 'normativa-limpieza-de-parcelas',
    area: 'desbroce-y-limpieza-de-parcelas',
    icono: 'i-fuego',
    titulo: '¿Tengo que limpiar mi parcela? Normativa en Cataluña',
    h1: '¿Tengo que limpiar mi parcela? Lo que dice la normativa',
    descripcion: 'Época de peligro del 15 de marzo al 15 de octubre, prohibición de quemar restos de jardinería y obligaciones en urbanizaciones (Llei 5/2003). Guía para propietarios.',
    resumen: 'Época de peligro de incendio, quema de restos y obligaciones de las parcelas en urbanizaciones cercanas al bosque.',
    entradilla: 'Resumen práctico de las normas de prevención de incendios que afectan a parcelas, solares y urbanizaciones en Cataluña.',
    fecha: '2026-10-28',
    bloques: [
      { tipo: 'aviso', html: 'Esta guía es informativa y no sustituye al asesoramiento jurídico. Las normas cambian y cada municipio tiene sus ordenanzas: ante cualquier duda, consulta a tu ayuntamiento.' },
      { tipo: 'h2', texto: 'En resumen' },
      { tipo: 'resumen', items: [
        ['i-fuego', '<strong>Del 15 de marzo al 15 de octubre</strong> es la época de más riesgo. A menos de 400 metros del bosque, las actividades con riesgo de incendio necesitan autorización; el resto del año, una declaración responsable.'],
        ['i-sinfuego', '<strong>Quemar restos de jardinería está prohibido.</strong> Hay que retirarlos o triturarlos.'],
        ['i-casa', '<strong>Urbanizaciones cerca del bosque:</strong> franja de protección de al menos 25 metros y parcelas interiores sin vegetación seca (Llei 5/2003).'],
        ['i-presupuesto', '<strong>Si el propietario no lo hace,</strong> el ayuntamiento debe hacerlo de forma subsidiaria y puede cobrar una tasa.'],
      ] },
      { tipo: 'h2', texto: 'La época de peligro: del 15 de marzo al 15 de octubre' },
      { tipo: 'calendario' },
      { tipo: 'p', html: 'La Generalitat divide el año en dos periodos. Del <strong>15 de marzo al 15 de octubre</strong>, el de más riesgo, las actividades con riesgo de incendio a menos de 400 metros de masa forestal necesitan una <strong>autorización</strong>. Del 16 de octubre al 14 de marzo basta con una <strong>declaración responsable</strong>. No cuentan para medir esa distancia las manchas forestales de menos de una hectárea.' },
      { tipo: 'p', html: 'Por eso la mejor época para limpiar una parcela es la primavera, antes de que la hierba se seque: se trabaja mejor y llegas al verano con el terreno en orden.' },
      { tipo: 'h2', texto: '¿Se pueden quemar los restos?' },
      { tipo: 'p', html: 'No los de jardinería. La Generalitat incluye la <strong>quema de restos de jardinería</strong> entre las actividades prohibidas, y también la de restos agrícolas, salvo en microexplotaciones y pequeñas explotaciones. Las quemas por prevención de incendios o por motivos fitosanitarios necesitan autorización todo el año.' },
      { tipo: 'p', html: 'La alternativa es <strong>retirar los restos</strong> de la parcela o triturarlos. La retirada de restos y residuos es uno de nuestros servicios.' },
      { tipo: 'h2', texto: 'Parcelas en urbanizaciones cerca del bosque' },
      { tipo: 'p', html: 'La <strong>Llei 5/2003</strong>, de 22 de abril, obliga a las urbanizaciones, núcleos de población, edificaciones e instalaciones situados en terreno forestal o a menos de 500 metros de él a tener una <strong>franja exterior de protección de al menos 25 metros</strong>. Las parcelas y zonas verdes del interior deben mantenerse en las mismas condiciones. El <strong>Decret 123/2005</strong> fija cómo tiene que estar la vegetación.' },
      { tipo: 'p', html: 'Lo tienen que cumplir los propietarios de las fincas. Si no lo hacen, el <strong>ayuntamiento tiene la obligación de hacerlo de forma subsidiaria</strong> y puede imponer una tasa por el servicio.' },
      { tipo: 'tabla', titulo: 'Condiciones de la vegetación en la franja de protección', cabecera: ['Qué se mira', 'Condición en la franja'], filas: [
        ['Vegetación seca', 'No debe haber'],
        ['Densidad de árboles', 'Menos de 150 pies por hectárea, sin continuidad entre copas'],
        ['Separación entre troncos', 'Al menos 6 metros'],
        ['Poda de ramas', 'Un tercio de la altura del árbol, hasta un máximo de 5 metros'],
        ['Matorral bajo árboles adultos', 'Menos del 15 % de la superficie'],
        ['Matorral y arbolado joven', 'Menos del 35 % de la superficie'],
        ['Separación entre matas', 'Al menos 3 metros'],
        ['Restos de la limpieza', 'Trozos de 20 cm como máximo, repartidos por el terreno'],
      ] },
      { tipo: 'p', html: `Fuente de la tabla: guía ${ext(DIBA, 'Les franges perimetrals de protecció contra els incendis forestals')}, de la Diputació de Barcelona y el CREAF (2025), que recoge los valores del Decret 123/2005. Según su seguimiento, el matorral se recupera tan rápido que <strong>hay que repetir la limpieza cada uno o dos años</strong>.` },
      { tipo: 'nota', icono: 'i-ubicacion', html: '<strong>¿Tu urbanización está afectada?</strong> Cada ayuntamiento tiene un plano de delimitación con las urbanizaciones, edificaciones e instalaciones obligadas. Pregunta en el de Amposta, Alcanar, La Ràpita o el de tu municipio.' },
      { tipo: 'h2', texto: 'Solares y parcelas en el pueblo' },
      { tipo: 'p', html: 'Fuera de las urbanizaciones forestales también hay obligaciones: muchos ayuntamientos piden por ordenanza que los solares estén limpios y en buen estado, y pueden requerirlo a los propietarios. Consulta la ordenanza de tu municipio.' },
    ],
    preguntas: [
      ['¿Puedo quemar los restos de la limpieza?', 'Los restos de jardinería no. La Generalitat incluye su quema entre las actividades prohibidas, y la de restos agrícolas también, salvo en microexplotaciones y pequeñas explotaciones. Lo práctico es retirarlos o triturarlos.'],
      ['¿Cómo sé si mi urbanización está afectada por la Llei 5/2003?', 'Cada ayuntamiento tiene un plano de delimitación con las urbanizaciones, edificaciones e instalaciones afectadas. Pregunta en el tuyo: es la forma segura de saberlo.'],
      ['¿Qué pasa si no limpio la parcela?', 'En las urbanizaciones afectadas, si los propietarios no cumplen, el ayuntamiento tiene la obligación de hacerlo de forma subsidiaria y puede cobrar una tasa por el servicio. Las ordenanzas municipales pueden prever además requerimientos y sanciones.'],
      ['¿Cada cuánto hay que repetir la limpieza?', 'Depende de la vegetación. En las franjas de protección, el seguimiento del CREAF y la Diputació de Barcelona concluye que hay que repetirla cada uno o dos años, porque el matorral se recupera muy rápido.'],
    ],
    fuentes: [
      `Generalitat de Catalunya. ${ext(GENCAT, "Sol·licitud per a realitzar activitats amb risc d'incendi forestal")}. Tràmits gencat, actualizado el 16/10/2026. Cita el Decret 64/1995, el Decret llei 21/2025, la Llei 5/2003 y el Decret 123/2005.`,
      `Diputació de Barcelona y CREAF. ${ext(DIBA, 'Les franges perimetrals de protecció contra els incendis forestals: execució, característiques i manteniment')}. Marzo de 2025.`,
      `${ext(BOE, 'Ley 5/2003, de 22 de abril, de medidas de prevención de los incendios forestales en las urbanizaciones sin continuidad inmediata con la trama urbana')}. BOE de 27 de mayo de 2003 (texto original; la ley se ha modificado después).`,
    ],
  },
  {
    id: 'cerrar-y-abrir-una-segunda-residencia',
    area: 'segundas-residencias',
    icono: 'i-llave',
    titulo: 'Cómo cerrar y abrir una segunda residencia',
    h1: 'Cómo cerrar y abrir una segunda residencia: lista práctica',
    descripcion: 'Qué hacer antes de cerrar tu segunda residencia, mientras estás fuera y al volver: agua, nevera, ventilación, jardín, parcela y limpieza. Lista práctica para el Montsià.',
    resumen: 'Qué hacer antes de cerrar la casa, mientras estás fuera y al volver, para encontrarla siempre en orden.',
    entradilla: 'Una lista sencilla para cerrar la casa al acabar la temporada y abrirla sin sorpresas cuando vuelvas.',
    fecha: '2026-10-28',
    bloques: [
      { tipo: 'p', html: 'Una casa que pasa meses cerrada necesita algo de preparación. Estos son los pasos que más problemas evitan, tanto si lo haces tú como si nos lo encargas.' },
      { tipo: 'h2', texto: 'Antes de cerrar la casa' },
      { tipo: 'checklist', items: [
        'Vacía y limpia la nevera. Si la desconectas, deja la puerta entreabierta para que no salga moho.',
        'Cierra la llave de paso del agua y, si tienes, la del gas.',
        'Desenchufa los aparatos que no necesites.',
        'Retira la comida que pueda atraer insectos o roedores.',
        'Haz una limpieza a fondo: volver a una casa limpia es otra cosa.',
        'Recoge el jardín y la parcela y retira los restos vegetales.',
        'Cierra bien ventanas y persianas.',
        'Deja una copia de las llaves a una persona de confianza.',
      ] },
      { tipo: 'h2', texto: 'Mientras estás fuera' },
      { tipo: 'checklist', items: [
        'Que alguien pase de vez en cuando a ventilar y a comprobar que todo está en orden.',
        'Mantén el jardín según la época: en primavera crece mucho más deprisa.',
        'Desbroza la parcela antes del 15 de marzo, cuando empieza la época de peligro de incendio, sobre todo si está cerca del bosque.',
      ] },
      { tipo: 'nota', icono: 'i-fuego', html: 'Si tu casa está en una urbanización cerca del bosque, mantener la parcela sin vegetación seca puede ser obligatorio. Lo explicamos en la <a href="{{guia:normativa-limpieza-de-parcelas}}">guía de normativa</a>.' },
      { tipo: 'h2', texto: 'Al volver' },
      { tipo: 'checklist', items: [
        'Abre puertas y ventanas para ventilar.',
        'Abre la llave de paso y deja correr el agua unos minutos.',
        'Revisa si hay humedades, goteras o insectos.',
        'Haz una limpieza general antes de instalarte, o pide que la tengan lista para cuando llegues.',
        'Echa un vistazo al jardín y a la parcela.',
      ] },
      { tipo: 'h2', texto: 'Cómo te ayudamos' },
      { tipo: 'p', html: 'Podemos encargarnos de casi toda la lista: la <a href="{{area:segundas-residencias}}">limpieza de cierre de temporada</a>, las revisiones mientras no estás, el <a href="{{area:jardineria}}">jardín</a>, la <a href="{{area:desbroce-y-limpieza-de-parcelas}}">parcela</a> y la casa lista antes de tu llegada.' },
    ],
    preguntas: [
      ['¿Cada cuánto conviene revisar una casa cerrada?', 'Depende del tiempo que vaya a estar cerrada y de la época del año. Lo acordamos contigo: cada semana, cada quince días, cada mes o en fechas concretas, por ejemplo después de unas lluvias fuertes.'],
      ['¿Podéis cerrar la casa por mí?', 'Sí. Hacemos la limpieza a fondo de salida, recogemos el jardín y la parcela y retiramos los restos.'],
    ],
    fuentes: [],
  },
];

export const guiaPorId = id => GUIAS.find(g => g.id === id);

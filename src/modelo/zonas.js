// MODELO · Zonas de trabajo.
// Solo se afirman como zonas de trabajo Amposta, Alcanar y Sant Carles de la Ràpita,
// que son las que da el negocio. El resto se presentan como «pregúntanos».

export const ZONAS = [
  {
    id: 'amposta',
    nombre: 'Amposta',
    titulo: 'Limpieza, jardinería y mantenimiento en Amposta',
    h1: 'Limpieza, jardinería y mantenimiento en Amposta',
    descripcion: 'Limpieza de casas y pisos, jardinería, desbroce de parcelas y cuidado de segundas residencias en Amposta. Presupuesto sin compromiso por WhatsApp.',
    entradilla: 'Limpieza de pisos y casas, mantenimiento de jardines y desbroce de parcelas y solares en Amposta, del casco urbano a las afueras.',
    parrafos: [
      'Amposta es la capital del Montsià y en su término hay de todo: pisos y casas en el núcleo urbano, chalets con jardín, huertos y parcelas en las afueras y fincas de secano con olivos y algarrobos.',
      'Por eso trabajamos en las cinco áreas: limpieza de viviendas, jardinería, desbroce de parcelas, cuidado de segundas residencias y mantenimiento periódico.',
      'En muchas parcelas de las afueras crecen cañas y zarzas que van cerrando el terreno. Las eliminamos y, si hace falta, programamos repasos para que no vuelvan.',
    ],
    destacadas: ['limpieza-de-casas-y-pisos', 'desbroce-y-limpieza-de-parcelas', 'jardineria'],
    preguntas: [
      ['¿Trabajáis en todo el término de Amposta?', 'Sí, tanto en el núcleo urbano como en las afueras. Cuando nos escribas, mándanos la ubicación exacta para valorar el acceso.'],
      ['¿Hacéis limpieza de pisos en Amposta?', 'Sí. Limpieza de pisos y viviendas, limpiezas a fondo, casas vacías, cristales y limpieza después de obras o reformas.'],
      ['Tengo un solar en el pueblo, ¿lo podéis dejar limpio?', 'Sí. Desbrozamos el solar, retiramos los restos y residuos y lo dejamos presentable, por ejemplo para venderlo.'],
    ],
    cerca: ['Masdenverge', 'Santa Bàrbara', "Sant Jaume d'Enveja", 'Freginals'],
  },
  {
    id: 'alcanar',
    nombre: 'Alcanar',
    titulo: "Limpieza y jardinería en Alcanar y Les Cases",
    h1: "Limpieza, jardinería y mantenimiento en Alcanar",
    descripcion: "Limpieza de casas, jardinería, desbroce y cuidado de segundas residencias en Alcanar, Les Cases d'Alcanar y Alcanar Platja. Presupuesto por WhatsApp.",
    entradilla: "Cuidamos casas, jardines y parcelas en Alcanar, Les Cases d'Alcanar y Alcanar Platja. Ideal si tienes una segunda residencia: lo coordinamos todo por WhatsApp.",
    parrafos: [
      'Alcanar está entre la Serra del Montsià y el mar: casas de segunda residencia cerca de la costa, fincas de cítricos y olivos y parcelas en zonas de monte. Muchas pasan meses sin que nadie las vea.',
      'Si vives fuera, lo más práctico es combinar las revisiones de la casa con el mantenimiento del jardín y la parcela: la casa está lista cuando llegas y el terreno no se descontrola.',
      'En las parcelas cercanas al monte, tener el terreno sin hierba seca ni restos es especialmente importante en verano.',
    ],
    destacadas: ['segundas-residencias', 'jardineria', 'limpieza-de-casas-y-pisos'],
    preguntas: [
      ["¿Trabajáis en Les Cases d'Alcanar y Alcanar Platja?", "Sí. Trabajamos en Alcanar y en sus núcleos de la costa, Les Cases d'Alcanar y Alcanar Platja."],
      ['Tengo una casa de vacaciones, ¿podéis cuidarla durante el año?', 'Sí. Revisamos la vivienda, la tenemos lista antes de que llegues y mantenemos el jardín y la parcela. Lo acordamos contigo por WhatsApp.'],
      ['¿Hacéis poda de árboles frutales?', 'Hacemos poda de arbustos y de árboles pequeños, frutales incluidos. Si hay árboles grandes, mándanos fotos y te decimos si podemos encargarnos.'],
    ],
    cerca: ['Ulldecona', 'Godall', 'La Sénia'],
  },
  {
    id: 'la-rapita',
    nombre: 'La Ràpita',
    nombreLargo: 'Sant Carles de la Ràpita',
    titulo: 'Limpieza y jardinería en La Ràpita',
    h1: 'Limpieza, jardinería y mantenimiento en La Ràpita',
    descripcion: 'Limpieza de pisos y casas, jardinería, desbroce de parcelas y cuidado de segundas residencias en Sant Carles de la Ràpita. Presupuesto sin compromiso.',
    entradilla: 'Limpieza de pisos y casas, jardinería, desbroce y cuidado de segundas residencias en Sant Carles de la Ràpita.',
    parrafos: [
      'La Ràpita va desde la falda de la Serra del Montsià hasta la badia dels Alfacs. Hay pisos y apartamentos en el pueblo, casas con jardín y parcelas cerca del monte, donde la vegetación crece rápido y en verano se seca.',
      'Si tu parcela está en una urbanización cercana al bosque, la normativa obliga a mantenerla sin vegetación seca. Te ayudamos a tenerla a punto antes del 15 de marzo, cuando empieza la época de peligro.',
      'Y si tienes un piso o una casa que usas solo en vacaciones, la dejamos limpia antes de que llegues y en orden cuando te vas.',
    ],
    destacadas: ['limpieza-de-casas-y-pisos', 'segundas-residencias', 'desbroce-y-limpieza-de-parcelas'],
    preguntas: [
      ['¿Trabajáis en las urbanizaciones de La Ràpita?', 'Sí. Mándanos la ubicación y unas fotos del estado actual para valorar el trabajo.'],
      ['¿Podéis limpiar el piso antes de que llegue de vacaciones?', 'Sí. Dinos la fecha y lo dejamos limpio y ventilado para tu llegada.'],
      ['¿Cuándo conviene limpiar la parcela?', 'Antes del verano. Del 15 de marzo al 15 de octubre es la época de más riesgo de incendio, y en primavera la hierba aún está verde y se trabaja mejor.'],
    ],
    cerca: ["Sant Jaume d'Enveja", 'Freginals', 'Godall', 'Ulldecona'],
  },
];

export const OTROS_PUEBLOS = ['Ulldecona', "Sant Jaume d'Enveja", 'Santa Bàrbara', 'Masdenverge', 'La Sénia', 'Godall', 'Freginals', 'La Galera', 'Mas de Barberans'];

export const PUEBLOS_FORMULARIO = ['Amposta', 'Alcanar', "Les Cases d'Alcanar", 'Alcanar Platja', 'Sant Carles de la Ràpita', 'Ulldecona', "Sant Jaume d'Enveja", 'Santa Bàrbara', 'Masdenverge', 'La Sénia', 'Godall', 'Freginals', 'La Galera', 'Mas de Barberans', 'Otro pueblo'];

export const zonaPorId = id => ZONAS.find(z => z.id === id);

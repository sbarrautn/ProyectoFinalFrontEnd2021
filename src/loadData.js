import Localbase from 'localbase'

let db = new Localbase('db')

export const startLocalBase = () => {
  db.collection('students').get().then(students => {
   if(!students.length){
    loadData();
   }
  })
};

const loadData = () => {
  db.collection('students').add({
    id: 1,
    name: 'Jorge Santillan',
    groupId: 1
  })
  db.collection('students').add({
    id: 2,
    name: 'Carlos Montana',
    groupId: 1
  })
  db.collection('students').add({
    id: 8,
    name: 'Sara Elisondo',
    groupId: 1
  })
  db.collection('students').add({
    id: 3,
    name: 'Franco Reyes',
    groupId: 2
  })
  db.collection('students').add({
    id: 4,
    name: 'Joaquin Balderrama',
    groupId: 2
  })
  db.collection('students').add({
    id: 5,
    name: 'Esequiel Perez',
    groupId: 3
  })
  db.collection('students').add({
    id: 6,
    name: 'Fabian Lopez',
    groupId: 3
  })
  db.collection('students').add({
    id: 7,
    name: 'Jose Zapana',
    groupId: 3
  })
  db.collection('groups').add({
    id: 1,
    name: 'Grupo 1',
    assignedTask: null
  })
  db.collection('groups').add({
    id: 2,
    name: 'Grupo C',
    assignedTask: null
  })
  db.collection('groups').add({
    id: 3,
    name: 'Grupo Computo',
    assignedTask: null
  })
  db.collection('tasks').add({
    id: 1,
    title: 'Crear Base de proyecto Frontend',
    description: 'Se requiere crear bases de proyecto usando tecnologias actuales como Vue, Reac o Angular.',
    fromDate: '2021-10-11 12:00:00',
    toDate: '2021-10-18 12:00:00',
  })
  db.collection('tasks').add({
    id: 2,
    title: 'Conectar con firebase',
    description: 'Se necesita crear un endpoint para conectarse.',
    fromDate: '2021-11-11 12:00:00',
    toDate: '2021-11-18 12:00:00',
  })
  db.collection('tasks').add({
    id: 3,
    title: 'Coneccion a API de Google',
    description: 'Obtener credenciales de Google para conectarse a su API.',
    fromDate: '2021-12-11 12:00:00',
    toDate: '2021-12-18 12:00:00',
  })
  db.collection('courses').add({
    id: 1,
    title: 'Introduccion a Programacion Estriucturada',
    description: 'Se requiere crear bases de proyecto usando tecnologias actuales como Vue, Reac o Angular.',
  })
  db.collection('courses').add({
    id: 2,
    title: 'Patrones de diseño',
    description: 'Se necesita crear un endpoint para conectarse.',
  })
  db.collection('courses').add({
    id: 3,
    title: 'Introduccino a realidad aumentada',
    description: 'Obtener credenciales de Google para conectarse a su API.',
  })
  db.collection('activities').add({
    id: 1,
    title: 'Actividad 1',
    description: 'Se requiere crear bases de proyecto usando tecnologias actuales como Vue, Reac o Angular.',
  })
  db.collection('activities').add({
    id: 2,
    title: 'Actividad 2',
    description: 'Se necesita crear un endpoint para conectarse.',
  })
  db.collection('activities').add({
    id: 3,
    title: 'Actividad 3',
    description: 'Obtener credenciales de Google para conectarse a su API.',
  })
}
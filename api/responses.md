GET /notes → devuelve todas las notas.
llamado:
- url: https://notesapi.com/notes
- metodo: GET
- data: null (no es necesaria)

response.notes: [
  {
    id: number,
    content: string,
    status: active | completed
  }
]

POST /notes → agrega una nueva nota.
llamado:
- url: https://notesapi.com/notes
- metodo: POST
- data: {
  content: string,
}

response.satatus: 200 (ok)
response.msg: "Nota creada correctamente"

DELETE /notes/:id → borra una nota.
llamado: 
- url: https://notesapi.com/notes/id
- metodo: DELETE

{
  "status": "success",
  "message": "Nota creada correctamente",
  "data": {
    "id": 3,
    "content": "Nueva nota",
    "status": "active"
  }
}


PUT /notes/order → cambia el orden de las notas.
llamado: 
- url: https://notesapi.com/notes/oder
- metodo: PUT
- body: {
  "order": [3, 1, 2] (ids)
}

{
  "status": "success",
  "message": "Lista actualizada correctamente"
}

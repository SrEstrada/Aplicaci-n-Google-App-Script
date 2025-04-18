function enviarConfirmacion(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var fila = hoja.getLastRow();

  var correo = hoja.getRange(fila, 2).getValue(); // Columna B
  var dni = hoja.getRange(fila, 3).getValue();    // Columna C
  var fotoLink = hoja.getRange(fila, 5).getValue(); // Columna E

  var asunto = "Confirmación de envío de foto para carné universitario";
  var mensaje = "Hola,\n\nHemos recibido correctamente tu información para el carné universitario.\n\n" +
                "📌 DNI: " + dni + "\n" +
                "📷 Foto enviada: " + fotoLink + "\n\n" +
                "Tu solicitud será revisada pronto. ¡Gracias!\n\n- Sistema de Registro de Carné";

  MailApp.sendEmail(correo, asunto, mensaje);
}
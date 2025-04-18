function enviarConfirmacion(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var fila = hoja.getLastRow(); // Última fila ingresada

  var correo = hoja.getRange(fila, 2).getValue(); // Columna B = Correo

  var asunto = "Confirmación de envío de foto para carné universitario";
  var mensaje = "Hola,\n\nHemos recibido correctamente tu información y foto para el carné universitario. Pronto será revisado.\n\nGracias por tu envío.\n\n- Sistema de Registro de Carné";

  MailApp.sendEmail(correo, asunto, mensaje);
}

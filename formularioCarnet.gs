//script para hoja de calculo
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
//script para formulario
function testManual() {
  const e = {
    values: [
      "2025-04-18 18:00:00",  // 0: Fecha de envío
      "juan@ejemplo.com",           // 1: Correo
      "12345678",             // 2: DNI
      "87654321",     // 3: CUI
      "https://drive.google.com/file/d/1sh81hWSyUDtGnwh3Ur_6ukH-Fjeg-IX8/view?usp=sharing" // 4: Enlace foto
    ]
  };

  onFormSubmit(e);
}

function onFormSubmit(e) {
  // ID de la carpeta a donde se moverá la imagen
  var idCarpetaDestino = "1Fu8Gjah4I5phRY5h3is-yg4XL5iuLO1X";
  var carpetaDestino = DriveApp.getFolderById(idCarpetaDestino);

  // Obtener el DNI y el enlace desde las respuestas del formulario
  var dni = e.values[2];
  var enlace = e.values[4];

  // Mostrar datos en el registro
  Logger.log("DNI: " + dni);
  Logger.log("Enlace: " + enlace);

  // Obtener el ID del archivo desde el enlace
  var idArchivo = extraerIdDesdeEnlace(enlace);
  if (!idArchivo) {
    Logger.log("No se pudo obtener el ID del archivo.");
    return;
  }

  // Renombrar y mover el archivo
  try {
    var archivo = DriveApp.getFileById(idArchivo);
    var extension = obtenerExtension(archivo.getName());
    var nuevoNombre = "DNI_" + dni + extension;

    archivo.setName(nuevoNombre);
    carpetaDestino.addFile(archivo);

    // Quitar el archivo de su carpeta original
    var carpetas = archivo.getParents();
    if (carpetas.hasNext()) {
      var carpetaOriginal = carpetas.next();
      carpetaOriginal.removeFile(archivo);
    }

    Logger.log("Archivo renombrado y movido.");
  } catch (error) {
    Logger.log("Ocurrió un error: " + error);
  }
}

// Saca el ID del archivo desde un enlace de Drive
function extraerIdDesdeEnlace(enlace) {
  var partes = enlace.match(/(?:\/d\/|id=)([-\w]{25,})/);
  return partes ? partes[1] : null;
}

// Obtiene la extensión del archivo (por ejemplo .png, .jpg)
function obtenerExtension(nombre) {
  var punto = nombre.lastIndexOf(".");
  return punto >= 0 ? nombre.substring(punto) : "";
}